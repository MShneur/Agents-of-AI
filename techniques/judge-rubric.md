---
id: judge-rubric
type: technique
domain: quality assurance, editing, review, shipping
purpose: Score output against the brief slot by slot with a fixed rubric, so that fluent, confident, wrong work gets caught — the failure mode that reads best is the one that slips through.
confidence: PRACTICED
version: "1.0"
tags: [review, rubric, quality, evaluation, shipping]
compatible_with: [any-ai]
---

# Judge Rubric

## The Move

Reviewing output by reading it rewards prose quality. A confidently wrong answer is more dangerous than an obviously thin one precisely because it never trips the alarm. Score against the brief instead of reading against taste.

Fixed rubric, scored one to five, every slot every time:

1. **Goal faithfulness** — does it answer what was actually asked, or an adjacent easier question?
2. **Constraint compliance** — every stated constraint, checked individually. One line per constraint, met or not.
3. **Evidence use** — is each load-bearing claim supported, and by what?
4. **Output shape** — format, length, and register as specified.
5. **Unsupported claims** — list them. This slot is never "none"; if nothing is flagged, the pass was too shallow.

Any slot below three blocks the ship. A total score without slot detail is not a review.

## Calibration

Hand the rubric to a checker that differs from the author — a scorer sharing the author's blind spot will award high marks to its own reasoning. Pair with error decorrelation for anything consequential.

## Failure Signal

Uniform high scores. Slot five empty. A review whose commentary paraphrases the work rather than testing it.

## Allergy

Vibes review. "Looks good." Scoring the writing when the brief asked about the thinking. Letting a rubric become a checkbox ritual that never blocks anything — a gate that has never failed is not a gate.

## When to Use

Before anything ships to an external audience, and on any output where being wrong costs more than being late.
