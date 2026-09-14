---
id: model-relay
type: workflow
trigger: >
  Invoked by name: "model relay", "rotate models", "next model", "use the best model next".
purpose: >
  Let an active model complete the role it is best suited for, then hand the unresolved next step to another model/runtime only when there is a concrete capability advantage. The relay is orchestration-by-contract, not model self-mythology.
anti-goal: >
  Will not assume provider-native tools from a model name, force every model to touch every task, rotate for novelty, or ask the relay controller to interpret the substantive conversation.
steps: 6
agents_used: [conductor, scout]
personas_used: [compass, provenance]
confidence: EXPERIMENTAL
version: "1.0"
tags: [multi-model, relay, handoff, rotation, perplexity, orchestration, runtime]
compatible_with: [any-ai]
---

# Model Relay

## Purpose

Model Relay is a lightweight multi-model workflow. The AI does the reasoning; the external relay controller only reacts to a strict terminal command.

The controller does **not** need to understand the conversation, evaluate the work, or know why one model is better. It only needs to recognize the terminal line and perform the requested host action.

Use `modes/plex.md` as the default runtime stance for every relay participant.

## Protocol

### 1. Enter under PLEX

The active model silently grounds in the current host/runtime and available tools.

Do not assume original-provider integrations from the model label.

### 2. Take one bounded role

The active model identifies the highest-value role it can perform for the current unresolved work and executes that role.

Examples:

- retrieval-heavy model/runtime -> current source discovery;
- reasoning-heavy model/runtime -> contradiction and decision analysis;
- coding-capable runtime -> implementation and tests;
- vision-capable runtime -> image/document extraction.

These are role examples, not permanent brand assignments.

### 3. Finish the role before routing

Do not rotate because another model is fashionable or marginally different.

Stay on the current model while it remains materially fit for the next unresolved step.

### 4. Choose one terminal action

Every relay-aware response ends with exactly one terminal line:

```text
[[AOA::CONTINUE]]
```

Current model/runtime remains the best fit.

```text
[[AOA::RELAY:MODEL_LABEL]]
```

A different model/runtime has a material advantage. The response should state one concise reason immediately before the terminal line.

```text
[[AOA::HUMAN]]
```

A consequential choice genuinely requires the human owner.

```text
[[AOA::HALT]]
```

The requested work is complete.

The terminal line must be the final non-whitespace content in the response.

### 5. External controller acts mechanically

The relay controller may be a human, userscript, browser automation, or host-native orchestrator.

It performs only the terminal action:

- `CONTINUE` -> send the configured continuation prompt;
- `RELAY` -> switch to the named model/runtime when that option exists, then send the relay bootstrap;
- `HUMAN` -> stop;
- `HALT` -> stop complete.

The controller does not parse the body of the answer to decide what the AI meant.

If the requested model is unavailable, do not silently substitute. Pause or invoke the configured fallback policy.

### 6. Re-enter without restart

After a model switch, inject only a compact bootstrap such as:

```text
Activate PLEX and Model Relay. Continue the existing task from the conversation context; do not restart or repeat completed work. Perform the unresolved role best suited to this active runtime. End with exactly one Model Relay terminal line.
```

The new model is responsible for grounding itself, understanding the existing context, and deciding whether to continue or relay again.

## Optional Model Recommendation

When the active model believes another model is materially better, it may include a concise recommendation immediately before the relay marker:

```text
Next model recommendation: MODEL_LABEL — one specific reason tied to the unresolved task.
[[AOA::RELAY:MODEL_LABEL]]
```

Do not produce a capability essay or benchmark table unless explicitly requested.

## Native Host Rule

If the host already provides a native model-council/orchestrator that satisfies the user's goal, prefer it over manually rotating models.

If the host only offers a model selector, sequential relay is appropriate.

## Failure Recovery

A relay-aware run has one syntactic contract: exactly one valid terminal line at the end.

If the model omits or corrupts the terminal line, the controller may send a fixed reground message without analyzing the conversation:

```text
You strayed from the active Model Relay protocol. Reground in the existing conversation and continue without restarting. Follow the active AoA instructions. Your response must end with exactly one valid Model Relay terminal line.
```

After repeated protocol violations, stop for the human rather than building more interpretation logic into the controller.

## Integration with Other AoA Components

Model Relay does not implement Human Gate, Cleanerz, Quorum, or other AoA components.

Those components remain independent and may be invoked by reference. If another component needs to interrupt the relay, it should ultimately return one of the terminal actions above or its own explicitly registered terminal action.

The relay controller should know **identifiers and terminal commands**, not the internal meaning of every AoA workflow.

## Allergy

Controller-side reasoning. Brand-based model ranking. Endless rotations. Re-reading the whole conversation to infer state. Duplicating Human Gate or Cleanerz inside the relay. Silent model substitution.