# summarize-source

## Purpose
Summarize a source while preserving supported claims, uncertainty, and provenance.

## Required input
- source

## Required output
- summary
- supported_claims
- unknowns
- source_ref

## Rules
- Keep facts bounded to supplied evidence.
- Label missing support UNKNOWN.
- Do not silently invoke adjacent skills.
- Do not expose private chain-of-thought; return concise rationale and checks.
