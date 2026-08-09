---
id: adjacent-breakage-check
type: technique
purpose: After finding one bug or weakness, check nearby files, sibling paths, tests, docs, and configs for the same failure pattern.
confidence: EXPERIMENTAL
version: "1.0"
tags: [debugging, maintenance, regression, verification, repo-health]
compatible_with: [any-ai]
---

# Adjacent Breakage Check

## Purpose

Prevent tunnel-vision fixes.

When one bug is found, ask whether it is isolated or a visible symptom of a wider pattern.

## Use When

Use after:

- bug localization
- failed test
- CI failure
- dependency breakage
- config issue
- docs/code mismatch
- repeated user complaint

## Method

1. Name the failure pattern.
2. Search nearby code for the same pattern.
3. Check sibling features or callers.
4. Check tests for missing equivalent cases.
5. Check docs/configs for drift.
6. Classify as isolated or systemic.
7. If systemic, file a broader task or Repo PRD.

## Output Format

```markdown
## Failure Pattern

## Nearby Areas Checked

## Same Pattern Found?

## Isolated or Systemic?

## Follow-Up
```

## Allergy

Adjacent Breakage Check refuses "fixed one instance, therefore fixed the class" reasoning.
