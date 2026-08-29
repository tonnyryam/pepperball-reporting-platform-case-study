# Operational use and business impact

The platform prepares decision-support outputs for supervisors and managers. It does not make operational decisions or guarantee outcomes.

## How outputs are used

- **Shift Drafts:** automate collection, reconciliation, organization, and spreadsheet preparation. Supervisors review exceptions, add context, and finalize the report.
- **Daily Production Reports:** combine production, molding, labor, quality, plan attainment, and downtime. Managers investigate constraints, prioritize follow-up, and inform staffing, production-plan, maintenance, and coordination changes.
- **Weekly Production and Downtime Reports:** expose trends, comparisons, recurring problems, capacity and labor needs, and maintenance/process-improvement priorities for meetings, reviews, and handoffs.

The journey is: operational input → automated ingestion → reconciliation and source linkage → validation → prepared output → human review → operational action.

## Defensible impact

Estimated or modeled: 20 supervisor plus 10 manager hours/week, or 1,560 hours/year, and about $52K annual labor-capacity value under documented assumptions. This is a planning opportunity, not booked savings.

This is a planning model—not booked savings, autonomous decisions, or a guaranteed outcome.

## Technical evidence

The delivered reporting core collects operational files through the existing Microsoft environment, then uses Python ingestion and reconciliation plus eight source-linked PostgreSQL serving tables to prepare validated workbooks for SharePoint. Missing values remain distinct from zeros. Publication is fail-closed, with readback, bounded repair, one-writer releases, and rollback.

As additional initiatives, QR-linked Forms, machine-event flows, notifications, and the SharePoint dashboard improve machine-status visibility, while a functional read-only Reporting Assistant answers bounded queries with governed evidence. The machine-visibility upper-bound model represents up to 227,500 production units and approximately $205K in contribution-margin opportunity; this is not recovered production or realized margin. The assistant's roughly 90% retrieval-time estimate compares a representative 20–30 minute search with a 1–2 minute cited response and is not a controlled production benchmark. Broader model-backed reasoning and production advisory remain future work.

The sixth flow provides report-specific distribution for newly published Daily Production, Weekly Production, and Weekly Downtime and Maintenance workbooks. It sends configured groups a snapshot when size permits and a link to the continuously updated SharePoint version, records delivery state, and suppresses same-file duplicates. It is implemented, enabled, and end-to-end tested in a controlled test; the next real publication from all three families has not yet been observed.

The labor-capacity and machine-visibility models are separate value pools and must not be added together.
