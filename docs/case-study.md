# Building an end-to-end reporting platform that is safe to recover

## Delivered platform and additional initiatives

- **Core platform delivered:** Shift Drafts and daily, weekly, and downtime reporting with controlled ingestion, reconciliation, lineage, validation, publication, readback, recovery, and rollback.
- **Additional initiative delivered:** QR/Form machine-event intake, notifications, and a SharePoint dashboard that improve operational visibility without making maintenance decisions.
- **Delivered Reporting Assistant extension:** a functional read-only assistant answers bounded, source-grounded queries with structured responses, validated citations, report diagnostics, evidence validation, and deterministic refusal. It has no write authority; broader model-backed reasoning, document knowledge, recurring artifacts, and production advisory remain future work.

The assistant sits over the governed reporting system; it does not replace the input → preparation → validated output → human review path.

## Impact methodology

- Core reporting model: 20 supervisor + 10 manager hours/week = 30 hours/week or 1,560 hours/year, representing about $52K in modeled annual labor-capacity value.
- Reporting Assistant estimate: a representative 20–30 minute search compared with a 1–2 minute cited response from the functional assistant, estimated at about 90% faster retrieval. This is not a controlled production benchmark.
- Machine-visibility upper bound: 5-minute response improvement × 1,000 production units/hour/machine × 52.5 events/week × 52 weeks = up to 227,500 production units; at $0.90/unit, approximately $205K contribution-margin opportunity.

The labor and machine-visibility value pools are separate and are not added together. These are planning scenarios, not booked savings, realized production, guaranteed margin, or autonomous outcomes.

**Thomas Ryan - Forward Deployed Engineer Intern, PepperBall**
**May 2026-August 2026**

## Context

A manufacturing reporting workflow combined changing document inputs,
spreadsheet products, a document portal, and scheduled cloud workers. A report
could be missing or stale even when each individual component appeared healthy.
Late source evidence, client-dependent spreadsheet calculation, lost HTTP
responses, and long-lived repair obligations made naive retry unsafe.

The system also needed governed lineage, multiple report families, operational
diagnostics, user-facing read surfaces, access controls, and a release process
that did not trade uptime for correctness.

## Objective

Build a reliability layer that could explain every expected output, recover
technical gaps, preserve human-owned or security-held items, and prove that an
equivalent replay would not write twice.

The controlling invariants were:

- exactly one production writer;
- deterministic output content and stored values;
- stable canonical output identity;
- conditional writes followed by exact readback;
- no second write after an ambiguous accepted response;
- bounded, fair repair with explicit terminal holds; and
- immutable releases with exact rollback.

More broadly, the objective was to evolve the workflow into a maintainable
platform from source discovery through governed facts, deterministic products,
operational experiences, recovery, secure release, and owner handoff.

## Approach

### Governed source-to-user platform

The platform joined version-aware document intake, immutable source retention,
normalized and governed facts, four report families, a read-only API and portal,
report-health diagnostics, and evidence-bound release operations. Original
documents remained authoritative and user-facing surfaces did not create a
second writer.

### Durable source-to-output accounting

Each qualified source creates an expected-output obligation. The ledger records
whether the source is missing, pending, ready, published, read back, protected,
or terminal. This makes absence observable without inventing business facts.

### Governed material identity

Idempotency is based on governed business material, not a raw file hash. Capture
timestamps and other snapshot-only metadata do not force a rewrite, while real
source changes still advance the canonical output.

### Deterministic report production

Reports store the values needed for client-independent viewing. Certification
checks workbook structure, stored values, formulas, lineage, presentation, and
missing-versus-zero behavior before publication.

### Accepted-write recovery

A conditional write can succeed while its response is lost. The system retains
the candidate identity and settles with GET readback. It never converts network
ambiguity into permission for a second PUT.

### Bounded self-healing

Repair reuses the existing scheduler, queue, publisher, and checkpoint store.
It is fair across report families, bounded by time and attempts, and refuses to
rewrite protected or terminal outputs.

### One-writer releases

Successors are immutable. They pass output-suppressed validation before a
serialized handoff. A material regression drains the successor and restores the
exact prior release, preserving one active writer.

## Verified outcomes

- Deterministic two-sheet report products with client-independent stored values.
- Qualified late evidence refreshed the same canonical output.
- Accepted writes settled through exact GET readback with no retry write.
- Equivalent replay produced an immediate no-op.
- Repair state distinguished nonterminal work from protected terminal holds.
- Serialized successor and rollback paths preserved one writer.
- A read-only health and interaction layer made output state explainable without
  widening publication authority.
- Source, report, recovery, security, release, and handoff controls were
  documented as one operable system.

The evidence included focused and proportional tests, output-suppressed shadows,
exact remote readback, rollback exercises, and natural scheduled operation.

## A representative defect and correction

One replay exposed a difference between package-level bytes and governed
business identity. Snapshot-only capture metadata changed even though the
report's governed material did not. Treating the package difference as material
could authorize a redundant update.

The correction excluded those exact control fields from material identity while
preserving real source changes. An equivalent natural cycle then produced no
update, while a later genuine source change advanced the canonical item once.

A later Shift Draft incident exposed the same principle in durable scheduling:
elapsed source age was included in a retry manifest, so unchanged evidence
appeared different and the due slot refused. The correction retained stable
source-version timestamps, preserved fail-closed handling for real post-cutoff
changes, and let the existing recovery loop create the missing canonical
workbook naturally. No alternate scheduler or forced output was introduced.

## What this does not claim

This case study does not disclose production data or topology and does not claim
blanket report accuracy, user adoption, realized savings, or causal business
impact. It describes verified reliability controls and their observed behavior.

The public architecture is intentionally generalized. Exact resource identities,
schemas, schedules, ACLs, credentials, private evidence, and production code
remain outside this package.

## Lessons

1. Idempotency needs a governed semantic identity, not only a file hash.
2. Ambiguous network responses should reduce write authority, not increase it.
3. Self-healing is safe only when terminal holds remain terminal.
4. Missing data must stay distinguishable from proved zero.
5. Rollback is a product feature when scheduled publishers touch canonical work.
6. Production discoveries are most valuable when converted into synthetic
   regression fixtures.
