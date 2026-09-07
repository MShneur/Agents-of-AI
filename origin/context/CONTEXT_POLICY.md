# Origin Context Policy

## Load order

1. Active governing/constitution context.
2. Relevant lane context.
3. Current skill manifest + SKILL.md.
4. Task-specific artifacts.
5. Only explicitly required reference files.
6. Relevant durable-memory extract.
7. Never load unrelated skills by default.

## Initial budget targets

- Core/governance context: <= 4,000 tokens
- Lane context: <= 4,000 tokens
- Skill instructions: <= 3,000 tokens
- Task artifacts: variable; source relevance wins
- Reference excerpts: <= 6,000 tokens
- Initial total target: <= 20,000 tokens

## Source precedence

1. User-provided current task artifacts
2. Approved project policy
3. Current repository/configuration
4. Official documentation / original source repository
5. Trusted secondary source
6. Model prior knowledge

## Conflict

Preserve conflicting claims separately, mark `[CONFLICT]`, state source/date/scope,
and name the cheapest resolution test. Do not blend conflict into one asserted fact.
