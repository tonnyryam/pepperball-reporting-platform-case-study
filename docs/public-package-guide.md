# Public package guide

## Best route by audience

| Audience | Start here | Then inspect |
| --- | --- | --- |
| Recruiter | Website overview or one-page PDF | Portfolio card and presentation |
| Hiring manager | Long-form PDF | Workday chronology and verified outcomes |
| Engineering leader | End-to-end system | Security/governance and technical decisions |
| Software/data engineer | Architecture and capability matrix | Reliability state machine, validation methodology, synthetic code/tests |
| Operations or product | Representative journeys | Recovery lab, workbook, report-health concepts |

## Public-facing artifacts

- Audience-layered static website with full system map and interactive recovery lab.
- One-page executive PDF.
- Long-form end-to-end technical case study PDF.
- Presentation deck with speaker notes and source traceability.
- Synthetic two-sheet workbook plus rendered summary and recovery-trace images.
- Synthetic reliability engine, scenarios, and nine regression tests.
- Sanitized 29-entry workday chronology.
- Technical documentation for architecture, capabilities, state machines,
  security, validation, and engineering decisions.
- Interview kit, portfolio card, sharing copy, demo script, claim boundaries,
  release checklist, citation metadata, and contact page.
- Public-safety scanner and continuous-integration checks.

## What the site needs

The site is a statically built Next.js presentation. Its only runtime behavior
is local React state for audience and recovery-scenario selectors. It requires
no production API, database, document portal, cloud account, authentication, or
customer data. A static host is sufficient after final owner approval.

## What remains private

The operational handoff retains exact topology, identities, evidence paths,
credentials procedures, ACL verification, environment inventory, recovery
commands, transfer receipts, and archive decisions. None of those belong in
this repository.
