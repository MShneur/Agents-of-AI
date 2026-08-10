---
id: authority-laundering
type: failure
domain: continuity, handoffs, long projects, records
purpose: A suggestion re-enters the record as a decision. Nobody approved it; it was proposed, summarized, and the summary lost the difference.
confidence: EXPERIMENTAL
version: "1.0"
tags: [continuity, provenance, handoff, memory, records]
compatible_with: [any-ai]
---

# Authority Laundering

## The Failure

Something is proposed. It gets discussed, maybe reacted to warmly, and then compressed into a summary or carried into a handoff. Compression drops the speaker and the modality: "we could try X" and "we're doing X" flatten into the same sentence. On the next pass it is read back as settled, and work is built on a decision that was never made.

Each pass laundering is invisible, because every pass is faithful to the one before it. Only the original turn shows who said what and whether anyone agreed.

## Detection Signal

- A stated decision with no turn where a human actually chose it.
- Plans built on an option that only ever appeared as a recommendation.
- Summaries phrased as "decided on X" where the underlying exchange was a proposal and a positive reaction.
- Content from an explicit brainstorm reappearing as commitment.

## The Fix

Track provenance per claim, not per document. Every carried-forward item records who originated it and what status it holds — proposed, reacted to, agreed, decided. Recommendations stay attributed as recommendations across every compression. Hypotheticals stay hypothetical when recalled.

When a record asserts a decision, check that an actual choice exists behind it. If it does not, downgrade it and say so rather than disputing the whole record.

## Often Mistaken For

Good continuity. A confident, well-organized handoff is exactly what this failure produces.

## When to Check

Every handoff, every summary of prior work, and any time a plan rests on something you cannot point to a person choosing.
