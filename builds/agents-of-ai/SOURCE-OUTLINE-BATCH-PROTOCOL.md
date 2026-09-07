# Source Outline Batch Protocol

Purpose: turn the user's historical Agents-of-AI build outline into an improved, auditable implementation **without treating dictation or old chat output as infallible specification**.

The source outline is intent-bearing evidence. It is read line by line, preserved, challenged, improved, and traced into build artifacts.

## Why batches

A large source transcript processed in one synthesis pass invites omission, premature convergence, and accidental rewriting of history. Batches keep the working set bounded and make every decision reviewable.

Default batch size:

- **20–40 source lines**, or
- one naturally coupled semantic unit when splitting it would destroy meaning.

A batch may be smaller for architecture, security, permissions, release, or other consequential material.

## Binding rules

1. Preserve each source line exactly in the reconciliation record before interpreting it.
2. Do not silently normalize contradictions away.
3. Do not infer missing historical details when the source does not support them.
4. Improve implementation, not history: source and improved requirement stay visibly separate.
5. Use named practitioners' **published methods** for expert review. Never imply those practitioners participated or endorsed the project.
6. Re-source a practitioner method at convening time when it becomes load-bearing to a consequential decision.
7. Apply `MERGE-PROTOCOL.md` before creating a new canonical AoA component.
8. Keep R&Duck governance separate from AoA capability packaging.
9. A batch is not DONE until every line has a disposition and every accepted requirement has an artifact target plus verification method.

## Batch roles

Each batch gets methods chosen for the actual material rather than a permanent decorative panel.

Minimum roles for ordinary build batches:

- **Method / architecture** — how the component should be structured.
- **Operator / implementation** — how it works in the target runtime and how it fails operationally.
- **Evidence / evaluation** — what would prove the implementation works.
- **Adversary** — strongest misuse, brittleness, injection, permission, or failure case.
- **Affected user** — whether the behavior solves the user's real purpose rather than optimizing the machinery.

For consequential forks, use the full `workflows/quorum.md` seat structure with heavy/light practitioners, mandatory dissent handling, and Human Gate where required.

## Per-line record

Use one row per line or tightly coupled line group:

| Field | Required content |
|---|---|
| `source_id` | stable batch/line identifier, e.g. `B02-L014` |
| `source` | exact original wording, unchanged |
| `interpretation` | behavior or requirement the line appears to request |
| `ambiguity_or_risk` | contradiction, stale assumption, unsafe authority, duplicate method, unclear scope, runtime drift, etc. |
| `expert_method` | named practitioner's published method used to test/improve it, or `NONE` for literal bookkeeping |
| `improved_requirement` | implementation-ready form that best preserves the user's intended outcome |
| `disposition` | one of the allowed dispositions below |
| `artifact` | exact repo path(s) changed or planned |
| `verification` | observable proof the implementation satisfies the improved requirement |

## Allowed dispositions

```text
KEEP        source requirement is already strong and implementable
STRENGTHEN  same intent, stronger checks/clarity/evidence
MERGE       fold into an existing method/artifact to avoid duplication
SPLIT       one source line contains genuinely distinct methods/requirements
TRANSFORM   literal implementation is flawed; preserve outcome via a better path
REJECT      source path should not be implemented; state the blocking reason
HUMAN_GATE  credible consequential alternatives survive review
DEFER       source depends on information not yet present and guessing would contaminate it
```

`DEFER` is not permission to forget the line. Deferred lines remain open in the batch ledger.

## Procedure

### 1. Freeze

Store the batch source verbatim with stable line identifiers. Do not edit the frozen source block later; corrections are appended as notes.

### 2. Classify

Tag each line by target:

- shared activation contract;
- Custom GPT;
- agent runtime;
- skill;
- pre-built cast;
- Negative Gate;
- AoA dynamic activation;
- governance integration;
- tooling/integration;
- evaluation/verification;
- documentation only.

### 3. Interpret independently

Before reconciliation, separate source meaning from preferred implementation. Where practical, the architecture/implementation pass and adversarial pass should not anchor on each other's conclusions.

### 4. Challenge

Run the applicable Negative Gate questions:

- Does the literal mechanism actually achieve the desired outcome?
- Is the runtime capability real and current?
- Does it expand authority or side effects?
- Is it importing untrusted operational instruction?
- Does an existing AoA method already cover it?
- What evidence would falsify the proposed requirement?
- Is a safer reversible alternative available?

### 5. Improve

Write the strongest implementation-ready requirement. Preserve source language separately so strengthening is auditable.

### 6. Dispose

Assign exactly one primary disposition. If disagreement survives, record it rather than manufacturing consensus.

### 7. Build

Make only the scoped artifact changes justified by accepted batch decisions. Avoid orthogonal edits.

### 8. Verify

Run the declared verification. Mark:

```text
PASS
FAIL
PARTIAL
NOT RUN
```

Do not convert NOT RUN into implied success.

### 9. Decorrelate

For load-bearing changes, use a checker that differs from the authoring path on a named axis: different agent/method, test fixture, source, runtime observation, or independent chat where available.

### 10. Close batch

A batch closes only when:

- every source line is represented;
- every non-deferred line has a disposition;
- every KEEP/STRENGTHEN/MERGE/SPLIT/TRANSFORM line has an artifact mapping;
- verification results are explicit;
- unresolved consequential disagreements are routed to Human Gate;
- deferred items are carried forward with their dependency stated.

## Batch output template

```markdown
# Source Reconciliation — Batch BNN

## Scope
- Source range:
- Target build area:
- Frozen source hash/reference:

## Named method seats
- Method/architecture — practitioner + published method + source
- Operator — practitioner + published method + source
- Evidence — practitioner + published method + source
- Adversary — practitioner + published method + source
- Affected-user — practitioner + published method + source

> These practitioners did not participate in or endorse this project. Their published methods are review lenses.

## Line ledger
| source_id | source | interpretation | ambiguity_or_risk | expert_method | improved_requirement | disposition | artifact | verification |
|---|---|---|---|---|---|---|---|---|

## Cross-examination

## Dissent and dispositions

## Changes made

## Verification

## Open / deferred

## Human Gate
YES | NO
```

## Historical cast / Negative Gate special rule

The pre-built persona roster and historical Negative Gate are identity-bearing parts of this build. Do not fill gaps from memory, nearby AoA entries, or a new expert panel.

When those source lines arrive:

1. freeze them first;
2. reconstruct their exact intended order and role;
3. distinguish historical intent from current-runtime implementation details;
4. only then replace `PREBUILT_CAST` and the foundation Negative Gate placeholder;
5. preserve a reconciliation note showing what was kept versus improved.

## Failure signals

Stop and correct the batch if any occur:

- several source lines disappear into one vague summary;
- an expert name appears without a retrievable published method;
- a practitioner is written as if they personally reviewed the project;
- all seats agree without a meaningful challenge;
- a runtime fact is assumed current without checking;
- a canonical AoA entry is copied instead of referenced/composed;
- the build gains tool authority the source/user did not grant;
- the batch changes unrelated repository areas;
- the exact historical cast/gate is guessed because it is convenient.
