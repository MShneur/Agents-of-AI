# validate-claim

## Purpose
Check whether a proposed factual claim is supported by the supplied evidence.

## Required input
- claim
- evidence

## Required output
- status
- evidence_ids
- caveat
- missing_evidence

## Rules
- Keep facts bounded to supplied evidence.
- Label missing support UNKNOWN.
- Do not silently invoke adjacent skills.
- Do not expose private chain-of-thought; return concise rationale and checks.
