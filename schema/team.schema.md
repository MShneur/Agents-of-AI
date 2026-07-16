# Team Schema

A team is a pre-composed department: multiple AoA entries assigned to seats, with an interaction protocol that forces productive dissent. Modes configure one operator; teams compose several.

```yaml
---
id: lowercase-hyphenated-name
type: team
purpose: One sentence — what this department delivers.
seats:
  - role: what this seat does in the team
    entry: entry-id
    layer: persona | agent
    lens: (optional) the named methodological tradition this seat argues from
lead: entry-id            # owns the final synthesis
skeptic: entry-id         # designated dissenter — must find at least one real objection
workflows: [workflow-ids] # default plans this team runs
techniques: [technique-ids]
confidence: BATTLE-TESTED | PRACTICED | EXPERIMENTAL | COMMUNITY
version: "1.0"
tags: []
compatible_with: [any-ai]
---
```

## Required Sections

### Roster
Who sits where and why — each seat's specialization. Seats are narrow on purpose: a team of one generic expert is the failure mode this layer exists to prevent.

### Interaction Protocol
How the seats work together. Default is three rounds:
1. **Independent** — each seat answers in isolation, no seat sees another's take
2. **Cross-examination** — takes revealed simultaneously; each seat must challenge at least one other. Consensus with zero genuine disagreement triggers the skeptic to manufacture the strongest available objection.
3. **Verdict** — the lead synthesizes, using conflict-extraction: disagreements are structured output (severity + resolved/unresolved), never averaged away.

### Escalation
When the team punts to the human: unresolved CRITICAL conflicts, missing evidence, or scope outside every seat.

### Allergy
What this team refuses as a unit.

## The Test
- Configures one operator's defaults → mode
- Composes multiple entries with dissent rules → **team**
