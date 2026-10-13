---
id: human-gate-committee
type: compatibility-alias
canonical: workflows/quorum.md
purpose: Preserve the historical Human Gate Committee path while routing all behavior to canonical Quorum.
version: "2.0"
tags: [compatibility, human-gate, quorum]
compatible_with: [any-ai]
---

# Human Gate Committee — Compatibility Alias

**Canonical workflow:** [Quorum](quorum.md)

This path remains so old links and project references do not break. It is **not a
separate composable workflow**.

- `human gate` means: run Quorum, set `HUMAN CHOICE = YES`, and stop before the
  consequential action.
- `quorum` means: run the same canonical Quorum assembly without automatically
  requiring a human stop unless project governance requires it.
- Seat sourcing, dissent, Spike, Trajectory Mode, evidence requirements and output
  all come from `workflows/quorum.md`.

Do not copy or fork committee logic back into this file.
