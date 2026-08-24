# Operational use and business impact

The platform prepares decision-support outputs for supervisors and managers. It does not make operational decisions or guarantee outcomes.

## How outputs are used

- **Shift Drafts:** automate collection, reconciliation, organization, and spreadsheet preparation. Supervisors review exceptions, add context, and finalize the report.
- **Daily Production Reports:** combine production, molding, labor, quality, plan attainment, and downtime. Managers investigate constraints, prioritize follow-up, and inform staffing, production-plan, maintenance, and coordination changes.
- **Weekly Production and Downtime Reports:** expose trends, comparisons, recurring problems, capacity and labor needs, and maintenance/process-improvement priorities for meetings, reviews, and handoffs.

The journey is: operational input → automated ingestion → reconciliation and source linkage → validation → prepared output → human review → operational action.

## Defensible impact

Measured: replay-processing rows reduced 94.6% (113,137 to 6,075); local PostgreSQL fixture footprint reduced 86.6% (198,719,167 to 26,580,671 bytes).

Estimated or modeled: about 90% retrieval-time reduction; about 87% storage-cost reduction assuming linear scaling; 20 supervisor plus 10 manager hours/week and about $52K annual labor value; up to 227,500 widgets and about $205K annual contribution-margin opportunity under documented assumptions.

These are measured technical results and planning models—not booked savings, realized margin, autonomous decisions, or blanket accuracy claims.

## Technical evidence

SharePoint and Forms inputs, five Power Automate flows, and machine events feed automated Python ingestion and reconciliation. PostgreSQL preserves eight source-linked serving tables. Workbooks and the API/SPFx dashboard expose validated output with lineage. Missing values remain distinct from zeros. Publication is fail-closed, with readback, bounded repair, one-writer releases, and rollback.
