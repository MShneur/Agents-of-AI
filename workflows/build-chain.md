---
id: build-chain
type: workflow
purpose: Structured development workflow for AI coding agents — reconcile current state first, then move from PRD through implementation to verified merge without rebuilding completed work.
steps: 7
agents_used: [tracker, stresstest, locksmith]
personas_used: [mirror, wireframe]
confidence: PRACTICED
version: "1.1"
tags: [development, coding, agentic, PRD, TDD, code-review, workflow, continuity, anti-drift]
compatible_with: [any-ai]
source: Synthesized from obra/superpowers (85k stars), murataslan1/cursor-ai-tips, DVC2/cursor-agent-configs, PatrickJS/awesome-cursorrules (40k stars); v1.1 adds live-state reconciliation from repeated multi-session agent drift failures.
---

# Agentic Dev Cycle

## Purpose
Structured workflow for AI-assisted development that prevents the common failure modes: agent drift (losing context), duplicate rebuilds after a session transfer, untested merges, hallucinated APIs, and "looks done" without verification. Works with any AI coding tool (Cursor, Claude Code, Codex, Copilot, etc.).

## When to Use
- Any feature or change that touches more than one file
- Bug fixes where the root cause isn't obvious
- Refactoring where behavior must be preserved
- Continuing implementation from another chat, agent, branch, handoff, or interrupted session

## When NOT to Use
- Single-line fixes you can verify by reading
- Exploratory prototyping where correctness doesn't matter yet

## Bounded Worker Continuity Contract

Use this section for any domain; the coding stages below apply only when the assignment is a code change.

1. Resolve the project’s existing canonical handoff/control record and project-specific approved manifest. Do not make a new handoff because a chat is new.
2. Issue one bounded packet: objective, owner, method/persona, baseline revision, allowed files, forbidden surfaces, acceptance evidence, rollback/reversal condition, midpoint, completion gate, and return path.
3. Keep concurrent ownership disjoint. A worker may not stage, overwrite, or reformat unowned files. New files require a manifest entry and owner before implementation.
4. At midpoint, re-read the same handoff and manifest; report changed files, evidence, blockers, and the smallest next diff. Preserve NOT RUN, HOLD, and UNKNOWN honestly.
5. At completion, the coordinator independently re-reads the diff and runs the narrow relevant verification, then updates the same handoff/ledger. No competing “final” handoff.
6. Named experts are bounded method lenses unless independently activated. Never fabricate quorum, tool access, or endorsement.
7. Batch related changes and commits; never use automatic hosted Actions as a substitute for the handoff or verification contract.

## Steps

### Step 0: RECONCILE (agent-driven, required on existing projects)
Before planning, establish what is true **now**.

1. Identify the project's canonical state surfaces: current branch/repo, runtime, ledger/state file, tests, accepted decision record, or equivalent.
2. Read those current sources directly. Treat handoffs and chat summaries as locators/compression, not executable truth.
3. Compare any prior plan/handoff against current state.
4. Classify relevant work:

```text
BUILT      exists and is verified in the current source
MISSING    required but not present
BROKEN     exists but fails its contract/test
OBSOLETE   intentionally superseded or no longer owned
UNKNOWN    cannot be established from available evidence
```

5. Preserve BUILT work. Do not recreate it merely because the current session lacks the old conversation.
6. Name branch drift, stale docs, unmerged work, or conflicting authorities before planning.
7. If required canonical state cannot be read, mark the task DEGRADED/BLOCKED instead of reconstructing it from chat memory.

**Anti-pattern:** A fresh agent reads a handoff, assumes it is current, scaffolds replacements for code that already exists, and creates a second architecture.

**Done when:** the current baseline and the true delta are explicit.

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
stage only owned, intended files and batch the commit -m "checkpoint: before [task-name]"
```

This is non-negotiable. Agents can corrupt codebases during long sessions. The checkpoint is your rollback point.

### Step 4: IMPLEMENT (agent-driven, incremental)
Agent implements the plan in small, verifiable increments.

1. One logical change per commit
2. After each file change, verify the change does what the plan said
3. If the agent needs to deviate from the plan, stop and explain why before proceeding
4. Run tests after each meaningful change — don't batch
5. If tests fail, fix before moving on (don't accumulate broken state)
6. If implementation reveals an existing canonical component/workflow already owns the behavior, extend it instead of creating a parallel replacement

**Anti-pattern:** Agent writes everything, then runs tests at the end. By then, the bug is buried in 200 lines of changes.

### Step 5: VERIFY (adversarial)
Before merge, run adversarial verification. This is where the `stresstest` agent earns its keep.

1. Build must pass (automatic FAIL if it doesn't)
2. Full test suite must pass
3. Run at least one adversarial probe (boundary values, concurrent requests, malformed input)
4. Check for regressions in adjacent functionality
5. Security scan if the change touches auth, input handling, or external data
6. Compare the final state against the Step 0 baseline: confirm the patch changed only the intended delta and did not replace preserved BUILT work

**Anti-pattern:** "Tests pass, ship it." Tests written by the same agent that wrote the code may have circular assertions. Independent verification required.

### Step 6: REVIEW + MERGE
Human reviews the diff before merge.

1. Does the diff match the plan from Step 2?
2. Are there changes to files not in the plan? (red flag)
3. Are there new dependencies that weren't discussed?
4. Is the code readable by a human who didn't write it?
5. Did any parallel framework/component/state file get created where an existing canonical owner could have been extended?
6. Merge and clean up the checkpoint commit if desired

**Done when:** code is merged, tests pass on main, checkpoint cleaned up.

## Agent Discipline Rules (apply throughout)

- **Current state first** — repo/runtime/ledger evidence outranks handoff/chat memory for implementation state
- **No duplicate rebuilds** — preserve verified BUILT work across session transfers
- **No invented APIs** — verify library functions exist in the installed version before using them
- **No unrequested changes** — don't modify files outside the scope
- **Honest status** — "I wrote the code but didn't run tests" is the truthful answer when that's what happened
- **Re-index on long sessions** — if the agent has been running for 30+ minutes, re-read the relevant files to prevent mental model drift
- **Defensive commits** — after every successful test run, record the checkpoint; commit at a bounded integration point

## Anti-patterns This Workflow Prevents

| Anti-pattern | How it's prevented |
|---|---|
| Fresh-session rebuild / stale handoff | Step 0 live-state reconciliation + BUILT/MISSING/BROKEN/OBSOLETE/UNKNOWN classification |
| Agent drift (loses context over long sessions) | Checkpoint + incremental commits + re-index |
| "Looks done" without verification | Step 5 adversarial verification required |
| Hallucinated API calls | Anti-sycophant discipline: verify before using |
| Scope creep during implementation | Plan approval in Step 2, no unrequested changes |
| Untested merges | Tests run after each change, not batched at end |
| Corrupted codebase | Git checkpoint before any work begins |
| Parallel architecture proliferation | Existing canonical owner checked at reconcile, implement, and review stages |

---

*Synthesized from obra/superpowers (85k stars), community-validated Cursor/Claude Code practices, and agentic engineering consensus. v1.1 adds reconcile-first continuity for multi-session work.*
