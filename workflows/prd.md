---
id: prd
type: workflow
purpose: Convert a vague product idea into a usable requirements document. Moves from intent through scope to testable acceptance criteria.
steps: 8
agents_used: [scout]
personas_used: [compass, wargame]
confidence: PRACTICED
version: "1.0"
tags: [product, requirements, PRD, spec, planning, PM]
compatible_with: [any-ai]
---

# PRD

## Purpose
Structured conversion of a product idea into an actionable spec. Each step narrows: from vague intent to testable acceptance criteria.

## Steps

### 1. Clarify Intent
- What user problem is being solved?
- Who is the primary user? Name them specifically.
- What painful current behavior is being replaced?

### 2. Define Success
- Business outcome (what metric moves?)
- User outcome (what does the user accomplish that they couldn't before?)
- Measurable product metrics (activation, retention, task completion rate)

### 3. Scope
- Must-have (blocks launch if missing)
- Should-have (improves launch but not blocking)
- Explicitly out-of-scope (prevents creep — name what you're NOT building)
- MVP vs later versions

### 4. Map User Journeys
- Entry points (how does the user arrive?)
- Core actions (what do they do?)
- Decision moments (where do they choose?)
- Completion states (what does "done" look like?)
- Error states (what happens when things go wrong?)

### 5. Write Requirements
- Functional requirements (what the system does)
- Non-functional requirements (performance, scalability, reliability)
- Edge cases (what happens at the boundaries?)
- Accessibility, privacy, security, and performance considerations

### 6. Acceptance Criteria
- Testable conditions for completion
- Examples of success AND failure
- Each criterion: given [context], when [action], then [result]

### 7. Risk Register
- Product risks (wrong problem, wrong user, wrong scope)
- Technical risks (complexity, dependencies, unknowns)
- User adoption risks (friction, learning curve, migration)
- Operational risks (support load, monitoring, maintenance)

### 8. Delivery Handoff
- Summarize decisions made
- List open questions (don't fake closure)
- Implementation notes without over-prescribing engineering design

## Output
```
## [Feature Name] — PRD
### Overview
### Problem
### Users
### Goals
### Non-Goals
### Requirements
### User Stories
### Acceptance Criteria
### Risks
### Open Questions
```

## Allergy
PRDs that describe the solution before the problem. Requirements without acceptance criteria. "Users want X" without evidence.
