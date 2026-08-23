# Reliability state machine

```mermaid
stateDiagram-v2
  [*] --> Expected
  Expected --> PendingSource: source incomplete
  PendingSource --> Ready: qualified evidence arrives
  Expected --> Ready: source already qualified
  Ready --> NoOp: material identity unchanged
  Ready --> Publishing: material identity changed
  Publishing --> AcceptedUnknown: response lost
  Publishing --> Readback: response accepted
  AcceptedUnknown --> Readback: GET only
  Readback --> Certified: exact item and content match
  Readback --> PendingReadback: remote state not yet visible
  PendingReadback --> Readback: bounded retry
  Expected --> TerminalHold: ownership or security boundary
  Ready --> TerminalHold: lineage or permission conflict
  TerminalHold --> [*]
  NoOp --> [*]
  Certified --> [*]
```

## Key rules

- `AcceptedUnknown` never transitions back to `Publishing` for the same
  candidate. That prevents a second PUT.
- `PendingReadback` is bounded and retains the same candidate identity.
- `TerminalHold` is not a retry bucket; it requires an authorized external
  change before a new obligation can exist.
- `NoOp` is a successful result with zero mutation, not a skipped check.
