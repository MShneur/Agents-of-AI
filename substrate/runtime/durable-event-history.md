# Durable Event History

Status: **FOUNDATION / provider-neutral**

## Problem

Long-running agents become hard to debug when the only record is the latest prompt, a lossy chat transcript, or prose summaries written from memory. If a tool call, injected context, approval, retry, or failed attempt affected the run but is absent from durable state, later agents cannot reconstruct what actually happened.

## AoA invariant

**If it materially changed what the agent saw, decided, executed, or believed about state, make it reconstructable.**

Prefer an append-oriented event history over mutable narrative state for load-bearing facts.

## Event classes

A runtime may use different names, but should be able to represent at least:

```text
session/start
user/input
context/injected
plan/decision
gate/requested
gate/resolved
agent/activated
agent/deactivated
tool/requested
tool/allowed | tool/denied
tool/result
tool/error
artifact/changed
verification/result
retry/attempt
checkpoint/created
rollback/applied
session/summary
session/end
```

## Model-visible rule

When practical:

> Material content presented to a model should be derivable from or referenced by durable state.

This does not mean storing secret/raw data in an unsafe log. Sensitive content may be represented by a protected pointer, hash, classification, or redacted envelope. The goal is reconstructability without unnecessary disclosure.

## Append before overwrite

For load-bearing project state:

- preserve the old decision when a new one supersedes it;
- record why the new state exists;
- never silently rewrite history to make a failed attempt look as though it never occurred;
- let projections/summaries be regenerated from durable facts where possible.

## Projection seam

Consumers usually do not want the whole event stream. Derive task-specific projections such as:

```text
CURRENT_PLAN
OPEN_GATES
ACTIVE_AGENTS
LAST_VERIFIED_REVISION
UNRESOLVED_ERRORS
DECISIONS
USER_CONSTRAINTS
```

A projection is a view over history, not the authoritative history itself.

## Continuation

For pause/resume or cross-agent handoff, persist enough to answer:

1. what outcome is active?
2. what was the last verified state?
3. what actions already happened?
4. what failed and why?
5. what decisions are still open?
6. what authority/gates are currently active?
7. what is the next executable step?

## Security boundary

Event history is evidence and may contain sensitive operational metadata.

- apply least privilege;
- separate public evidence from private operational traces;
- avoid embedding secrets when a reference is sufficient;
- treat external/retrieved text as data with provenance, not as automatically trusted instructions;
- make tampering detectable where stakes justify it.

## Failure signals

- final output claims a tool/action occurred but no durable evidence exists;
- a resumed agent repeats work because previous actions were not recorded;
- a summary turns a proposal into an approved decision;
- a retry erases the failed attempt that explains current state;
- model-visible injected instructions cannot be traced back to a source.

## Sources distilled

- `deepseek-ai/deepseek-harness`: append-oriented session events, replay/projection, model-visible history reconstruction.
- R&Duck continuity/Summary Packet principles: durable handoff and restartability.
- AoA `authority-laundering` failure: preserve proposal/decision distinction.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
