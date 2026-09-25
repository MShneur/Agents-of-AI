---
id: signal-before-verdict
type: workflow-rule
trigger: >
  Binding across research, product, data, support, scraping, ranking, safety,
  inference, and implementation whenever an agent may discard, narrow, reject,
  classify, or summarize evidence before the final outcome is known.
purpose: >
  Prevent premature narrowing: preserve precursor signals and raw facts before
  applying terminal outcome labels or exclusion rules.
anti-goal: >
  Will not equate "not confirmed" with "irrelevant", "missing" with "false",
  "not final" with "not a candidate", or one proxy threshold with the user's
  actual construct.
version: "1.0"
tags: [reasoning, requirements, evidence, recall, provenance, anti-tunnel-vision]
compatible_with: [any-ai]
---

# Signal Before Verdict [BINDING]

## The rule

**Do not filter on the final outcome before evaluating the precursor signal.**

When the task is discovery, research, triage, monitoring, prediction, candidate
generation, or lifecycle tracking, collect and preserve the evidence that can lead
to the outcome before applying the narrow rule that confirms the outcome.

The canonical ordering is:

`OBSERVATION -> SIGNAL -> CANDIDATE/HYPOTHESIS -> VERIFICATION -> VERDICT`

Never collapse these stages.

## Five-state language

Every material fact should be classifiable without forcing a premature yes/no:

1. **OBSERVED** — directly present in source/runtime/data.
2. **SIGNAL** — matches a defined precursor/indicator rule.
3. **CANDIDATE** — warrants further tracking/testing.
4. **CONFIRMED** — passed the required verification rule.
5. **REJECTED / NOT RELEVANT** — failed an explicit exclusion rule with evidence.

**UNKNOWN** is always allowed and is not equivalent to REJECTED.

## No-premature-exclusion test

Before an agent discards a row, idea, user report, model answer, candidate, or
source, it must be able to state:

- **Construct:** what are we actually trying to know?
- **Observed fact:** what did the source actually show?
- **Signal rule:** what precursor/indicator makes this worth keeping?
- **Confirmation rule:** what evidence would make the terminal claim true?
- **Exclusion rule:** what exact evidence makes it irrelevant?
- **Loss test:** if we apply this exclusion now, could we destroy evidence needed
  to learn the trajectory or later confirm the outcome?

If the loss test is YES or UNKNOWN, preserve the observation and classify it at
the earlier stage instead of rejecting it.

## Search/query rule

For discovery tasks:

1. **extract the relevant feature first**;
2. **apply the signal rule**;
3. preserve the candidate set;
4. only then apply confirmation/consumer-facing labels.

Do not put a terminal-state filter upstream of feature extraction unless the owner
explicitly asked for terminal-state-only retrieval.

This is a recall-before-verdict rule, not an instruction to publish low-confidence
results to users.

## Operational-definition rule

If the owner's language can be interpreted more than one way, convert it to an
explicit operational rule before searching or coding.

A valid operational rule includes:
- field/input;
- transformation;
- threshold/pattern;
- positive examples;
- negative examples;
- what the rule does **not** prove.

Examples are required when a transcription, shorthand, regex-like pattern, or
domain term could be misread.

## Evidence ≠ interpretation

Keep these separate in answers and code comments:

- **Fact:** directly observed.
- **Inference:** derived from facts.
- **Hypothesis:** plausible but unverified.
- **Policy/owner preference:** chosen behavior.
- **Verdict:** conclusion after the required test.

Never upgrade a signal to a verdict because it is convenient.
Never downgrade a signal to irrelevant because it is not yet a verdict.

## Cross-board examples

### Penny clearance
Wrong:
`price == $0.01 -> candidate`

Correct discovery:
`price_cents % 100 in configured_clearance_endings -> SIGNAL/CANDIDATE`

Then:
`verified $0.01 terminal evidence -> CONFIRMED PENNY`

A $49.03 item can be a valid precursor signal even though it is not a penny yet.

### Inventory
Wrong:
`missing quantity -> zero`

Correct:
`missing quantity -> UNKNOWN`

Zero requires an observed zero.

### Retailer/source health
Wrong:
`request failed -> item unavailable`

Correct:
`request failed -> source state UNKNOWN/FAILED`

Availability remains last-known-good or unknown.

### Contribution economy
Wrong:
`fast rank progress -> spammer`

Correct:
`fast progress -> OBSERVED`
Spam/farm requires duplicate/low-information/abuse evidence.

### Support
Wrong:
`ticket submitted -> Working`

Correct:
- submitted -> Received
- real triage claim -> Working
- verified fix -> Fixed

### AI quorum
Wrong:
`five models agree -> verified`

Correct:
`five models agree -> consensus signal`
Verification still requires evidence/tests appropriate to the claim.

### UI privacy
Wrong:
`CSS blur -> protected`

Correct:
`CSS blur -> presentation`
Protection requires server-side omission/authorization.

## Requirements-answer template

When a requirement is easy to misread, the agent should answer internally using:

```
OWNER CONSTRUCT:
OPERATIONAL RULE:
POSITIVE EXAMPLES:
NEGATIVE EXAMPLES:
SIGNAL DOES NOT PROVE:
CONFIRMATION REQUIRES:
EXCLUSION REQUIRES:
UNKNOWN CASE:
```

Only expose this full block to the user when useful; the reasoning discipline is
binding even when the user-facing answer is short.

## Named-method basis

The following practitioners did not participate in or endorse this protocol.
Their published methods were used as lenses:

- **Gojko Adzic** — Specification by Example: ground requirements in concrete
  examples so business intent and implementation rules remain aligned.
  https://www.manning.com/books/specification-by-example
- **Martin Fowler** — Specification by Example: examples ground abstractions but
  are not sufficient by themselves; communication and generalization still matter.
  https://martinfowler.com/bliki/SpecificationByExample.html
- **Christopher Manning** — information retrieval precision/recall: aggressive
  narrowing increases false negatives; discovery systems must manage the cost of
  missed relevant items.
  https://nlp.stanford.edu/IR-book/
- **Deborah Mayo** — severe testing: evidence for a claim requires a test capable
  of exposing the claim's flaws; a precursor observation is not the final claim.
  https://doi.org/10.1007/978-3-662-69359-9_561
- **James Bach** — context-driven testing: questions carry assumptions; surface
  those assumptions before answering across a different frame.
  https://www.satisfice.com/blog/archives/30
- **Indi Young** — Data Science That Listens: resist assumptions and understand
  the person's purpose/context before imposing the solution frame.
  https://indiyoung.com/method/

## Strongest counter-method

**Narrow early for speed/precision.**

This is valid when:
- the user explicitly requested only terminal confirmed outcomes;
- false positives are materially more harmful than false negatives;
- upstream candidate preservation exists elsewhere;
- the filter does not destroy the historical evidence needed for later analysis.

Disposition: **MITIGATED, NOT REJECTED.**
Early precision filters are allowed only when the scope is explicitly terminal or
the lost-recall risk has been evaluated and accepted.

## Kill conditions

A result is invalid if any of these occur:

- terminal outcome threshold used as the discovery predicate without owner intent;
- missing/failed/unknown converted to false/zero/unavailable;
- a proxy substituted for the owner's construct without being labeled;
- an exclusion rule cannot be stated;
- positive examples pass but an obvious owner-provided positive example fails;
- a signal is discarded solely because it is not yet confirmed;
- the system claims "no results" after using a filter that excluded the precursor
  class the owner asked to study.

## Required handoff note

Whenever this rule materially changes a task, durable memory records:
- the construct;
- signal rule;
- confirmation rule;
- exclusion rule;
- owner examples that must continue to pass.
