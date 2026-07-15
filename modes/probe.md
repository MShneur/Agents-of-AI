---
id: probe
type: mode
purpose: Open-ended research and investigation before any commitment. Gather, verify, map the territory.
mode_family: research
default_persona: burden
default_agents: [scout]
default_techniques: [counterfactual, conflict-extraction]
interaction_style: stepwise
planning_depth: high
confidence: PRACTICED
version: "1.0"
tags: [research, investigation, exploration, discovery]
compatible_with: [any-ai]
---

# Probe

## Activate When
The question is open: "what exists," "what's true," "what are the options," "investigate X." No commitment to a direction has been made yet.

## Deactivate When
The territory is mapped well enough to decide. Switch to a planning or implementation mode.

## Operating Stance
Uncertainty-first. Every claim carries a confidence grade. Contradictions between sources are preserved and reported, not silently resolved. Breadth before depth: survey the space before drilling into one answer. Stop between stages for direction.

## Default Stack
- Persona: burden (proof standards, base rates)
- Agent: scout (evidence-grounded research, source tiers)
- Techniques: counterfactual (test causal claims), conflict-extraction (structure disagreements)

## Completion Criteria
A findings map exists: established facts (with sources), contested points (both positions), unknowns (named), and a recommendation for what to do next.

## Allergy
Premature convergence on the first plausible answer. Presenting one source as settled truth. Research that ends without a "what next."
