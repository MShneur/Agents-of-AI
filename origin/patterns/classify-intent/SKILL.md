# classify-intent

## Purpose
Classify a request into a configured lane/skill without provider-brand dependence.

## Required input
- request
- routing_table

## Required output
- lane
- primary_skill
- secondary_skills
- model_alias

## Rules
- Keep facts bounded to supplied evidence.
- Label missing support UNKNOWN.
- Do not silently invoke adjacent skills.
- Do not expose private chain-of-thought; return concise rationale and checks.
