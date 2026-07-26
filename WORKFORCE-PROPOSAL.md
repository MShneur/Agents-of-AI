# Proposal: Workforce Layer

## The Gap

Current AoA layers: **Personas**, **Agents**, **Workflows**, **Teams**.

**Missing:** Autonomous entities that spawn multiple specialists dynamically, allocate work per cycle, manage resources, and re-prioritize continuously.

- **Teams** = static, pre-composed roster with dissent rules (fixed seats)
- **Workforces** = adaptive orchestrators that delegate dynamically, evolve specialists per cycle

## Example: WhisperWorker

An autonomous maintenance harness running 15-minute heartbeat cycles:

1. **Audit** — Check infrastructure, code quality, resource constraints
2. **Evaluate** — Assess state against success metrics
3. **Pick ONE improvement area** from priority hierarchy:
   - A. Human-readable aesthetics (UI/UX, design, accessibility)
   - B. Full-stack harness functionality (orchestration, tools, integrations)
   - C. Free model monitoring & optimization (fallback chains, token usage)
   - D. Infrastructure & observability (logging, backups, monitoring)
   - E. Security & compliance (audits, secrets, headers)
4. **Spawn specialist** — Activate the right agent/persona for that area
5. **Delegate** — Execute work, verify, collect results
6. **Synthesize** — Log cycle summary, update state
7. **Sleep 15 minutes** → repeat

This is **one autonomous entity** managing multiple specialists dynamically, not a team of fixed contributors.

## Why It Matters

**Workforces solve a real operational pattern:**
- Long-running autonomous systems that need continuous improvement
- Resource-constrained environments (budget, compute, time)
- Adaptive prioritization based on constraints
- Clear escalation to humans for decisions

Current schema can't represent this: agents are single-operator methods, teams are static rosters.

## Proposal

Add a `workforce` layer to AoA:

```yaml
---
id: lowercase-name
type: workforce
purpose: Autonomous orchestrator that cycles through improvement priorities
mode_family: continuous-improvement | maintenance | orchestration
cycle_interval: 15m  # or 1h, 1d, etc
priority_hierarchy:
  - tier: aesthetics
    description: UI/UX, design, accessibility
  - tier: functionality
    description: Core features, integrations, protocols
  - tier: optimization
    description: Performance, cost, resource usage
  - tier: infrastructure
    description: Logging, monitoring, backups
  - tier: security
    description: Audits, secrets, compliance
escalation_triggers:
  - condition: Resource threshold exceeded
  - condition: Critical error detected
  - condition: Out-of-scope decision required
confidence: BATTLE-TESTED | PRACTICED | EXPERIMENTAL | COMMUNITY
version: "1.0"
---
```

## Implementation Notes

- Workforces operate continuously (unlike agents/personas which are task-specific)
- Each cycle is atomic: audit → pick → execute → verify → log
- Escalation is explicit (not silent failures)
- Resource constraints are first-class citizens
- Can be composed of existing personas/agents

## Reference

Full operational specification available upon request.

---

**This proposal is open to discussion.** Maintainers can accept, reject, or iterate on the schema. The goal is to identify a real gap in the current layer architecture.
