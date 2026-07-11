# Agents of AI

**The open library of personas, agents, and workflows for any AI.**

> You don't need a new framework. You need the right cast.

---

## What This Is

Agents of AI is a community-driven library of reusable AI components. Not a governance framework. Not an agent runtime. Not another "awesome list" of links. It's the actual files — drop them into any AI system and they work.

Three layers, kept separate:

| Layer | What it is | Example |
|---|---|---|
| **Personas** | *Who* — a voice and reasoning signature. How someone thinks, writes, attacks a problem. | Raymond Reddington's strategic framing. A Bloomberg editor's compression style. |
| **Agents** | *How one operator works* — the method, the protocol, which personas it pulls. | An adversarial auditor that runs DA → SPAR → BENCH review ladders. |
| **Workflows** | *The plan* — a repeatable sequence of steps wrapping agents and personas. | A "deep research" pipeline: brainstorm → survey → verify → synthesize. |

**None of this is governance.** Governance belongs in your own system (like [CTRL-AI](https://github.com/MShneur/CTRL-AI) or [R-Duck](https://github.com/MShneur/R-Duck)). This library is what governance systems *load* — the cast, not the constitution.

## Why It Exists

Every "AI workflow" product is the same thing: a PRD wrapped around some personas with a plan. That's not a $97/month product. That's three markdown files.

Every custom GPT has a persona inside it. Most are never shared. The good ones stay locked in one person's ChatGPT account.

This library extracts them, makes them portable, and makes them free. Use them with ChatGPT, Claude, Gemini, DeepSeek, Grok, LLaMA, Mistral — anything that reads text.

## How to Use

### Quickest path
1. Browse `personas/`, `agents/`, or `workflows/`
2. Copy the file content
3. Paste it into your AI's system prompt, custom instructions, or project knowledge
4. Done

### As a reference in your own system
```
Load persona: personas/framesmith.md
Load agent: agents/auditor.md
```
Your governance framework handles the loading. This library just holds the files.

### In CTRL-AI or R-Duck
Both frameworks can reference this library. Personas and agents load on-demand through the composition engine. See each framework's documentation for integration details.

## Structure

```
Agents-of-AI/
├── personas/          # Voice + reasoning signatures
├── agents/            # Operational methods + protocols  
├── workflows/         # Repeatable step sequences
├── schema/            # Entry format specifications
├── MERGE-PROTOCOL.md  # When to merge vs split entries
├── CONTRIBUTING.md    # How to add yours
├── LICENSE            # MIT — use freely
└── README.md
```

## What's Here Now

### Personas (21)
- **Framesmith** — Strategic communication + adversarial resilience. Frame control, controlled disclosure, negotiation mode.
- **Wireframe** — Systems reasoning, formal logic, dependency mapping. Finds load-bearing assumptions.
- **Redline** — Adversarial analysis. Assumes hostile actors. Reports gaps, not reassurance.
- **Guardrail** — Governance and compliance. Flags silent overrides and undocumented exceptions.
- **Verdict** — Synthesis and final judgment. Speaks last, weighs evidence not authority.
- **Prover** — Chain-of-thought, formal proof, step-by-step verification.
- **Wargame** — Game theory, stakeholder mapping, second-order effects.
- **Friction** — Cognitive load, dark pattern detection, user journey optimization.
- **Burden** — Burden of proof, base rates, falsifiability.
- **Provenance** — Source evaluation, origin tracing, bias detection.
- **Raw Cut** — Anti-AI-slop design. Structural variety, honest copy, pre-emit self-critique.
- **Midwife** — Socratic teaching. Delivers understanding, never answers. Guides discovery.
- **Mirror** — AI honesty discipline. Catches false confidence, authority appeals, invented facts.
- **Signal** — Data → decisions. Statistical rigor, Simpson's paradox checks, actionable insight.
- **Gridlock** — Process optimization. Bottleneck hunting, root cause analysis, Lean/Six Sigma.
- **Briefcase** — IRAC-based legal reasoning. Contract analysis, compliance, litigation risk.
- **Pipeline** — Production ML systems. Model selection → training → inference → monitoring.
- **Megaphone** — Brand positioning, messaging architecture, reputation, GEO (AI discoverability).
- **Distiller** — Output compression. Banned phrases, banned structures, transformation examples. Strips slop without losing information.
- **Compass** — Product direction. Challenge framing, find the desperate user, scope to the narrowest wedge. Spec generation through 4-phase review gauntlet.
- **Ledger** — Financial analysis. Multi-lens opposing viewpoints, DCF + comps, scenario analysis, variant perception.
- *(more to come — and yours)*

### Agents (10)
- **Auditor** — Adversarial quality review. DA/SPAR/BENCH ladder + code review tier + ZMA audit.
- **Scribe** — Writing with structural control. Decision architecture, truth gates, persona integration.
- **Scout** — Evidence-grounded research. Source credibility tiers, Ghost Rider investigative mode.
- **Conductor** — Analysis and committee protocols (RAPID/EXTENDED). Facilitates multi-perspective decisions.
- **Showrunner** — Prime agent. Runs the project, composes agent+persona combinations. Doesn't do the work itself.
- **Tracker** — Systematic debugging by hypothesis. 7-step: reproduce → observe → hypothesize → test → localize → fix → explain.
- **Stresstest** — Adversarial verification. Tries to break implementations. Iron law: evidence before claims.
- **Archaeologist** — Codebase structural audit. 9-dimension sweep with file:line citations.
- **Chisel** — Safe refactoring. Fowler-catalog transforms with impact/risk scoring and rollback checkpoints.
- **Locksmith** — Security-first code review. OWASP Top 10 + STRIDE, daily/comprehensive audit modes, infrastructure-first scanning, trend tracking.

### Workflows (5)
- **Deep Dig** — 3-stage research: brainstorm → survey → verify. Evidence-tagged. Stops between stages.
- **Build Chain** — 6-step AI coding: scope → plan (hard gate) → checkpoint → implement → verify → review+merge.
- **Red Green** — TDD: failing test → minimal code → refactor. Iron law: no code without a failing test first.
- **Razor** — 7-rung YAGNI decision ladder. Stop at the first rung that holds. The best code is the code you never wrote. Three intensity levels.
- **Retro** — Sprint retrospective from git data, not memory. Measure → patterns → diagnose → one change for next cycle.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide. The short version:

1. **Fork and add.** One file per persona, agent, or workflow.
2. **Use the schema.** YAML frontmatter + markdown body. See `schema/` for the format.
3. **Tag your confidence.** Is this battle-tested or experimental?
4. **PR it.** Community contributions enter as `[COMMUNITY]` until reviewed.

### What makes a good contribution
- A persona you actually use that makes your AI output noticeably better
- An agent protocol you've refined through real usage
- A workflow that replaces something people currently pay for
- A named-person persona with the behavioral signature extracted (not just "act like X")

### What we don't want
- Governance rules (those belong in CTRL-AI or your own system)
- Prompt injection payloads disguised as personas
- Low-effort "You are a helpful X" one-liners
- Copies of other people's paid products

## Community

We're building a community around this. Places to connect:

- **GitHub Issues** — bug reports, feature requests, discussions
- **Pull Requests** — contribute your personas, agents, workflows
- *(Reddit community coming soon)*

## Philosophy

- **Agreement is not success.** The best personas include what they're *allergic to* — what they refuse to do.
- **Named people are references, not costumes.** "Reddington strategic" means we extracted the reasoning pattern. It doesn't mean the AI pretends to be a TV character.
- **Portable over powerful.** A persona that works in one AI and breaks in another is a bad persona. These should work everywhere.
- **Evidence tags matter.** `[VERIFIED]`, `[PRACTICE]`, `[SPECULATIVE]` — know what you're getting.
- **Community contributions don't touch governance.** You can add any persona, agent, or workflow. You cannot add axioms, gates, or override rules. That's a feature, not a limitation.

## Related Projects

- [CTRL-AI](https://github.com/MShneur/CTRL-AI) — Prompt governance framework (the constitution)
- [R-Duck](https://github.com/MShneur/R-Duck) — Producer-grade AI operating layer (the production system)

Both consume this library. Neither is required to use it.

## License

MIT. Use freely. Attribute if you want. Contribute back if you can.
