---
id: observation-masking
type: technique
domain: long sessions, agent workflows, research, engineering
purpose: Hide finished and irrelevant material from the working set instead of carrying it forward — accuracy improves and cost falls when the visible context is smaller, not larger.
confidence: PRACTICED
version: "1.0"
tags: [context, compression, long-sessions, cost, attention]
compatible_with: [any-ai]
---

# Observation Masking

## The Move

Long work accumulates residue: tool output already acted on, search results already summarized, dead branches, superseded drafts. Carrying it forward is not free — it competes for attention with the material that still matters and degrades judgment on the current step.

Mask rather than accumulate:

1. **Declare the budget first.** State a ceiling on what stays visible before the work starts, not after it overflows.
2. **Mark each observation on arrival** — live (still load-bearing), resolved (acted on, keep the conclusion, drop the body), or dead (a branch that closed).
3. **Collapse resolved to a single line.** Keep the finding and the source pointer. Drop the transcript.
4. **Drop dead entirely.** Record only that the branch closed and why, in one clause.
5. **Re-check at each phase boundary**, not on a fixed turn count — phase changes are when relevance actually shifts.

## Calibration

Tune the ceiling to task shape rather than to context capacity. Exploratory work needs more live material held open; execution work needs almost none. Available room is not a reason to fill it.

## Failure Signal

If masking a block would make a later step wrong, it was live and was misclassified. Rising cost per turn with flat or falling output quality means the working set has stopped being pruned.

## Allergy

Dumping everything in because the window allows it. Lossy summarization applied to material still being reasoned over — mask what is finished, compress what is finished, never the live edge.

## When to Use

Any session past a handful of turns, multi-phase builds, long research, and any workflow where tool output arrives faster than it is consumed.
