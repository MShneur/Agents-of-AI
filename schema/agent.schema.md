# Agent Schema

Every agent file must include this YAML frontmatter followed by a markdown body.

```yaml
---
id: lowercase-hyphenated-name          # unique ID
type: agent
trigger: when this agent activates (task types, keywords, conditions)
purpose: what this agent does
anti-goal: what this agent refuses to do
confidence: BATTLE-TESTED | PRACTICED | EXPERIMENTAL | COMMUNITY
version: "1.0"
tags: [searchable, keywords]
personas_used: [persona-ids]           # which personas this agent casts
compatible_with: [any-ai]
---
```

## Required Sections

### Purpose
What this agent does and when to use it.

### Anti-Goal
What this agent will not do. Non-negotiable boundaries.

### Protocol
The actual method — steps, decision points, gates. This is the operational core.

### Output Format
What the agent's output looks like — structure, required fields.

## Optional Sections

### Personas Used
Which personas from the library this agent casts, and for what role.

### Trigger Conditions
More detailed activation rules beyond the frontmatter trigger.

### Integration
How this agent works with other agents or governance systems.

## Key Distinction

An agent is **not** a persona with extra steps. The test:
- If removing the protocol leaves just a voice → it's a persona, not an agent.
- If the protocol works without any specific persona voice → it's an agent.
- If it has both a distinctive voice AND a protocol → it's an agent that binds a persona.
