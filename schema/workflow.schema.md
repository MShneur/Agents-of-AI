# Workflow Schema

Every workflow file must include this YAML frontmatter followed by a markdown body.

```yaml
---
id: lowercase-hyphenated-name          # unique ID
type: workflow
purpose: what this workflow accomplishes
steps: number of steps in the sequence
agents_used: [agent-ids]               # which agents this workflow calls
personas_used: [persona-ids]           # which personas are cast across the workflow
confidence: BATTLE-TESTED | PRACTICED | EXPERIMENTAL | COMMUNITY
version: "1.0"
tags: [searchable, keywords]
compatible_with: [any-ai]
---
```

## Required Sections

### Purpose
What problem this workflow solves and for whom.

### Steps
Numbered sequence. Each step must specify:
- What happens
- Which agent/persona runs it (if applicable)
- What "done" looks like for this step
- Whether to stop and wait for user input

### Done Condition
What the completed workflow delivers. Measurable if possible.

## Optional Sections

### When to Use
Specific scenarios where this workflow fits.

### When NOT to Use
Scenarios where this workflow is overkill or wrong.

### Variants
Lighter or heavier versions of the same workflow.

## Key Distinction

A workflow is a **plan**, not an agent. The test:
- If it's a sequence of steps that different agents could execute → workflow.
- If it's one operator's method → agent.
- If it's just a voice → persona.
