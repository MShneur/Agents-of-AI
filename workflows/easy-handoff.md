---
id: easy-handoff
type: workflow
purpose: Keep durable AI continuity complete while making the operator-facing result minimal, actionable, and impossible to confuse with verification theater.
steps: 5
agents_used: [scribe, conductor]
personas_used: [distiller, mirror]
confidence: PRACTICED
version: "2.1"
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

### Pre-execution denial: stop causal overclaiming

When a host or tool reports a **safety / authorization refusal before execution**, distinguish the observable boundary from the underlying cause:

- `PRE_EXECUTION_REFUSAL`: invocation refused before a result. The target application, remote endpoint, diagnostic workload and verifier were **NOT TESTED**.
- `TOOL_ERROR`: the tool started but failed for transport, authentication, path, permission, timeout, or implementation reasons; classify using observed evidence.
- `TARGET_RESULT`: the request actually ran and produced an attributable response; only this class may count toward the target's PASS/FAIL.
- `UNKNOWN_ORIGIN`: a batch/orchestrator call failed before identifying which contained action triggered it; do not attribute failure to one nested command without evidence.

Record privately: exact error class, caller and intended operation, whether any side effect/target request is proven, first failed boundary, root-cause confidence, and the single next permitted discriminator. In a combined call, **do not** claim the downstream diagnostic was attempted when it was not.

**Remediation contract:** A locally broken verifier may be fixed inside existing authority and retested. An actual policy/safety denial is **not** a local harness bug: do not move the refused operation into GitHub Actions, a repository file, background job, shell, secondary connector, or other executor **to bypass the refusal**. A GitHub-stored script is an artifact, not an authorization. Independently authorized and policy-compliant testing may be evaluated on its own merits, or the execution boundary can be reviewed through the proper channel. Never treat a blocked test as the retailer or product failing.

Before declaring a blocked workflow irreparable, silently apply existing core AoA method lenses: `mirror` (challenge premise), `burden` (proof standard), `provenance` (which layer refused), `guardrail` (allowed actions), `friction` (operator cost), and `verdict` (next defensible action). If cause is unclear, use `workflows/root-cause.md`; if an external mechanism could improve the verifier/reporting process, route Origin TRACE/COMPARE through `workflows/repository-intelligence-boot.md`. These are analytical lenses, not independent people. Do not call them an external Quorum unless live-sourced practitioner seats were actually convened.

### Operator answer when a gate fails

Give the short answer **why / can fix / what next**. Do not say simply `ChatGPT failed`; name the observable refusal layer and mark the hidden reason UNKNOWN. Never substitute lengthy persona, tool, HTTP-status, or GitHub-commit narration for a repair recommendation.

## Step 5 — Easy Handoff / Zero Handoff: narrow-screen safe operator status

**Default for active multi-step work:** minimal, vertical, **plain-text paragraphs**, with no tables or clickable/checkable task controls. One field per paragraph, separated by an empty line. Ordinary prose is preferred over a rich UI layout. Do not emit a new report or transfer artifact unless an actual handoff is necessary.

Use this visual shape in the chat response (the lines inside this sample are separate **paragraphs**, not a Markdown list):

```text
Doing: Current bounded task.

Done: Latest verified result.

Issue: One blocker in ordinary language.

Fix: What has been repaired or can be repaired.

Next: One bounded action.
```

Only retain applicable fields (at most five by default). If the task is complete, show a single Done paragraph. If it cannot start, use Issue / Fix / Next. A justified stage count may add one Remaining paragraph when the authoritative ledger supplies the count. Never invent progress.

### Mobile renderer failure and exact countermeasure

**Observed twice in ChatGPT Android screenshots:** A nominally vertical operator "checklist" was visually laid out as narrow interleaved columns; **checked entries were struck through**, while each label and its long value wrapped separately. The first mitigation (ban tables and request single-column lists) **failed**, because the final assistant response still used Markdown task-list tokens.

To avoid the observed renderer trigger:

- **NEVER emit Markdown task-list tokens** `- [x]`, `- [X]`, or `- [ ]` in the user-facing operator response, even when the user requests a "checklist." That word means an ordered set of completion statuses, not interactive checkboxes. These controls may cause strikethrough and fragmented columns.
- **Do not emit `<checkbox>` or interactive checklist components.** Do not simulate a checkbox with a two-column label/value layout, a Markdown table, a row, a grid, an HTML table, or checkable cards.
- **Do not use Markdown bullet syntax or numbered lists for mobile operator closeouts** unless the user explicitly asks for an actual list; prefer ordinary paragraphs with `Done:`, `Left:`, and `Errors:` at the beginning of their own paragraphs.
- Use **literal plain-text labels** inside each paragraph. Avoid fixed-width columns, alignment spaces, pipes `|`, inline row selectors, strikethrough, and rich hyperlinks inserted into narrow label headings. Place an essential URL on a separate ordinary paragraph when needed.
- Do not describe a task as fixed merely because these text instructions were committed. Client-specific **visual rendering acceptance remains NOT_TESTED** until someone observes the corrected plain-paragraph output on the affected device.

When the operator wants an archive/closeout status, use this **optional** compact form, not a task-list:

```text
Done: Verified changes and saved evidence.

Left: Exact unfinished actions.

Recommendation: One actionable correction.

Gaps: The blocked or unverified check.

Archive: Yes for this bounded chat, or no with reason.

Errors: One concise sentence identifying all remaining blockers.
```

Render each line above as its **own Markdown paragraph separated by a blank line** when writing the answer, not as one code fence or one list. Omit irrelevant paragraphs. Keep full machine continuity in the existing canonical ledger. Preserve the distinctions VERIFIED, PARTIAL, BLOCKED and NOT_TESTED.

The operator-facing failure is a presentation defect, not a proof/data failure. If basic paragraphs **also** render incorrectly on the target device, record a client rendering defect and escalate with a screenshot; don't repeatedly rename the same Markdown list as a new "fix."

**Example — plain-paragraph preflight:**

```text
Done: Existing non-sensitive environment health check passed.

Issue: The required browser test never loaded.

Fix: Repair the verifier inside the current authority if possible.

Next: Rerun the page acceptance test before declaring PASS.
```

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
