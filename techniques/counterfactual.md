---
id: counterfactual
type: technique
domain: decision-making, causal reasoning
purpose: Test a causal claim by asking "if X had NOT happened, would Y still have occurred?" If yes, X didn't cause Y.
confidence: BATTLE-TESTED
version: "1.0"
tags: [causation, reasoning, decision-making, analysis]
compatible_with: [any-ai]
---

# Counterfactual Test

## The Move
When someone claims "X caused Y":

1. Construct the counterfactual: "If X had NOT happened, would Y still have occurred?"
2. If yes → X is not the cause (or not the only cause). Look deeper.
3. If no → X is at least a necessary condition. Check if it's sufficient.
4. If unclear → the causal claim is weaker than stated. Flag uncertainty.

## When to Use
- Root cause analysis (is this really the root cause?)
- Post-mortem reviews
- When attribution matters (did our change cause the improvement?)
- Marketing claims ("our product increased revenue 40%" — would revenue have grown anyway?)
