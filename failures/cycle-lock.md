---
id: cycle-lock
type: failure
domain: agent execution, orchestration, multi-agent
purpose: The same work repeats with near-identical inputs and no progress, while cost accrues at full speed. Nothing errors, so nothing stops it.
confidence: PRACTICED
version: "1.0"
tags: [loops, orchestration, cost, termination, multi-agent]
compatible_with: [any-ai]
---

# Cycle Lock

## The Failure

A step retries with arguments that differ only cosmetically. Two roles hand the same artifact back and forth, each treating the other's output as new input. A plan re-derives itself every pass because nothing records that the pass already happened.

Rate limits do not save you here — every call is individually legitimate. Only progress measurement catches it.

## Detection Signal

- The same operation with near-identical arguments three times.
- An artifact modified repeatedly without its content converging.
- Handoffs between two roles with no third state ever reached.
- Elapsed cost rising while the open-question list stays the same length.

## The Fix

Define termination before starting: what condition ends this, and what is the step ceiling. Track a progress key — a hash of the artifact, or the count of resolved questions — and halt when it fails to move across consecutive passes. Any repetition past three of the same operation escalates to a human rather than retrying.

In multi-role work, forbid unbounded ping-pong: a handoff must change state, not just custody.

## Often Mistaken For

Thoroughness. A long-running loop looks like diligence right up until the bill arrives.

## When to Check

Any autonomous run, any multi-role handoff, any retry path.
