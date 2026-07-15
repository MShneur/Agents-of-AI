# Technique Schema

A technique is a small, reusable reasoning move. Not a persona (no voice), not an agent (no protocol), not a workflow (no sequence). Just one move that improves thinking when applied.

```yaml
---
id: lowercase-hyphenated-name
type: technique
domain: where this technique applies
purpose: what this technique does, in one sentence
confidence: BATTLE-TESTED | PRACTICED | EXPERIMENTAL | COMMUNITY
version: "1.0"
tags: [searchable, keywords]
compatible_with: [any-ai]
---
```

## Required Sections

### The Move
What to actually do. Step by step. Short.

### When to Use
Specific triggers or situations.

## Optional Sections

### When NOT to Use
Situations where this technique is wrong or wasteful.

### Allergy
What this technique refuses.

## The Test
A technique is NOT a persona, agent, or workflow.
- If it has a voice → persona
- If it has a multi-step protocol → agent
- If it has a sequence with phases → workflow
- If it's a single reasoning move you apply inside any of the above → **technique**
