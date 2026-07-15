---
id: rarv-cycle
type: technique
domain: agentic execution, autonomous development, quality gates
purpose: Every agent action follows a 4-step loop — Reason (read state), Act (do the work), Reflect (verify and update memory), Verify (run tests and pass quality gates). Prevents agent drift and unverified output.
confidence: PRACTICED
version: "1.0"
tags: [agentic, execution, quality-gates, autonomous, verification]
compatible_with: [any-ai]
---

# RARV Cycle

## The Move
Every agent action, before it's considered complete, must pass through four steps:

1. **Reason** — read current state. What's the context? What was decided previously? What constraints apply? Don't act on stale assumptions.
2. **Act** — do the work. Write the code, produce the analysis, draft the document.
3. **Reflect** — verify the output. Did it accomplish what Reason identified? Update memory/state with what happened. Log patterns and mistakes.
4. **Verify** — run external checks. Tests pass? Quality gates met? Standards followed? If verification fails, loop back to Reason with the failure data.

## Key Properties
- **Blind review**: the verifier should not be the same agent that acted. If the same AI instance must do both, it must re-read the output fresh rather than relying on its memory of writing it.
- **No phase advancement without verification**: work doesn't move forward until Verify passes. This prevents the "looks done" failure mode.
- **Memory accumulation**: Reflect builds three types of memory:
  - *Episodic* — full traces of what happened in each phase
  - *Semantic* — patterns extracted (e.g., "this codebase uses repository pattern")
  - *Learnings* — mistakes made and how they were fixed

## When to Use
Any autonomous or semi-autonomous AI task that spans multiple steps. Especially: multi-file code changes, multi-stage research, document production with accuracy requirements.

## When NOT to Use
Single-turn Q&A. Simple factual lookups. Tasks where verification is impossible.
