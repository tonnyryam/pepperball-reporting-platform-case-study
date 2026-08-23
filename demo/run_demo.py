"""Run the public synthetic reporting-reliability walkthrough."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "src"))

from reliable_reporting import (  # noqa: E402
    RecoveryEngine,
    ReleaseController,
    SourceEvidence,
    WriterLease,
)


def run() -> dict[str, object]:
    config = json.loads((Path(__file__).parent / "scenarios.json").read_text(encoding="utf-8"))
    period = config["period"]
    engine = RecoveryEngine()

    events: list[dict[str, object]] = []
    events.append(engine.mark_source_pending(period))

    first = SourceEvidence(period, config["first_source"], "capture-a")
    events.append(engine.process(first))

    equivalent = SourceEvidence(period, config["first_source"], "capture-b")
    events.append(engine.process(equivalent))

    changed = SourceEvidence(period, config["material_change"], "capture-c")
    events.append(engine.process(changed, lose_response=True))
    events.append(engine.process(SourceEvidence(period, config["material_change"], "capture-d")))

    lease = WriterLease()
    first_writer = lease.acquire("writer-a")
    overlapping_writer = lease.acquire("writer-b")
    lease.release("writer-a")
    successor_writer = lease.acquire("writer-b")

    release = ReleaseController("release-a")
    release.promote("release-b")
    restored = release.restore_exact_rollback()

    return {
        "synthetic": True,
        "events": events,
        "writer_lease": {
            "first_writer_acquired": first_writer,
            "overlap_refused": not overlapping_writer,
            "successor_acquired_after_release": successor_writer,
        },
        "release": {
            "failed_successor": release.rollback_release,
            "restored_active": restored,
            "exact_rollback": restored == "release-a",
        },
        "summary": {
            "total_puts": engine.store.put_count,
            "final_remote_version": engine.store.peek(period).version,
            "equivalent_replays_wrote": False,
            "lost_response_retry_puts": 0,
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--json", action="store_true", help="print machine-readable output")
    args = parser.parse_args()
    result = run()
    if args.json:
        print(json.dumps(result, indent=2, sort_keys=True))
        return

    print("Synthetic reporting reliability demo")
    print("=" * 36)
    for index, event in enumerate(result["events"], start=1):
        print(
            f"{index}. {event['outcome']:<26} "
            f"state={event['state']:<16} writes={event['writes']} "
            f"remote_version={event['remote_version']}"
        )
    lease = result["writer_lease"]
    release = result["release"]
    summary = result["summary"]
    print()
    print(f"Overlap refused: {lease['overlap_refused']}")
    print(f"Exact rollback: {release['exact_rollback']}")
    print(f"Total governed writes: {summary['total_puts']}")
    print(f"Lost-response retry writes: {summary['lost_response_retry_puts']}")


if __name__ == "__main__":
    main()
