# Security policy

## Scope

This repository must remain disconnected from production. Do not add real
credentials, account identities, tenant or subscription identifiers, private
URLs, production screenshots, operational exports, report content, access lists,
or source documents.

## Reporting

If you find sensitive material, do not open a public issue containing it.
Contact the repository owner through the private channel listed in the final
repository profile. Until that channel is supplied, keep the finding private.

## Release control

Every public commit must pass `python scripts/public_safety_scan.py`, the Python
unit tests, the site build, and a human review of rendered artifacts. A scanner
pass is necessary but does not replace judgment.
