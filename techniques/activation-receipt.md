---
id: activation-receipt
type: technique
domain: dynamic agent and method routing
purpose: Count only distinct Agents of AI definitions that were fetched and actually applied during a task.
confidence: EXPERIMENTAL
version: "1.0"
tags: [activation, provenance, method-count, boot, honesty]
compatible_with: [any-ai]
---

# Activation Receipt

## The Move
Keep the set of unique **definition paths** whose actual current content was both retrieved and used in an observable task step. When warranted, report `AoA: N active` where `N` is that set's size. The revision and applied operation belong in durable evidence. Never count catalog references, proposed casts, fetched-but-unused definitions, simulated voices, or repeated mentions.

## When to Use
The user requests AoA activation visibility or the count explains a consequential project route. When none were needed, `AoA: 0` is accurate. When the sources were unavailable, use `AoA: not loaded` rather than inventing an activation. Do not show a fresh banner on every chat turn.

## When NOT to Use
Simple tasks where no activation status would improve the answer. The technique does not load external models or certify that a governor booted.

## The Test
Recommend five persona paths, fetch two, actually apply one. The active count is **one**, not five or two. A fake independent-agent claim fails even if the model uses different role labels.
