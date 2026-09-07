---
name: source-outline-batcher
description: Reconcile a historical build outline line by line in bounded batches, preserving original wording while improving each requirement with named practitioner methods, explicit dispositions, artifact mapping, and verification.
---

# Source Outline Batcher

## Job to be done

Turn the user's historical Agents-of-AI Custom GPT / agent / skills build notes into an improved repository implementation **without losing lines, rewriting history, or treating old chat output as unquestionable specification**.

## Required inputs

- source outline text or files;
- exact source ordering where available;
- target build area(s);
- current repository state;
- governing R&Duck/AoA rules;
- current runtime documentation for product-specific claims.

## Batch size

Default to **20–40 source lines** or one naturally coupled semantic unit.

Use smaller batches for:

- pre-built persona roster/ordering;
- Negative Gate identity/logic;
- architecture forks;
- security/privacy/permission behavior;
- publishing/release behavior;
- irreversible integrations.

## Process

1. **Freeze source.** Preserve the exact source lines and assign stable ids such as `B03-L017`.
2. **Hash/reference.** Record the source artifact/path and a stable hash/reference when practical.
3. **Classify.** Tag each line as shared contract, Custom GPT, agent runtime, skill, pre-built cast, Negative Gate, AoA activation, governance, integration, evaluation, or documentation.
4. **Select expert-method seats.** Use named practitioners whose published methods actually address the batch. Do not use a permanent decorative roster.
5. **State non-endorsement.** The practitioners did not participate; their published methods are review lenses.
6. **Interpret.** Write what each line appears to require without yet rewriting it.
7. **Challenge.** Identify contradiction, stale runtime assumptions, authority expansion, duplicate AoA methods, injection risk, brittleness, unclear scope, or unverifiable claims.
8. **Improve.** Write an implementation-ready requirement that best preserves the user's intended outcome.
9. **Dispose.** Assign exactly one primary disposition: `KEEP`, `STRENGTHEN`, `MERGE`, `SPLIT`, `TRANSFORM`, `REJECT`, `HUMAN_GATE`, or `DEFER`.
10. **Map artifact.** Name the exact repo path changed or planned.
11. **Define verification.** State observable proof for the improved requirement.
12. **Build scoped changes.** Avoid orthogonal edits.
13. **Verify.** Record `PASS`, `FAIL`, `PARTIAL`, or `NOT RUN`.
14. **Decorrelate load-bearing checks.** Use a different method/agent/test/source/runtime observation from the authoring path where feasible.
15. **Close or carry.** Every deferred line keeps its explicit dependency and returns in a later batch.

## Per-line output

```yaml
source_id: BNN-LNNN
source: <exact original wording>
interpretation: <what it requires>
ambiguity_or_risk: <none or issue>
expert_method:
  practitioner: <name or NONE>
  published_method: <method/source>
improved_requirement: <implementation-ready requirement>
disposition: KEEP | STRENGTHEN | MERGE | SPLIT | TRANSFORM | REJECT | HUMAN_GATE | DEFER
artifact: <repo path>
verification: <observable check>
result: PASS | FAIL | PARTIAL | NOT_RUN | PENDING
```

## Expert rule

For consequential review, follow `workflows/quorum.md` rather than inventing expert personas:

- source real practitioners' documented public methods at convening time;
- do not fabricate quotes, positions, or participation;
- do not extrapolate a practitioner's method beyond what it addresses;
- preserve genuine dissent;
- disposition objections explicitly;
- route unresolved consequential choice to Human Gate.

## Historical cast and Negative Gate

These are identity-bearing source areas.

Before their source lines are available:

- keep `PREBUILT_CAST` unresolved;
- use only the foundation Negative Gate behavior contract;
- do not infer names/order from the current AoA roster;
- do not substitute a new expert panel for the historical design.

When those lines arrive, reconcile exact historical intent first, then improve runtime implementation transparently.

## Runtime facts

Any line that depends on a current product surface — for example GPT creation eligibility, actions/apps limitations, Agents SDK guardrail behavior, skill packaging, model/tool support, or workspace permissions — must be checked against current authoritative documentation before being accepted as current.

## Batch close criteria

Do not mark a batch complete until:

- every frozen line appears in the ledger;
- every non-deferred line has a primary disposition;
- every accepted/improved line maps to an artifact;
- verification is explicit;
- unresolved consequential decisions are Human-Gated;
- no canonical AoA method was duplicated merely because the deployment target differs;
- no unrelated repository change is hidden in the batch.

## Failure signals

- source lines vanish into summary prose;
- historical wording is overwritten rather than preserved;
- a named expert has no retrievable published method;
- the expert panel is treated as if it personally met;
- stale platform facts are accepted without checking;
- all dissent is smoothed into consensus;
- `DEFER` items disappear;
- pre-built cast or Negative Gate specifics are guessed;
- a deployment skill is promoted into an eighth AoA layer;
- a batch claims verification that was not run.
