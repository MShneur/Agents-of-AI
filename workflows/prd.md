---
id: prd
type: workflow
purpose: Convert ambiguous work into the smallest appropriate typed specification with measurable acceptance evidence.
steps: 8
agents_used: [scout]
personas_used: [compass, wargame, wireframe, burden]
confidence: PRACTICED
version: "2.0"
tags: [product, requirements, PRD, spec, planning, PM, brownfield, bugfix, design-first]
compatible_with: [any-ai]
---

# PRD / Typed Spec

## Purpose

Use one specification method with **profiles**, rather than creating a new workflow
for every starting condition. Choose the lightest profile that matches what is
already known.

A spec is a working contract between intent and acceptance evidence. It is not a
ceremony and it is not permission to redesign unrelated surfaces.

## Profile Router

### PRODUCT / REQUIREMENTS-FIRST
Use for a new product or feature where the user problem and requirements still need
to be shaped.

Artifact: problem -> users -> goals/non-goals -> journeys -> requirements ->
acceptance -> risks -> open questions.

### REPO / BROWNFIELD
Historical alias: `repo-prd`.

Use when improving an existing repository, assimilating an external mechanism, or
turning a maintenance finding into agent-ready work.

Additional required fields:
- current behavior with repository/runtime evidence;
- canonical owner/ref;
- affected files/surfaces;
- preserved behavior;
- desired delta;
- verification path;
- routing destination.

### BUGFIX / SURGICAL
Use when what is broken is already known and broad requirements discovery would
waste time.

Required fields:
- reproducible failure;
- expected behavior;
- preservation constraints;
- smallest suspected surface;
- regression case;
- falsifier for the proposed fix.

Do not rewrite architecture unless the evidence shows the bug is architectural.

### DESIGN-FIRST
Use when requirements are settled and the architecture/interface is the unknown, or
when an existing technical design is the starting point.

Required fields:
- settled requirements that must not be reopened without evidence;
- interfaces/data flow;
- design choices and rejected alternatives;
- migration/rollback;
- implementation tasks;
- acceptance mapping back to requirements.

## Steps

### 1. Choose the profile
Classify the starting condition. If one profile is sufficient, do not run all four.

### 2. Lock intent and authority
Name the user/project outcome, current owner, exact constraints, non-goals and any
permissions that remain literal. For dictated or ambiguous intent, use Outcome
Reconciliation / Spirit Pass before spec construction.

### 3. Define success
Write atomic, testable outcomes. Include both positive and negative examples when
misinterpretation is plausible.

### 4. Establish current state when it exists
For brownfield/bugfix/design-first work, record what is true now with direct evidence.
Preserve verified BUILT behavior and identify UNKNOWN rather than filling gaps.

### 5. Scope the delta
Must-have, should-have, explicit out-of-scope, affected surfaces, dependencies, and
what must remain unchanged.

### 6. Map behavior/design
Use only the profile-relevant detail:
- product journeys and error states;
- repo paths and ownership;
- bug reproduction/path signature;
- design interfaces and migration.

### 7. Acceptance + risk
Each material requirement maps to an observable check. Include failure cases,
rollback/reversal, security/privacy/performance/accessibility when load-bearing.

### 8. Delivery route
Return the smallest downstream artifact actually needed: implementation tasks,
GitHub issue, PR work packet, research task, design review, airlock candidate, or
human decision gate.

## Output

```
SPEC TYPE        PRODUCT | REPO | BUGFIX | DESIGN_FIRST
OUTCOME
CURRENT STATE    when applicable
GOALS / NON-GOALS
REQUIREMENTS
SCOPE / PRESERVE
DESIGN OR JOURNEY
ACCEPTANCE
RISKS / UNKNOWN
DELIVERY ROUTE
```

## Done Condition

The next operator can act without guessing the objective, current state, protected
behavior, or proof of completion.

## Allergy

One PRD shape forced onto every task. Re-discovering settled requirements. Repo work
without current-state evidence. Bugfix specs that quietly become rewrites.
Requirements without acceptance evidence.
