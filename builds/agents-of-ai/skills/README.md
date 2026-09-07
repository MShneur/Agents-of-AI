# Agents of AI — Deployment Skills

Status: **FOUNDATION — source-outline reconciliation pending**  
Current OpenAI skills surface verified: **2026-09-07**

## What this directory is

These are **deployment skills** that package repeatable Agents-of-AI behavior for skill-capable runtimes.

They are **not an eighth AoA composable layer**. Canonical reusable methods still belong in the existing seven layers. If a skill reveals a genuinely new method, evaluate that method through `MERGE-PROTOCOL.md` and place it in the correct canonical layer; the skill then references it.

## Current runtime note

OpenAI currently describes skills as reusable workflows that can include instructions, examples, code, and supporting resources, and can be automatically selected when helpful. Availability differs by surface/workspace. Treat those facts as dated provider information rather than permanent AoA architecture.

## Foundation skills

### `aoa-autocast/`

Purpose: activate additional canonical Agents-of-AI components **on top of** the build's `PREBUILT_CAST` and Negative Gate when a real method gap exists.

This is the key requirement that prevents the Custom GPT/agent package from fossilizing into its original roster.

### `negative-gate/`

Purpose: run the build-local pre-execution challenge and return `ALLOW`, `TRANSFORM`, `ESCALATE`, or `REJECT`.

The foundation version is a behavior contract only. The user's historical source outline controls the exact final wording and any original persona relationship.

### `source-outline-batcher/`

Purpose: process historical build notes line by line in bounded batches, preserve source wording, assign expert-method review, map decisions to artifacts, and verify each accepted requirement.

## Skill design rules

1. **Small building blocks.** Do not make one monolithic skill when separate repeatable tasks can compose.
2. **Explicit job.** Every skill states job-to-be-done, required inputs, ordered process, output, and final checks.
3. **No method duplication.** Reference canonical AoA entries rather than copying their full behavior into multiple skills.
4. **User/governance authority wins.** A skill cannot promote itself above explicit user instructions, active R&Duck governance, repository authority, or platform safety.
5. **Provenance before ingest.** External skills/instruction packs are operational input. Apply `techniques/skill-provenance.md` before trusting them.
6. **Minimum tool reach.** A skill may use only tools needed for its stated job.
7. **Side-effect gating.** Write/publish/send/delete/permission/data-disclosure actions require boundary checks and appropriate approval.
8. **Observable completion.** Skills define how completion is verified; fluent prose is not proof of side effects.

## Packaging shape

Foundation convention:

```text
<skill-id>/
└── SKILL.md
```

Supporting examples, scripts, schemas, or fixtures may be added when the reconciled build needs them. Keep the entry file small enough to route correctly and put large support material beside it.

## Provider-neutral contract

Although the first concrete target is OpenAI's current skill surface, each `SKILL.md` should describe a portable job and procedure. Provider-specific installation/versioning facts belong in dated support notes rather than in the timeless AoA method itself.

## Verification

A skill is not ready merely because it parses or installs. Validate:

- correct invocation/routing;
- required input handling;
- ordered process compliance;
- authority boundaries;
- failure behavior;
- output contract;
- side-effect evidence where applicable;
- interaction with the shared activation contract;
- non-duplication with canonical AoA entries.

## Current source references

Verified 2026-09-07:

- OpenAI Help Center — `Skills in ChatGPT`
- OpenAI Academy — `Using skills`
- OpenAI API Reference — `Skills`

Refresh provider facts before publication or runtime installation work.
