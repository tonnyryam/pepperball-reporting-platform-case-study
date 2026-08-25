# Operational use and business impact

The platform prepares decision-support outputs for supervisors and managers. It does not make operational decisions or guarantee outcomes.

## How outputs are used

- **Shift Drafts:** automate collection, reconciliation, organization, and spreadsheet preparation. Supervisors review exceptions, add context, and finalize the report.
- **Daily Production Reports:** combine production, molding, labor, quality, plan attainment, and downtime. Managers investigate constraints, prioritize follow-up, and inform staffing, production-plan, maintenance, and coordination changes.
- **Weekly Production and Downtime Reports:** expose trends, comparisons, recurring problems, capacity and labor needs, and maintenance/process-improvement priorities for meetings, reviews, and handoffs.

The journey is: operational input → automated ingestion → reconciliation and source linkage → validation → prepared output → human review → operational action.

## Defensible impact

Estimated or modeled: 20 supervisor plus 10 manager hours/week and about $52K annual labor value under documented assumptions. This is a planning opportunity, not booked savings.

This is a planning model—not booked savings, autonomous decisions, or a guaranteed outcome.

## Technical evidence

SharePoint and Forms inputs, five Power Automate flows, and machine events feed automated Python ingestion and reconciliation. PostgreSQL preserves eight source-linked serving tables. Workbooks and the API/SPFx dashboard expose validated output with lineage. Missing values remain distinct from zeros. Publication is fail-closed, with readback, bounded repair, one-writer releases, and rollback.
