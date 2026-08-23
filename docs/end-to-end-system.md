# End-to-end system

This is the complete public-safe view of the PepperBall reporting platform built
and hardened during Thomas Ryan's May-August 2026 Forward Deployed Engineer
internship. It describes capabilities, state transitions, and safety controls;
it deliberately omits production code, tenant coordinates, resource names,
schemas, exact schedules, private access rules, and report templates.

## 1. Source discovery and intake

The system discovers changing operational documents through bounded,
version-aware cloud-file intake. It separates live change tracking from
historical reconciliation so a stale obligation cannot monopolize current work.
Original evidence remains authoritative; a generated workbook is never treated
as a repair source.

Intake validates identity, scope, file type, permissions, and lineage before a
document can influence reporting. Unknown or over-broad access fails closed.

## 2. Governed facts and business meaning

Source material flows through an immutable raw layer, a normalized fact layer,
and a governed current-fact layer. Field-level validation allows independent
facts to progress while unresolved values remain visibly missing. Zero is used
only when evidence proves zero.

Material identity is semantic rather than byte-only. Snapshot timestamps and
other capture metadata cannot force a report rewrite, while real governed fact
changes remain material.

## 3. Expected-output accounting

Every qualified source-to-report obligation receives durable state. Accounting
links the expected identity, candidate content, publication attempt, and exact
readback. That independent expectation model can detect a report that never
existed - a gap that publication-only monitoring cannot see.

States distinguish waiting for evidence, ready, published, read back, repairable,
protected, refused, and terminal. The accounting reuses the existing checkpoint
store and family observers rather than adding a parallel scheduler or publisher.

## 4. Scheduling and report families

One worker coordinates four report families: an open-lifecycle shift draft,
daily reporting, weekly reporting, and weekly downtime reporting. Each family
has its own source qualification and closure semantics while sharing the same
writer boundary, evidence model, and repair controls.

The shift draft preserves one canonical item while a shift is open, seals when
authoritative final evidence arrives, and becomes immutable when terminal.
Longer-period products use bounded late-source discovery and same-item refresh.

## 5. Deterministic workbook products

Reports are operational products, not incidental exports. Certification covers:

- two visible, purposeful sheets;
- client-independent stored values;
- formulas and raw-package structure;
- governed missing-versus-zero behavior;
- visual layout and usability;
- source lineage and material identity; and
- family-specific semantic rules.

The raw workbook package is inspected because a spreadsheet client can
recalculate formulas and hide a missing stored value.

## 6. Conditional same-item publication

A materially new candidate can advance only the approved canonical item through
a conditional write. Qualified late evidence refreshes that item instead of
creating a duplicate or working-copy destination. Exact item identity, version,
ETag, content, and access state are read back after publication.

If a write may have succeeded but its response is lost, the system retains the
candidate identity and resolves remote state with GET. A second PUT is never a
recovery step. Equivalent candidates become exact no-ops.

## 7. Bounded self-healing

The recovery loop observes expectations, classifies gaps, prepares sources
outside the critical writer lease where possible, and reuses the normal family
renderer and publisher. Work selection is fair across old and current
obligations, bounded by time and attempts, and durable across restarts.

Technical gaps can converge. Missing business facts, security holds, ownership
conflicts, terminal identities, and uncertain lineage remain protected. Repair
does not force publication, invent facts, or rewrite terminal evidence.

## 8. Read-only operational experiences

A governed API, portal experience, report-health doctor, diagnostics, and
assistant-facing summaries expose report status without creating a second
writer. Stored summaries are client-independent and health views distinguish
fresh, pending, repairable, protected, and terminal state.

Prepared document-knowledge and interaction-telemetry capabilities remain
subject to their own privacy, retention, and access gates. This case study does
not label gated work as generally deployed.

## 9. Observability and incident response

Low-cardinality diagnostics explain what is expected, why an item is waiting,
which repair state owns it, what was written, and whether exact readback settled
the candidate. Natural schedules, output-suppressed shadows, repair convergence,
and no-op cycles produce distinct evidence.

Failures become sanitized fixtures and focused regressions so production
discoveries strengthen the repeatable test suite without exporting private data.

## 10. Release, rollback, and security

Worker releases are immutable successors. A successor validates in a
zero-output shadow, the current writer drains, and activation is serialized so
there is exactly one publisher. Material regression automatically restores the
exact prior release.

Identity, permissions, secrets, ACLs, source lineage, semantics, frozen
presentation, one-writer topology, or rollback ambiguity all refuse mutation.
Database change ownership remains separate from runtime startup, and operational
interfaces stay read-only at the publication boundary.

## 11. Evidence and handoff

Claims are graded: local test, integration test, output-suppressed shadow,
deployed observation, exact readback, and natural scheduled verification are not
interchangeable. The private handoff package contains the precise evidence,
owner checklists, recovery runbooks, environment inventory, and acceptance
receipts. The public package preserves the engineering story without those
operational details.

## Representative end-to-end journeys

### Normal source-to-report

Discover source -> retain original -> normalize facts -> record expectation ->
render deterministic workbook -> compare material identity -> conditionally
update canonical item -> GET readback -> expose health.

### Late evidence

Record unresolved expectation -> wait through governed grace -> discover new
qualified evidence -> create durable family refresh -> advance the same item
once -> exact readback -> equivalent replay no-op.

### Ambiguous accepted write

Retain candidate identity -> observe response ambiguity -> issue GET only ->
compare remote identity and content -> settle or quarantine -> never replay PUT.

### Release regression

Detect material regression -> stop new claims -> drain successor -> restore the
exact inactive predecessor -> verify one-writer topology -> preserve evidence.
