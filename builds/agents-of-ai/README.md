# Agents of AI — Build Surface

Status: **FOUNDATION / source-outline reconciliation pending**  
Branch: `build/agents-of-ai-product-surface-2026-09-07`

This directory packages the existing Agents-of-AI library into deployable product forms without creating an eighth composable layer.

The canonical library remains:

- `personas/`
- `agents/`
- `workflows/`
- `techniques/`
- `modes/`
- `teams/`
- `failures/`

`builds/agents-of-ai/` is a **deployment and packaging surface** over those layers.

## Product targets

1. **Custom GPT build** — a ChatGPT GPT configuration package for eligible surfaces.
2. **Agent build** — a runtime-oriented agent package, with OpenAI Agents SDK as the first concrete implementation target while keeping the behavioral contract portable.
3. **Skills** — reusable `SKILL.md` workflows that expose Agents-of-AI behaviors without turning skills into a new AoA library layer.

## Governing relationship

When R&Duck is present, the stack is:

```text
R&Duck governance / Prime Agent
        ↓
Agents of AI build surface
        ↓
PREBUILT_CAST from the build outline
        ↓
NEGATIVE_GATE
        ↓
Dynamic AoA activation
        ↓
Task execution + verification
```

R&Duck remains governance. Agents of AI supplies cast, methods, workflows, techniques, modes, teams, failures, and deployable build packages. Nothing in this directory may override R&Duck Golden Rules, platform safety, explicit human authority, or repository authority files.

## Binding activation rule

**The pre-built personas are a floor, not a ceiling.**

After the pre-built cast and Negative Gate run, the build MUST be able to activate additional Agents-of-AI components when the task requires a method not covered by the default cast.

Dynamic activation may select from all seven AoA layers:

- personas
- agents
- workflows
- techniques
- modes
- teams
- failures

The build must not claim an AoA component ran unless its definition was actually available and loaded. If a live fetch is needed, apply `techniques/skill-provenance.md` before ingesting the instruction text. If retrieval is unavailable, continue with the locally available package and label the unavailable dynamic component rather than inventing it.

## Pre-built cast source of truth

The exact pre-built personas, their order, and the exact historical Negative Gate wording will be reconciled from the user's source outline **line by line**.

Until that source is reconciled:

- use the token `PREBUILT_CAST` rather than inventing names;
- preserve the Negative Gate as a behavior contract, not a guessed persona roster;
- do not fossilize a guessed static cast into production files.

## Build principles

### 1. Method over topic

Use `MERGE-PROTOCOL.md`. Do not create a new component merely because the deployment target changes. A Custom GPT wrapper, agent wrapper, or skill should compose existing AoA entries whenever the underlying method already exists.

### 2. Manager owns the conversation by default

For agent runtimes, prefer a manager/orchestrator pattern when a central controller must keep the task, policy, and final synthesis. Use handoff only when a specialist genuinely needs to take over the conversation.

### 3. Negative Gate before costly or consequential execution

The Negative Gate is a build-local preflight that tests the candidate plan for contradiction, unsupported capability, unsafe authority expansion, brittle or cargo-cult implementation, unverifiable claims, and dangerous side effects. It may ALLOW, TRANSFORM, ESCALATE, or REJECT. It does not silently replace user intent.

### 4. Tool risk is evaluated per side effect

Agent-level input/output checks are not enough for multi-agent workflows. Tool calls that can write, publish, transmit, mutate, or cross a trust boundary require their own guardrails and, where policy requires, human approval.

### 5. Verification is part of the build

A fluent run is not a passing run. Each build target requires explicit success criteria, traces or evidence where available, and decorrelated review for load-bearing claims.

## Batch construction protocol

The full historical build outline will be processed in bounded batches. Every batch uses the source text as intent-bearing evidence, not as unquestionable specification.

For each source line or tightly coupled line group, record:

1. **Source** — the original line(s), unchanged.
2. **Interpretation** — what behavior or requirement the line appears to require.
3. **Risk / ambiguity** — contradictions, stale product assumptions, unsafe authority, duplicated method, or unclear scope.
4. **Expert method** — the named practitioner's published method being applied.
5. **Improved requirement** — the strongest implementation-ready version.
6. **Disposition** — KEEP / STRENGTHEN / MERGE / SPLIT / TRANSFORM / REJECT / HUMAN GATE.
7. **Artifact** — exact repo path changed.
8. **Verification** — what proves the change works.

See `SOURCE-OUTLINE-BATCH-PROTOCOL.md`.

## Named expert method seats for the foundation

These people did **not** participate in or endorse this project. Their published methods are used as external review lenses, consistent with `workflows/quorum.md`.

| Seat | Heavy | Light | Method applied |
|---|---|---|---|
| Method / structure | Michael Nygard | Daniele Procida | Small modular decision records; separate reference, how-to, tutorial, explanation needs |
| Agent design / operator | Lilian Weng | Andrew Ng | Planning, reflection, tool use, multi-agent composition |
| Evidence / evaluation | Chip Huyen | Hamel Husain | Failure-mode evaluation, tool/plan validation, end-to-end success before component diagnostics |
| Adversary | Simon Willison | Johann Rehberger | Prompt-injection/tool-risk boundaries, confused-deputy and side-effect controls |
| Affected-user fit | Indi Young | Erika Hall | Start from user purpose/problem space and research questions, not tool-first implementation |

Foundation sources were re-retrieved on 2026-09-07. The final line-by-line build should re-source any practitioner method that becomes load-bearing to a consequential decision.

## Current OpenAI surface notes

Verified 2026-09-07 against current OpenAI documentation:

- GPTs combine instructions, knowledge, and capabilities; new GPT creation is currently limited by account/workspace eligibility.
- GPT Actions connect a GPT to external APIs; a GPT can use apps or actions, but not both simultaneously.
- OpenAI Agents SDK agents combine instructions, tools, optional handoffs, guardrails, and structured output.
- Manager-style agents-as-tools and handoffs are distinct orchestration patterns.
- Agent input/output guardrails do not automatically protect every downstream tool call; tool guardrails are the right boundary for custom function tools.
- Skills are reusable workflows commonly packaged around a `SKILL.md` file plus supporting resources, and are supported across eligible ChatGPT surfaces, Codex, and the API with surface-dependent availability.

Implementation docs in this directory must keep these product facts dated because they can change independently of the AoA library.

## Files

- `ADR-0001-build-surface-not-eighth-layer.md` — architecture decision and dissent.
- `ACTIVATION-CONTRACT.md` — pre-built cast + Negative Gate + dynamic AoA activation contract.
- `SOURCE-OUTLINE-BATCH-PROTOCOL.md` — line-by-line batch review method.
- `custom-gpt/BUILD.md` — Custom GPT package.
- `agent/BUILD.md` — agent runtime package.
- `skills/` — deployment skills, not an AoA composable layer.
