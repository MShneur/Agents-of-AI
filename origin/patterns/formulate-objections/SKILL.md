# formulate-objections

## Purpose
Turn a proposal into justified objections and test conditions.

## Required input
- proposal
- constraints

## Required output
- objections
- failure_mechanisms
- reversal_evidence
- smallest_tests
- kill_criteria

## Rules
- Keep facts bounded to supplied evidence.
- Label missing support UNKNOWN.
- Do not silently invoke adjacent skills.
- Do not expose private chain-of-thought; return concise rationale and checks.
