# Generalized architecture

This diagram intentionally uses broad component names. It does not reproduce
private resource names, accounts, paths, or network topology.

```mermaid
flowchart TB
  subgraph Sources
    A[Document inputs]
    B[Structured submissions]
    C[Late supporting evidence]
  end

  subgraph Data_plane[Data plane]
    D[Immutable intake]
    E[Normalized facts]
    F[Governed metrics]
  end

  subgraph Reliability_plane[Reliability plane]
    G[Expected-output ledger]
    H[Material identity]
    I[Bounded repair]
    J[Writer lease]
  end

  subgraph Product_plane[Product plane]
    K[Deterministic workbook]
    L[Semantic and presentation certification]
    M[Conditional same-item publication]
    N[Exact GET readback]
  end

  A --> D
  B --> D
  C --> D
  D --> E --> F
  F --> G
  F --> H
  G --> I
  H --> K
  I --> K
  J --> M
  K --> L --> M --> N
  N --> G
```

## Control loop

```mermaid
flowchart LR
  A[Observe expected outputs] --> B{Satisfied?}
  B -- Yes --> C[Record healthy no-op]
  B -- No --> D{Recoverable?}
  D -- No --> E[Preserve terminal hold]
  D -- Yes --> F[Prepare deterministic candidate]
  F --> G{Materially new?}
  G -- No --> C
  G -- Yes --> H[Conditional write]
  H --> I[Exact GET readback]
  I -- Match --> J[Certify and close]
  I -- Pending --> A
  I -- Conflict --> E
```

## Safety boundaries

- The data plane cannot publish directly.
- The renderer cannot invent missing facts.
- Repair cannot bypass the writer lease or terminal holds.
- An ambiguous accepted write can be resolved only by readback.
- A successor cannot overlap the active publisher.
