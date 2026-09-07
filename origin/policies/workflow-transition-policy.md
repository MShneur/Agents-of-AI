# Workflow Transition Policy

Complex Origin work is a declared state machine, not an open-ended chat loop.

Rules:

1. A transition is legal only if listed in `workflows/task-lifecycle.yaml`.
2. Required state fields must exist before leaving the state.
3. `NEGATIVE_GATE=REJECT` cannot be bypassed by selecting another persona/provider.
4. Automatic AoA selection does not authorize live ingestion. Apply the governing ingestion gate.
5. `human_gate` blocks only the consequential branch; reversible analysis may continue when governance permits it.
6. Validation failure returns to a declared revision state or rejects the task; it never silently advances.
7. `accepted` is not evidence of an external side effect. External effects require separate execution/post-state verification in later batches.
