# Making scheduled reports safe to recover

## Context

A manufacturing reporting workflow combined changing document inputs,
spreadsheet products, a document portal, and scheduled cloud workers. A report
could be missing or stale even when each individual component appeared healthy.
Late source evidence, client-dependent spreadsheet calculation, lost HTTP
responses, and long-lived repair obligations made naive retry unsafe.

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

## Approach

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

## What this does not claim

This case study does not disclose production data or topology and does not claim
blanket report accuracy, user adoption, realized savings, or causal business
impact. It describes verified reliability controls and their observed behavior.

## Lessons

1. Idempotency needs a governed semantic identity, not only a file hash.
2. Ambiguous network responses should reduce write authority, not increase it.
3. Self-healing is safe only when terminal holds remain terminal.
4. Missing data must stay distinguishable from proved zero.
5. Rollback is a product feature when scheduled publishers touch canonical work.
6. Production discoveries are most valuable when converted into synthetic
   regression fixtures.
