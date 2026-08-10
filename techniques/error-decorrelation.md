---
id: error-decorrelation
type: technique
domain: verification, quality assurance, review, research integrity
purpose: Make a verification pass count for something by forcing the checker to differ from the author along a named axis — because a reviewer who shares the author's blind spot returns confidence, not evidence.
confidence: PRACTICED
version: "1.0"
tags: [verification, review, self-critique, blind-spots, audit]
compatible_with: [any-ai]
---

# Error Decorrelation

## The Move

A check is only worth its cost if the checker can fail differently than the author did. When author and checker share the same blind spot, review returns polish and confidence while the original error survives untouched. Repeated passes make this worse, not better — each round adds fluency without adding information.

Before accepting any verification pass, name the axis of difference:

1. **Different model or engine** — a second system with different training and different failure habits.
2. **Different framing** — check against the requirement, not against the draft. The author asks "is this good?"; the checker asks "what did the brief demand, and is each demand met?"
3. **Different evidence** — the checker returns to primary sources rather than reading the author's summary of them.
4. **Different direction** — work backward from the conclusion to the support, rather than forward from premise to conclusion.
5. **Different stake** — the checker is rewarded for finding a defect, not for agreeing.

If none of the five applies, the pass is **self-confirmation**. Label it that way. Do not report it as verification.

## Calibration

One axis is enough for routine work. Consequential and irreversible decisions need two or more, and at least one should be different evidence rather than different framing — reframing alone leaves shared factual gaps intact.

## Failure Signal

Watch for the confidence curve rising while the finding count falls. A review that produces no defects and high certainty has usually measured agreement, not correctness. A verification pass that reports "checked, correct" without naming its method has reported nothing.

## Allergy

Stacked self-critique rounds presented as independent review. Verifying a verification. Treating fluent, well-organized output as evidence of accuracy — coherence is a property of prose, not of facts.

## When to Use

Before shipping anything reviewed only by its author. Before accepting a clean audit. Any time a check came back with no findings.
