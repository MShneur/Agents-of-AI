---
id: stall-guard
type: workflow
purpose: Prevent recoverable agent stalls from turning into scope drift, unverified write chains, or unnecessary human interruption; make interrupted work safely resumable.
steps: 6
agents_used: [tracker, auditor, conductor]
personas_used: [mirror, burden, provenance]
confidence: PRACTICED
version: "1.1"
tags: [stall, recovery, checkpoints, interruption, verification, anti-drift, continuity]
compatible_with: [any-ai]
---

# Stall Guard

## Trigger

Activate for any substantial task that has two or more major phases, any task that writes multiple files/commits, or whenever one of these occurs:

- a new defect is discovered while executing a different accepted step;
- the plan must widen to another subsystem, owner, lane, or verification contract;
- a tool/runtime path fails but materially different safe paths remain;
- the current branch/runtime/ledger changes underneath the task;
- implementation exists but its verification has not finished;
- a required verifier/test surface fails to load, connect, authenticate, start, or produce the observation needed for acceptance;
- the operator says STOP, the session is interrupted, or context is at risk of expiring;
- the agent starts repeating probes, narrating progress without state change, or accumulating fixes before verification.

This workflow complements Backstitch, Build Chain, and Easy Handoff. It does not replace project authority.

## 1. Define stop badges before material work

Split the scoped task into the smallest meaningful major checkpoints. Each badge has:

```text
BADGE=<stable short name>
SCOPE=<what may change>
PASS=<evidence required to advance>
FAIL=<what sends work backward>
ROLLBACK=<safe point>
NEXT=<one bounded next phase>
```

A badge is a **hard phase boundary**, not decorative progress language.

Rules:

- Do not advance past a badge until its PASS evidence exists.
- Do not claim a later badge because implementation exists.
- Keep badges tied to the canonical roadmap/ledger; do not invent project completion percentages.
- At every badge, re-read current authority/branch state before the next write phase.

## 2. Discovery-to-write barrier

A newly discovered issue does **not** automatically authorize an immediate fix.

Classify it first:

- `IN_SCOPE_NOW` — required for the current badge to pass and owned by the same scope.
- `NEXT_BADGE` — legitimate but belongs after the current checkpoint.
- `ROUTE` — belongs to another owner/lane/system.
- `DEFER` — useful but not required for current acceptance.
- `UNKNOWN` — insufficient evidence.

Only `IN_SCOPE_NOW` may be changed before the current badge closes.

Even for `IN_SCOPE_NOW`, record the changed acceptance condition before writing. If the issue materially changes architecture, security, public truth, or the user-approved visual/product decision, invoke the required Human Gate/Quorum first.

**Anti-pattern:** audit finds three legitimate defects, fixes all three immediately, then discovers that cache identity, tests, or release state are now incomplete. The defects may be real; the sequencing is still wrong.

## 3. One bounded mutation, then verification

For each implementation unit:

1. preserve the pre-change rollback revision;
2. change only the owned files required for that unit;
3. run its narrow verification immediately;
4. label the unit `VERIFIED`, `FAILED`, or `UNVERIFIED`;
5. do not stack another mutation on an `UNVERIFIED` unit unless the next change is strictly required to make that same verification runnable.

A commit is not proof. Code existence is `IMPLEMENTED`; acceptance evidence makes it `VERIFIED`.

## 4. Recover autonomously from fixable stalls

When progress stops, classify the stall:

- `TOOL_PATH` — one tool/path failed;
- `STATE_DRIFT` — repo/runtime/ledger changed;
- `PARTIAL_WRITE` — edits/commits exist without finished acceptance;
- `TEST_CONTRACT` — test and accepted implementation disagree;
- `VERIFIER_PATH` — required browser/test harness/validator/connector/runtime failed before it could prove the acceptance claim;
- `DEPENDENCY` — required external condition is absent;
- `HUMAN_ONLY` — permission, preference, credential/2FA, physical-device action, or irreversible release choice is genuinely required.

For every class except `HUMAN_ONLY`, the agent first performs a bounded recovery pass.

For `VERIFIER_PATH`, the dependent acceptance result is `NOT_TESTED` or `BLOCKED` until the verifier works. A blank page, load failure, skipped assertion, unavailable browser, broken fixture, or failed connector is **not** evidence that the product path passed. If the verifier defect is localized, reversible, and inside the current scope/authority, repair it before continuing and rerun the affected verification. A different passing test may substitute only when the acceptance contract explicitly permits that evidence class.


```text
RE-READ authority
-> preserve rollback
-> inspect exact current state
-> classify partial work KEEP | MODIFY | REVERT | UNKNOWN
-> try materially different safe execution paths
-> run the narrowest acceptance evidence
-> return to the current badge
```

Do not ask the operator to troubleshoot an agent/tool problem while a safe alternative path exists. Easy Handoff's tool-exhaustion rule remains binding.

If the same recovery attempt fails twice without new evidence, stop repeating it. Change method, reduce scope, route the dependency, or mark the exact blocker.

## 5. Interruption contract

On `STOP`, forced interruption, timeout risk, or session transfer:

- stop new modifications immediately;
- record exact branch/runtime/head and changed files;
- mark every incomplete mutation `UNVERIFIED`;
- record the last verified rollback point;
- state the current badge and the first unfinished acceptance check;
- do not promote partial work into accepted state;
- write material state back to the existing canonical handoff/ledger only.

On resume, Backstitch revalidates the authority and current head first. Never resume by replaying the old plan blindly.

## 6. Badge close / handoff

A badge closes only with evidence. Emit:

```text
[STALL-GUARD CHECKPOINT]
BADGE=<name>
STATUS=PASS | FAIL | PARTIAL | BLOCKED
HEAD=<revision/runtime identity>
VERIFIED=<evidence>
UNVERIFIED=<none|items>
ROLLBACK=<safe point>
NEXT=<one bounded phase>
```

Then stop if the project/user requested a checkpoint stop. Otherwise re-ground and enter the next badge.

## Kill conditions

- writing discovered adjacent fixes before classification;
- more than one unverified mutation stacked across different concerns;
- advancing because "the code is there";
- continuing after the operator says STOP;
- asking the operator to repair a fixable tool-path failure;
- advancing past a required verifier that failed to load/run and calling the dependent path PASS;
- retrying the same failed method without new evidence;
- losing the pre-change rollback point;
- updating a second handoff instead of the canonical record.

## Integration

- **Backstitch:** resolves authority before recovery/resume.
- **Build Chain:** supplies implementation and verification stages.
- **Easy Handoff:** reports badge/status without progress theater.
- **Quorum/Human Gate:** resolves consequential forks; Stall Guard does not weaken those gates.
- **Cleanerz:** use after repeated stalls to identify process friction rather than merely patching symptoms.
