# Agents of AI

**The open library of personas, agents, workflows, techniques, modes, teams, and failures for any AI.**

> You don't need a new framework. You need the right cast.

**Current public snapshot:** `2026.08.21` · **85 composable entries** across seven layers · actively maintained supporting tools/API shelf.  
See [`VERSIONING.md`](VERSIONING.md) for snapshot rules and [`CHANGELOG.md`](CHANGELOG.md) for material changes.

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

The repo also has a **supporting tools shelf** for public software recommendations, APIs, free/student capability notes, setup walkthroughs, and reusable infrastructure patterns. It is not an eighth composable layer. Start at [`TOOLS.md`](TOOLS.md) or [`tools/README.md`](tools/README.md).

## Why It Exists

Every "AI workflow" product is the same thing: a PRD wrapped around some personas with a plan. That's not a $97/month product. That's three markdown files.

Every custom GPT has a persona inside it. Most are never shared. The good ones stay locked in one person's ChatGPT account.

This library extracts them, makes them portable, and makes them free. Use them with ChatGPT, Claude, Gemini, DeepSeek, Grok, LLaMA, Mistral — anything that reads text.

## How to Use

### Quickest path
1. Browse `personas/`, `agents/`, `workflows/`, or another layer.
2. Copy the file content.
3. Paste it into your AI's system prompt, custom instructions, or project knowledge.
4. Done.

### As a reference in your own system
```text
Load persona: personas/framesmith.md
Load agent: agents/auditor.md
```
Your governance framework handles the loading. This library just holds the files.

### For software, APIs, or setup help

- [`tools/software-recommendations.md`](tools/software-recommendations.md) — curated software by real use case.
- [`tools/api-catalog.md`](tools/api-catalog.md) — APIs, MCP, webhooks, event streams, and integrations.
- [`tools/free-tool-ledger.md`](tools/free-tool-ledger.md) — public free/student quotas and caveats.
- **[Control Walkthrough](https://github.com/MShneur/Ctrl-Walkthrough)** — standalone novice-first setup automation; the old [`tools/ctrl-walkthrough/`](tools/ctrl-walkthrough/) folder remains as a migration bridge for existing installs.

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
├── failures/          # Named failure modes, signals, and closing fixes
├── tools/             # Public software/API/setup supporting shelf
├── schema/            # Entry format specifications
├── TOOLS.md           # Tools shelf router
├── CHANGELOG.md       # Material public changes
├── VERSIONING.md      # Snapshot + component version rules
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
| **Failure** | Named way work goes wrong | Does it identify the failure signal and the fix that closes it? → failure |

## What's Here Now

### Personas (23)
- **Framesmith** — Strategic communication + adversarial resilience. Frame control, controlled disclosure, negotiation mode.
- **Wireframe** — Systems reasoning, formal logic, dependency mapping. Finds load-bearing assumptions.
- **Redline** — Adversarial analysis. Assumes hostile actors. Reports gaps, not reassurance.
- **Guardrail** — Governance and compliance. Flags silent overrides and undocumented exceptions.
- **Verdict** — Synthesis and final judgment. Speaks last, weighs evidence not authority.
- **Prover** — Formal proof and step-by-step verification.
- **Wargame** — Game theory, stakeholder mapping, second-order effects.
- **Friction** — Cognitive load, dark pattern detection, user journey optimization.
- **Burden** — Burden of proof, base rates, falsifiability.
- **Provenance** — Source evaluation, origin tracing, bias detection.
- **Raw Cut** — Anti-AI-slop design. Structural variety, honest copy, pre-emit self-critique.
- **Midwife** — Socratic teaching. Delivers understanding, never shortcuts discovery.
- **Mirror** — AI honesty discipline. Catches false confidence, authority appeals, invented facts.
- **Signal** — Data → decisions. Statistical rigor, Simpson's paradox checks, actionable insight.
- **Gridlock** — Process optimization. Bottleneck hunting, root cause analysis, Lean/Six Sigma.
- **Briefcase** — IRAC-based legal reasoning. Contract analysis, compliance, litigation risk.
- **Pipeline** — Production ML systems. Model selection → training → inference → monitoring.
- **Megaphone** — Brand positioning, messaging architecture, reputation, GEO (AI discoverability).
- **Distiller** — Output compression. Strips slop without losing information.
- **Compass** — Product direction. Challenge framing, find the desperate user, scope to the narrowest wedge.
- **Ledger** — Financial analysis. Multi-lens opposing viewpoints, DCF + comps, scenario analysis, variant perception.
- **Scaffold** — Platform engineering. Declarative IaC, blast-radius thinking, paved roads over gates, environment parity, toil elimination.
- **Concierge** — Customer support. Emotion before mechanics, triage on arrival, escalation with full context, confirmed resolution.

### Agents (13)
- **Auditor** — Adversarial quality review. DA/SPAR/BENCH ladder + code review tier + ZMA audit.
- **Scribe** — Writing with structural control. Decision architecture, truth gates, persona integration.
- **Scout** — Evidence-grounded research. Source credibility tiers, Ghost Rider investigative mode.
- **Conductor** — Analysis and committee protocols (RAPID/EXTENDED). Facilitates multi-perspective decisions.
- **Showrunner** — Prime agent. Runs the project, composes agent+persona combinations. Doesn't do the work itself.
- **Tracker** — Systematic debugging by hypothesis. Reproduce → observe → hypothesize → test → localize → fix → explain.
- **Stresstest** — Adversarial verification. Tries to break implementations. Evidence before claims.
- **Archaeologist** — Codebase structural audit with file:line evidence.
- **Chisel** — Safe refactoring with impact/risk scoring and rollback checkpoints.
- **Locksmith** — Security-first code review using threat-model and vulnerability frameworks.
- **Repo Nanny** — Repository ecosystem maintenance. Sweeps issues, PRs, checks, stale work, adjacent breakage, and external patterns before choosing fix-or-file action.
- **Firehose** — Live incident management. Stabilize → communicate → diagnose → resolve → learn.
- **Sieve** — Ranks any candidate pool against an explicit weighted rubric. Must-haves as disqualifiers, no black-box scores, ranks but doesn't decide.

### Workflows (16)
- **Deep Dig** — 3-stage research: brainstorm → survey → verify. Evidence-tagged. Stops between stages.
- **Build Chain** — 6-step AI coding: scope → plan → checkpoint → implement → verify → review+merge.
- **Red Green** — TDD: failing test → minimal code → refactor.
- **Razor** — 7-rung YAGNI decision ladder. Stop at the first rung that holds.
- **Retro** — Sprint retrospective from git data, not memory.
- **PRD** — Convert vague idea to requirements doc with scope, journeys, acceptance criteria, and handoff.
- **Root Cause** — Failure analysis that separates triggers from root causes.
- **Issue to Patch** — Bug report to tested fix: reproduce → localize → hypothesize → patch narrowly → test → summarize.
- **Second Room** — Independent multi-chat review for important public work before reconciliation and human release.
- **Nursery Sweep** — Full repository maintenance pass with adjacent-breakage and external-pattern checks.
- **Repo PRD** — Converts broad repo findings into agent-ready work packets with evidence, scope, acceptance checks, and routing.
- **Human Gate Committee** — Named multi-perspective decision review with forced consensus challenge before consequential gates.
- **Cleanerz** — Meta-workflow that fires when work is looping: stop, salvage, kill, re-scope, hand back one page and one decision.
- **Quorum** — Expert assembly protocol with weighted seats, real documented practitioners, role rotation, dissent, and objection closure.
- **Large Artifact Handoff** — Provider-neutral pattern for moving large binary artifacts through file/object lanes instead of stuffing them into AI context windows.
- **New AI Workspace Bootstrap** — Rebuild a capable AI workspace using portable public tools/connectors without repeating old setup mistakes.

### Techniques (17)
- **Steelman** — Before critiquing, construct the strongest version of the argument.
- **Assumption Surface** — List unstated assumptions and rank by failure severity.
- **Counterfactual** — Ask whether Y would still occur if X had not happened.
- **Failure Premortem** — Assume the project already failed; write the post-mortem and adjust the plan.
- **RARV Cycle** — Reason → Act → Reflect → Verify.
- **Conflict Extraction** — Extract and structure disagreements as first-class output.
- **Objection Loop** — Classify, acknowledge, reframe, advance, and probe objections.
- **Adjacent Breakage Check** — After one weakness is found, inspect siblings and adjacent paths for the same pattern.
- **Wheel Check** — Before building, check whether an outside project or pattern already solves the problem better.
- **Single Dispatch Operator** — One chief operator, bounded specialists, ownership checks, explicit handoffs.
- **Error Decorrelation** — A check counts only if the checker differs from the author on a named axis.
- **Judge Rubric** — Score output against the brief slot-by-slot instead of rewarding fluency.
- **Observation Masking** — Keep a bounded working set by collapsing resolved observations and dropping dead ones.
- **Retrieval Precision Gate** — Keep load-bearing/corroborating evidence; drop ambient retrieval before synthesis.
- **Skill Provenance** — Treat third-party instruction files as untrusted executable input until inspected.
- **Symbol Trace** — Represent state, transitions, and dependencies in compact notation before prose.
- **Controlled Vocabulary** — One approved word per concept, one instruction per sentence, enforced mechanically.

### Modes (4)
- **Inspect** — Review stance. Read-only, findings first, severity-ranked.
- **Forge** — Implementation stance. Execute an approved plan in small verified increments.
- **Probe** — Research stance. Uncertainty-first, contradictions preserved, breadth before depth.
- **Draft** — Writing stance. Structure locked before polish; revise structure → evidence → compression → tone.

### Teams (6)
Departments, not soloists: multiple specialized seats with an interaction protocol that forces real dissent.
- **Buildhouse** — Engineering: implementation, debugging, verification, security, structure.
- **The Lab** — Research: evidence, proof standards, source forensics, formal validity.
- **Warroom** — Strategy & product: conviction, competitive response, user reality, financial consequence.
- **Pressroom** — Communications: positioning → threat model → draft → compression.
- **Frontline** — Operations: platform, incident command, process flow, affected human.
- **Counsel** — Legal & risk: IRAC analysis, hostile reading, obligations, defensible drafting.

### Failures (6)
Named failure modes, not advice. Each entry identifies one way work goes wrong, the signal that reveals it, and the fix that closes it.
- **Silent Completion** — a step failed or returned nothing, the run continued, and the report is confident with no artifact behind it.
- **Cycle Lock** — the same operation repeats with near-identical inputs and no progress while cost accrues.
- **Premature Convergence** — a panel agrees fast, dissent thins, confidence rises while findings fall.
- **Constraint Decay** — a rule stated at intake quietly stops being applied and nothing announces its departure.
- **Orthogonal Edit** — work touched what it was never asked to touch and buried the sanctioned change in an unreviewable diff.
- **Authority Laundering** — a suggestion re-enters the record as a decision because compression dropped the speaker and modality.

## Tools, APIs & Setup Walkthroughs

The supporting tools shelf is meant to be **visibly current** rather than a one-time list:

- [`tools/README.md`](tools/README.md) — tools landing page + contribution/freshness rules.
- [`tools/software-recommendations.md`](tools/software-recommendations.md) — recommended software by job.
- [`tools/api-catalog.md`](tools/api-catalog.md) — API/MCP/webhook/event-stream catalog.
- [`tools/free-tool-ledger.md`](tools/free-tool-ledger.md) — verified free/student capability notes.
- **[Control Walkthrough](https://github.com/MShneur/Ctrl-Walkthrough)** — standalone public setup runner and walkthrough library; [`tools/ctrl-walkthrough/`](tools/ctrl-walkthrough/) is the compatibility/migration bridge.
- [`tools/CHANGELOG.md`](tools/CHANGELOG.md) — fast-moving tool/API/walkthrough history.

Control Walkthrough currently includes public guides for **Termius, Cloudflare Workers Free, F5Bot, Zyte, and Firecrawl → ChatGPT**, plus local/custom/private handoff support.

### Recommend something new

Use the GitHub **Tool or API recommendation** issue template or open a PR. Include the official source, what problem the tool solves, its API/integration surface if relevant, and a verification date for time-sensitive free/student/quota claims.

Never submit credentials, personal account state, private repositories/infrastructure, private endpoints, affiliate IDs, billing details, or instructions for bypassing access controls/provider terms.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full guide. The short version:

1. **Fork and add.** One file per composable entry, or contribute to the supporting tools shelf.
2. **Use the right shape.** Composable entries use `schema/`; tools use the formats in `TOOLS.md` and `tools/README.md`.
3. **Tag confidence / verify freshness.** Be honest about what is tested; date time-sensitive tool claims.
4. **Run drift checks.** When entries change, run `python3 scripts/sync-roster.py --check` locally when possible and update the curated README if needed.
5. **PR it.** Community contributions are reviewed before becoming trusted library content.

### What makes a good contribution
- A persona you actually use that makes your AI output noticeably better
- An agent protocol you've refined through real usage
- A workflow that replaces something people currently pay for
- A distinctive technique, mode, team, or failure pattern
- A software/API recommendation with official evidence and a clear use case
- A public-safe setup walkthrough that saves people from rediscovering the same provider UI path

### What we don't want
- Governance rules inside the seven composable layers (those belong in CTRL-AI or your own system)
- Prompt injection payloads disguised as personas
- Low-effort "You are a helpful X" one-liners
- Copies of other people's paid products
- Secrets, personal account state, private infrastructure, or stale/guessed quotas in public tooling docs

## Community

We're building a community around this. Places to connect:

- **GitHub Issues** — bug reports, feature requests, discussions, and tool/API recommendations
- **Pull Requests** — contribute library entries, tools documentation, APIs, and walkthroughs
- *(Reddit community coming soon)*

## Philosophy

- **Agreement is not success.** The best personas include what they're *allergic to* — what they refuse to do.
- **Named inspirations are references, not costumes.** Extract the reasoning pattern; the AI never pretends to be that person.
- **Portable over powerful.** A component that works in one AI and breaks in another is a poor library component.
- **Evidence tags matter.** `[VERIFIED]`, `[PRACTICE]`, `[SPECULATIVE]` — know what you're getting.
- **Current beats remembered.** Live files beat hand-maintained counts; current provider docs beat remembered quotas.
- **Community contributions don't smuggle governance or private state.** Public reusable components stay portable and safe to share.

## The AI Duct Tape Collection

The future showed up early and forgot the manual. Everything's brilliant, nothing's finished, and half of it forgets your name between Tuesday and Wednesday. These are the strips of duct tape — free, because the parts that hold your work together shouldn't cost a subscription.

They work on their own. Use one, or tape a few together:

- **[CTRL-FORGE](https://github.com/MShneur/ctrl-forge)** — Your AI forgot everything. Again. This is the repo that didn't.
- **[CTRL-AI](https://github.com/MShneur/CTRL-AI)** — Teaches your AI to say "I'm not sure" instead of confidently inventing a citation.
- **[R-Duck](https://github.com/MShneur/R-Duck)** — Autopilot. You mumble an idea, it hands back a plan with a straight face.
- **[Agents of AI](https://github.com/MShneur/Agents-of-AI)** *(this repo)* — A cast of specialists. No coffee, no PTO, no LinkedIn updates.
- **[Ghost in the Loop](https://github.com/MShneur/ghost-in-the-loop)** — Moves work between AIs without dropping it down the stairs. Full chat export, handoffs.
- **[Control Walkthrough](https://github.com/MShneur/Ctrl-Walkthrough)** — The hands. It finds the page, clicks the safe buttons, fills the boring fields, verifies the result, and gets out of the way.

Each keeps its own license — don't assume they match.

## License

MIT. Use freely. Attribute if you want. Contribute back if you can.