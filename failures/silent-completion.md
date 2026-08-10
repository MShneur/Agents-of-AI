---
id: silent-completion
type: failure
domain: agent execution, automation, tool use
purpose: A step failed, produced nothing, or returned junk — and the run continued as though it had succeeded. The report is confident and the artifact does not exist.
confidence: PRACTICED
version: "1.0"
tags: [execution, tool-use, verification, silent-failure]
compatible_with: [any-ai]
---

# Silent Completion

## The Failure

A tool call errors, returns an empty result, or returns something structurally wrong. Nothing raises. The next step consumes the non-result as if it were data, and every step after that inherits the void. By the time anything visible breaks, the actual failure is many steps back — and the summary at the end says the work was done.

This is the most expensive failure class in automated work because it costs nothing at the moment it happens.

## Detection Signal

- A success report with no artifact path, no byte count, no identifier.
- A step that completed suspiciously fast.
- Output that describes what was done rather than showing what exists.
- A count that came back zero and was not commented on. Zero is a result that deserves a sentence.

## The Fix

Assert on the artifact, never on the claim. After any step that produces something, read it back and check a property that only exists if the step really worked — size, hash, row count, a string that must be present. Treat empty results as failures until proven otherwise.

Where a step cannot be read back, say the step is unverified rather than reporting it complete.

## Often Mistaken For

Model laziness or a bad prompt. It is usually neither — it is a missing read-back.

## When to Check

After every write, fetch, push, build, or transform, and before any step that depends on one.
