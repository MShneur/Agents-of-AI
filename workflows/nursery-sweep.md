---
id: nursery-sweep
type: workflow
purpose: Run a full repository maintenance sweep that finds breakage, stale work, PR issues, dependency drift, improvement opportunities, and external patterns worth assimilating.
steps: 9
agents_used: [repo-nanny, scout, tracker, auditor]
personas_used: [provenance, burden, wireframe]
confidence: EXPERIMENTAL
version: "1.0"
tags: [repo-maintenance, github, issues, prs, ci, dependencies, sweep, improvement]
compatible_with: [any-ai]
---

# Nursery Sweep

## Purpose

Nursery Sweep is the full maintenance pass for one repo or many repos.

It answers:

```text
What is broken?
What is stale?
What is risky?
What can be fixed now?
What should become a task?
What should be improved?
What should we learn from outside projects?
```

## When to Use

Use when the user asks to:

- check a repo
- check all repos
- run maintenance
- triage issues or PRs
- find stale work
- look for improvements
- scan for similar projects or better methods
- prepare weekly repo upkeep

## Steps

### 1. Select Scope

Choose:

- one repo
- all active repos
- one project family
- one issue/PR plus nearby repo health

Done when the sweep boundary is explicit.

### 2. Pull Repo Signals

Collect:

- open issues
- open PRs
- failed checks
- latest commits
- dependency alerts/updates if available
- TODO/FIXME markers if searchable
- project docs and roadmap
- existing task queue if available

Done when the repo's current operating state is visible.

### 3. Classify Signals

Classify each item:

```text
break
stale
risk
drift
improvement
research
external-assimilation
no action
```

Done when every signal has a route.

### 4. Prioritize

Rank by:

- user impact
- project blocker status
- security/risk
- ease of fix
- likelihood of hidden adjacent damage
- strategic value

Done when the top actions are clear.

### 5. Run Adjacent Breakage Check

For each important break, check whether the same pattern appears nearby.

Done when the issue is classified as isolated or systemic.

### 6. Run Wheel Check

For each improvement or systemic weakness, search whether outside projects, libraries, prompts, workflows, or agents solve it better.

Done when candidate external patterns are accepted, rejected, or queued for research.

### 7. Decide Fix-or-File

For each prioritized item, choose:

```text
fix now
draft PR
create issue
create repo PRD
create research task
create assimilation candidate
watch
ignore
```

Done when no item is left as vague "needs work."

### 8. Verify

For any fix or recommended fix, define:

- test command
- expected result
- fallback if test unavailable
- residual risk

Done when verification is explicit.

### 9. Report

Return a complete Repo Nanny report.

## Done Condition

The workflow is complete when the repo ecosystem has a ranked action list, fix candidates, research/assimilation candidates, and verification notes.

## Output Format

```markdown
# Nursery Sweep Report

## Scope

## Signals Collected

## Critical Breaks

## Stale Work

## Risks / Drift

## Fixable Now

## Needs Investigation

## Adjacent Breakage Findings

## External Patterns / Wheel Check

## Assimilation Candidates

## Repo PRDs Needed

## Verification Plan

## Recommended Next Actions
```

## When Not to Use

Do not use for a tiny one-line answer, a simple factual question, or a user request that explicitly says only fix this one thing.

## Allergy

Nursery Sweep refuses shallow status reports, unranked issue dumps, and fixes that ignore adjacent damage or better outside patterns.
