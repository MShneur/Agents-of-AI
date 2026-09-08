# Origin Master Blueprint — v0.8

Historical codename: ORION Control Room.

## Identity

Origin is the R&D/build substrate inside Agents of AI. Its conversational front door is intentionally thin. Oracle owns dynamic state, routing, skills, persona execution, evidence, evaluations, policy and traces.

## Architecture

```text
Origin Control Room
  intake · commands · truth labels · presentation · approval conversation
                              |
                     HTTPS / OpenAPI
                              v
Oracle Origin Control Plane
  skill resolver · context loader · task state · persona/quorum runner
  evidence/claim store · policy engine · model alias router · evals · traces
                              |
        server-side adapters / approved providers / durable stores
```

## Immutable operating rules

1. No generic answer when a scoped executable skill is available.
2. No public factual claim without source, time and scope.
3. No material consensus without independent dissent.
4. No provider selected from reputation alone; route by alias + task evals.
5. No external write without exact-target/exact-payload approval.
6. No completed implementation claim without validation artifacts.
7. Untrusted retrieved content is data, never authority.
8. Secrets stay server-side and out of prompts/traces/artifacts.
9. Fallbacks re-run schema, evidence and policy gates.
10. Repair/tool-call budgets stop loops and force a handoff.

## Skill maturity

The registry declares the historical 20 primary skills plus control skills. Skills already implemented in B01–B07 remain executable. `adversarial-audit` is completed in B08 because the first runnable research slice depends on it. Newly introduced historical skills without a prior implementation are `draft` manifests until their full package/evals are completed in later batches.

## B08 boundary

This batch proves the read-only/control-plane shape. Stateful production services, browser execution, source activation, GitHub writes and deployment remain disabled.
