# Origin B03 — Coding / Repository Execution

Status: DONE / HOLD

Historical source mapping: the uploaded blueprint labels this coding-agent extraction as its next coding batch and names Cline, Aider, Repomix, Playwright, with an optional orchestration source. Its distilled principle is: **Task contract → context pack → dissent gate → plan → isolated diff → automated validation → independent review → approval-bound merge/deploy.**

## Source-derived requirements retained
- Every change has a task id, file scope, acceptance tests, validation, review, and rollback.
- Branch/worktree isolation; no direct main/production writes.
- Deny-by-default command execution and secret exclusion.
- Scope budgets and bounded repair/tool loops.
- Git diff/change set is the unit of work.
- Context pack is relevance-ranked and tied to base commit.
- UI changes require rendered browser verification and inspectable evidence.
- Merge/deploy/migration/external writes remain human-approved.

## Strengthenings
- Historical fictional quorum names are not treated as real practitioner participation. B03 uses sourced practitioner methods separately.
- Context and execution gates are deterministic Python/schema/policy checks rather than prompt-only promises.
- A UI screenshot is supporting evidence, never the sole pass criterion.
- Context pack explicitly blocks secrets/noise and handles code-vs-doc conflict.

## Verification
Local pre-commit validation: JSON/YAML parse + pytest for B03 runtime checks.
