---
id: constraint-decay
type: failure
failure_class: drift
domain: long sessions, complex briefs, agent execution
purpose: A rule stated at the start quietly stops being applied. Nobody removed it; it just fell out of the working set and the output violates it without comment.
confidence: PRACTICED
version: "1.0"
tags: [context, constraints, long-sessions, drift, compliance]
compatible_with: [any-ai]
---

# Constraint Decay

## The Failure

Constraints arrive early — format, exclusions, tone, a hard non-goal — and then compete for attention with every turn that follows. Nothing announces their departure. The work keeps looking competent while silently breaking a rule agreed at intake, and the longer the session runs the more confidently it breaks it.

Non-goals decay fastest, because absence is invisible. Nothing prompts a check on a thing that was supposed to not happen.

## Detection Signal

- Output that would have been rejected at turn three but passes at turn thirty.
- A constraint that has not been referenced in many turns.
- The operator restating something they already said.
- Format drifting back toward the default house style.

## The Fix

Keep constraints in a standing block that is re-read before output, not recalled from history. Check non-goals explicitly — ask what was supposed to be absent and confirm it is. Re-anchor at phase boundaries rather than on a turn count, since phase changes are when attention actually shifts.

If a constraint is being dropped deliberately, say so and get agreement. Silent relaxation is the failure; negotiated relaxation is fine.

## Often Mistaken For

Model forgetfulness. It is a persistence design problem — the rule was never given a place to live.

## When to Check

Before any output in a long session, at every phase boundary, and any time the operator repeats an instruction.
