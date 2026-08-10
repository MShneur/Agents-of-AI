# Agents of AI

**The open library of personas, agents, workflows, techniques, modes, and teams for any AI.**

> You don't need a new framework. You need the right cast.

---

## What This Is

Agents of AI is a community-driven library of reusable AI components. Not a governance framework. Not an agent runtime. Not another "awesome list" of links. It's the actual files — drop them into any AI system and they work.

Seven layers, kept separate:

| Layer | What it is | Example |
|---|---|---|
| **Personas** | *Who* — a voice and reasoning signature. How someone thinks, writes, attacks a problem. | A master negotiator's strategic framing. |
| **Agents** | *How one operator works* — the method, the protocol, which personas it pulls. | An adversarial auditor that runs review ladders. |
| **Workflows** | *The plan* — a repeatable sequence of steps wrapping agents and personas. | A deep research pipeline: brainstorm → survey → verify → synthesize. |
| **Techniques** | *One reusable move* — a reasoning move that can plug into any persona, agent, workflow, mode, or team. | Steelman the strongest version before critiquing. |
| **Modes** | *Runtime stance* — switchable defaults for a class of task. | Inspect mode: read-only, findings first, severity-ranked. |
| **Teams** | *Pre-composed departments* — multiple seats with a disagreement protocol. | Buildhouse: implementation, debugging, verification, security, and structure seats. |
| **Failures** | *What goes wrong* — a named failure mode with the signal that reveals it and the fix that closes it. | Silent completion: the step failed, the run continued, the report is confident. |

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
```text
Load persona: personas/framesmith.md
Load agent: agents/auditor.md
```
Your governance framework handles the loading. This library just holds the files.

### In CTRL-AI or R-Duck
Both frameworks can reference this library. Personas and agents load on-demand through the composition engine. See each framework's documentation for integration details.

## Structure

```text
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

### Seven layers, kept separate

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

### Agents (13)
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
- **Repo Nanny** — Repository ecosystem maintenance. Sweeps issues, PRs, checks, stale work, adjacent breakage, and external patterns before choosing fix-or-file action.
- **Firehose** — Live incident management. Stabilize → communicate → diagnose → resolve → learn. Mitigation ladder, fixed severity levels, blameless reviews.
- **Sieve** — Ranks any candidate pool against an explicit weighted rubric. Must-haves as disqualifiers, no black-box scores, ranks but doesn't decide.

### Workflows (12)
- **Deep Dig** — 3-stage research: brainstorm → survey → verify. Evidence-tagged. Stops between stages.
- **Build Chain** — 6-step AI coding: scope → plan (hard gate) → checkpoint → implement → verify → review+merge.
- **Red Green** — TDD: failing test → minimal code → refactor. Iron law: no code without a failing test first.
- **Razor** — 7-rung YAGNI decision ladder. Stop at the first rung that holds. The best code is the code you never wrote. Three intensity levels.
- **Retro** — Sprint retrospective from git data, not memory. Measure → patterns → diagnose → one change for next cycle.
- **PRD** — Convert vague idea to requirements doc. 8 steps: intent → success metrics → scope → user journeys → requirements → acceptance criteria → risks → handoff.
- **Root Cause** — Why a failure happened. Timelines, causal links, separate triggers from root causes, fixes with owners.
- **Issue to Patch** — Bug report to tested fix. Reproduce → localize → hypothesize → patch narrowly → test → summarize.
- **Second Room** — Independent multi-chat review for important public work. Qualifier, truth, and human-voice rooms review the same frozen draft before reconciliation and human release.
- **Nursery Sweep** — Full repository maintenance pass. Collects repo signals, ranks risks, checks adjacent breakage, runs Wheel Check, and routes each finding.
- **Repo PRD** — Converts broad repo findings into agent-ready work packets with problem, evidence, scope, acceptance checks, and routing.
- **Human Gate Committee** — Named multi-perspective decision review. Uses two distinct domain methods, an operator, an adversarial reviewer when warranted, and a target-user representative; forces a consensus challenge before a consequential human gate.

### Techniques (16)
- **Steelman** — Before critiquing, construct the strongest version of the argument. Critique the steelman, not the straw man.
- **Assumption Surface** — List every unstated assumption a plan depends on. Rank by how catastrophic failure would be if wrong.
- **Counterfactual** — "If X had NOT happened, would Y still have occurred?" Tests whether claimed causes are real.
- **Failure Premortem** — Assume the project already failed. Write the post-mortem. Adjust the plan.
- **RARV Cycle** — Reason → Act → Reflect → Verify. Every agent action passes through this loop. Blind review, no phase advancement without verification, memory accumulation.
- **Conflict Extraction** — When multiple perspectives analyze a problem, extract and structure their disagreements. Disagreements are the most valuable output.
- **Objection Loop** — Classify the objection, acknowledge genuinely, reframe, advance, probe for the real objection behind the stated one.
- **Adjacent Breakage Check** — After one bug or weakness is found, check sibling files, adjacent paths, docs, tests, and configs for the same failure pattern.
- **Wheel Check** — Before building or refactoring, check whether an outside project, library, pattern, prompt, workflow, or agent already solves the problem better.
- **Single Dispatch Operator** — One chief operator, bounded specialists, ownership checks, and explicit handoffs. Rejects recursive manager sprawl and competing writers.
- **Error Decorrelation** — A check only counts if the checker differs from the author on a named axis: different engine, framing, evidence, direction, or stake. A reviewer sharing the author's blind spot returns confidence, not evidence.
- **Judge Rubric** — Score against the brief slot by slot — goal faithfulness, constraint compliance, evidence use, output shape, unsupported claims. Catches fluent-and-wrong, the failure mode that reads best.
- **Observation Masking** — Declare a context budget first, then mark each observation live, resolved, or dead. Collapse resolved to one line, drop dead entirely. Prune the working set instead of accumulating it.
- **Retrieval Precision Gate** — Retrieval over-collects by default. Score each item load-bearing, corroborating, or ambient; drop ambient before synthesis; name what is missing.
- **Skill Provenance** — Treat any third-party instruction file as untrusted executable input. Read before load, check for instruction smuggling, inventory the reach, trace the origin, load narrow, re-gate on every update.
- **Symbol Trace** — Fix a legend, then represent state, transitions, and dependencies as compact notation rather than sentences. The trace is the source of truth; the prose is the answer.

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

### Failures (6)
Named failure modes, not advice. Each entry is one way work goes wrong, with the signal that reveals it and the fix that closes it. Route to a failure entry when its signal fires; cite it by name in a post-mortem so incidents get a shared vocabulary instead of six guesses.

Each entry also carries a `failure_class` from a fixed eleven-value vocabulary — process, architecture, governance, scope, data, security, naming, drift, tooling, human_loop, other — so a library entry and a filed incident can be tagged with the same word. CI rejects any value outside it. The class says *where the failure lives*; the entry id says *which failure it is*.
- **Silent Completion** — a step failed or returned nothing, the run continued, and the report is confident with no artifact behind it. Assert on the artifact, never the claim.
- **Cycle Lock** — the same operation repeats with near-identical inputs and no progress while cost accrues. Define termination first; track a progress key; escalate past three repeats.
- **Premature Convergence** — a panel agrees fast, dissent thins, confidence rises while findings fall. Independence before exposure; no-dissent is a trigger, not a result.
- **Constraint Decay** — a rule stated at intake quietly stops being applied and nothing announces its departure. Keep constraints in a standing block, re-read not recalled; check non-goals explicitly.
- **Orthogonal Edit** — work touched what it was never asked to touch and buried the sanctioned change in an unreviewable diff. Declare the blast radius; record adjacent findings instead of performing them.
- **Authority Laundering** — a suggestion re-enters the record as a decision because compression dropped the speaker and the modality. Track provenance per claim; recommendations stay attributed across every summary.

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

## The AI Duct Tape Collection

The future showed up early and forgot the manual. Everything's brilliant, nothing's finished, and half of it forgets your name between Tuesday and Wednesday. These are the strips of duct tape — free, because the parts that hold your work together shouldn't cost a subscription.

They work on their own. Use one, or tape a few together:

- **[CTRL-FORGE](https://github.com/MShneur/ctrl-forge)** — Your AI forgot everything. Again. This is the repo that didn't.
- **[CTRL-AI](https://github.com/MShneur/CTRL-AI)** — Teaches your AI to say "I'm not sure" instead of confidently inventing a citation.
- **[R-Duck](https://github.com/MShneur/R-Duck)** — Autopilot. You mumble an idea, it hands back a plan with a straight face.
- **[Agents of AI](https://github.com/MShneur/Agents-of-AI)** *(this repo)* — A cast of specialists. No coffee, no PTO, no LinkedIn updates.
- **[Ghost in the Loop](https://github.com/MShneur/ghost-in-the-loop)** — Moves work between AIs without dropping it down the stairs. Full chat export, handoffs.

Each keeps its own license — don't assume they match.

## License

MIT. Use freely. Attribute if you want. Contribute back if you can.
