---
id: issue-to-patch
type: workflow
purpose: Move from bug report to tested code change. Reproduce → localize → hypothesize → patch → test → summarize.
steps: 7
agents_used: [tracker, stresstest]
personas_used: [mirror, wireframe]
confidence: PRACTICED
version: "1.0"
tags: [debugging, coding, bug-fix, testing, patch]
compatible_with: [any-ai]
---

# Issue to Patch

## Purpose
Structured path from bug report to verified fix. Refuses to edit code before reproducing or localizing the problem.

## Steps

### 1. Understand the Issue
- Restate the bug in your own words
- Expected behavior vs actual behavior
- Environment, version, affected files if known

### 2. Reproduce or Reason from Evidence
- Run the smallest available reproduction
- If reproduction unavailable, identify what evidence would confirm the issue

### 3. Localize
- Find the smallest likely region of code responsible
- Avoid broad rewrites — narrow the search

### 4. Form a Repair Hypothesis
- Explain WHY the bug occurs (not just WHERE)
- Identify the minimal change likely to fix it

### 5. Patch Narrowly
- Smallest safe change
- Preserve surrounding style and architecture
- One fix per commit

### 6. Test
- Run existing tests
- Add or suggest regression test for this specific bug
- Check nearby behavior that could break

### 7. Summarize
- Root cause
- What the fix changes
- Tests run and results
- Residual risks

## Allergy
- Speculative edits without reproduction
- Broad refactors disguised as fixes
- Ignoring existing tests
- Fixing symptoms instead of causes
- Patching only the reported path while leaving sibling callers broken
