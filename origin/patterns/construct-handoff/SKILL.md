# construct-handoff

## Purpose
Create a typed handoff instead of silently expanding into another skill.

## Required input
- from_skill
- to_skill
- reason

## Required output
- handoff

## Rules
- Keep facts bounded to supplied evidence.
- Label missing support UNKNOWN.
- Do not silently invoke adjacent skills.
- Do not expose private chain-of-thought; return concise rationale and checks.
