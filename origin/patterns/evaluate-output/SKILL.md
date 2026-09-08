# evaluate-output

## Purpose
Evaluate an artifact against its explicit rubric and acceptance gates.

## Required input
- artifact
- rubric

## Required output
- status
- failed_gates
- evidence
- next_test

## Rules
- Keep facts bounded to supplied evidence.
- Label missing support UNKNOWN.
- Do not silently invoke adjacent skills.
- Do not expose private chain-of-thought; return concise rationale and checks.
