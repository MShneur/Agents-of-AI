---
id: easy-handoff
type: workflow
purpose: Keep long AI work machine-complete while making operator-facing handoffs glanceable, monotonic, and impossible to confuse with progress theater.
steps: 5
agents_used: [scribe, conductor]
personas_used: [distiller, mirror]
confidence: EXPERIMENTAL
version: "1.0"
tags: [handoff, continuity, progress, compression, operator, long-session, ai-readable]
compatible_with: [any-ai]
---

# Easy Handoff

**Aliases:** Zero Handoff · Zero Protocol Handoff

## Purpose

Easy Handoff separates two audiences that should not be forced to read the same record:

1. **AI continuity record** — dense, structured, portable state another AI can resume from.
2. **Human operator handoff** — only the current progress, what happened, and what comes next.

The workflow changes the reporting layer, not project authority. It does not replace a canonical ledger, project handoff, Quorum, Human Gate, or acceptance test.

## When to Use

Use on every substantial multi-step AoA task, especially long chats, parallel lanes, handoffs between models, or work the human is not reading line-by-line.

For a trivial one-turn answer, use only the short human handoff if reporting is useful.

## Step 1 — Select and declare the cast

Before substantial work, search the current AoA library and choose the smallest capable method set for the exact task. Do not default to generic execution when Origin, Cleanerz, Quorum, a team, workflow, agent, or named practitioner-method lens materially changes the work.

- Use Quorum / Human Gate for consequential forks, not routine reversible actions.
- When Quorum is used, follow its live-sourcing rule: two real practitioners per required seat, grounded in published methods, never simulated participation.
- Record only capabilities actually used.

At the first material update:

```text
AOA=<methods actually used>
MODEL=<model actually executing>
```

**Done when:** the task has a deliberate AoA route and the next AI can tell which capabilities actually produced the work.

## Step 2 — Lock progress to real state

Progress numbers come from the canonical roadmap, ledger, checklist, or explicit scoped plan.

Rules:

- Use `A/B`, where `B` is a real scoped denominator.
- If no denominator exists yet, use `0/?`. Never invent one to make progress look measurable.
- Increment `A` only when the step's acceptance evidence passes.
- Keep the denominator stable. If scope changes, show the delta explicitly: `6/10 -> 6/12 (+2 scope)`.
- Nested work uses: `Step 7/10 · Milestone 1/4`.
- A failed attempt does not increase progress.
- Rework does not reset progress already verified unless evidence proves a completed step regressed.

**Done when:** progress is monotonic, evidence-backed, and traceable to a fixed plan.

## Step 3 — Write AI trace, not human narration

During long work, prefer compact event records over explanatory paragraphs.

```text
[AoA TRACE]
TASK=<stable task/lane id>
ROADMAP=<A/B>
MILESTONE=<x/y or NONE>
ACTION=<bounded action>
RESULT=PASS|FAIL|PARTIAL|NOT_RUN
EVIDENCE=<artifact/path/test/source>
STATE_CHANGE=<what is now true>
ERROR=<NONE or exact failure>
DECISION=<accepted change or NONE>
NEXT=<next bounded action>
```

Rules:

- Record actions, evidence, decisions, errors, codes, files, and state transitions.
- Omit conversational filler and repeated context.
- Preserve `UNKNOWN`, `NOT_RUN`, dissent, and authority state.
- Do not expose private chain-of-thought. The trace is an execution/state record, not hidden reasoning.
- If a canonical durable record exists, update it and reference it; do not create a competing master state.

**Done when:** another AI can resume the work without reconstructing it from prose.

## Step 4 — Route serious forks before interrupting the operator

When existing project governance calls for Human Gate or a consequential decision reaches a genuine fork:

1. Run Human Gate / Quorum when the decision can be resolved from available evidence and existing authority.
2. Apply the safest reversible next step when authority permits.
3. Interrupt the human only when one of these is true:
   - explicit human permission or release authority is required;
   - the choice is materially irreversible;
   - the decision depends on a preference only the human can supply;
   - required evidence exists only with the human;
   - Quorum remains `DISPUTED` and no safe reversible step survives.

The operator-facing handoff reports only the effect of the gate unless more detail is requested.

**Done when:** serious questions are not bounced to the human merely because the AI can ask.

## Step 5 — Render the Easy Handoff

Default operator-facing output:

```text
- ✓ Agents of AI — <methods actually used> — <model>
- Progress — <A/B> [· Milestone <x/y>]

- ✓ Done — <what was just completed and whether it passed>
- → Next — <the next bounded step>
```

Use only when applicable:

```text
- ✗ Fail — <what failed and where>
- ! HALT — <why the current path must stop; what human action/authority is required>
- △ Recommend — <minor pathway alteration and why>
- + Defer — <useful later item; stable delta/id if one exists>
```

Rules:

- Bullets, not paragraphs.
- One fact/action per bullet.
- Lead with outcome, not method.
- Do not dump the audit, Quorum deliberation, tool log, or implementation detail unless asked.
- If nothing changed, do not manufacture an update.
- The final handoff should normally fit on one phone screen.

**Done when:** the operator can answer three questions at a glance: Where are we? What happened? What happens next?

## Done Condition

Easy Handoff passes when all are true:

- AoA methods and executing model are stated accurately.
- Progress is tied to a real denominator or honestly marked `?`.
- Current result is marked success/failure/partial without ambiguity.
- The next step is one bounded action.
- Any required human intervention is explicit.
- Detailed continuity exists in structured AI-readable form without exposing private reasoning.
- No suggestion was laundered into a decision during compression.

## Failure Signals

- progress numbers rise without acceptance evidence;
- denominator silently changes;
- output returns to long paragraphs;
- a failed attempt is reported as progress;
- a Human Gate is dumped on the operator instead of reduced to its decision impact;
- a recommendation becomes a decision after compression;
- the human must reread the chat to learn the next step;
- the AI trace becomes chain-of-thought instead of an evidence/state record.

## Design Provenance

The v1 design was reviewed through a live-sourced five-seat Quorum method pass with two practitioners per seat. The detailed method record, cross-examination, dissent, and sources live in [the Origin provenance record](../origin/easy-handoff-quorum-2026-09-19.md). Those practitioners did not participate in or endorse Agents of AI; their published methods were used as analytical lenses.

The runtime rule is simpler: re-source any future Quorum live. Never turn this provenance record into a frozen expert roster.
