# Autonomous Ratchet Loop

Status: **FOUNDATION / provider-neutral**

## Problem

“Let the agent improve this until it is good” invites drift, endless patching, metric gaming, and irreversible regressions. Autonomous iteration needs a frozen baseline, a narrow mutation boundary, and an evaluator that the agent cannot casually redefine to make itself look better.

## AoA invariant

**Iterate only against a stable acceptance function; keep measurable gains, revert regressions, and bound each experiment.**

## Loop

```text
BASELINE B0
   ↓
choose one hypothesis
   ↓
make bounded mutation M1
   ↓
run under fixed budget/conditions
   ↓
measure with frozen evaluator E
   ↓
compare to current champion
   ├─ better + constraints pass → KEEP as new champion
   ├─ worse / constraints fail  → REVERT
   └─ ambiguous                 → REPEAT / HUMAN GATE if consequential
   ↓
log experiment
   ↓
next hypothesis
```

## Freeze the evaluator

The agent may improve the artifact, not silently change the scoreboard.

Keep stable within a run series:

- primary metric(s);
- acceptance thresholds;
- test dataset/fixture or sampling policy;
- time/compute/tool budget;
- protected constraints;
- evaluation code unless a separate evaluator-change decision is made.

If the evaluator itself must change, start a new versioned series and retain comparability notes.

## Narrow mutation surface

Reduce the number of moving pieces per experiment.

Good:

```text
change one prompt section
change one routing rule
replace one collector adapter
adjust one memory ranking function
```

Bad:

```text
rewrite the agent, tools, evaluator, dataset and scoring logic together
```

## Multi-objective guard

One metric can be gamed. Keep protected constraints beside the optimization target.

Example:

```yaml
optimize: task_success
must_not_regress:
  security_gate_bypass_rate: 0
  median_cost: <= baseline * 1.10
  unsupported_claim_rate: <= baseline
```

## Experiment record

```yaml
experiment_id: <id>
baseline: <revision>
hypothesis: <what should improve and why>
mutation: <exact change>
budget: <fixed run budget>
metrics_before: {}
metrics_after: {}
constraints: PASS | FAIL
verdict: KEEP | REVERT | REPEAT | HUMAN_GATE
evidence_ref: <logs/results>
```

## Stop conditions

Stop when:

- budget/iteration cap reached;
- improvements plateau below materiality threshold;
- repeated regressions indicate wrong hypothesis space;
- evaluator becomes suspect;
- improvements trade off a protected constraint;
- Human Gate is required for the next search-space expansion.

Do not convert a plateau into infinite prompt tweaking. Use Cleanerz when the loop is fixing fixes instead of learning.

## Sources distilled

- `karpathy/autoresearch`: narrow mutable surface, fixed experiment time, objective metric, keep/discard loop.
- AoA `RARV`: reason/act/reflect/verify discipline.
- AoA Cleanerz: interrupt meta-work when iterative correction stops producing value.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
