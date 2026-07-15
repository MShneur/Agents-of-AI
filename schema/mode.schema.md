# Mode Schema

A mode is a temporary operating configuration — a runtime stance for a class of work. It combines defaults (persona, agent, tool expectations, interaction style, planning depth) into one switchable state.

A mode is not the other layers:
- Persona = reasoning signature (permanent voice)
- Agent = operational method (invoked protocol)
- Workflow = sequence (ordered plan)
- Technique = single reasoning move
- **Mode = runtime stance for a task class (switched on/off)**

```yaml
---
id: lowercase-hyphenated-name
type: mode
purpose: One sentence — when to activate this mode.
mode_family: planning | implementation | review | debugging | research | writing | release | support
default_persona: persona-id
default_agents: [agent-ids]
default_techniques: [technique-ids]
interaction_style: concise | collaborative | autonomous | stepwise | review-first
planning_depth: low | medium | high
confidence: BATTLE-TESTED | PRACTICED | EXPERIMENTAL | COMMUNITY
version: "1.0"
tags: []
compatible_with: [any-ai]
---
```

## Required Sections

### Activate When / Deactivate When
Specific triggers for entering and leaving the mode.

### Operating Stance
The behavioral posture while the mode is active.

### Default Stack
Which persona/agent/technique the mode loads by default.

### Completion Criteria
What "done" looks like in this mode.

### Allergy
What this mode refuses.

## The Test
If it's only a renamed persona, it fails. A real mode changes *configuration* (defaults, tool expectations, interaction pattern, stopping rules), not just voice.
