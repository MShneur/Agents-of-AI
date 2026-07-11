---
id: retro
type: workflow
purpose: Structured retrospective that reviews what was shipped, what patterns emerged, and what to change next sprint. Works on git history, not memory.
steps: 4
agents_used: [auditor, conductor]
personas_used: [signal, gridlock]
confidence: PRACTICED
version: "1.0"
tags: [retrospective, sprint-review, reflection, improvement, team, shipping]
compatible_with: [any-ai]
---

# Retro

## Purpose
A structured review of what actually happened — measured from git commits, PRs, and artifacts, not from memory or feelings. Produces actionable changes for the next cycle.

## When to Use
- End of a work week or sprint
- After shipping a major feature
- When velocity feels like it's slowing down
- When the same types of bugs keep appearing

## When NOT to Use
- Mid-sprint (wait until something is shipped)
- As a status report (this is retrospective, not progress reporting)

## Steps

### Step 1: MEASURE (data-driven, no opinions yet)
Pull from git history and artifacts:

1. **Commits** — count, frequency, size distribution. Where did the work concentrate?
2. **Files changed** — which files were touched most? Where is the churn?
3. **Additions vs deletions** — net code growth. Is the codebase getting larger or being refined?
4. **PR/merge patterns** — how long did reviews take? What got stuck?
5. **Test coverage delta** — did tests keep up with code?
6. **Bug fixes vs features** — what proportion of work was reactive vs proactive?

Present as a dashboard: numbers, not narratives.

### Step 2: PATTERNS (what emerged)
Analyze the measurements for patterns:

1. **Shipping streaks** — how many days in a row did something ship?
2. **Hotspots** — files or modules that keep getting changed (possible tech debt)
3. **Velocity trend** — compared to previous retros, faster or slower? Why?
4. **Quality signals** — bug frequency, test failures, rollbacks
5. **Per-person breakdown** (if team) — contribution distribution, areas of ownership, growth areas

### Step 3: DIAGNOSE (what worked, what didn't)
For each pattern:

1. **What worked** — specific practices that produced good results. Name them so they can be repeated.
2. **What didn't** — specific friction points, bottlenecks, or failure modes. Diagnose root cause (Five Whys if needed).
3. **What surprised** — unexpected outcomes, positive or negative. These are the most valuable learning signals.

### Step 4: DECIDE (one change for next cycle)
Not a list of 15 improvements. One change. The single highest-leverage adjustment that would have the most impact on the next cycle.

Format:
```
## Retro: [date range]

### Dashboard
[numbers from Step 1]

### Patterns
[from Step 2]

### Worked / Didn't / Surprised
[from Step 3]

### One Change
[the single adjustment for next cycle, with specific implementation plan]
```

## Anti-patterns
- Retro based on memory instead of data
- List of 10+ action items (nothing will change)
- "We should communicate better" (not actionable — what specific communication, when, about what?)
- Skipping the celebration of what worked
- Running retro without the team present (for team retros)
