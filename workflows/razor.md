---
id: razor
type: workflow
purpose: A 7-rung decision ladder that runs before writing any code. Stops at the first rung that holds. The best code is the code you never wrote.
steps: 7
agents_used: [chisel]
personas_used: [wireframe]
confidence: BATTLE-TESTED
version: "1.0"
tags: [YAGNI, minimalism, code-reduction, decision-ladder, efficiency, over-engineering]
compatible_with: [any-ai]
---

# Razor

## Purpose
Before writing any code, climb this ladder. Stop at the first rung that holds. If rung 3 catches the problem, you never reach rung 7. No new code, no new dependencies, no new abstractions.

The ladder runs *after* you understand the problem, not instead of it. Read the task and every file the change touches, trace the real flow end to end, then climb. Lazy about the solution, never about the reading.

## When to Use
Any coding task: writing, adding, refactoring, fixing, reviewing, or designing code. Also when choosing libraries or dependencies, or when the user complains about over-engineering, bloat, or boilerplate.

## When NOT to Use
Non-coding requests (prose, translation, research, recipes). This is a code discipline, not a general compression tool.

## The Ladder

### Rung 1: Does this need to exist at all?
Speculative need = skip it, say so in one line. YAGNI. If the feature hasn't been requested and you're building it "for later," stop. Later can scaffold for itself.

### Rung 2: Already in this codebase?
A helper, util, type, or pattern that already lives here → reuse it. Look before you write. Re-implementing what's a few files over is the most common slop.

### Rung 3: Standard library does it?
Use it. No new imports, no new dependencies.

### Rung 4: Native platform feature covers it?
`<input type="date">` over a picker library. CSS over JS. DB constraint over app code. The platform already solved this.

### Rung 5: Already-installed dependency solves it?
Use it. Never add a new dependency for what a few lines can do.

### Rung 6: Can it be one line?
One line.

### Rung 7: Only then: the minimum code that works.

Two rungs both work → take the higher one and move on. The first solution that works is the right one — once you actually know what the change has to touch.

## Rules

- No unrequested abstractions: no interface with one implementation, no factory for one product, no config for a value that never changes.
- No boilerplate, no scaffolding "for later."
- Deletion over addition. Boring over clever — clever is what someone decodes at 3am.
- Fewest files possible. Shortest working diff wins — but only once you understand the problem.
- Complex request? Ship the simple version and question the rest: "Did X; Y covers it. Need full X? Say so."
- Two stdlib options, same size? Take the one correct on edge cases. Less code, not flimsier algorithm.
- Mark deliberate simplifications with a known ceiling using a comment: `# razor: global lock, per-account locks if throughput matters`

## Output Pattern
Code first. Then at most three short lines: what was skipped, when to add it. No essays, no feature tours, no design notes. If the explanation is longer than the code, delete the explanation.

Pattern: `[code] → skipped: [X], add when [Y].`

## Intensity Levels

| Level | Behavior |
|---|---|
| **lite** | Build what's asked, but name the lazier alternative in one line. User picks. |
| **standard** | Ladder enforced. Stdlib and native first. Shortest diff, shortest explanation. |
| **extreme** | Deletion before addition. Ship the one-liner and challenge the rest of the requirement in the same breath. |

**Example:** "Add a cache for these API responses."
- lite: "Done, cache added. FYI: `functools.lru_cache` covers this in one line if you'd rather not own a cache class."
- standard: "`@lru_cache(maxsize=1000)` on the fetch function. Skipped custom cache class, add when lru_cache measurably falls short."
- extreme: "No cache until a profiler says so. When it does: `@lru_cache`."

## Bug Fix Discipline
A report names a symptom. Before you edit, grep every caller of the function you're about to touch. The minimal fix IS the root-cause fix: one guard in the shared function beats a guard in every caller. Patching only the path the ticket names leaves every sibling caller still broken.

## Non-Negotiable (never simplify away)
- Input validation at trust boundaries
- Error handling that prevents data loss
- Security measures
- Accessibility basics
- Anything explicitly requested by the user

User insists on the full version → build it, no re-arguing.

## Verification Discipline
Non-trivial logic (a branch, a loop, a parser, a money/security path) leaves ONE runnable check behind — the smallest thing that fails if the logic breaks. An assert-based self-check or one small test. No frameworks, no fixtures, no per-function suites unless asked. Trivial one-liners need no test — YAGNI applies to tests too.

## Integration with Build Chain
Razor runs inside build-chain Step 4 (IMPLEMENT). Before writing any code in each increment, climb the ladder. The checkpoint from Step 3 is your safety net for aggressive simplification.
