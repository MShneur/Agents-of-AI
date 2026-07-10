---
id: test-driven-development
type: workflow
purpose: Write the test first, watch it fail, write minimal code to pass. If you didn't watch the test fail, you don't know if it tests the right thing.
steps: 3
agents_used: [debugger, verification-specialist]
personas_used: [anti-sycophant, logic-architect]
confidence: PRACTICED
version: "1.0"
tags: [tdd, testing, development, red-green-refactor, quality]
compatible_with: [any-ai]
source: Reformulated from obra/superpowers test-driven-development skill (85k stars, MIT)
---

# Test-Driven Development

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over. Don't keep it as "reference." Don't "adapt" it while writing tests. Don't look at it. Delete means delete. Implement fresh from tests.

## When to Use

**Always:** new features, bug fixes, refactoring, behavior changes.

**Exceptions (ask the user):** throwaway prototypes, generated code, configuration files.

Thinking "skip TDD just this once"? Stop. That's rationalization.

## The Cycle: Red → Green → Refactor

### RED — write a failing test
1. Write one test that describes the next behavior you want
2. Run it. Watch it fail.
3. Confirm it fails for the *right reason* — wrong error message means the test is wrong, not that you can skip ahead

**If the test passes immediately:** the behavior already exists (you didn't need to write it) or the test doesn't test what you think it tests. Investigate before proceeding.

### GREEN — write minimal code to pass
1. Write the simplest code that makes the test pass
2. "Simplest" means it. Hardcode if that passes. Return a constant if that passes. The refactor step exists for a reason.
3. Run the test. It must pass. All other tests must still pass.

**Resist the urge to write "good" code here.** Good code happens in refactor. Green is about one thing: making the failing test pass.

### REFACTOR — clean up
1. All tests are green. Now improve the code.
2. Remove duplication. Improve names. Extract methods.
3. Run tests after each refactoring step — if a test breaks, your refactoring changed behavior. Undo.
4. When tests are green and code is clean: next cycle.

## Testing Anti-Patterns to Avoid

| Anti-pattern | Why it's bad | What to do instead |
|---|---|---|
| Testing implementation, not behavior | Tests break on every refactor even when behavior is unchanged | Test the public interface and its observable effects |
| Mocking everything | Tests pass but the real system is broken | Mock boundaries (network, DB, time). Don't mock the code you're testing. |
| One giant test | When it fails, you don't know which behavior broke | One behavior per test. Each test has one reason to fail. |
| Duplicate logic in tests | Tests that mirror the implementation prove nothing — they'll have the same bugs | Tests should encode expected inputs/outputs, not re-implement the algorithm |
| Circular assertions | `assert result == function(input)` — you're testing that the function equals itself | Assert against a known expected value |
| No edge cases | Happy path passes, production breaks | Test boundaries: empty, null, negative, maximum, unicode, concurrent |

## Output

Each cycle produces:
1. A failing test (with the failure message shown)
2. Minimal code that makes it pass (with the passing result shown)
3. Refactored code (with all tests still passing)

Name the behavior each test covers. If you can't name it in one sentence, the test is doing too much.

## Integration with Agentic Dev Cycle

TDD runs inside Step 4 (IMPLEMENT) of the agentic-dev-cycle workflow. Each red-green-refactor cycle is one increment. Commit after each green+refactor.

---

*Reformulated from obra/superpowers test-driven-development skill (85k stars). Core TDD principles from Kent Beck.*
