---
id: intent-reconstruction
type: interpretation-model
purpose: Reconstruct intended meaning from dictated, fragmented, emotional, or self-correcting input before downstream processing.
input_classes: [dictation, fragmented-thought, emotional-input, correction, brainstorming]
output_schema: interpretation-packet-v1
confidence: PRACTICED
version: "1.0"
tags: [interpretation, intake, intent, dictation, evidence, corrections]
compatible_with: [any-ai]
---

# Intent Reconstruction

## Activate When

Use when the human is thinking aloud, dictating, correcting themselves, mixing facts with feelings, or supplying material that may belong in more than one future output.

Do not activate merely because the writing is informal. Activate when literal reuse would risk changing meaning, evidence status, or purpose.

## Method

1. Preserve the raw input.
2. Identify the current task and the broader desired outcome.
3. Separate direct observations, reports, record-dependent claims, inferences, hypotheses, emotions, goals, constraints, future leads, and unknowns.
4. Resolve self-corrections in favor of the newest explicit correction.
5. Convert figurative or emotionally compressed language into bounded meaning without asserting motive or misconduct.
6. Route each item to the current output, private memory, verification, hold-for-later, or exclusion.
7. Emit an interpretation packet before any downstream drafting or research.

## Core Distinction

Literal wording is evidence of what the human said. It is not automatically evidence that the literal proposition is true.

Example:

> "They held the prescription hostage."

Possible reconstruction:

- observation: the prescription remained unavailable after repeated requests;
- report: the pharmacy stated a prior authorization issue remained;
- emotion/impact: the patient experienced the situation as coercive and obstructive;
- hypothesis: the pharmacy may have lacked an effective transfer or cancellation process;
- legal characterization: not established by the phrase itself.

## Correction Handling

For each correction, label it:

- `LOCAL`: wording only;
- `FACTUAL`: changes a claim everywhere;
- `STRUCTURAL`: changes chronology, emphasis, or document architecture;
- `GOVERNING`: changes future handling rules.

Non-local corrections require an impact scan across active artifacts and working memory.

## Output

Produce the standard `interpretation-packet-v1`, plus:

```yaml
intent_reconstruction:
  literal_phrases_requiring_translation: []
  superseded_statements: []
  correction_scope: []
  safe_paraphrases: []
  unsafe_literalizations: []
```

## Completion Criteria

- The current task is identifiable.
- Every material claim has a class.
- Emotion is preserved without becoming proof.
- Self-corrections are propagated.
- Potentially useful material is routed rather than discarded.
- A downstream agent can act without rereading the entire raw exchange.

## Allergy

Transcribing emotion as allegation. Treating brainstorming as final instruction. Asking the human to pre-edit every thought. Discarding uncertain material instead of preserving it as a hypothesis. Keeping a local fix while contradictions remain elsewhere.
