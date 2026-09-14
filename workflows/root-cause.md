---
id: root-cause
type: workflow
purpose: Identify why a failure happened and what should change by diagnosing complete execution paths independently, testing causal factors, and refusing to stop at the first plausible explanation.
steps: 11
agents_used: [tracker, auditor]
personas_used: [gridlock, wireframe]
confidence: PRACTICED
version: "2.0"
tags: [operations, debugging, incidents, analysis, post-mortem, causality, ablation, five-whys]
compatible_with: [any-ai]
---

# Root Cause

## Purpose

Understand what actually happened, why, and what should change. This workflow is not blame assignment and it is not a hunt for the first workaround that happens to pass.

The unit of diagnosis is the **complete execution path**. A browser on one host, a direct HTTP client on the same host, a queued worker, and the same operation through another provider are different paths until evidence proves otherwise.

**Do not transfer a causal claim from one path to another until it has been reproduced there.**

## Evidence states

Use the strongest state actually supported:

1. `OBSERVED` — outcome happened once.
2. `REPRODUCED` — same path/outcome repeated independently.
3. `FACTOR_MAPPED` — material path differences and candidate factors recorded.
4. `ISOLATED` — a controlled perturbation changed the outcome and restoration reversed it, or equivalent strong causal evidence exists.
5. `TRANSFER_TESTED` — the result survives a clean run plus another representative input/workload/environment dimension.
6. `CERTIFIED` — minimum working conditions, known breakers, limits, remaining unknowns, and evidence are documented.

Do not say "root cause known" before `ISOLATED`. Prefer `CERTIFIED` for shared infrastructure, consequential repairs, or conclusions that will steer future architecture.

## Steps

### 1. DEFINE THE OUTCOME

State what success actually means.

Record:
- expected useful output or behavior;
- correctness and provenance requirements;
- unacceptable false positives;
- cost/rate/time constraints;
- what counts as containment, workaround, repair, and final completion.

A 200 response, process exit 0, or "looks correct" is not success unless it satisfies the actual goal.

### 2. ENUMERATE PATHS

List every materially different route with its own path ID.

Differences that can create independent paths include:
- host or cloud;
- browser/runtime/engine;
- direct request vs browser-origin request;
- provider or region;
- queue, webhook, bridge, worker, or scheduler;
- cold vs stateful lifecycle when state is material;
- direct deep link vs normal application flow;
- same model family on a different serving provider.

Do not merge path rows merely because the high-level operation is the same.

### 3. REPRODUCE NATURAL BASELINES

Run each relevant path in its ordinary configuration before modifying it.

Classify each result:
- `PASS` — transport and useful output satisfy the goal;
- `PARTIAL` — transport works but output is incomplete or semantically insufficient;
- `FAIL` — the route ran fairly but did not produce the required result;
- `BLOCKED` — a provider/runtime dependency prevented a fair test;
- `UNTESTED` — not exercised.

Keep quota/environment blockers distinct from target failures.

### 4. CAPTURE A PATH SIGNATURE

Record one wide diagnostic event for the run rather than scattering the context across unrelated logs.

At minimum consider:
- host/runtime: OS, architecture, versions, sandbox/container, resource saturation/errors;
- handoff/control plane: caller/callee, queue/webhook/MCP/spool, serialization, retries, timeout, concurrency, actual jitter;
- application lifecycle: cold/warm state, initialization sequence, storage/session state, request order and pacing;
- network/provider: DNS, egress/region, proxy state, quota/rate state, cache/CDN/origin indicators when observable;
- target/service: exact operation, transport result, backend indicators, useful payload semantics, latency, and yield.

Capture only what is permitted and relevant. The goal is explanatory context, not indiscriminate data collection.

### 5. FORM HYPOTHESES WITH PREDICTIONS

Generate competing explanations from actual path differences.

For each hypothesis, write:
- what factor or interaction it names;
- what outcome it predicts;
- what observation would falsify it;
- the smallest safe test that distinguishes it from alternatives.

Include timing, queueing, handoff, state, runtime, network, cache/origin, and environmental factors when relevant. Do not reduce a distributed failure to one visible client property without evidence.

### 6. ABLATE IN BOTH DIRECTIONS

Where factors are configurable and safe to test:

**Subtractive:** start from a working/all-on configuration and remove one factor at a time.

**Additive:** start from a minimal/all-off configuration and add one factor at a time.

If individual factors do not explain the outcome, test evidence-driven pairs or small clusters. A factor can be neutral alone and causal only in combination.

Do not blindly enumerate every possible combination. Narrow first, then exhaust the suspicious cluster if needed.

For pipelines, also ablate lifecycle and handoff factors such as cold/warm state, queueing, retries, pacing, concurrency, connection reuse, and provider/runtime wrapper.

### 7. PERTURB AND RESTORE

When practical, require an A -> B -> A test:

1. establish baseline A;
2. introduce treatment B;
3. restore A;
4. verify the outcome returns with the restoration.

This protects against coincidental recovery, hidden session drift, rate-window changes, and unrelated upstream variation.

### 8. TRANSFER TEST

Repeat the isolated finding on:
- a clean process/session;
- another representative input/workload;
- another relevant store/tenant/record/environment dimension when the claim is meant to generalize.

A factor isolated on Path A remains a Path A result until separately demonstrated on Path B.

### 9. NAME THE CAUSE PRECISELY

Separate:
- **trigger** — what started the event;
- **root cause** — the controllable condition that allowed the failure to occur or persist;
- **contributing factor** — increased likelihood or severity;
- **boundary cause** — the nearest observable external boundary is isolated, but the hidden internal mechanism is not knowable from available evidence.

Do not invent an opaque dependency's internal rule merely to make the postmortem sound complete.

### 10. REPAIR AND REGRESSION-TEST

Choose the smallest coherent repair that addresses the isolated cause we control.

Then:
- rerun the natural baseline;
- rerun negative/regression cases;
- restart or clean state when statefulness matters;
- verify correctness, safety, provenance, and performance did not silently weaken;
- label a route-around honestly as a workaround when the external cause remains.

### 11. RANK WITHOUT ERASING ALTERNATIVES

A successful primary path does not delete the other paths.

For every viable route retain:
- current status;
- evidence/certification state;
- useful yield/correctness;
- reliability;
- latency;
- cost/quota behavior;
- operational burden;
- observability;
- independence/fallback value;
- next fair test or exact blocker.

Assign roles such as `PRIMARY`, `FALLBACK`, `VERIFIER`, `SPECIALIST`, `RESEARCH`, or `BLOCKED`.

Pick the path of least resistance only after correctness/safety/semantic hard gates pass. A low-ranked path can remain strategically valuable as an independent verifier or future fallback.

## Progress reporting

Keep operator-facing updates compact unless detailed evidence is requested:

- path/lane tried;
- `PASS | PARTIAL | FAIL | BLOCKED`;
- if failed: next discriminator or repair;
- blocker/gate;
- next step;
- estimated remaining diagnostic steps;
- remaining milestones.

Detailed factor matrices, traces, and evidence belong in durable project state.

## Final review

A final root-cause report states:
- root or boundary cause by affected path;
- minimum conditions for each certified working path;
- what is usable now vs research-only;
- primary path of least resistance;
- ranked fallbacks/verifiers/specialists;
- unresolved gates and explicit unknowns.

## Method roots

This workflow combines established method families rather than treating any one as sufficient:
- controlled experimentation for causal inference;
- scientific-method and drill-down performance analysis;
- utilization/saturation/error checks for resources and queues;
- distributed-systems observability and partial-failure thinking;
- wide structured diagnostic events;
- bounded retries, backoff, and jitter.

Use current task-relevant practitioners and sources when the decision is material. Named practitioners are method lenses, not participants or endorsers.

## Allergy

- Blame assignment
- Cross-path causal transfer without reproduction
- Single-cause thinking before interaction tests are warranted
- Calling a blocker a target failure
- Calling one successful workaround a universal repair
- Blind combinatorial testing with no narrowing hypothesis
- Retry storms
- Vague action items
- Fixes with no verification
- Deleting alternate routes merely because another currently ranks higher
- Stopping at the trigger instead of the root or observable boundary cause
