# Agents of AI — Builds

`builds/` contains deployable product/runtime packaging built from the canonical Agents-of-AI library.

It is **not an additional composable layer**. Canonical methods remain in:

`personas/` · `agents/` · `workflows/` · `techniques/` · `modes/` · `teams/` · `failures/`

## Current builds

### [`agents-of-ai/`](agents-of-ai/)

Agents-of-AI product packaging for:

- a Custom GPT configuration;
- an agent runtime;
- reusable deployment skills.

The build preserves its historical pre-built persona cast and Negative Gate once the user's source outline is reconciled, then dynamically activates additional canonical AoA components when the task requires methods beyond that default cast.

When R&Duck is active, R&Duck remains governance/Prime and this build runs beneath it as cast/capability packaging.

## Build rule

A runtime target is not a reason to duplicate a method. If the behavior already exists in a canonical AoA entry, the build references/composes that entry. If genuinely new reusable reasoning emerges during build work, apply `../MERGE-PROTOCOL.md` and place it in the correct existing layer.
