# Interview kit

Tell one cumulative story: governed reporting evidence comes first; the chatbot retrieves it, the report doctor diagnoses its health, and the oracle validates it against contracts. Use the estimated 90% retrieval improvement as the direct intelligence-interface value. Present the 30-hour/$52K labor model and 227.5K-widget/~$205K downtime scenario only as documented planning opportunities.

**Thomas Ryan - Forward Deployed Engineer Intern, PepperBall - May 2026-August
2026**

## Thirty-second answer

I owned reliability work on a document-driven manufacturing reporting platform.
The difficult part was not generating a workbook once; it was proving that late
inputs, changing documents, lost write responses, and retries could not silently
create stale or duplicate outputs. I added durable expected-output accounting,
governed material identity, deterministic workbooks, GET-only accepted-write
settlement, bounded repair, and one-writer releases with exact rollback.

## Two-minute answer

The system combined scheduled cloud workers, document inputs, spreadsheet
products, and a document portal. A missing report could mean missing source,
lineage ambiguity, a write that succeeded but returned no response, or an
equivalent replay that looked different at the package level.

I made each expected output durable, separated governed business material from
capture-only metadata, certified workbook semantics before publication, and
used conditional same-item writes followed by exact readback. When a response
was ambiguous, the candidate settled through GET rather than a second PUT.
Repair stayed bounded and refused protected outputs. Releases used immutable
successors, a single writer lease, output-suppressed validation, and exact
rollback. The final equivalent scheduled cycle verified an unchanged item and
zero additional writes.

## Follow-up prompts

- **Hardest bug:** package bytes changed because snapshot-only metadata changed,
  even though governed business material did not.
- **Most instructive recovery:** a durable Shift Draft retry included elapsed
  source age in its identity; switching to stable source versions let the
  native loop recover the missing canonical output without forcing it.
- **Most important invariant:** an ambiguous accepted response never creates
  permission for another write.
- **Why one writer:** independently correct schedules can still collide at the
  shared publication boundary.
- **Why not automate every gap:** technical state can be repaired; missing
  business facts and ownership conflicts must fail closed.
- **How AI was used:** Codex accelerated analysis and implementation under
  Thomas Ryan's product definitions, acceptance criteria, and release authority.
