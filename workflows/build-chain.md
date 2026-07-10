---
id: build-chain
type: workflow
purpose: Structured development workflow for AI coding agents — from PRD through implementation to verified merge. Prevents agent drift, context corruption, and untested merges.
steps: 6
agents_used: [tracker, stresstest, locksmith]
personas_used: [mirror, wireframe]
confidence: PRACTICED
version: "1.0"
tags: [development, coding, agentic, PRD, TDD, code-review, workflow]
compatible_with: [any-ai]
source: Synthesized from obra/superpowers (85k stars), murataslan1/cursor-ai-tips, DVC2/cursor-agent-configs, PatrickJS/awesome-cursorrules (40k stars)
---

# Agentic Dev Cycle

## Purpose
Structured workflow for AI-assisted development that prevents the common failure modes: agent drift (losing context), untested merges, hallucinated APIs, and "looks done" without verification. Works with any AI coding tool (Cursor, Claude Code, Codex, Copilot, etc.).

## When to Use
- Any feature or change that touches more than one file
- Bug fixes where the root cause isn't obvious
- Refactoring where behavior must be preserved

## When NOT to Use
- Single-line fixes you can verify by reading
- Exploratory prototyping where correctness doesn't matter yet

## Steps

### Step 1: SCOPE (human-driven)
Define what "done" looks like before the agent touches code.

1. Write a clear task description — what changes, what stays the same
2. Name the specific files involved
3. Define the acceptance test — how will you know it works?
4. State constraints — what the agent must NOT do (don't touch unrelated files, don't add dependencies, don't restructure)

**Anti-pattern:** "Make it work" with no scope. The agent will over-engineer or under-deliver.

**Done when:** scope document exists with files, constraints, and acceptance test.

### Step 2: PLAN (agent-assisted, human-approved)
Agent proposes an implementation plan. Human reviews before any code is written.

1. Agent reads relevant files and proposes approach
2. Interface-first — define types/interfaces before implementation
3. List each file that will change and what the change does
4. Write the plan assuming the implementer has zero context for the codebase — name every file, every test approach, every dependency
5. Identify risks or questions
6. Human approves or redirects

**HARD GATE:** Do NOT write any code, scaffold any project, or take any implementation action until the plan is presented and the user has approved it. This applies to EVERY task regardless of perceived simplicity. "Simple" tasks are where unexamined assumptions cause the most wasted work.

**Anti-pattern:** Agent starts coding immediately. Plan exists to catch wrong approaches before they consume context.

**Done when:** human approves the plan.

### Step 3: CHECKPOINT
Create a git checkpoint before implementation begins.

```
git add -A && git commit -m "checkpoint: before [task-name]"
```

This is non-negotiable. Agents can corrupt codebases during long sessions. The checkpoint is your rollback point.

### Step 4: IMPLEMENT (agent-driven, incremental)
Agent implements the plan in small, verifiable increments.

1. One logical change per commit
2. After each file change, verify the change does what the plan said
3. If the agent needs to deviate from the plan, stop and explain why before proceeding
4. Run tests after each meaningful change — don't batch
5. If tests fail, fix before moving on (don't accumulate broken state)

**Anti-pattern:** Agent writes everything, then runs tests at the end. By then, the bug is buried in 200 lines of changes.

### Step 5: VERIFY (adversarial)
Before merge, run adversarial verification. This is where the `stresstest` agent earns its keep.

1. Build must pass (automatic FAIL if it doesn't)
2. Full test suite must pass
3. Run at least one adversarial probe (boundary values, concurrent requests, malformed input)
4. Check for regressions in adjacent functionality
5. Security scan if the change touches auth, input handling, or external data

**Anti-pattern:** "Tests pass, ship it." Tests written by the same agent that wrote the code may have circular assertions. Independent verification required.

### Step 6: REVIEW + MERGE
Human reviews the diff before merge.

1. Does the diff match the plan from Step 2?
2. Are there changes to files not in the plan? (red flag)
3. Are there new dependencies that weren't discussed?
4. Is the code readable by a human who didn't write it?
5. Merge and clean up the checkpoint commit if desired

**Done when:** code is merged, tests pass on main, checkpoint cleaned up.

## Agent Discipline Rules (apply throughout)

- **No invented APIs** — verify library functions exist in the installed version before using them
- **No unrequested changes** — don't modify files outside the scope
- **Honest status** — "I wrote the code but didn't run tests" is the truthful answer when that's what happened
- **Re-index on long sessions** — if the agent has been running for 30+ minutes, re-read the relevant files to prevent mental model drift
- **Defensive commits** — after every successful test run, commit immediately

## Anti-patterns This Workflow Prevents

| Anti-pattern | How it's prevented |
|---|---|
| Agent drift (loses context over long sessions) | Checkpoint + incremental commits + re-index |
| "Looks done" without verification | Step 5 adversarial verification required |
| Hallucinated API calls | Anti-sycophant discipline: verify before using |
| Scope creep during implementation | Plan approval in Step 2, no unrequested changes |
| Untested merges | Tests run after each change, not batched at end |
| Corrupted codebase | Git checkpoint before any work begins |

---

*Synthesized from obra/superpowers (85k stars), community-validated Cursor/Claude Code practices, and the agentic engineering consensus of 2026.*
