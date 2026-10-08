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

## Step 5 — Easy Handoff / Zero Handoff: tiny working list

**Default for active multi-step work:** short bullet-style operator status, with no preamble and no report-like paragraphs.

```text
- Doing: <current bounded task>
- Done: <only the latest verified change>
- Issue: <one real blocker in ordinary words; omit when none>
- Fix: <fixable here? yes/no/unknown + chosen remedy; omit when not needed>
- Next: <one bounded step>
```

Use **at most five short lines** by default; omit non-applicable lines. When the operator asks how far, add **one** `Remaining: <N actual ledger stages>` line only when N is supported by the roadmap. If the task is finished, show only `Done`. If work cannot start, show `Issue / Fix / Next` instead of inventing progress.

For an ordinary one-shot answer where `Doing` is meaningless, the legacy `Fixed / Broken / Recommendation` labels are acceptable, but never force them when the operator asked for a live checklist.

**Operator calibration:** plain words, no prose flourish, no citations/IDs/process theatrics unless requested or necessary to understand the blocker. No long postmortem, task log, quorum cast, or bibliography in routine output. The machine-readable evidence stays in the project's existing canonical ledger.

**Example — blocked preflight, no target test:**

```text
- Doing: prepare the collection ceiling test.
- Done: eight VPN services are running; last neutral check passed.
- Issue: the tool refused the preflight before the test ran; why is not known.
- Fix: review the allowed test path; don't treat an unrun test as a failure.
- Next: verify a permitted diagnostic route, then measure capacity.
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

## Design Provenance

### v2.1 — short-status + verifier-boundary Origin comparison (2026-10-08)

- **ASSIMILATE:** `obra/superpowers` diagnosing-superpowers and verification-before-completion mechanisms: inspect the actual session boundary before claiming a root cause. Source: https://github.com/obra/superpowers (README, main, 2026-10-08).
- **STRENGTHEN:** `artyomboyko/Agent_Handoff` bounded support-tool repair, no artificial new phase for a local verifier problem. Source: https://github.com/artyomboyko/Agent_Handoff (README, main, 2026-10-08).
- **RECOMMEND, NOT INSTALLED:** `pytest-dev/pytest` for small local, negative and contract regression checks around status classification; it cannot authorize a denied network operation. Source: https://github.com/pytest-dev/pytest.
- **DEFER:** `temporalio/sdk-python` is appropriate for large independently authorized durable workflows, not a solution to a pre-execution policy denial or an excuse to add a new scheduler. Source: https://github.com/temporalio/sdk-python.
- Published-method cross-check: Jakob Nielsen's *Progressive Disclosure* (https://www.nngroup.com/articles/progressive-disclosure/), Charity Majors' observability vs monitoring (https://www.honeycomb.io/blog/so-you-want-to-build-an-observability-tool), Adam Shostack's threat-modeling four questions (https://adam.shostack.org/resources/threat-modeling-quick-start), Kent C. Dodds' implementation-detail testing (https://kentcdodds.com/blog/testing-implementation-details), and Brendan Gregg's USE methodology (https://www.brendangregg.com/methodology.html). These practitioner publications inform analytical lenses; none participated in or endorsed this protocol. **Independent named Quorum was NOT run.**
- **Boundary truth for Penny example:** A combined GitHub/Oracle preflight call was refused before returning outputs. Which nested action triggered the refusal and why are UNKNOWN. No Home Depot response or production ceiling measurement resulted. Do not use another runner solely to evade the denial.


v2 strengthens the existing Easy Handoff instead of creating a duplicate reporting workflow.

Mechanism-level influences:
- **obra/superpowers — verification-before-completion:** fresh evidence before completion claims.
- **artyomboyko/Agent_Handoff:** localized supporting-tool defects are repaired inside the current work item; supporting failure is not automatically a new handoff/stage.
- **openai/codex continuation goal:** completion evidence must match the scope of the claim; incomplete or indirect evidence keeps the objective active.

These projects did not participate in or endorse Agents of AI. Their public mechanisms were reformulated independently.
