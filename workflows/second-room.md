---
id: second-room
type: workflow
purpose: Review important public-facing work in independent AI sessions before release. Prevents one chat from grading its own framing while pretending several personas are independent reviewers.
steps: 7
agents_used: [scribe, auditor, conductor]
personas_used: [megaphone, redline, mirror, distiller]
confidence: PRACTICED
version: "1.0"
tags: [publishing, communications, multi-agent, multi-model, red-team, review]
compatible_with: [any-ai]
---

# Second Room

## Purpose

Important copy should not be written, challenged, repaired, and approved inside the same conversation.

A single chat can simulate several personas, and that is useful during drafting. It still carries the original assumptions, context, and momentum. For publication work, send the draft into separate chats so the reviewers can disagree without inheriting the author's reasoning.

Use different models or providers when available. Separate chats with the same model are still better than one chat changing hats.

## Trigger

Use Second Room when the material is public, difficult to retract, or likely to disappoint people if a key fact is buried. Examples include:

- launch copy, product pages, public announcements, and community posts;
- medical, safety, legal, financial, or policy-adjacent material;
- claims about features, compatibility, price, availability, evidence, or results;
- copy with a hard qualifier such as platform, location, team size, skill level, or required workflow;
- anything the author describes as important, sensitive, controversial, or high stakes.

Routine low-risk copy may use one independent reviewer. Important copy uses at least three independent review rooms plus a final human decision.

## Reviewer Packet

Freeze one packet before review:

1. the exact draft;
2. intended audience and desired action;
3. confirmed facts and source links;
4. known constraints and disqualifiers;
5. platform or community rules;
6. items the author is uncertain about.

Do not include the author's defense of the draft. Reviewers should see the work, not be coached into agreeing with it.

## Steps

### 1. Author Room

Create the draft and state its intended audience, promise, evidence, constraints, and desired action. Mark uncertainty instead of filling gaps with confident language.

### 2. Freeze the Packet

Copy the same reviewer packet into each review room. Do not quietly improve the draft between reviewers. Independent reviews are only comparable when they examine the same version.

### 3. Qualifier Room

Ask a fresh chat to review audience fit and disqualifiers.

It must answer:

- Who cannot use, buy, follow, or benefit from this?
- What fact could make a reasonable reader feel misled after clicking?
- Which hard constraint belongs in the first line or first screen?
- Is the message attracting attention from people it cannot serve?

Output: `PASS`, `REVISE`, or `HOLD`, followed by the missing or buried qualifiers.

### 4. Truth Room

Ask a separate chat to review evidence, omissions, and hostile interpretations.

It must answer:

- Which claims are verified, inferred, promotional, or unsupported?
- What important context is missing?
- Could a skeptical reader reasonably interpret the wording more strongly than the evidence allows?
- Does the draft imply endorsement, certainty, safety, compatibility, or availability that has not been established?

Output: `PASS`, `REVISE`, or `HOLD`, with claim-by-claim findings.

### 5. Human Voice Room

Ask another fresh chat to review the draft as a real member of the intended audience.

It must answer:

- Does this sound like a person helping, or a product performing marketing?
- Is the answer useful before it promotes anything?
- Is the self-promotion proportionate and relevant?
- Are there canned phrases, fake warmth, repeated structures, or obvious AI habits?
- What can be removed without losing the point?

Output: `PASS`, `REVISE`, or `HOLD`, plus a short edit list. It should not rewrite the entire piece unless asked.

### 6. Reconciliation Room

Give a separate editor chat the frozen draft and all independent reviews. It must preserve disagreements rather than averaging them away.

The editor produces:

- accepted changes;
- rejected suggestions with reasons;
- unresolved conflicts for the human;
- a revised draft;
- a checklist showing that every hard qualifier and factual claim was handled.

### 7. Final Gate

Send only the revised draft, source packet, and acceptance checklist to one fresh verifier chat. It checks that the repair did not create a new claim, bury a qualifier, weaken a safety boundary, or reintroduce AI-sounding copy.

The human owner makes the release decision. No agent publishes automatically.

## Rules

- Review rooms do not see one another's answers before submitting their own.
- A reviewer may reject the framing, not merely polish the wording.
- Different models are recommended because model disagreement is useful evidence, not noise.
- Three personas in one chat do not count as three independent reviewers.
- A clean verdict without reasons is not a review.
- Medical, legal, financial, and safety content still requires proper sources and qualified human oversight. This workflow creates independence, not expertise.

## Example

A macOS-only app is promoted with the platform requirement near the bottom.

The Qualifier Room identifies Windows users as people the message cannot serve and moves `Mac` into the first line. The Truth Room checks that compatibility claims match the actual build. The Human Voice Room removes defensive wording so the qualifier reads as targeting, not an apology.

The lesson is not "mention limitations." It is "front-load the fact that determines whether the reader belongs in the audience."

## Output

```text
SECOND ROOM REVIEW
Draft version:
Audience:
Risk level:

Qualifier Room: PASS / REVISE / HOLD
Findings:

Truth Room: PASS / REVISE / HOLD
Findings:

Human Voice Room: PASS / REVISE / HOLD
Findings:

Reconciliation:
- Accepted:
- Rejected:
- Unresolved:

Final Gate: PASS / REVISE / HOLD
Human release decision: APPROVE / HOLD
```

## Allergy

One conversation approving its own work. Persona theater presented as independent review. Reviewers who only rewrite. Buried disqualifiers. Promotion before usefulness. Consensus created by shared context.