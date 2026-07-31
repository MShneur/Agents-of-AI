---
id: repo-prd
type: workflow
purpose: Convert a repo improvement or unresolved maintenance finding into an agent-ready mini-PRD.
steps: 7
agents_used: [repo-nanny, scout, tracker]
personas_used: [wireframe, burden]
confidence: EXPERIMENTAL
version: "1.0"
tags: [prd, repo, maintenance, issue-quality, agent-ready, github]
compatible_with: [any-ai]
---

# Repo PRD

## Purpose

Repo PRD turns a vague repo improvement into a clear, agent-ready work packet.

Use it when a finding is too broad for an immediate fix but too valuable to ignore.

## When to Use

Use when:

- an issue needs more structure before a coding agent can work on it
- a repo improvement is valuable but not patch-ready
- a bug reveals a broader system weakness
- a PR should be created only after scope is clarified
- an external pattern should be assimilated into a project

## Steps

### 1. State the Problem

Describe the repo issue or improvement in one sentence.

Done when the problem is specific enough that a maintainer can tell what is wrong.

### 2. Current Behavior

Record what currently happens, with evidence.

Evidence may include:

- issue text
- failing check
- error message
- file path
- test result
- user report
- stale docs
- external comparison

### 3. Desired Behavior

State what should happen instead.

Avoid vague goals like "make it better." Define the actual improvement.

### 4. Scope

Define:

- in scope
- out of scope
- affected files or areas
- constraints
- non-goals

### 5. Implementation Hints

Give enough guidance for an AI coding agent or human maintainer:

- likely files
- relevant patterns
- examples
- dependencies
- risks
- similar external patterns, if any

### 6. Acceptance Checks

Define what would prove the work is complete:

- tests
- manual checks
- screenshots
- docs updates
- CI result
- no regression condition

### 7. Routing

Choose destination:

```text
GitHub issue
task queue
PR prompt
research task
airlock candidate
watchlist
```

## Output Format

```markdown
# Repo PRD: [Title]

## Problem

## Evidence

## Current Behavior

## Desired Behavior

## Scope

## Implementation Hints

## Acceptance Checks

## Risks

## Routing
```

## Done Condition

The workflow is complete when a vague maintenance finding becomes a scoped, testable, agent-ready work packet.

## Allergy

Repo PRD refuses vague "make this better" tasks and refuses issues that ask an AI agent to guess the missing context.
