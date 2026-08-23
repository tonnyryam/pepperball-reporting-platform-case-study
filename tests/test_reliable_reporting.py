from __future__ import annotations

from pathlib import Path
import sys
import unittest


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from reliable_reporting import (  # noqa: E402
    PublicationStore,
    RecoveryEngine,
    ReleaseController,
    SourceEvidence,
    WriterLease,
)


class ReliableReportingTests(unittest.TestCase):
    def setUp(self) -> None:
        self.period = "SYNTHETIC-PERIOD-01"
        self.facts = {"good_units": 1200, "downtime_minutes": 35}

    def test_material_identity_ignores_capture_marker(self) -> None:
        first = SourceEvidence(self.period, self.facts, "capture-a")
        second = SourceEvidence(self.period, self.facts, "capture-b")
        self.assertEqual(first.material_id, second.material_id)
        self.assertEqual(first.payload_digest, second.payload_digest)

    def test_material_identity_changes_with_governed_facts(self) -> None:
        first = SourceEvidence(self.period, self.facts, "capture-a")
        changed = SourceEvidence(
            self.period,
            {"good_units": 1201, "downtime_minutes": 35},
            "capture-a",
        )
        self.assertNotEqual(first.material_id, changed.material_id)

    def test_missing_source_is_pending_with_zero_writes(self) -> None:
        engine = RecoveryEngine()
        result = engine.mark_source_pending(self.period)
        self.assertEqual(result["state"], "pending_source")
        self.assertEqual(engine.store.put_count, 0)

    def test_equivalent_replay_is_an_exact_no_op(self) -> None:
        engine = RecoveryEngine()
        first = SourceEvidence(self.period, self.facts, "capture-a")
        equivalent = SourceEvidence(self.period, self.facts, "capture-b")
        engine.process(first)
        before = engine.store.put_count
        result = engine.process(equivalent)
        self.assertEqual(result["outcome"], "exact_no_op")
        self.assertEqual(result["writes"], 0)
        self.assertEqual(engine.store.put_count, before)

    def test_lost_response_settles_by_get_without_second_put(self) -> None:
        store = PublicationStore()
        engine = RecoveryEngine(store)
        evidence = SourceEvidence(self.period, self.facts, "capture-a")
        result = engine.process(evidence, lose_response=True)
        self.assertEqual(result["outcome"], "lost_response_get_settled")
        self.assertEqual(result["state"], "certified")
        self.assertEqual(result["writes"], 1)
        self.assertEqual(store.put_count, 1)
        engine.settle_by_get(self.period)
        self.assertEqual(store.put_count, 1)

    def test_late_material_refreshes_same_item_once(self) -> None:
        engine = RecoveryEngine()
        first = SourceEvidence(self.period, self.facts, "capture-a")
        changed = SourceEvidence(
            self.period,
            {"good_units": 1240, "downtime_minutes": 35},
            "capture-b",
        )
        created = engine.process(first)
        updated = engine.process(changed)
        self.assertEqual(created["remote_version"], 1)
        self.assertEqual(updated["remote_version"], 2)
        self.assertEqual(engine.store.put_count, 2)
        self.assertEqual(engine.store.item_count, 1)

    def test_terminal_hold_never_writes(self) -> None:
        engine = RecoveryEngine()
        engine.protect(self.period, "synthetic owner hold")
        result = engine.process(SourceEvidence(self.period, self.facts, "capture-a"))
        self.assertEqual(result["outcome"], "refused_terminal_hold")
        self.assertEqual(engine.store.put_count, 0)

    def test_writer_lease_refuses_overlap(self) -> None:
        lease = WriterLease()
        self.assertTrue(lease.acquire("writer-a"))
        self.assertFalse(lease.acquire("writer-b"))
        lease.release("writer-a")
        self.assertTrue(lease.acquire("writer-b"))

    def test_release_controller_restores_exact_prior_release(self) -> None:
        controller = ReleaseController("release-a")
        controller.promote("release-b")
        restored = controller.restore_exact_rollback()
        self.assertEqual(restored, "release-a")
        self.assertEqual(controller.rollback_release, "release-b")


if __name__ == "__main__":
    unittest.main()
