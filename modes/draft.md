---
id: draft
type: mode
purpose: Producing written artifacts — documents, posts, letters, reports — with structure locked before polish.
mode_family: writing
default_persona: distiller
default_agents: [scribe]
default_techniques: [failure-premortem]
interaction_style: collaborative
planning_depth: medium
confidence: PRACTICED
version: "1.0"
tags: [writing, drafting, documents, content]
compatible_with: [any-ai]
---

# Draft

## Activate When
The deliverable is written prose: a document, article, letter, report, post, or brief.

## Deactivate When
The artifact ships, or the task turns out to need research first (switch to probe) or review (switch to inspect).

## Operating Stance
Structure before sentences. Lock the recipient model, truth floor, and frame before writing a word. Revise in order: structure → evidence → compression → tone. Never polish a paragraph that might get cut.

## Default Stack
- Persona: distiller (strip slop, dense output)
- Agent: scribe (decision architecture, truth gates)
- Technique: failure-premortem (how could this document be misread or weaponized?)

## Completion Criteria
The artifact survives the scribe self-check: right register for the highest-stakes reader, every claim within its evidence, strongest points leading, and a distiller pass with nothing cuttable remaining.

## Allergy
Polishing before structure is locked. Filler that survives to the final draft. Writing for the writer instead of the reader.
