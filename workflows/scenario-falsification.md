---
id: scenario-falsification
type: workflow
purpose: Falsify agent-world simulations and dynamical hypotheses against frozen observations and explicit null controls.
steps: 6
agents_used: [scout, stresstest, auditor]
personas_used: [burden, provenance, signal]
confidence: EXPERIMENTAL
version: "1.0"
tags: [simulation, heldout, null, falsification, uncertainty]
compatible_with: [any-ai]
---

# Scenario Falsification

## Purpose
Evaluate simulated worlds without confusing a coherent agent narrative with independent empirical prediction. Use for social behavior, synthetic known dynamics, or physical hypotheses only after classifying the actual process.

## Steps
1. **Classify (Scout + Provenance):** Separate social interaction, synthetic dynamical systems and real physical mechanisms. Done when the simulator can represent the source's causal mechanism, or is restricted to hypothesis generation. No LLM social-agent votes count as independent measurements of a mechanical draw.
2. **Freeze (Auditor):** Pin raw evidence, source hash, target, cutoff, feature availability, future-data exclusion, seed, evaluation metric, budget and privacy rights *before* simulation results. Done when a new evaluator can replay the same blinded split. Stop for missing primary measurements.
3. **Baseline (Signal):** Establish a simple stationary/random null, and optionally a known synthetic system and shuffled negative control. Done when the comparison has a documented expected failure case.
4. **Run (Scout):** Only in an approved isolated runtime with no unapproved data export or paid fallback. Pin engine/model versions, repeated seeds and failure logs. Done when runs and costs can be reproduced; otherwise `NOT_RUN`.
5. **Compare (Stresstest + Burden):** Score independent heldouts and matched-budget ablations, vary model/seed/agent counts and check shared-bias contamination. Done when null and treatment results are recorded without narrative vote inflation.
6. **Route (Auditor):** Decide `REJECT | RESEARCH_ONLY | PROMOTION_CANDIDATE | BLOCKED`; any promotion requires the existing project's prospective replication gate. Done when underlying evidence and outstanding observations are linked.

## Done Condition
A reproducible, bounded comparison or a truthful `BLOCKED/NOT_RUN` result. A synthetic canary tests the harness, not real forecasting ability.

## When NOT to Use
No source data, no testable prediction, simple arithmetic, or a request to install an agent-simulation engine without approval.

## Failure Signal
Future targets appear in the agent graph, or simulated consensus is presented as evidence of physical causation.
