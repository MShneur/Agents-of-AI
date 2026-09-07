# Disposable Workspace

Status: **FOUNDATION / provider-neutral**

## Problem

An agent that can execute arbitrary code or mutate a real workspace can cause damage before a reviewer notices. Prompt-level promises are not containment, and rollback is unreliable if the agent edits the only copy of state.

## AoA invariant

**Risky experimentation should happen in an isolated, checkpointable workspace with an explicit commit-or-rollback boundary.**

## Lifecycle

```text
BASELINE
  ↓
CHECKPOINT
  ↓
ISOLATED WORKSPACE
  ↓
EXECUTE / EXPERIMENT
  ↓
VERIFY
  ├─ PASS → COMMIT selected state/evidence
  └─ FAIL → ROLLBACK / DISCARD
```

When infrastructure supports it, the workspace may be cloned/forked to explore alternatives in parallel.

## Minimum properties

1. **Isolation.** Agent-generated code/processes cannot freely access the host or unrelated projects.
2. **Scoped filesystem.** Mount only what the task requires; default unrelated paths to unavailable/read-only.
3. **Scoped network.** Allow only required destinations/protocols when feasible.
4. **Credential separation.** Secrets should not be placed inside the workspace when a broker/proxy can mediate approved calls.
5. **Checkpoint.** Preserve a known-good state before consequential mutation.
6. **Rollback.** Failed experiments can be discarded without reconstructing the baseline manually.
7. **State promotion.** Only verified outputs are promoted back to the durable project state.
8. **Evidence export.** Tests/logs/diffs needed for verification can leave the workspace without exporting unrelated sensitive state.
9. **Expiry.** Disposable environments should terminate or pause when no longer needed.

## Risk classes

### Low

Read-only deterministic analysis against public/non-sensitive material may not need a dedicated sandbox.

### Medium

Code execution or dependency installation against project state should use an isolated workspace when practical.

### High

Untrusted code, unknown dependencies, broad filesystem access, external network access, or generated shell commands require a real containment boundary—not an in-process validator pretending to be one.

## Forked evaluation

For uncertain implementation choices:

```text
checkpoint C0
  ├─ fork A → implementation A → verify
  ├─ fork B → implementation B → verify
  └─ compare objective evidence → promote winner or neither
```

This reduces the tendency to keep patching the first approach merely because work has already been invested.

## Human Gate

Isolation reduces blast radius; it does not create authority.

Publishing, spending, sending, changing permissions, destructive production operations, or other consequential external effects still follow active governance/Human Gate requirements.

## Failure signals

- generated code runs directly against the only copy of important state;
- rollback means “ask the model to undo what it remembers doing”;
- API credentials are written into the agent workspace unnecessarily;
- a failed experiment leaves hidden background processes/network changes;
- verification occurs after state was already irreversibly published.

## Sources distilled

- `TencentCloud/CubeSandbox`: microVM isolation, snapshots, clone/rollback, pause/resume, mediated credentials/network policy.
- `NVIDIA-NeMo/labs-OO-Agents`: explicit warning that in-process AST/module checks are defense-in-depth, not containment.
- AoA/R&Duck checkpoint and rollback patterns.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
