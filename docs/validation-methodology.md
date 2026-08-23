# Validation methodology

The project treats evidence level as part of every technical claim. Passing a
unit test, deploying a container, and observing a natural scheduled report are
not interchangeable.

## Evidence ladder

| Grade | What it proves | What it does not prove |
| --- | --- | --- |
| Static review | Configuration, contract, or code shape matches an invariant | Runtime behavior |
| Focused unit test | A bounded rule holds for synthetic fixtures | Cross-component behavior |
| Integration test | Component seams and state transitions work together | Production identity, ACL, or timing |
| Raw-artifact inspection | Workbook package, stored values, formulas, sheets, and lineage are present | Remote publication correctness |
| Output-suppressed shadow | A production-shaped successor can prepare and decide without mutation | Successful live publication |
| Deployment health | The immutable release is ready and serving its intended surface | Output correctness by itself |
| Exact readback | The canonical remote item, version, ETag, content, and access state match the candidate | Future natural schedules |
| Natural scheduled verification | The real cadence produced the intended publish, settlement, or no-op | Universal behavior across every future failure |
| Failed-restored release | Detection, drain, one-writer preservation, and exact rollback worked | That the failed successor was acceptable |

## Workbook certification

The output boundary is verified from both rendered appearance and raw package
state. Checks include visible sheets, formulas, cached or stored values, lineage,
material identity, layout, governed meaning, and exact missing-versus-zero
treatment. This prevents a recalculating client from masking a broken file.

## Publication certification

The publisher retains candidate identity before mutation, issues a conditional
same-item write, and then reads the remote item. Settlement compares the exact
governed identity and content. A missing response never authorizes a retry PUT.

## Recovery certification

Synthetic and production-shaped scenarios exercise missing source, late source,
equivalent replay, ambiguous response, stale obligation, protected hold,
terminal identity, unfair queue pressure, lease isolation, restart persistence,
and rollback. Natural evidence is required before a prepared behavior is labeled
naturally verified.

## Claim discipline

- Test coverage is not blanket accuracy.
- Classification or similarity measures are not report accuracy.
- Modeled opportunity is not realized savings.
- `Prepared`, `deployed`, `failed-restored`, and `naturally verified` remain
  distinct.
- Public summaries never disclose private evidence just to make a claim sound
  more precise.
