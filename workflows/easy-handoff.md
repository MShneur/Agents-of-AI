---
id: easy-handoff
type: workflow
purpose: Keep long AI work machine-complete while making operator-facing handoffs glanceable, evidence-backed, and impossible to confuse with progress theater.
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

Use two surfaces for substantial AoA work:

- **AI record:** compact actions, evidence, decisions, errors, files, state, and next action.
- **Human handoff:** progress, current result, next step.
- **Authority:** unchanged. This workflow never replaces the project ledger, Human Gate, Quorum, or acceptance tests.

## Step 1 — Select and declare the cast

Before substantial work, search current AoA and choose the smallest capable method set for the exact task. Do not fall back to generic execution when a relevant Origin, Cleanerz, workflow, team, agent, persona, Quorum, or practitioner-method lens would materially improve the work.

- Use Quorum / Human Gate for consequential forks, not routine reversible actions.
- A Quorum uses two live-sourced real practitioners per required seat, grounded in published methods. Never simulate participation or endorsement.
- Report only methods actually used.

First material update:

```text
AOA=<methods actually used>
MODEL=<executing model>
```

**Done:** the task has an explicit AoA route and the executing model is known.

## Step 2 — Lock progress to real state

Progress comes only from the canonical roadmap, ledger, checklist, or explicit scoped plan.

- Use `A/B`; if no real denominator exists, use `0/?`.
- Increment `A` only after acceptance evidence passes.
- Failed attempts do not advance progress.
- Keep `B` stable. Scope change: `6/10 -> 6/12 (+2 scope)`.
- Nested work: `Step 7/10 · Milestone 1/4`.
- Do not erase verified progress unless regression evidence invalidates it.

**Done:** progress is evidence-backed and traceable to real scoped state.

## Step 3 — Keep the AI record actionable

For long work, emit a trace only on material state change:

```text
[AoA TRACE]
TASK=<stable id>
ROADMAP=<A/B>
MILESTONE=<x/y|NONE>
ACTION=<bounded action>
RESULT=PASS|FAIL|PARTIAL|NOT_RUN
EVIDENCE=<artifact/path/test/source>
STATE_CHANGE=<what is now true>
ERROR=<NONE|exact failure>
DECISION=<accepted decision|NONE>
NEXT=<next bounded action>
```

Rules:

- Preserve `UNKNOWN`, `NOT_RUN`, dissent, authority, and provenance.
- Omit filler, repeated context, and tool-by-tool narration.
- Never expose private chain-of-thought; this is an execution/state record.
- If a canonical durable record exists, update/reference it instead of creating a competing master state.

**Done:** another AI can resume without reconstructing the work from prose.

## Step 4 — Resolve serious forks before interrupting the operator

Run Human Gate / Quorum first when project policy or a consequential fork requires it and existing evidence/authority allow resolution.

Ask the human only when at least one is true:

- explicit permission or release authority is required;
- the choice is materially irreversible;
- only the human can supply the preference or evidence;
- Quorum remains `DISPUTED` and no safe reversible step survives.

Otherwise take the safest authorized reversible step and report the effect, not the deliberation.

**Done:** the operator is interrupted only at a genuine human gate.

## Step 5 — Render the Easy Handoff

Default:

```text
- ✓ Agents of AI — <methods actually used> — <model>
- Progress — <A/B> [· Milestone <x/y>]
- ✓ Done — <current result>
- → Next — <next bounded step>
```

Only when applicable:

```text
- ✗ Fail — <failure + location>
- ! HALT — <why work must stop + required human action>
- △ Recommend — <minor pathway change + reason>
- + Defer — <later item + stable id/delta when one exists>
```

Rules:

- Bullets, not paragraphs.
- One fact/action per bullet.
- Lead with outcome, not method.
- Do not dump audits, Quorum deliberation, tool logs, or implementation detail unless asked.
- If nothing changed, do not manufacture an update.
- Keep the human handoff to one phone screen when practical.

**Done:** the operator can answer: Where are we? What happened? What happens next?

## Done Condition

Pass only when:

- AoA methods and model are accurate;
- progress is real or honestly `?`;
- result status is unambiguous;
- next step is bounded;
- required human action is explicit;
- machine continuity is preserved without private reasoning;
- recommendations have not been laundered into decisions.

## Failure Signals

- invented or silently changing progress;
- a failed attempt counted as completion;
- long operator-facing paragraphs;
- hidden `FAIL`, `UNKNOWN`, authority, or regression state;
- Human Gate deliberation dumped on the operator;
- recommendation compressed into a decision;
- trace records emitted without material state change;
- the human must reread the chat to find the next step.

## Design Provenance

The v1 design passed a live-sourced five-seat Quorum method review with two practitioners per seat. See [the Origin provenance record](../origin/easy-handoff-quorum-2026-09-19.md) for sources, cross-examination, Spike, and dispositions.

Those practitioners did not participate in or endorse Agents of AI. Future Quorums re-source live; this record is provenance, not a frozen roster.
