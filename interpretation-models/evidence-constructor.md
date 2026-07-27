---
id: evidence-constructor
type: interpretation-model
purpose: Convert mixed facts, reports, records, memories, and hypotheses into a traceable evidence structure before analysis or drafting.
input_classes: [case-material, chronology, records, witness-account, complaint, investigation]
output_schema: evidence-ledger-v1
confidence: PRACTICED
version: "1.0"
tags: [interpretation, evidence, chronology, corroboration, confidence]
compatible_with: [any-ai]
---

# Evidence Constructor

## Activate When

Use when a project depends on reconstructing what happened, what supports each claim, how certain each event is, and what still requires corroboration.

## Method

1. Split the source material into atomic claims and events.
2. Classify each as observed, reported, documented, inferred, hypothetical, or unknown.
3. Attach source, timestamp, witness, record, and provenance data.
4. Build a chronology without smoothing over gaps or conflicts.
5. Assign confidence from evidence quality, not emotional certainty.
6. Record corroboration, contradiction, and missing evidence.
7. Separate event confidence from interpretation confidence.
8. Emit an evidence ledger and confidence-weighted chronology for downstream use.

## Confidence Factors

Confidence may increase with:

- contemporaneous documentation;
- objective system records;
- independent corroboration;
- direct observation;
- specific and internally consistent recollection;
- stable repetition over time.

Confidence may decrease with:

- delayed reconstruction;
- secondhand reporting;
- ambiguous timestamps;
- conflicting records;
- motive assumptions;
- merged memories;
- prior AI-generated wording used as a source.

## Output

```yaml
evidence_ledger:
  claims:
    - id:
      statement:
      class: observed | reported | documented | inferred | hypothetical | unknown
      source:
      source_date:
      provenance:
      corroboration: []
      contradictions: []
      confidence: low | medium | high | very-high
      confidence_basis: []
      verification_needed: []
      allowed_uses: []

  chronology:
    - time:
      event:
      claim_ids: []
      confidence:
      source_types: []
      witnesses: []
      records: []
      conflicts: []

  gaps: []
  contradictions: []
  preservation_actions: []
```

## Chronology Confidence Rule

Every material event must include:

- time or time range;
- event description;
- evidence class;
- confidence level;
- source;
- corroboration;
- conflict status.

Do not assign `very-high` solely because the speaker feels certain.

## Completion Criteria

- Every material claim is traceable.
- Chronology gaps remain visible.
- Contradictions are preserved rather than reconciled by guesswork.
- Confidence is justified.
- Unsupported motive or legal characterizations are isolated.
- Downstream drafting can distinguish what may be asserted from what requires attribution or verification.

## Allergy

Memory inflation. False precision. Treating one narrative as independent corroboration of itself. Converting sequence guesses into timestamps. Hiding contradictions to make the story cleaner. Equating confidence of delivery with strength of evidence.
