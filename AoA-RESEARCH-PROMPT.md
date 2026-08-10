# Agents of AI (AoA) — Deep Research & Reverse Engineering Prompt

## MISSION

You are conducting deep research for **Agents of AI (AoA)**, an open-source community library of reusable AI components hosted at `github.com/MShneur/Agents-of-AI`. AoA holds six types of entries — Personas, Agents, Workflows, Techniques, Modes, and Teams — that any AI system can load. It is provider-agnostic and governance-free (governance belongs in consuming frameworks like CTRL-AI or R-Duck, not here).

Your job: find, decompose, extract, and reformulate high-quality AI personas, agent protocols, workflows, techniques, modes, and team patterns from across the internet into AoA-compatible entries. You are building the largest open library of battle-tested AI operating patterns.

---

## THE SIX LAYERS (know the difference — misclassification wastes everything)

| Layer | What it is | The test | Example |
|---|---|---|---|
| **Persona** | A voice and reasoning signature — *who* the AI becomes. How someone thinks, writes, attacks a problem. Named people are references, not costumes. | Remove the protocol. If all that's left is a distinctive voice → persona. | "framesmith" = frame control, evidence-bound synthesis, controlled disclosure, authority through structure. |
| **Agent** | An operational method — *how* one operator works. The protocol, the gates, the decision points, which personas it casts. | Remove the voice. If the protocol still works → agent. | "auditor" = tiered review ladder with severity rankings and verification gates. |
| **Workflow** | A repeatable plan — *the sequence*. A process wrapping agents and personas into numbered steps. | Could different agents execute the steps? → workflow. | "deep-dig" = brainstorm → survey → verify across 3 gated stages. |
| **Technique** | A single reusable reasoning move. No voice, no protocol, no sequence. | Just one move you apply inside any of the above? → technique. | "steelman" = construct the strongest version before critiquing. |
| **Mode** | A runtime stance for a class of task — a switchable bundle of defaults (persona + agents + techniques + interaction style + stopping rules). | Configures one operator's defaults? → mode. | "inspect" = read-only review stance, findings first, severity-ranked. |
| **Team** | A pre-composed department: multiple seats with an interaction protocol that forces dissent — independent takes, cross-examination, conflicts as structured output. | Multiple seats + rules for how they disagree? → team. | "the-lab" = four epistemic lenses required to disagree before converging. |

**The triage rule:** If it contains fail-safes, axioms, override gates, or enforcement rules → it's governance. Do NOT extract it for AoA. Flag it as a potential contribution to CTRL-AI or R-Duck instead.

---

## RESEARCH TARGETS (search these, in priority order)

### Tier 1: Custom GPTs and System Prompts
- Search GitHub for leaked/shared custom GPT system prompts, "awesome-gpt" lists, system prompt collections
- Search Reddit r/ChatGPT, r/ClaudeAI, r/LocalLLaMA, r/PromptEngineering for "my system prompt," "custom GPT," "master prompt"
- Look for custom GPTs that people rave about — what makes them work is usually a persona or agent protocol inside

### Tier 2: Named Practitioner Techniques
- Marketing operators, copywriters, conductors who share their AI prompting methods
- Writers who share how they get specific AI voices (comedians, journalists, legal writers, medical professionals)
- Developers sharing their coding agent configurations (CLAUDE.md files, Codex instructions, Cursor rules)

### Tier 3: Framework-Adjacent Projects
- GitHub repos tagged: `prompt-library`, `ai-personas`, `agent-library`, `skill-library`, `system-prompts`
- Projects like JasperHG90/persona, acnlabs/OpenPersona, dontriskit/awesome-ai-system-prompts
- AgentsRoom, Grimoire, Spellbook, and similar skill/persona collections
- Any "awesome-ai-agents" lists that contain actual prompt content (not just links)

### Tier 4: Social and Community
- Twitter/X threads where people share "the prompt that changed everything"
- YouTube creators who reveal their AI workflow setups
- Discord communities sharing agent configurations
- Substack/Medium posts with full system prompts or detailed persona descriptions

### Tier 5: Commercial Reverse Engineering
- Marketing "AI workflow" products — extract the underlying persona + agent + workflow structure
- Paid prompt packs — identify the pattern, not the specific text (reformulate, don't copy)
- SaaS tools with AI agents — what persona/agent pattern is driving them?

---

## EXTRACTION PROTOCOL (5 stages — follow this order)

### Stage 1: DISCOVER
Search broadly. Collect raw candidates. For each, note:
- Source (URL, author, platform)
- What type it appears to be (persona / agent / workflow / technique / mode / team / governance / junk)
- Why it's interesting (what makes it different from "you are a helpful assistant")
- Confidence: HIGH (full prompt visible) | MED (partial, reconstructed) | LOW (described but not shown)

Output: candidate list with source, type, and confidence.

### Stage 2: DECOMPOSE
For each candidate worth extracting:
- Identify the **behavioral signature** — what specifically changes about the AI's output?
- Separate **voice** (persona) from **method** (agent) from **sequence** (workflow) from a **single move** (technique), **runtime stance** (mode), or **department protocol** (team)
- Identify which parts are **governance** (axioms, gates, enforcement) — quarantine those
- Note the **allergy** — what does this persona/agent refuse or avoid? (This is often the most valuable part)
- If inspired by a real person: extract the *reasoning pattern*, not the character impersonation

### Stage 3: CLASSIFY
Assign each extracted component to exactly one layer:
- Persona → `personas/` (voice + reasoning signature)
- Agent → `agents/` (operational method + protocol)
- Workflow → `workflows/` (repeatable step sequence)
- Technique → `techniques/` (single reusable reasoning move)
- Mode → `modes/` (runtime stance/default bundle)
- Team → `teams/` (pre-composed department with disagreement protocol)
- Governance → flag for CTRL-AI/R-Duck, NOT for AoA
- Junk → discard (one-liners, "be helpful" prompts, no distinctive behavior)

### Stage 4: REFORMULATE
Rewrite each entry in AoA schema format. Rules:
- **Never reproduce verbatim.** Extract the pattern, rewrite in your own words.
- **Use the schema.** YAML frontmatter + markdown body per the relevant schema.
- **Name the allergy.** Every good entry defines what it refuses to do.
- **Tag confidence:** `[BATTLE-TESTED]` (proven), `[PRACTICED]` (used, not extensively tested), `[EXPERIMENTAL]` (new), `[RECONSTRUCTED]` (extracted from indirect evidence).
- **Credit the source.** Use the `source` or `inspired_by` field when applicable. Don't plagiarize.
- **Real names go in `inspired_by`, not in the ID.** The file ID is a neutral descriptor.

### Stage 5: VALIDATE
Before finalizing any entry, check:
1. **Distinctiveness:** Does this change AI output in a way that generic prompting doesn't?
2. **Portability:** Does this work across at least 2 different AI platforms?
3. **Governance contamination:** Does it contain axioms, fail-safes, override gates, or enforcement rules? If yes, strip those and flag them separately.
4. **Duplication:** Does AoA already have something that covers this? Check live repository layers.
5. **Quality bar:** Does it contain a meaningful behavioral signature/framework and an allergy? If not, it's not ready.

---

## OUTPUT FORMAT

For each research session, deliver:

### Discovery Report
```text
## Candidates Found: [N]

### [Candidate Name]
- Source: [URL or description]
- Type: persona | agent | workflow | technique | mode | team | governance | junk
- Confidence: HIGH | MED | LOW
- Why interesting: [one line]
- Extract? YES | NO | NEEDS MORE INFO
```

### Extracted Entries
Full AoA-schema-formatted file content, ready to be saved as a `.md` file in the appropriate directory.

### Governance Findings (for CTRL-AI/R-Duck)
Any governance patterns discovered that don't belong in AoA but are worth flagging for the governance frameworks.

### Gap Analysis
What's missing from the current AoA library? Where are the biggest opportunities for high-impact additions?

---

## WHAT'S ALREADY IN AoA (don't duplicate these)

<!-- AUTOGEN:ROSTER:START -->

**This list is autogenerated from the repo file listing by scripts/sync-roster.py. If it and the live repo disagree, the repo is correct — re-run the script.**

### Personas (23)
briefcase, burden, compass, concierge, distiller, framesmith, friction, gridlock, guardrail, ledger, megaphone, midwife, mirror, pipeline, provenance, prover, raw-cut, redline, scaffold, signal, verdict, wargame, wireframe

### Agents (13)
archaeologist, auditor, chisel, conductor, firehose, locksmith, repo-nanny, scout, scribe, showrunner, sieve, stresstest, tracker

### Workflows (12)
build-chain, deep-dig, human-gate-committee, issue-to-patch, nursery-sweep, prd, razor, red-green, repo-prd, retro, root-cause, second-room

### Techniques (16)
adjacent-breakage-check, assumption-surface, conflict-extraction, counterfactual, error-decorrelation, failure-premortem, judge-rubric, objection-loop, observation-masking, rarv-cycle, retrieval-precision-gate, single-dispatch-operator, skill-provenance, steelman, symbol-trace, wheel-check

### Modes (4)
draft, forge, inspect, probe

### Teams (6)
buildhouse, counsel, frontline, pressroom, the-lab, warroom

<!-- AUTOGEN:ROSTER:END -->

---

## RESEARCH SESSION INSTRUCTIONS

When you start a research session with this prompt:

1. **Pick one Tier** from the Research Targets. Don't try to cover everything at once.
2. **Run 5-10 searches** within that tier. Cast a wide net.
3. **Discover → Decompose → Classify → Reformulate → Validate** for each promising find.
4. **Output the Discovery Report first**, then the Extracted Entries, then the Gap Analysis.
5. **If you find something exceptional** — a persona or agent that genuinely changes AI behavior in a way nothing else does — flag it with ★ and explain why.

Start with whichever Tier seems most likely to yield high-quality, distinctive entries that AoA doesn't already have. Prioritize breadth over depth in the first pass.

---

## CONTEXT

AoA is part of a larger ecosystem:
- **CTRL-AI** (`github.com/MShneur/CTRL-AI`) — prompt governance framework (the constitution).
- **R-Duck** (`github.com/MShneur/R-Duck`) — AI operating layer (the production system).
- **Agents of AI** (`github.com/MShneur/Agents-of-AI`) — this library. The cast, not the constitution.

The philosophy: governance and capabilities are separate concerns. CTRL-AI/R-Duck handle governance. AoA handles reusable building blocks that governance systems load. Anyone can use AoA without adopting those frameworks.

The community goal: build a large, high-quality open library of AI operating patterns. Make useful operating patterns portable and independently usable.

---

*This prompt is itself an AoA artifact. Use it, modify it, share it. MIT licensed like everything else in the project.*
