# AoA Interpretation Models

## Definition

An **interpretation model** transforms raw human input into a structured internal representation before a persona, agent, workflow, mode, or team acts on it.

It answers:

> What did the human communicate, what kind of information is it, and what may downstream components safely do with it?

Interpretation models do not solve the task, write the deliverable, research the domain, or govern the system. They prepare trustworthy input for those components.

## Why This Layer Exists

Human input is often not a clean specification. It may combine:

- direct observations;
- secondhand reports;
- uncertain recollection;
- emotional reactions;
- hypotheses about motive or cause;
- transcription errors;
- corrections to earlier statements;
- possible future evidence;
- instructions about the current output;
- ideas intended only for private working memory.

Without an interpretation layer, downstream agents commonly make one of four errors:

1. repeat figurative or emotional language as fact;
2. discard useful material because it is not publication-ready;
3. treat prior AI wording as user-approved source material;
4. patch a local sentence while leaving the same error elsewhere in the project.

Interpretation models create a stable boundary between **what the human said** and **what the system may assert**.

## Position in the AoA Stack

```text
Raw human input
      ↓
Interpretation model
      ↓
Structured interpretation packet
      ↓
Persona / agent / workflow / mode / team
      ↓
Output
```

| Layer | Question |
|---|---|
| Interpretation model | What did the human actually communicate? |
| Persona | Who is reasoning? |
| Agent | How does one operator work? |
| Workflow | In what sequence is work completed? |
| Technique | What single reasoning move is applied? |
| Mode | What runtime stance is active? |
| Team | How do multiple seats work and disagree? |
| Governance | What is allowed, required, or stopped? |

Governance remains outside Agents of AI. A governance system such as CTRL-AI or R-Duck may require an interpretation model, choose one, or reject its output. The model itself does not create binding gates for the host system.

## Classification Test

A candidate is an interpretation model when all are true:

1. It operates on raw or partially processed human input.
2. Its main output is an internal representation, not the requested final deliverable.
3. It separates meaning, evidence status, intent, and routing.
4. Different personas or agents can consume the same output.
5. Removing the downstream task still leaves the interpretation method useful.

Do not classify it as an interpretation model when:

- it merely changes tone or voice — persona;
- it performs research, drafting, auditing, or another operational task — agent;
- it defines a repeatable task sequence — workflow;
- it changes interaction defaults or stopping rules — mode;
- it applies one isolated reasoning move — technique;
- it imposes mandatory system-wide policy — governance.

## Required Frontmatter

```yaml
---
id: intent-reconstruction
type: interpretation-model
purpose: Reconstruct intended meaning from dictated, fragmented, emotional, or self-correcting input before downstream processing.
input_classes: [dictation, fragmented-thought, emotional-input, correction]
output_schema: interpretation-packet-v1
confidence: EXPERIMENTAL
version: "1.0"
tags: [interpretation, intake, intent, evidence, dictation]
compatible_with: [any-ai]
---
```

Required fields:

| Field | Meaning |
|---|---|
| `id` | Stable lowercase identifier. |
| `type` | Always `interpretation-model`. |
| `purpose` | One sentence describing what ambiguity or input failure it resolves. |
| `input_classes` | Raw-input patterns that activate the model. |
| `output_schema` | Named representation produced for downstream use. |
| `confidence` | `EXPERIMENTAL`, `PRACTICED`, or `BATTLE_TESTED`. |
| `version` | Semantic content version. |
| `tags` | Search and composition tags. |
| `compatible_with` | Supported hosts. |

## Standard Output Contract

Every interpretation model must produce an **interpretation packet**. Fields may be empty but may not be silently conflated.

```yaml
interpretation_packet:
  source_input:
    preserved: true
    input_mode: dictated | typed | imported | mixed

  reconstructed_intent:
    current_task: ""
    desired_outcome: ""
    underlying_concerns: []
    future_possible_uses: []

  claims:
    observations: []
    reports: []
    record_dependent: []
    inferences: []
    hypotheses: []
    unknowns: []

  human_state:
    emotions: []
    urgency_signals: []
    impact_statements: []

  controls:
    explicit_constraints: []
    implied_constraints: []
    locked_language: []
    retired_language: []
    corrections: []

  routing:
    current_output: []
    private_memory: []
    verify_before_use: []
    hold_for_later: []
    exclude: []

  confidence:
    overall: low | medium | high
    unresolved_ambiguities: []
```

## Claim Classes

| Code | Class | Rule |
|---|---|---|
| O | Observation | Directly perceived by the speaker. May be stated as fact within the speaker's knowledge. |
| R | Report | Communicated by another person. Attribute it. |
| D | Record-dependent | Requires a document, log, image, timestamp, or other record. Route to verification. |
| I | Inference | Conclusion supported by stated facts. Label as analysis or professional conclusion. |
| H | Hypothesis | Possible explanation requiring evidence. Preserve; do not assert. |
| E | Emotion | Genuine human impact. Preserve separately from proof. |
| G | Goal | Desired result or outcome. Use for planning, not as evidence. |
| C | Constraint | Requirement governing process or output. |
| F | Future lead | Potentially useful later but outside the active artifact. |
| U | Unknown | Unclear wording, term, chronology, or source. Do not guess. |

## Core Operating Rules

### 1. Spirit Before Literal

Recover intended meaning without promoting the speaker's exact wording into a factual claim.

Example:

> "He thinks this is his personal playground."

Interpret as:

```yaml
class: H
meaning: The speaker perceives an expectation of individualized or preferential workflow.
evidence_needed:
  - differences across staffing contexts
  - documented requests outside standard workflow
  - corroborating examples
routing: hold_for_later
```

Do not repeat the metaphor as fact. Do not discard it. Convert it into a testable hypothesis.

### 2. Emotion Is Signal, Not Proof

Emotional language may identify impact, urgency, fear, safety concerns, or accumulated pattern. Preserve it under `human_state`. Do not use it as evidence for motive, causation, or misconduct.

### 3. Source Independence

A prior AI draft is not source evidence and is not user-approved merely because it is labeled `final`, polished, or repeatedly reused.

Priority order:

1. explicit user correction;
2. direct source or record;
3. attributed report;
4. validated inference;
5. prior AI text as a lead only.

### 4. Correction Propagation

Classify each correction:

- `LOCAL` — wording only;
- `FACTUAL` — changes every occurrence of the fact;
- `STRUCTURAL` — changes chronology, emphasis, or artifact architecture;
- `GOVERNING` — changes future handling rules.

For every non-local correction, identify:

- invalidated claims;
- affected artifacts;
- retired wording;
- downstream consequences;
- whether global regeneration is required.

### 5. Preserve Optionality

Material not suitable for the current output must be routed, not erased. Hypotheses, emotional impact, pattern leads, and future evidence belong in private memory or `hold_for_later` until corroborated or requested.

### 6. Output-Purpose Separation

The same interpretation packet may feed multiple artifacts. Each receives only relevant material.

Example:

- safety report → event, hazards, failed barriers, recovery barriers, outcome;
- management communication → governance, organizational effect, requested action;
- private record → full chronology, quotes, reports, evidence leads, emotional impact;
- public statement → verified facts and appropriately bounded conclusions.

### 7. Ask Only When Ambiguity Blocks Safe Routing

Do not make the human translate every emotional or incomplete statement into formal language. Infer cautiously, preserve uncertainty, and ask only when the unresolved ambiguity would materially change the fact pattern, action, or output.

## Lifecycle

```text
1. Detect input class
2. Preserve raw input
3. Reconstruct intent
4. Type claims
5. Separate emotion, goals, and constraints
6. Apply corrections and retire superseded language
7. Route material by purpose
8. Emit interpretation packet
9. Pass packet downstream
10. Re-run when new input changes the representation
```

## Handoff Contract

Downstream components must receive:

- the interpretation packet;
- the active output purpose;
- unresolved ambiguities relevant to that purpose;
- prohibited and retired language;
- source references when available.

Downstream components must not:

- re-promote hypotheses to facts;
- merge reports into direct observations;
- restore retired wording;
- import private-memory material into an artifact without purpose-specific review;
- treat emotional intensity as evidence strength.

## Completion Criteria

An interpretation pass is complete when:

- the current task and desired outcome are identifiable;
- material claims are typed;
- emotion and hypothesis are preserved without being asserted;
- corrections are propagated or explicitly queued;
- each item has a routing status;
- blocking ambiguities are surfaced;
- the packet is usable by a different agent without rereading the entire raw conversation.

## Allergy

Literal transcription presented as understanding. Emotional language promoted to allegation. Useful hypotheses discarded because they are not yet provable. Prior AI text treated as authoritative. Silent guessing. Local patches that leave global contradictions. Forcing the human to pre-edit their own thoughts before the system can understand them.
