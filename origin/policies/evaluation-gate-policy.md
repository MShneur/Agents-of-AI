# Evaluation Gate Policy

A fluent result is not a passing result.

## Independent hard gates

- truth-label correctness;
- evidence fidelity;
- refusal to invent;
- dissent usefulness;
- schema validity;
- instruction/tool security;
- lane-specific task quality;
- policy compliance.

Do not average a security or evidence failure away with a high writing-quality score.

## Evaluation development

1. collect representative traces;
2. perform human/domain error analysis;
3. name recurring failure modes;
4. create binary or rubric assertions that detect those failures;
5. add good, bad, ambiguous, missing-information, and adversarial fixtures;
6. re-run after prompt/persona/model/router/policy changes.

Same-model self-review may be useful but is not independent verification.
