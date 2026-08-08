---
id: human-gate-committee
type: workflow
trigger: human decision, consequential choice, architecture fork, release gate, safety tradeoff, unresolved expert disagreement
purpose: Convene a named multi-perspective review group when a consequential decision needs structured dissent before human choice.
anti-goal: Will not manufacture consensus, impersonate real experts, or replace the human decision owner.
confidence: EXPERIMENTAL
version: "1.0"
tags: [decision, human-gate, committee, dissent, review, governance]
compatible_with: [any-ai]
---

# Human Gate Committee

## Purpose

The **Human Gate Committee** is the canonical reusable decision-review workflow for consequential choices that should not be made by one agent perspective alone.

It is a decision aid. The human owner keeps final authority whenever the project requires a human choice.

## When to Invoke

Use it when one or more are true:

- a decision materially changes architecture, release behavior, safety posture, permissions, privacy, or project direction;
- two credible approaches survive ordinary analysis;
- evidence is incomplete and the downside of a wrong irreversible choice is meaningful;
- a public release, deprecation, closure, or high-impact write deserves independent review;
- project authority, user intent, and technical evidence conflict;
- another workflow explicitly reaches a human gate.

Do not invoke it for routine, reversible actions already covered by an approved rule.

## Committee Shape

Use named characters chosen for the actual decision. The normal committee contains:

1. **Expert A — method one:** a named domain professional representing one credible approach.
2. **Expert B — method two:** a named peer using a materially different method or school of thought.
3. **Operator:** a named implementation/operations professional focused on execution, testing, maintenance, and rollback.
4. **Adversarial reviewer:** a named safety, security, reliability, governance, or red-team perspective when downside risk warrants it.
5. **Target-user representative:** a named persona representing the people who will actually use or experience the result.

Add specialists only when they materially improve the decision. Do not create a large committee for appearance.

Names identify stable fictional review perspectives unless a real participant actually contributed. Never imply that a real external professional reviewed the work when they did not.

## Protocol

### 1. Frame the Gate

State:

- decision to make;
- options under consideration;
- evidence available;
- constraints and invariants;
- what remains unknown;
- whether the choice is reversible.

### 2. Independent Review

Each member independently returns:

- preferred option;
- strongest supporting evidence;
- one failure mode or objection;
- confidence;
- evidence that would change their view.

Do not let members merely echo the first answer.

### 3. Consensus Challenge

If three or more members converge, explicitly assign one reviewer to challenge the apparent consensus before closing deliberation.

### 4. Synthesis

Return:

- points of agreement;
- material disagreements;
- strongest dissent;
- risk-adjusted recommendation;
- safest reversible next step;
- remaining human choice, if any.

### 5. Human Gate

When project policy requires human approval, stop the consequential action and present the decision clearly. Continue only with reversible work that does not pre-empt the unresolved choice.

## Authority Boundary

The Human Gate Committee may recommend, rank, challenge, and document. It does not independently gain authority to:

- merge or enable auto-merge;
- publish externally;
- weaken a safety or verification gate;
- invent evidence;
- overrule repository authority files or explicit human decisions.

## Output

```markdown
# Human Gate Committee

## Decision

## Members
- Name — role / method
- Name — role / method
- Name — operator
- Name — adversarial reviewer (when warranted)
- Name — target-user representative

## Independent Views

## Consensus

## Dissent

## Risk-Adjusted Recommendation

## Safest Reversible Next Step

## Human Choice Required
YES | NO
```

## Integration

This workflow is intentionally reusable. Repo-specific private evidence, project casts, and durable decision records belong in the project's private memory layer when one exists.

Repo Nanny should invoke this workflow at consequential maintenance gates rather than creating an ad-hoc committee each time.

## Allergy

The Human Gate Committee refuses synthetic unanimity, decorative personas, fake expert attribution, and decisions where dissent was never independently generated.
