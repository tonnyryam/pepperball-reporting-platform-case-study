"""Clean-room teaching model for idempotent reporting and bounded recovery.

The module deliberately uses an in-memory store and synthetic identities. It is
not production code and does not connect to any external system.
"""

from __future__ import annotations

from dataclasses import dataclass
import hashlib
import json
from typing import Any, Mapping


def _stable_json(value: Mapping[str, Any]) -> str:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def _short_digest(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()[:12]


def material_identity(period: str, facts: Mapping[str, Any]) -> str:
    """Return the governed identity of business material.

    Capture markers are intentionally not accepted by this function. That makes
    it impossible for snapshot-only timestamps to force a publication.
    """

    return _short_digest(_stable_json({"period": period, "facts": dict(facts)}))


@dataclass(frozen=True)
class SourceEvidence:
    period: str
    facts: Mapping[str, Any]
    capture_marker: str

    @property
    def material_id(self) -> str:
        return material_identity(self.period, self.facts)

    @property
    def payload(self) -> str:
        return _stable_json({"period": self.period, "facts": dict(self.facts)})

    @property
    def payload_digest(self) -> str:
        return _short_digest(self.payload)


@dataclass(frozen=True)
class PublishedItem:
    period: str
    material_id: str
    payload_digest: str
    version: int
    etag: str


class AcceptedButResponseLost(RuntimeError):
    """The write committed, but the caller did not receive the response."""


class ConditionalWriteConflict(RuntimeError):
    """The supplied precondition no longer matches the remote item."""


class PublicationStore:
    """Small in-memory stand-in for a conditional document publisher."""

    def __init__(self) -> None:
        self._items: dict[str, PublishedItem] = {}
        self.put_count = 0
        self.get_count = 0

    def peek(self, period: str) -> PublishedItem | None:
        return self._items.get(period)

    @property
    def item_count(self) -> int:
        return len(self._items)

    def get(self, period: str) -> PublishedItem | None:
        self.get_count += 1
        return self._items.get(period)

    def put(
        self,
        evidence: SourceEvidence,
        *,
        if_match: str | None,
        lose_response: bool = False,
    ) -> PublishedItem:
        current = self._items.get(evidence.period)
        if current is None and if_match is not None:
            raise ConditionalWriteConflict("create cannot carry an existing-item tag")
        if current is not None and current.etag != if_match:
            raise ConditionalWriteConflict("remote item changed before publication")

        version = 1 if current is None else current.version + 1
        item = PublishedItem(
            period=evidence.period,
            material_id=evidence.material_id,
            payload_digest=evidence.payload_digest,
            version=version,
            etag=f"v{version}-{evidence.payload_digest[:6]}",
        )
        self._items[evidence.period] = item
        self.put_count += 1
        if lose_response:
            raise AcceptedButResponseLost("synthetic response loss after acceptance")
        return item


@dataclass
class LedgerEntry:
    period: str
    state: str = "expected"
    material_id: str | None = None
    payload_digest: str | None = None
    remote_etag: str | None = None
    attempts: int = 0
    reason: str | None = None


class RecoveryEngine:
    """Durable-state model with readback-only accepted-write recovery."""

    def __init__(self, store: PublicationStore | None = None) -> None:
        self.store = store or PublicationStore()
        self.ledger: dict[str, LedgerEntry] = {}

    def expect(self, period: str) -> LedgerEntry:
        return self.ledger.setdefault(period, LedgerEntry(period=period))

    def mark_source_pending(self, period: str) -> dict[str, Any]:
        entry = self.expect(period)
        if entry.state != "terminal_hold":
            entry.state = "pending_source"
            entry.reason = "qualified source evidence is not available"
        return self._result(entry, "pending", writes=0)

    def protect(self, period: str, reason: str) -> LedgerEntry:
        entry = self.expect(period)
        entry.state = "terminal_hold"
        entry.reason = reason
        return entry

    def process(
        self,
        evidence: SourceEvidence,
        *,
        lose_response: bool = False,
    ) -> dict[str, Any]:
        entry = self.expect(evidence.period)
        before_puts = self.store.put_count
        if entry.state == "terminal_hold":
            return self._result(entry, "refused_terminal_hold", writes=0)

        entry.material_id = evidence.material_id
        entry.payload_digest = evidence.payload_digest
        current = self.store.get(evidence.period)

        if (
            current is not None
            and current.material_id == evidence.material_id
            and current.payload_digest == evidence.payload_digest
        ):
            entry.state = "certified"
            entry.remote_etag = current.etag
            entry.reason = "equivalent material already certified"
            return self._result(entry, "exact_no_op", writes=0)

        entry.state = "publishing"
        entry.attempts += 1
        action = "created" if current is None else "updated"
        try:
            self.store.put(
                evidence,
                if_match=None if current is None else current.etag,
                lose_response=lose_response,
            )
        except AcceptedButResponseLost:
            entry.state = "accepted_unknown"
            entry.reason = "write response lost; only readback may settle"
            settled = self.settle_by_get(evidence.period)
            settled["outcome"] = "lost_response_get_settled"
            settled["writes"] = self.store.put_count - before_puts
            return settled
        except ConditionalWriteConflict as error:
            entry.state = "terminal_hold"
            entry.reason = str(error)
            return self._result(
                entry,
                "refused_conflict",
                writes=self.store.put_count - before_puts,
            )

        settled = self.settle_by_get(evidence.period)
        settled["outcome"] = action
        settled["writes"] = self.store.put_count - before_puts
        return settled

    def settle_by_get(self, period: str) -> dict[str, Any]:
        """Settle a candidate with a read only; this method cannot issue PUT."""

        entry = self.expect(period)
        remote = self.store.get(period)
        if remote is None:
            entry.state = "pending_readback"
            entry.reason = "remote item is not visible yet"
            return self._result(entry, "pending_readback", writes=0)
        if (
            remote.material_id != entry.material_id
            or remote.payload_digest != entry.payload_digest
        ):
            entry.state = "terminal_hold"
            entry.reason = "remote item does not match retained candidate"
            return self._result(entry, "refused_readback_mismatch", writes=0)

        entry.state = "certified"
        entry.remote_etag = remote.etag
        entry.reason = "exact GET readback matched retained candidate"
        return self._result(entry, "readback_certified", writes=0)

    def _result(self, entry: LedgerEntry, outcome: str, *, writes: int) -> dict[str, Any]:
        remote = self.store.peek(entry.period)
        return {
            "period": entry.period,
            "outcome": outcome,
            "state": entry.state,
            "writes": writes,
            "total_puts": self.store.put_count,
            "total_gets": self.store.get_count,
            "remote_version": None if remote is None else remote.version,
            "material_id": entry.material_id,
            "reason": entry.reason,
        }


class WriterLease:
    """Prove that only one synthetic writer owns publication authority."""

    def __init__(self) -> None:
        self.owner: str | None = None

    def acquire(self, candidate: str) -> bool:
        if self.owner is None:
            self.owner = candidate
            return True
        return self.owner == candidate

    def release(self, candidate: str) -> None:
        if self.owner != candidate:
            raise PermissionError("only the current owner can release the lease")
        self.owner = None


class ReleaseController:
    """Immutable successor and exact rollback model."""

    def __init__(self, active_release: str) -> None:
        self.active_release = active_release
        self.rollback_release: str | None = None

    def promote(self, successor: str) -> None:
        if successor == self.active_release:
            raise ValueError("successor must be immutable and distinct")
        self.rollback_release = self.active_release
        self.active_release = successor

    def restore_exact_rollback(self) -> str:
        if self.rollback_release is None:
            raise RuntimeError("no rollback release is retained")
        failed = self.active_release
        self.active_release, self.rollback_release = self.rollback_release, failed
        return self.active_release
