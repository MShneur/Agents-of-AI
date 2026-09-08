# Model / Provider Fallback Policy

The runtime requests a **capability**, never a brand.

Fallback is allowed only when:
- the fallback satisfies the same declared capability and data-policy constraints;
- the failure is an allowed transient/availability condition;
- task-specific quality gates will run again.

Fallback does **not** preserve trust automatically. A new provider/model result is a new execution result and must be revalidated.

## Requires policy/human review

- public factual claim whose semantics may change;
- price or availability statement;
- legal/compliance statement;
- security-impacting code change;
- any R3/R4 action path.

## Prohibited

- silent semantic upgrade/downgrade for sensitive work;
- endless retry;
- choosing by reputation alone;
- routing to a provider whose data policy conflicts with the task;
- treating a successful response as a successful external action.
