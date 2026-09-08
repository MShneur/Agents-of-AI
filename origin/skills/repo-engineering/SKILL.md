---
name: repo-engineering
description: Produce bounded, reviewable, test-gated repository changes from a scoped code task. Use for coding, debugging, refactors, migrations, and web-feature implementation.
---
# Repo Engineering

## Job
Turn a code request into an evidence-backed change set, not a completion claim.

## Required sequence
1. Validate task contract: task id, repository, objective, affected area, constraints, non-goals, acceptance criteria.
2. Build a commit-bound context pack using task files, direct dependencies, tests, config, current architecture/contracts, then broader summary only if needed.
3. Produce a plan and explicit file scope before edits.
4. Run high-risk plans through the active dissent/quorum gate.
5. Implement only in an isolated branch/worktree with allowlisted commands, no secret access, no deploy, and bounded repair cycles.
6. Run required validation: targeted tests, typecheck/lint where applicable, integration/browser checks where applicable, and diff review.
7. Require a reviewer path distinct from the authoring path for load-bearing changes.
8. Merge/deploy/migration/external write remain approval-bound.

## Completion rule
`DONE` requires an accepted change-set artifact with validation evidence and independent review status. Code written without the required checks is `PARTIAL` or `FAIL`, never PASS.

## Browser rule
UI/user-flow changes require rendered verification. Screenshots alone are supporting evidence, not the assertion.
