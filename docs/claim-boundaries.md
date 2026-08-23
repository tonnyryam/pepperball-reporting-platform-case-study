# Public claim boundaries

| Claim area | Safe public statement | Do not claim without new approval or evidence |
| --- | --- | --- |
| Reliability | Equivalent retries were verified as no-ops and ambiguous accepted writes settled by readback. | The system can recover from every failure. |
| Correctness | Deterministic structure, stored values, lineage, semantics, and readback were tested. | Blanket report or business-data accuracy. |
| Operations | One-writer handoffs and exact rollback were exercised and observed. | Zero risk or guaranteed continuous availability. |
| Repair | Technical gaps can converge through bounded repair while terminal holds remain protected. | Missing business facts can be reconstructed automatically. |
| Impact | The work reduced classes of stale, duplicate, and ambiguous output failure. | Realized savings, adoption, productivity, or causal financial impact. |
| Scope | A manufacturing reporting platform was hardened across ingestion, workbooks, publication, and recovery. | Private topology, customer content, account identities, or exact production paths. |

## Language rules

- Say `verified`, `observed`, or `tested` only for the corresponding evidence.
- Distinguish deployed behavior from local prototypes and planned work.
- Treat missing as missing, never as zero.
- Use synthetic values in every screenshot and demonstration.
- Do not translate coverage, similarity, or classification metrics into blanket
  accuracy.
