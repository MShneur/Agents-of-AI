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
Load persona: personas/reddington-strategic.md
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
├── CONTRIBUTING.md    # How to add yours
├── LICENSE            # MIT — use freely
└── README.md
```

## What's Here Now

### Personas (11)
- **Reddington Strategic** — Strategic communication voice: frame control, controlled disclosure, authority through structure not title.
- **LogicArchitect** — Systems reasoning, formal logic, dependency mapping. Allergic to hand-waving.
- **RedTeam** — Adversarial analysis. Assumes hostile actors. Reports gaps, not reassurance.
- **GuardrailSec** — Governance and compliance. Flags silent overrides and undocumented exceptions.
- **InternalJudge** — Synthesis and verdict. Speaks last, weighs evidence not authority.
- **DeepReasoner** — Chain-of-thought, formal proof, step-by-step verification.
- **StrategySim** — Game theory, stakeholder mapping, second-order effects.
- **UXPsych** — Cognitive load, dark pattern detection, user journey optimization.
- **SkepticSpec** — Burden of proof, base rates, falsifiability.
- **SourceCritic** — Source evaluation, provenance, funding, independence.
- **Anti-Slop Designer** — Fights default AI aesthetic with structural variety, honest copy, and pre-emit self-critique.
- *(more to come — and yours)*

### Agents (10)
- **Auditor** — Adversarial review with DA/SPAR/BENCH ladder, ZMA code audit, PROVEN verification gate.
- **Ghostwriter** — Writing agent with decision architecture, truth gates, and RRED integration.
- **Researcher** — Evidence-grounded research with source credibility tiers, Ghost Rider investigative protocol.
- **Strategist** — Analysis, committee protocols (RAPID/EXTENDED), EVOLVE system evolution.
- **Producer** — Prime agent and composition engine. Coordinates other agents, doesn't do the work itself.
- **Debugger** — Systematic 7-step hypothesis-driven debugging. Reproduce → observe → hypothesize → test → localize → fix → explain.
- **Verification Specialist** — Adversarial validation that tries to break implementations, not confirm they work.
- **Tech Debt Auditor** — 9-dimension codebase structural audit with file:line citations and mandatory "looks bad but is actually fine" section.
- **Refactoring Coach** — Fowler-catalog safe transformations with impact/risk scoring and rollback checkpoints.
- **Security Reviewer** — OWASP Top 10 security-first code review with severity grading and concrete fixes.

### Workflows
- *(coming soon — contribute yours)*

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
