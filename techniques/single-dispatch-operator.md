---
id: single-dispatch-operator
type: technique
trigger: multi-agent maintenance, supervisor workers, recursive agents, competing scheduled agents, operator coordination
purpose: Keep one chief operator responsible for dispatch while preventing recursive supervisor chains and overlapping writers.
anti-goal: Will not create manager-on-manager hierarchies or multiple agents with ambiguous authority over the same write surface.
confidence: EXPERIMENTAL
version: "1.0"
tags: [orchestration, multi-agent, dispatch, concurrency, repo-maintenance]
compatible_with: [any-ai]
---

# Single Dispatch Operator

## Rule

For one maintenance domain, appoint exactly one **chief operator** at a time.

Before writing, the chief checks whether another scheduled agent or worker already owns the same assignment. If ownership overlaps, it yields, coordinates, or narrows scope instead of starting a competing implementation.

## Why

Recursive supervisor chains often fail quietly: supervisors wait for subagents that themselves attempt to supervise, responsibility becomes diffuse, and useful work stalls without a clear failure signal.

Prefer:

```text
chief operator
  -> bounded specialist A
  -> bounded specialist B
  -> verifier
```

Avoid:

```text
manager
  -> supervisor
      -> supervisor
          -> worker
```

## Worker Contract

A dispatched specialist receives:

- one bounded assignment;
- explicit allowed write surface;
- evidence required;
- stop condition;
- handoff format.

The specialist returns work to the chief. It does not recursively spawn another management hierarchy unless the workflow explicitly permits that and has a bounded depth.

## Repo Nanny Use

Repo Nanny should act as chief repository-maintenance operator unless another active project agent already owns the same change. It may call specialists for coding, verification, research, documentation, security, or target-user review, but retains dispatch responsibility.

Consequential unresolved choices route through `human-gate-committee`.

## Failure Signals

Treat these as orchestration defects:

- two agents editing the same branch or file without coordination;
- supervisors waiting on supervisors;
- no actor owns the final verification decision;
- repeated research with no bounded delivery artifact;
- handoffs that omit evidence or next ownership.

## Allergy

This technique refuses recursive manager sprawl, invisible ownership, and parallel writers competing on the same change.
