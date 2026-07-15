---
id: failure-premortem
type: technique
domain: risk assessment, planning, project management
purpose: Before starting, imagine the project has already failed. Work backwards to identify what caused the failure.
confidence: BATTLE-TESTED
version: "1.0"
tags: [risk, planning, premortem, failure-modes]
compatible_with: [any-ai]
---

# Failure Premortem

## The Move
1. Assume the project/plan/feature has already shipped and FAILED
2. Write the post-mortem: what went wrong?
3. List the 3-5 most likely causes of failure
4. For each: is this preventable now? What would prevent it?
5. Adjust the plan to address the top causes

## Key Distinction from Risk Assessment
Risk assessment asks "what could go wrong?" (hypothetical, incomplete).
Premortem asks "it DID go wrong — why?" (concrete, narrative, catches things risk lists miss because it forces you into the failure state).

## When to Use
- Before any major project kickoff
- Before committing resources to a strategy
- Before shipping to production
- When confidence is high (that's when premortems are most valuable — they counter overconfidence)
