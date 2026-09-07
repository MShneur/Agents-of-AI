# Source Distillation Protocol

Status: **FOUNDATION / Origin-ready**

## Purpose

Turn a promising public/open project into reusable AoA knowledge or an AoA-native implementation **without confusing popularity with method, branding with architecture, or public source access with permission to copy everything**.

This is an engineering provenance process, not a legal guarantee of “clean-room” status.

## Inputs

```yaml
candidate: <repo/project/protocol/paper>
reason_for_interest: <novelty/adoption/gap>
canonical_sources: []
source_snapshot: <commit/tag/date>
license_status: <known/unknown/mixed>
target_aoa_gap: <method/capability missing or weak>
```

## Phase 1 — Preserve origin

Before interpretation:

1. identify the earliest relevant public/open source, not only the latest marketing site;
2. capture repository/tag/commit or archived source identity;
3. capture LICENSE/NOTICE and material third-party-license files;
4. record creation/release chronology when the “origin” matters;
5. preserve public design docs, ADRs, issues, PR discussions, papers, and migration notes relevant to the mechanism;
6. do not bypass authentication, access controls, paywalls, private repositories, or technical restrictions to reconstruct non-public source.

**Output:** immutable source packet / pointers.

## Phase 2 — Separate product from mechanism

Describe the system without its marketing nouns.

Extract:

```text
problem it solves
inputs / outputs
state model
control flow
capability boundaries
failure handling
security boundary
context/memory model
extension model
verification/evaluation method
what is deterministic vs model-mediated
what is replaceable vs hard-wired
what measurable property appears to drive success
```

Then write one sentence:

> The smallest non-brand-specific mechanism worth carrying forward is ______.

If that sentence cannot be written, the candidate is probably hype rather than a reusable foundation.

## Phase 3 — License / reuse disposition

Choose one explicitly:

### REFERENCE

Keep the project as a source/tool recommendation. No implementation needed.

### LICENSED_REUSE

Reuse source/code/text only when the license path is understood and required notices/conditions can be preserved. Record exact reused files/lines/components and their license obligations.

### INDEPENDENT_IMPLEMENTATION

Use the source to produce an implementation-neutral behavioral/architectural specification, then build AoA-native expression from that specification rather than copying source expression.

Use this by default when:

- license compatibility is unclear;
- copyleft/restrictive terms should not propagate into the target artifact;
- the architectural idea is valuable but the implementation is vendor-specific;
- portability benefits from a fresh implementation.

### WATCH

Promising but insufficient evidence, unstable architecture, weak adoption, unclear license, or no current AoA gap.

### REJECT

No meaningful method, unsafe/illegitimate acquisition path, unsupported claims, or duplication with stronger existing AoA material.

## Phase 4 — AoA overlap test

Run `MERGE-PROTOCOL.md` against the extracted method.

```text
existing method covers ≥60% and thinks the same → strengthen/merge
same topic but meaningfully different method       → separate entry/pattern
runtime/infrastructure primitive                   → substrate, not reasoning layer
vendor-specific implementation detail              → adapter/tool note, not canon
```

Do not create a new AoA name merely to claim novelty.

## Phase 5 — Specification firewall

For `INDEPENDENT_IMPLEMENTATION`, create a source-neutral specification containing:

- required behaviors/invariants;
- interfaces/contracts;
- failure cases;
- security/authority constraints;
- acceptance tests;
- prohibited coupling;
- performance/quality targets when evidence supports them.

Avoid source-specific wording, class/function names, branding, distinctive examples, or unnecessary structural mimicry.

When stronger legal separation is required, have the implementation lane consume this specification rather than the original source packet. Same-model separation is process discipline, not independent legal review; label it accurately.

## Phase 6 — Build and verify

Implementation lane:

1. build the smallest AoA-native version satisfying the spec;
2. use AoA naming/architecture conventions;
3. keep vendor adapters outside the core method;
4. test against frozen acceptance cases;
5. compare behavior/invariants, not textual/code similarity;
6. run security/provenance review;
7. record what was NOT reproduced intentionally.

## Phase 7 — Provenance receipt

Every adopted foundation should leave:

```yaml
candidate: <source>
snapshot: <commit/tag/date>
license: <license/status>
extracted_mechanism: <one sentence>
aoa_overlap: <merge/split/new-substrate/reference>
disposition: REFERENCE | LICENSED_REUSE | INDEPENDENT_IMPLEMENTATION | WATCH | REJECT
implementation_paths: []
source_code_reused: true | false
attribution_notice: <path/null>
verification: PASS | FAIL | PARTIAL | NOT_RUN
open_questions: []
```

## Red flags

- “it is open source, therefore copyright does not matter”;
- copying an implementation and renaming identifiers to call it independent;
- using a current private product to infer hidden source;
- bypassing access controls to obtain old/private versions;
- adopting a GitHub star count as proof the method works;
- extracting source-specific quirks with no demonstrated architectural value;
- adding a new AoA component before checking overlap;
- losing the source/license record after the method is incorporated.

## Relationship to Origin

Origin will eventually automate candidate discovery, source archaeology, scoring, and packet generation around this protocol. The final adoption/build decision remains evidence- and governance-driven.
