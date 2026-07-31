---
id: wheel-check
type: technique
purpose: Before building or refactoring, check whether an outside project, library, pattern, prompt, workflow, or agent already solves the problem better.
confidence: EXPERIMENTAL
version: "1.0"
tags: [research, assimilation, reverse-engineering, github, improvement]
compatible_with: [any-ai]
---

# Wheel Check

## Purpose

Avoid reinventing the wheel.

Before building a new solution or refactoring a weak one, search for external patterns that solve the same problem better.

## Use When

Use before:

- large refactor
- new feature
- new workflow
- new agent
- repeated bug fix
- custom infrastructure
- prompt/skill/system design

## Method

1. Define the problem precisely.
2. Search for existing projects or patterns.
3. Compare current approach vs external approach.
4. Extract the reusable method.
5. Reject copying.
6. Decide:

```text
adopt library
reverse-engineer pattern
create assimilation candidate
create research task
ignore
```

## Output Format

```markdown
## Problem

## Existing Approaches Found

## Better Pattern

## What to Assimilate

## What Not to Copy

## Next Action
```

## Allergy

Wheel Check refuses novelty bias, copy-paste engineering, and building custom systems before checking whether better public patterns exist.
