# Agents of AI

**The open library of personas, agents, and workflows for any AI.**

> You don't need a new framework. You need the right cast.

---

## What This Is

Agents of AI is a community-driven library of reusable AI components. Not a governance framework. Not an agent runtime. Not another "awesome list" of links. It's the actual files — drop them into any AI system and they work.

Three layers, kept separate:

| Layer | What it is | Example |
|---|---|---|
| **Personas** | *Who* — a voice and reasoning signature. How someone thinks, writes, attacks a problem. | A master negotiator's strategic framing. A wire-service editor's compression style. |
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
├── personas/          # Voice + reasoning signatures (who)
├── agents/            # Operational methods + protocols (how)
├── workflows/         # Repeatable step sequences (the plan)
├── techniques/        # Small reusable reasoning moves (one move)
├── modes/             # Runtime stances for task classes (switched on/off)
├── teams/             # Pre-composed departments with built-in dissent
├── schema/            # Entry format specifications
├── MERGE-PROTOCOL.md  # When to merge vs split entries
├── NAMING-LEXICON.md  # How entries are named
├── CONTRIBUTING.md    # How to add yours
├── LICENSE            # MIT — use freely
└── README.md
```

### Four layers, kept separate

| Layer | What it is | The test |
|---|---|---|
| **Persona** | Voice + reasoning signature | Remove the protocol. Just a voice left? → persona |
| **Agent** | Operational method + protocol | Remove the voice. Protocol still works? → agent |
| **Workflow** | Repeatable step sequence | Could different agents run the steps? → workflow |
| **Technique** | Single reusable reasoning move | Not a voice, not a protocol, not a sequence — just one move? → technique |
| **Mode** | Runtime stance for a task class | A switchable configuration (defaults, interaction style, stopping rules)? → mode |
| **Team** | Pre-composed department of multiple entries | Multiple seats + rules for how they disagree? → team |

## What's Here Now

### Personas (23)
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
- **Scaffold** — Platform engineering. Declarative IaC, blast-radius thinking, paved roads over gates, environment parity, toil elimination.
- **Concierge** — Customer support. Emotion before mechanics, triage on arrival, escalation with full context, confirmed resolution.
- *(more to come — and yours)*

### Agents (12)
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
- **Firehose** — Live incident management. Stabilize → communicate → diagnose → resolve → learn. Mitigation ladder, fixed severity levels, blameless reviews.
- **Sieve** — Ranks any candidate pool against an explicit weighted rubric. Must-haves as disqualifiers, no black-box scores, ranks but doesn't decide.

### Workflows (8)
- **Deep Dig** — 3-stage research: brainstorm → survey → verify. Evidence-tagged. Stops between stages.
- **Build Chain** — 6-step AI coding: scope → plan (hard gate) → checkpoint → implement → verify → review+merge.
- **Red Green** — TDD: failing test → minimal code → refactor. Iron law: no code without a failing test first.
- **Razor** — 7-rung YAGNI decision ladder. Stop at the first rung that holds. The best code is the code you never wrote. Three intensity levels.
- **Retro** — Sprint retrospective from git data, not memory. Measure → patterns → diagnose → one change for next cycle.
- **PRD** — Convert vague idea to requirements doc. 8 steps: intent → success metrics → scope → user journeys → requirements → acceptance criteria → risks → handoff.
- **Root Cause** — Why a failure happened. Timelines, causal links, separate triggers from root causes, fixes with owners.
- **Issue to Patch** — Bug report to tested fix. Reproduce → localize → hypothesize → patch narrowly → test → summarize.

### Techniques (7)
- **Steelman** — Before critiquing, construct the strongest version of the argument. Critique the steelman, not the straw man.
- **Assumption Surface** — List every unstated assumption a plan depends on. Rank by how catastrophic failure would be if wrong.
- **Counterfactual** — "If X had NOT happened, would Y still have occurred?" Tests whether claimed causes are real.
- **Failure Premortem** — Assume the project already failed. Write the post-mortem. Adjust the plan.
- **RARV Cycle** — Reason → Act → Reflect → Verify. Every agent action passes through this loop. Blind review, no phase advancement without verification, memory accumulation.
- **Conflict Extraction** — When multiple perspectives analyze a problem, extract and structure their disagreements. Disagreements are the most valuable output.
- **Objection Loop** — Classify the objection, acknowledge genuinely, reframe, advance, probe for the real objection behind the stated one.

### Modes (4)
- **Inspect** — Review stance. Read-only, findings first, severity-ranked. Inspection ends where modification begins.
- **Forge** — Implementation stance. Execute the approved plan, small verified increments, no re-litigating settled decisions.
- **Probe** — Research stance. Uncertainty-first, contradictions preserved, breadth before depth, stops between stages.
- **Draft** — Writing stance. Structure locked before polish, revise in order: structure → evidence → compression → tone.

### Teams (6)
Departments, not soloists: multiple specialized seats with an interaction protocol that forces real dissent — independent takes, mandatory cross-examination, conflicts as structured output. Each seat argues from a named methodological lens, so disagreements are substantive, not stylistic.
- **Buildhouse** — Engineering. Five specialized seats (implementation, debugging, verification, security, structure) — never one generic coder.
- **The Lab** — Research. Four epistemic lenses (evidence, proof standards, source forensics, formal validity) required to disagree before converging.
- **Warroom** — Strategy & product. Conviction vs. competitive response vs. user reality vs. financial consequence, with mandatory premortem.
- **Pressroom** — Communications. Positioning → threat model → draft → compression, each later seat licensed to reject the earlier one's work.
- **Frontline** — Operations. Platform, incident command, process flow, and the affected human — one commander mid-incident, four accountabilities after.
- **Counsel** — Legal & risk. IRAC analysis vs. hostile reading vs. obligations vs. defensible drafting. Analysis, never advice.

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
- **Named inspirations are references, not costumes.** When an entry is inspired by a real practitioner or tradition, we extract the reasoning pattern — the AI never pretends to be that person.
- **Portable over powerful.** A persona that works in one AI and breaks in another is a bad persona. These should work everywhere.
- **Evidence tags matter.** `[VERIFIED]`, `[PRACTICE]`, `[SPECULATIVE]` — know what you're getting.
- **Community contributions don't touch governance.** You can add any persona, agent, or workflow. You cannot add axioms, gates, or override rules. That's a feature, not a limitation.

## Related Projects

- [CTRL-AI](https://github.com/MShneur/CTRL-AI) — Prompt governance framework (the constitution)
- [R-Duck](https://github.com/MShneur/R-Duck) — Producer-grade AI operating layer (the production system)

Both consume this library. Neither is required to use it.

## License

MIT. Use freely. Attribute if you want. Contribute back if you can.
