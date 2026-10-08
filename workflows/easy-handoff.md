---
id: easy-handoff
type: workflow
purpose: Keep durable AI continuity complete while making the operator-facing result minimal, actionable, and impossible to confuse with verification theater.
steps: 5
agents_used: [scribe, conductor]
personas_used: [distiller, mirror]
confidence: PRACTICED
version: "2.0"
tags: [handoff, continuity, status, compression, operator, verification, repair-first]
compatible_with: [any-ai]
---

# Easy Handoff

**Aliases:** Zero Handoff · Direct Status

## Purpose

Separate machine continuity from human status.

- **Durable AI record:** actions, evidence, decisions, errors, source refs, state changes, and next action.
- **Operator surface:** only what changed, what remains broken, and what should happen next.
- **Authority:** unchanged. This workflow never replaces project authority, acceptance tests, Human Gate, Quorum, or Backstitch.

A routine task completion is **not** a handoff. Do not dump a transfer artifact into chat unless the user asks for it or an actual transfer/interruption requires one.

## Step 1 — Select the smallest capable route

Before substantial work, select the minimum relevant Agents-of-AI methods and tools.

Record methods, model, route, and ownership in the durable record when useful.

**Do not surface the cast, model, workflow names, progress denominator, or tool log by default.** Show them only when the user asks, they explain a consequential decision, or they are necessary to understand a blocker.

**Done:** the work has a valid route without making the operator read the routing ceremony.

## Step 2 — Keep progress evidence-backed and mostly internal

Progress comes only from a canonical roadmap, ledger, checklist, or explicit scoped plan.

- Failed attempts do not advance progress.
- A commit or file change is not acceptance evidence.
- Do not invent percentages or denominators.
- Do not narrate routine progress in chat.
- Surface progress only when it helps the user steer long-running work, when scope materially changes, or when the user asks.

**Done:** progress is real, but progress theater is absent.

## Step 3 — Maintain compact durable continuity

For long or multi-agent work, update the existing canonical record with only material state changes:

```text
TASK=<stable id>
ACTION=<bounded action>
RESULT=PASS|FAIL|PARTIAL|BLOCKED|NOT_TESTED
EVIDENCE=<artifact/path/test/source>
STATE_CHANGE=<what is now true>
BROKEN=<none|exact unresolved defect>
DECISION=<accepted decision|none>
NEXT=<next bounded action>
```

Rules:

- Preserve `UNKNOWN`, `BLOCKED`, `NOT_TESTED`, dissent, authority, and provenance.
- Keep tool-by-tool narration out of the operator surface.
- Use Backstitch or the project's canonical continuity store when available.
- Never expose private chain-of-thought.
- Never create a competing master handoff merely because a chat is ending.

**Done:** another AI can resume without forcing the operator to read machine continuity.

## Step 4 — Verifier Integrity / Repair-First Gate

A required verification path must work before its dependent claim can pass.

### Failure rule

If a required browser, test harness, validator, connector, build tool, fixture, page, or runtime:

- fails to start;
- fails to load;
- cannot authenticate/connect;
- returns no usable observation;
- skips the relevant assertion;
- crashes or times out before the required behavior is observed;

then the dependent result is **`NOT_TESTED` or `BLOCKED`**, never `PASS`.

A sibling test passing does not substitute for the missing evidence unless the acceptance contract explicitly says it does.

### Repair-first rule

When the failed verifier is:

- required for the current acceptance claim;
- local to the current task;
- reversible and safe to repair inside existing authority;

repair it **before moving on**, then rerun the affected verification.

Do not create a separate stage or handoff merely because supporting test infrastructure needed a localized repair.

If the verifier cannot be repaired inside authority/scope:

1. stop the dependent completion claim;
2. state what remains untested in plain language;
3. give the best next repair/recovery recommendation.

### Plain-language explanation

If the blocker uses unfamiliar technical language, explain it in one short sentence without waiting for the user to ask.

Example:

> **Broken — The browser test never loaded the page, so the feature was not actually tested.**

Not:

> Browser probe failed, but other checks passed.

**Done:** a broken evidence path can never masquerade as product success.

## Step 5 — Direct Status

Default operator-facing result:

```text
Fixed — <what materially changed and was verified>.
Broken — <only real unresolved defect/blocker>.
Recommendation — <best next action to resolve it>.
```

Rules:

- **Omit any empty line.**
- If only a verified fix remains, one `Fixed` sentence is enough.
- If nothing was fixed, do not manufacture a `Fixed` line.
- `Broken` means unresolved and evidence-backed, not a historical failure already repaired.
- `Recommendation` should normally propose the repair, not merely say "proceed anyway."
- Explain important unfamiliar terms inline in plain language.
- Do not include routine methods, model names, progress, receipts, handoff schemas, or tool logs unless requested.
- A user who asks for `EXPAND`, evidence, audit, handoff, or technical detail can receive the larger record.

### Genuine user-only action

Ask the human only after safe tool exhaustion proves the remaining step is genuinely user-only.

Use the smallest possible request. Do not surround it with a status dump.

## Done Condition

Pass only when:

- durable continuity contains the material state;
- the operator surface is minimal;
- no failed or missing verifier has been counted as a pass;
- required in-scope verification infrastructure was repaired before proceeding where feasible;
- unresolved verification gaps are named `NOT_TESTED` or `BLOCKED`;
- the recommendation points at the repair/recovery path;
- no recommendation has been laundered into a decision.

## Failure Signals

- cast/model/progress/tool logs shown without need;
- routine completion followed by a large handoff dump;
- "browser failed" followed by continued completion claims;
- blank page, load failure, skipped assertion, or unavailable test surface counted as pass;
- a sibling test used to cover a missing required path;
- a repairable verifier defect deferred while downstream work continues;
- a blocker named with no recommended repair;
- jargon reported without a plain-language explanation when it affects the user's decision.

## Design Provenance

v2 strengthens the existing Easy Handoff instead of creating a duplicate reporting workflow.

Mechanism-level influences:
- **obra/superpowers — verification-before-completion:** fresh evidence before completion claims.
- **artyomboyko/Agent_Handoff:** localized supporting-tool defects are repaired inside the current work item; supporting failure is not automatically a new handoff/stage.
- **openai/codex continuation goal:** completion evidence must match the scope of the claim; incomplete or indirect evidence keeps the objective active.

These projects did not participate in or endorse Agents of AI. Their public mechanisms were reformulated independently.
