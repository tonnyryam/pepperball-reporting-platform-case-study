# Sharing copy

## Repository description

Sanitized end-to-end case study and synthetic demo of a governed manufacturing
reporting platform: document intake, medallion facts, deterministic workbooks,
bounded self-healing, exact readback, operational interfaces, and one-writer
rollback-safe releases.

## Recruiter summary

Built and operationalized a Python/cloud/document-portal manufacturing reporting
platform with medallion data processing, deterministic spreadsheet products,
durable reconciliation, observability, and zero-downtime one-writer release
controls. Owned production diagnosis, regression strategy, rollback decisions,
and evidence-driven handoff.

## Contact line

Thomas Ryan - Forward Deployed Engineer Intern, May 2026-August 2026 -
[GitHub](https://github.com/tonnyryam/pepperball-reporting-platform-case-study) -
[LinkedIn](https://www.linkedin.com/in/thomas-f-ryan/) -
[Email](mailto:tommyryan.sf415@gmail.com)

## LinkedIn draft

Recently I worked on the reliability layer behind a document-driven
manufacturing reporting system. The interesting challenge was not generating a
spreadsheet once; it was proving that late inputs, changing documents, lost
responses, and retries could not silently create stale or duplicate outputs.

I built around deterministic rendering, durable source-to-output accounting,
bounded self-healing, exact readback, and immutable one-writer releases with
rollback. One lesson I am keeping: byte-level differences are not always
business-level differences, so idempotency needs an explicit governed material
identity, not only a file hash.

The linked case study and demo use synthetic data and generalized architecture.

[Read the case study](https://thomas-ryan-reporting-reliability.tonnyryam.chatgpt.site)
or [inspect the public repository](https://github.com/tonnyryam/pepperball-reporting-platform-case-study).

## Resume bullet

- Hardened a Python/cloud manufacturing reporting platform with deterministic
  spreadsheet products, durable expected-output accounting, GET-only
  accepted-write recovery, bounded self-healing, and serialized one-writer
  releases with exact rollback.
