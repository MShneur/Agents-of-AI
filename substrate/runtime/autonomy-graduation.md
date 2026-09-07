# Autonomy Graduation

Status: **FOUNDATION / governance-compatible**

## Problem

Giving a new agent or recurring loop full unattended authority on day one assumes reliability before evidence exists. Keeping every mature loop permanently manual wastes automation value.

## AoA invariant

**Autonomy is earned per capability/task class from observed verifier reliability and consequence—not assigned as a personality trait.**

## Ladder

```text
A0 OBSERVE
   read/analyze only

A1 RECOMMEND
   propose actions; human executes/approves each

A2 ASSISTED EXECUTE
   perform reversible/local actions; gate consequential actions

A3 BOUNDED AUTONOMY
   run a defined loop unattended inside explicit scope/budget; stop on failures/gates

A4 TRUSTED AUTOPILOT LANE
   broad autonomous operation within a mature, monitored lane; governance and hard capability boundaries still apply
```

These are AoA substrate levels, not a replacement for R&Duck's existing autonomy labels. An adapter may map them to the governing system's native levels.

## Evidence for promotion

Promote a lane only when there is a recent run history showing:

- outcome success rate;
- verifier false-positive/false-negative rate where measurable;
- gate compliance;
- no authority expansion;
- rollback/recovery success;
- acceptable cost/latency;
- stable provider/tool behavior;
- representative edge/failure cases, not only happy paths.

Do not promote because the prompt sounds mature or the model is newer.

## Promotion scope

Autonomy attaches to a **lane**, for example:

```text
DEPENDENCY_PATCH: A3
PRODUCTION_DEPLOY: A1
READ_ONLY_RESEARCH: A4
CUSTOMER_EMAIL_SEND: A1
DOCS_LINK_REPAIR: A3
```

A strong record in one lane does not transfer authority automatically to another.

## Automatic demotion

Demote when:

- a consequential gate is bypassed or nearly bypassed;
- upstream provider behavior changes materially;
- verifier reliability degrades;
- repeated rollback/failure occurs;
- a new attack/failure mode changes the risk model;
- the lane expands in scope;
- evidence becomes stale relative to the pace of change.

## Rollout rule

For new recurring loops, prefer:

```text
report-only → assisted → bounded unattended
```

with explicit evidence gates between stages.

## Human Gate

No autonomy level erases consequence-based Human Gates required by the active governance. Autonomy reduces routine steering; it does not transfer ultimate authority over actions the user/system reserved.

## Sources distilled

- `cobusgreyling/loop-engineering`: staged rollout from reporting toward assisted/unattended operation based on observed readiness.
- R&Duck autonomy ladder and Human Gate concepts.
- AoA trajectory verification: promotion should be based on measured task/trajectory evidence.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
