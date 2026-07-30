---
id: project-state-reconstruction
type: interpretation-model
purpose: Rebuild the current state of a long-running project from scattered conversations, files, corrections, decisions, and superseded drafts before new work begins.
input_classes: [multi-chat-project, long-running-project, handoff, resumed-work, conflicting-drafts]
output_schema: project-state-packet-v1
confidence: PRACTICED
version: "1.0"
tags: [interpretation, project-state, continuity, corrections, handoff]
compatible_with: [any-ai]
---

# Project State Reconstruction

## Activate When

Use when work has evolved across multiple chats, branches, files, agents, or models and the current truth cannot be safely inferred from the latest message alone.

Typical signals:

- the user says "continue where we left off";
- several drafts contain conflicting facts or instructions;
- the project has locked and retired language;
- prior AI summaries may be incomplete;
- decisions were made incrementally;
- the current task depends on unresolved or superseded work.

## Method

1. Identify all available project sources and their provenance.
2. Extract explicit decisions, corrections, constraints, open questions, and deliverables.
3. Build a decision history rather than trusting the newest polished draft.
4. Classify project statements as current, superseded, disputed, proposed, or unresolved.
5. Apply correction precedence: explicit user correction outranks prior AI text.
6. Separate project truth from artifact wording.
7. Reconstruct the current architecture, active workstream, and next valid action.
8. Record gaps that prevent reliable continuation.
9. Emit a project-state packet before new implementation or drafting.

## Source Precedence

Use this order unless the project defines a stricter rule:

1. explicit current user instruction;
2. explicit prior user correction or approval;
3. governing project files and locked protocols;
4. validated source records;
5. accepted implementation state in the repository;
6. prior assistant summaries;
7. prior AI-generated drafts as leads only.

Recency alone does not establish authority. A newly copied old file may still contain retired instructions.

## Output

```yaml
project_state:
  identity:
    project_name:
    repository:
    branch:
    purpose:

  current_truths: []
  locked_decisions: []
  active_constraints: []
  current_architecture: []

  artifacts:
    completed: []
    active: []
    blocked: []
    retired: []
    planned: []

  language_control:
    locked_language: []
    retired_language: []
    disputed_language: []

  corrections:
    - correction:
      scope: local | factual | structural | governing
      affected_artifacts: []
      propagation_status:

  open_questions: []
  unresolved_conflicts: []
  evidence_or_source_gaps: []

  next_action:
    action:
    prerequisites: []
    prohibited_shortcuts: []

  confidence:
    overall: low | medium | high
    weak_areas: []
```

## Current vs. Superseded Test

For every material statement, ask:

- Was it explicitly approved?
- Was it later corrected?
- Does a governing file override it?
- Is it implemented in the current repository state?
- Is it merely repeated AI wording?
- Does it conflict with a later locked decision?

Do not silently reconcile conflicting instructions. Preserve the conflict until precedence resolves it.

## Branch and Repository Boundaries

Project state must include repository ownership and branch purpose.

Examples:

- private project files remain in the private working repository;
- public demo repositories receive only intentionally released material;
- case-specific branches do not absorb reusable protocol work;
- reusable discoveries are exported separately rather than mixed into the active project.

Similar repository names are not interchangeable.

## Completion Criteria

- The current project goal is clear.
- Active and retired decisions are separated.
- Completed, pending, and blocked artifacts are listed.
- Corrections have known propagation status.
- Repository and branch ownership are explicit.
- The next action follows from the reconstructed state rather than guesswork.
- A fresh agent can continue without repeating settled work or reviving retired assumptions.

## Allergy

Treating the latest summary as ground truth. Reviving superseded instructions. Assuming a polished draft was approved. Mixing branches or repositories by name similarity. Re-asking questions already answered. Continuing from narrative momentum instead of reconstructed project state.
