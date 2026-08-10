---
id: orthogonal-edit
type: failure
failure_class: scope
domain: engineering, editing, document work
purpose: Work touched things it was never asked to touch. The requested change is correct and buried inside a much larger diff nobody sanctioned.
confidence: PRACTICED
version: "1.0"
tags: [scope, diffs, editing, engineering, review]
compatible_with: [any-ai]
---

# Orthogonal Edit

## The Failure

Adjacent problems are visible while working, and fixing them feels helpful. Formatting gets normalized, a nearby weakness gets improved, a fifty-line change becomes five hundred. Each individual edit is defensible. Together they make the requested change unreviewable, because the reviewer can no longer see it.

The cost is not the extra work — it is that the sanctioned change and the unsanctioned ones now ship or fail together.

## Detection Signal

- A diff substantially larger than the request implies.
- Files touched that the request never named.
- Improvements the operator did not ask for, described as cleanup.
- A summary that lists more accomplishments than the brief had asks.

## The Fix

State the blast radius before starting: which files, which sections, nothing else. Anything worth fixing outside that radius gets recorded as a separate finding, not performed. If the requested change genuinely cannot be made without a wider edit, stop and say why — that is a scope conversation, not a judgment call to make alone.

Solve the problem at the size it was given.

## Often Mistaken For

Initiative and thoroughness. It reads as helpful and reviews as noise.

## When to Check

Before submitting any change, and any time the work felt like it grew.
