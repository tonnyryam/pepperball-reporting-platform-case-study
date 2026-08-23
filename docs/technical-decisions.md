# Technical decisions and tradeoffs

## Governed identity over raw bytes

**Decision:** determine publication materiality from governed source facts and
explicitly classified metadata.

**Why:** workbook packages can differ for reasons that do not change business
meaning. Byte identity remains useful for provenance, but it is too sensitive to
act as the sole publication identity.

**Tradeoff:** the material contract must be versioned and tested whenever source
semantics change.

## GET-only settlement after an ambiguous write

**Decision:** retain the accepted candidate and use reads to determine whether
the remote system committed it.

**Why:** retrying the write after a lost response can create duplicate versions
or overwrite concurrent work.

**Tradeoff:** the ledger needs enough candidate identity to compare remote state
exactly across retries.

## One global writer lease

**Decision:** serialize all production publication families behind one durable
writer lease.

**Why:** family-specific schedules can collide even when each scheduler is
individually correct. One lease makes the topology easy to prove.

**Tradeoff:** long optional work must happen outside the lease, and every task
must be bounded to avoid starving unrelated families.

## Reuse the existing recovery path

**Decision:** integrate expected-output accounting and repair into the existing
scheduler, queue, publisher, and checkpoint store.

**Why:** a second scheduler or publisher would introduce competing authority and
more failure states.

**Tradeoff:** the shared adapters require careful family-scoped tests and fair
bounded scheduling.

## Exact rollback instead of rebuild-on-failure

**Decision:** retain the prior immutable release and restore that exact artifact
when a successor regresses.

**Why:** rebuilding during an incident can introduce dependency drift and delay
recovery.

**Tradeoff:** rollback artifacts and configuration must be preserved and
verified before every promotion.
