# Origin

Status: **B01 control-plane foundation complete; later historical batches not yet implemented**

Origin is the **R&D / Master-of-Masters section inside Agents of AI**. The uploaded historical build used the provisional codename **ORION**; current user direction names the product **Origin**. Historical references to ORION are preserved as provenance, not treated as a second product.

Origin does four things:

1. classifies the work and requested outcome;
2. runs the build's pre-built cast and Negative Gate;
3. detects method gaps and selects additional canonical Agents-of-AI components when needed;
4. routes the resulting task through a traceable, testable capability/control plane.

When R&Duck is active, R&Duck remains Prime/autopilot. Origin does not become a competing Prime. When CTRL-AI is active, CTRL-AI remains the policy/governance authority for overlapping user-facing policy choices.

## Historical source protocol

The source is processed in bounded batches. The current batch corresponds to source lines **4557–5149**, historical “Batch 1: control plane.” The source itself requires a stop between batches, so this branch does not pre-implement later Custom GPT, full agent runtime, scraping activation, or domain skill packs.

Source manifest: [`SOURCE-MANIFEST.md`](SOURCE-MANIFEST.md)

## B01 result

The first batch establishes four invariants:

- **Capability routing:** application logic requests a capability; provider/model choice is replaceable data.
- **Explicit task state:** complex work advances through declared states/transitions, not an endless chat loop.
- **Structured traces:** a task is reconstructable from routing, context, tools, quality checks, and outcome while sensitive material is redacted.
- **Evaluation gates:** prompts/personas/routes/policies earn trust through repeatable good/bad/ambiguous/adversarial fixtures.

The implementation is deliberately compatible with a later correction in the same source: the universal core never branches on domain-specific skill, lane, persona, or model names.

## Activation order

```text
INTAKE
→ PREBUILT_CAST
→ NEGATIVE_GATE
→ CLASSIFY TASK / RISK
→ AoA METHOD-GAP SELECTION
→ LOAD / INGESTION GATE
→ CAPABILITY ROUTING
→ EXECUTION
→ VALIDATION / DECORRELATED REVIEW
→ APPROVAL IF REQUIRED
→ TRACE + ARCHIVE
```

Dynamic AoA selection is not permission for live ingestion. Under R&Duck, external AoA ingestion follows R&Duck's explicit-request/confirmed-cast rule.

## Current code

`runtime/origin_core/` is a small executable proof of the B01 contracts:

- provider-neutral capability selection;
- configuration-driven state transitions;
- structured trace redaction.

It is not the full Origin agent.

## Stop condition

**HOLD after B01.** Continue only when the user says to proceed to the next batch.
