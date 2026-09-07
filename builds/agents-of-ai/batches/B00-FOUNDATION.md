# B00 — Foundation Batch

Date: **2026-09-07**  
Status: **DONE / HOLD FOR HISTORICAL SOURCE OUTLINE**  
Branch: `build/agents-of-ai-product-surface-2026-09-07`

## Scope

This batch establishes only the reversible scaffolding needed to receive the user's historical Custom GPT / agent / skills outline safely.

It is **not** a historical source-outline reconciliation batch. The exact prior-chat outline was not supplied in this batch, so no historical source lines are invented or frozen here.

## Current task requirements captured

The foundation implements these explicit current requirements:

1. create a new Agents-of-AI section for a Custom GPT build, agent build, and skills;
2. process the full historical build outline line by line once supplied;
3. work in bounded batches;
4. use expert-level named practitioner methods for each part rather than generic AI personas;
5. analyze and improve the outline rather than copying it blindly;
6. build the improved result in the repository;
7. preserve the build's pre-built personas and Negative Gate once their exact historical details are supplied;
8. **also activate additional Agents-of-AI components on top of the pre-built personas and Negative Gate when the task needs them**;
9. run beneath R&Duck governance when R&Duck is active.

## Named method seats

Foundation methods are sourced in `../EXPERT-METHOD-SOURCES.md`.

- Method / structure: Michael Nygard + Daniele Procida
- Agent design / operator: Lilian Weng + Andrew Ng
- Evidence / evaluation: Chip Huyen + Hamel Husain
- Adversary: Simon Willison + Johann Rehberger
- Affected-user fit: Indi Young + Erika Hall

These practitioners did not participate in or endorse this project. Their published methods were used as external review lenses.

## Decisions

| ID | Requirement | Improvement / rationale | Disposition | Artifact | Verification |
|---|---|---|---|---|---|
| B00-D01 | New AoA build section | Create a `builds/` product surface, not an eighth composable layer | TRANSFORM | `builds/README.md`, `ADR-0001...` | repo diff preserves seven canonical layers |
| B00-D02 | Custom GPT build | Separate runtime packaging from canonical methods; date current OpenAI facts | STRENGTHEN | `custom-gpt/BUILD.md` | content inspection + current docs check |
| B00-D03 | Agent build | Manager owns intent/governance by default; specialists are dynamically composed | STRENGTHEN | `agent/BUILD.md` | content inspection + current SDK docs check |
| B00-D04 | Skills | Treat skills as deployment packaging, not canonical eighth layer | TRANSFORM | `skills/README.md` | repo ontology check |
| B00-D05 | Pre-built personas | Preserve exact historical roster but do not guess it before source arrives | DEFER | `PREBUILT_CAST` placeholder across build | no invented roster in diff |
| B00-D06 | Negative Gate | Preserve exact historical design later; establish minimum safe behavior contract now | STRENGTHEN + DEFER historical wording | `ACTIVATION-CONTRACT.md`, `negative-gate/SKILL.md` | provisional labeling + acceptance cases |
| B00-D07 | Activate AoA in addition to defaults | Make method-gap driven dynamic activation binding after Negative Gate | STRENGTHEN | `ACTIVATION-CONTRACT.md`, `aoa-autocast/SKILL.md` | AOA-E02 / AOA-E03 / AOA-E04 |
| B00-D08 | Line-by-line work | Use 20–40 lines or semantic units with exact source, disposition, artifact, verification | STRENGTHEN | `SOURCE-OUTLINE-BATCH-PROTOCOL.md`, batcher skill | protocol completeness check |
| B00-D09 | Named experts | Use real practitioners' retrievable public methods; no invented composites/endorsement | STRENGTHEN | `EXPERT-METHOD-SOURCES.md` | source links retrievable on 2026-09-07 |
| B00-D10 | Improve rather than obey flawed mechanics | Negative Gate can ALLOW/TRANSFORM/ESCALATE/REJECT while preserving outcome | STRENGTHEN | activation/gate docs | AOA-E05–AOA-E08 |
| B00-D11 | External AoA/skill loading | Apply instruction provenance before operational loading | STRENGTHEN | activation/autocast docs | AOA-E09 |
| B00-D12 | Verification | Evaluate end-to-end success first, then routing/tool diagnostics; decorrelate load-bearing checks | STRENGTHEN | `EVALS.md` | acceptance matrix present |

## Cross-examination

### Objection: `builds/` adds another top-level concept

Disposition: **MITIGATED**. It is explicitly a packaging surface, not a composable layer, and all canonical methods remain in the seven existing layers.

### Objection: dynamic AoA activation can become persona bloat

Disposition: **MITIGATED**. Activation requires a named method gap and deduplication; decorative stacking is an explicit failure case.

### Objection: Negative Gate could become a veto persona that slows everything

Disposition: **MITIGATED**. `ALLOW` is a first-class result; routine authorized reversible work should pass without unnecessary Human Gate friction.

### Objection: a rejected path might be routed to another specialist until one agrees

Disposition: **ACCEPTED / design changed**. `aoa-autocast` cannot run after `REJECT` merely to route around the gate.

### Objection: provider documentation will stale

Disposition: **MITIGATED**. OpenAI-specific facts are dated and separated from timeless AoA semantics; final packaging requires refresh.

### Objection: the foundation may accidentally overwrite the historical design

Disposition: **ACCEPTED / design changed**. Exact `PREBUILT_CAST` and historical Negative Gate specifics remain unresolved placeholders until source reconciliation.

## Verification performed

### Repository diff

- branch is based directly on current `main`;
- foundation changes add only `builds/` content;
- no canonical persona/agent/workflow/technique/mode/team/failure entry was edited;
- no `main` merge/release occurred.

### Current documentation checks

Verified against current authoritative OpenAI sources on 2026-09-07:

- GPT configuration/availability and apps-vs-actions constraint;
- Agents SDK base agent and manager-vs-handoff pattern;
- Agents SDK guardrail/tool-boundary concepts;
- current ChatGPT/OpenAI skills description and availability.

### Not run

- historical source-line reconciliation — source not yet supplied;
- exact pre-built persona validation — source not yet supplied;
- exact historical Negative Gate validation — source not yet supplied;
- executable agent-runtime tests — code intentionally not frozen before source reconciliation;
- Custom GPT Preview tests — final configuration not yet assembled;
- installed skill runtime tests — foundation files only.

## Batch result

**PASS for reversible foundation.**

**HOLD for historical build reconciliation before production completion or merge.**

Next batch starts from the first supplied section of the historical build outline and follows `SOURCE-OUTLINE-BATCH-PROTOCOL.md` line by line.
