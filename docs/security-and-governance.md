# Security and governance

## Governing principle

Uncertainty reduces write authority. The system refuses mutation when identity,
permission, access control, secret handling, lineage, business semantics,
presentation, writer topology, or rollback state cannot be proven.

## Access and identity

- The reporting worker is the sole output writer.
- API, portal, diagnostic, and assistant surfaces are read/interaction planes.
- Canonical outputs preserve approved identity; recovery does not create
  alternate destinations.
- Broad document editing is not treated as a convenience. Sensitive intake and
  knowledge features require explicit least-privilege access and owner approval.

## Data and lineage

- Original evidence remains the repair authority.
- Generated reports never become upstream fact sources.
- Missing evidence remains missing; it is not converted to zero.
- Source, governed material, candidate, publication, and readback identities are
  recorded separately so a byte change cannot silently become a business change.

## Publication safety

- Writes are conditional and followed by exact readback.
- Ambiguous accepted writes settle through GET only.
- Protected and terminal outputs are immutable to automated repair.
- Equivalent material produces a no-op.
- Late evidence advances the same canonical output at most once.

## Release safety

- Successors are immutable and output-suppressed during shadow verification.
- Writer handoff is serialized; overlap fails the release.
- The exact predecessor remains available for rollback.
- A material successor regression triggers restoration rather than proof writes
  or forced output.
- Schema change ownership is separated from normal runtime startup.

## Public disclosure boundary

This portfolio publishes capability-level architecture, synthetic examples,
bounded engineering claims, and sanitized chronology. It excludes production
source, history, coordinates, tenant details, identities, secrets, ACLs,
customer or employee data, original documents, report templates, and private
evidence.

The public safety scan enforces this boundary against both the working tree and
Git history. One exact personal contact email is deliberately allowlisted; all
other email addresses and private-material markers fail closed.
