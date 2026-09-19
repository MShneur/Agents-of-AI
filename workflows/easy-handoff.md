---
id: easy-handoff
type: workflow
purpose: Keep long AI work machine-complete while making operator-facing handoffs glanceable, monotonic, and impossible to confuse with progress theater.
steps: 5
agents_used: [scribe, conductor]
personas_used: [distiller, mirror]
confidence: EXPERIMENTAL
version: "1.0"
tags: [handoff, continuity, progress, compression, operator, long-session, ai-readable]
compatible_with: [any-ai]
---

# Easy Handoff

**Aliases:** Zero Handoff · Zero Protocol Handoff

## Purpose

Easy Handoff separates two audiences that should not be forced to read the same record:

1. **AI continuity record** — dense, structured, portable state another AI can resume from.
2. **Human operator handoff** — only the current progress, what happened, and what comes next.

The workflow changes the reporting layer, not project authority. It does not replace a canonical ledger, project handoff, Quorum, Human Gate, or acceptance test.

## When to Use

Use on every substantial multi-step AoA task, especially long chats, parallel lanes, handoffs between models, or work the human is not reading line-by-line.

For a trivial one-turn answer, use only the short human handoff if reporting is useful.

## Step 1 — Declare the cast

At the first material update, record:

```text
AOA=<methods actually used>
MODEL=<model actually executing>
```

Do not claim a method, model, expert, tool, or verifier that was not actually used.

**Done when:** the next AI can tell which AoA capabilities produced the work.

## Step 2 — Lock progress to real state

Progress numbers come from the canonical roadmap, ledger, checklist, or explicit scoped plan.

Rules:

- Use `A/B`, where `B` is a real scoped denominator.
- If no denominator exists yet, use `0/?`. Never invent one to make progress look measurable.
- Increment `A` only when the step's acceptance evidence passes.
- Keep the denominator stable. If scope changes, show the delta explicitly: `6/10 -> 6/12 (+2 scope)`.
- Nested work uses: `Step 7/10 · Milestone 1/4`.
- A failed attempt does not increase progress.
- Rework does not reset progress already verified unless evidence proves a completed step regressed.

**Done when:** progress is monotonic, evidence-backed, and traceable to a fixed plan.

## Step 3 — Write AI trace, not human narration

During long work, prefer compact event records over explanatory paragraphs.

```text
[AoA TRACE]
TASK=<stable task/lane id>
ROADMAP=<A/B>
MILESTONE=<x/y or NONE>
ACTION=<bounded action>
RESULT=PASS|FAIL|PARTIAL|NOT_RUN
EVIDENCE=<artifact/path/test/source>
STATE_CHANGE=<what is now true>
ERROR=<NONE or exact failure>
DECISION=<accepted change or NONE>
NEXT=<next bounded action>
```

Rules:

- Record actions, evidence, decisions, errors, codes, files, and state transitions.
- Omit conversational filler and repeated context.
- Preserve `UNKNOWN`, `NOT_RUN`, dissent, and authority state.
- Do not expose private chain-of-thought. The trace is an execution/state record, not hidden reasoning.
- If a canonical durable record exists, update it and reference it; do not create a competing master state.

**Done when:** another AI can resume the work without reconstructing it from prose.

## Step 4 — Route serious forks before interrupting the operator

When existing project governance calls for Human Gate or a consequential decision reaches a genuine fork:

1. Run Human Gate / Quorum when the decision can be resolved from available evidence and existing authority.
2. Apply the safest reversible next step when authority permits.
3. Interrupt the human only when one of these is true:
   - explicit human permission or release authority is required;
   - the choice is materially irreversible;
   - the decision depends on a preference only the human can supply;
   - required evidence exists only with the human;
   - Quorum remains `DISPUTED` and no safe reversible step survives.

The operator-facing handoff reports only the effect of the gate unless more detail is requested.

**Done when:** serious questions are not bounced to the human merely because the AI can ask.

## Step 5 — Render the Easy Handoff

Default operator-facing output:

```text
- ✓ Agents of AI — <methods actually used> — <model>
- Progress — <A/B> [· Milestone <x/y>]

- ✓ Done — <what was just completed and whether it passed>
- → Next — <the next bounded step>
```

Use only when applicable:

```text
- ✗ Fail — <what failed and where>
- ! HALT — <why the current path must stop; what human action/authority is required>
- △ Recommend — <minor pathway alteration and why>
- + Defer — <useful later item; stable delta/id if one exists>
```

Rules:

- Bullets, not paragraphs.
- One fact/action per bullet.
- Lead with outcome, not method.
- Do not dump the audit, Quorum deliberation, tool log, or implementation detail unless asked.
- If nothing changed, do not manufacture an update.
- The final handoff should normally fit on one phone screen.

**Done when:** the operator can answer three questions at a glance: Where are we? What happened? What happens next?

## Done Condition

Easy Handoff passes when all are true:

- AoA methods and executing model are stated accurately.
- Progress is tied to a real denominator or honestly marked `?`.
- Current result is marked success/failure/partial without ambiguity.
- The next step is one bounded action.
- Any required human intervention is explicit.
- Detailed continuity exists in structured AI-readable form without exposing private reasoning.
- No suggestion was laundered into a decision during compression.

## Failure Signals

- progress numbers rise without acceptance evidence;
- denominator silently changes;
- output returns to long paragraphs;
- a failed attempt is reported as progress;
- a Human Gate is dumped on the operator instead of reduced to its decision impact;
- a recommendation becomes a decision after compression;
- the human must reread the chat to learn the next step;
- the AI trace becomes chain-of-thought instead of an evidence/state record.

## Design Provenance — not a runtime roster

This v1 was shaped by a live Quorum-style review on 2026-09-19. The names below are method references only; none participated in or endorsed Agents of AI. Future Quorums must re-source seats live per `workflows/quorum.md`.

### Method seat
- **Barbara Minto** — Pyramid Principle / SCQ: lead with the governing point and organize support beneath it. Source: https://www.barbaraminto.com/
- **Steve Krug** — *Don't Make Me Think*: optimize for scanning and remove unnecessary cognitive work. Source: https://sensible.com/dont-make-me-think/

Decision applied: human status is outcome-first, scan-first, and paragraph-free.

### Evidence seat
- **Amy J. Starmer** — I-PASS standardized handoff research. Source: https://pubmed.ncbi.nlm.nih.gov/22232313/
- **Christopher P. Landrigan** — multicenter I-PASS handoff/error research. Source: https://www.nejm.org/doi/full/10.1056/NEJMsa1405556

Decision applied: fixed handoff fields beat free-form summaries; action and contingency state must survive transfer.

### Operator seat
- **Jez Humble** — Continuous Delivery: small, low-risk increments with rapid feedback. Source: https://continuousdelivery.com/about/
- **Gene Kim** — Three Ways: system flow, fast feedback, continual learning. Source: https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/

Decision applied: progress advances only on verified bounded increments; the next step stays small and reversible.

### Adversary seat
- **Nancy Leveson** — STAMP / systems-theoretic safety: failures emerge from unsafe interactions and weak control, not only isolated component faults. Source: https://mitpress.mit.edu/9780262297301/engineering-a-safer-world/
- **Richard I. Cook** — *How Complex Systems Fail*: defended systems still fail through interacting conditions and latent weaknesses. Source: https://www.researchgate.net/publication/228797158_How_complex_systems_fail

Decision applied: compression may never hide `FAIL`, `UNKNOWN`, authority boundaries, or a required halt.

### Affected-user seat
- **Janice (Ginny) Redish** — user-centered web content as conversation serving the reader's task. Source: https://www.sciencedirect.com/book/monograph/9780123859303/letting-go-of-the-words
- **Jakob Nielsen** — visibility of system status and usability heuristics. Source: https://www.nngroup.com/articles/ten-usability-heuristics/

Decision applied: the operator must always see current system status and next action without reading the implementation record.

## Spike / dissent

The strongest objection was that an AI-dense trace can become a second wall of text. The mitigation is structural: emit trace records only on material state change, keep them fielded and compact, and use the canonical durable record when one already exists. Easy Handoff is not permission to narrate every tool call.
