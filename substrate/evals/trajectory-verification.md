# Trajectory Verification

Status: **FOUNDATION / provider-neutral**

## Problem

A correct-looking final answer can hide an invalid plan, wrong tool, malformed arguments, unsafe handoff, fabricated success, or lucky outcome. Conversely, a messy-looking internal path may still produce a verifiably correct result. Agent evaluation needs both outcome and trajectory evidence.

## AoA invariant

**Judge the resulting state first; inspect the path to explain reliability and failure.**

Do not substitute “the trace looked sophisticated” for task success.

## Evaluation layers

### 1. Outcome

Did the user's acceptance condition actually become true?

Examples:

- target file changed as required;
- deployed state exists;
- returned data matches authoritative source;
- tests pass against the intended behavior;
- requested message was actually sent to the intended recipient.

### 2. Trajectory

Did the agent take a sane, authorized path?

Measure/inspect:

- plan validity;
- capability selection;
- invalid or hallucinated tools;
- argument/schema correctness;
- wrong parameter values;
- unnecessary steps;
- repeated loops;
- handoff quality;
- gate compliance;
- retries and recovery;
- source/provenance quality;
- side-effect verification.

### 3. Efficiency

For repeated tasks, track:

- model/tool calls;
- tokens/context growth;
- elapsed time;
- external cost;
- retries;
- failed branches;
- human interruptions.

Optimize only after outcome reliability is visible.

## Trace receipt

A runtime should be able to provide or derive a compact trajectory:

```yaml
outcome: PASS | FAIL | PARTIAL | NOT_RUN
steps:
  - actor: <id>
    capability: <id>
    provider: <id>
    action: <compact operation>
    result: PASS | FAIL | SKIPPED
    evidence_ref: <pointer>
gates: []
retries: 0
verification_method: <independent/state-based check>
```

## Error decorrelation

A trajectory produced by the authoring path is useful evidence but not automatically independent verification.

For load-bearing claims, change at least one material axis:

```text
author: model/agent reasoning
checker: deterministic state query
```

or

```text
author: provider A
checker: provider B / authoritative source
```

or

```text
author: implementation test
checker: acceptance fixture / black-box behavior
```

Use AoA `techniques/error-decorrelation.md` where applicable.

## Failure taxonomy

Record the smallest useful cause:

```text
PLAN_INVALID
CAPABILITY_MISSING
TOOL_HALLUCINATED
ARGUMENT_SCHEMA_ERROR
ARGUMENT_VALUE_ERROR
TOOL_EXECUTION_ERROR
UNTRUSTED_SOURCE_PROMOTED
AUTHORITY_VIOLATION
GATE_BYPASS
HANDOFF_LOSS
LOOPING
STATE_NOT_CHANGED
VERIFICATION_NOT_RUN
OUTCOME_WRONG
COST_REGRESSION
```

## Regression corpus

When a meaningful failure occurs:

1. freeze the smallest reproducible case;
2. add the expected outcome/trajectory constraint;
3. fix the system;
4. rerun the failure case plus nearby normal cases;
5. retain the case so future prompt/model/provider changes cannot silently reintroduce it.

## Sources distilled

- Chip Huyen: planning/tool failure taxonomy and efficiency measurement.
- `deepseek-ai/deepseek-harness`: durable step/tool/session events enable path reconstruction.
- AoA `error-decorrelation`: verifier should differ from author on a named axis.
- R&Duck evidence-first verification and PASS/FAIL/NOT RUN discipline.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
