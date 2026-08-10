---
id: human-gate-committee
type: workflow
trigger: >
  Invoked by name: "human gate", "quorum", "convene quorum", "run human gate".
  Also on: consequential choice, architecture fork, release gate, safety tradeoff,
  unresolved expert disagreement, or any decision expensive to reverse.
purpose: Convene the Human Gate: a named expert committee with deliberate methodological opposition and target-user representation before consequential decisions.
anti-goal: Will not manufacture consensus, use decorative personas, impersonate real experts, or replace the human decision owner.
confidence: EXPERIMENTAL
version: "1.1"
tags: [decision, human-gate, quorum, dissent, expert-review, user-representation]
compatible_with: [any-ai]
---

# Human Gate

**Canonical name:** Human Gate
**The assembled body:** Quorum — the minimum seats required for a decision to be valid. An incomplete quorum does not produce a weaker decision; it produces no decision.
**Invocation:** `human gate` · `quorum` · `convene quorum`
**Backward-compatible alias:** Human Gate Committee

## Purpose

The **Human Gate** is the reusable expert-committee workflow for consequential choices that should not be decided by one agent perspective alone.

It assembles named expert personas for the roles that actually matter to the decision, deliberately pairs opposing schools or methods inside critical roles, includes the affected-user demographic, and preserves dissent before recommending a path forward.

The Human Gate recommends. The human owner retains final authority whenever project policy requires human choice.

## When to Invoke

Use it when one or more are true:

- a decision materially changes architecture, release behavior, safety posture, permissions, privacy, or project direction;
- two credible approaches survive ordinary analysis;
- evidence is incomplete and the downside of a wrong or irreversible choice is meaningful;
- a public release, deprecation, closure, or high-impact write deserves independent review;
- project authority, user intent, and technical evidence conflict;
- a heavy project needs a cross-functional design decision;
- another workflow explicitly reaches a human gate.

Do not invoke it for routine, reversible actions already covered by an approved rule.

## Committee Size

**Default floor: 5–6 named personas.**

A valid Human Gate should normally have at least six seats when the decision spans implementation, risk, and user impact. Five is acceptable only when one seat genuinely covers two closely related responsibilities without reducing dissent.

Heavy or high-stakes projects may expand beyond six. Add seats because a distinct expertise or affected constituency is missing, not to make the committee look impressive.

## Composition Rule

For every decision, identify the roles that carry real consequence. For each critical professional role, prefer an **opposed pair** rather than one generic expert.

Example for a coding/architecture decision:

1. **Maya Chen — simplicity-first senior engineer.** Favors minimal surfaces, legibility, boring technology, and reversible changes.
2. **Rafael Ortiz — systems/reliability engineer.** Favors explicit state, resilience, observability, and stronger infrastructure even when it costs complexity.
3. **Priya Nair — delivery/operator lead.** Evaluates testability, deployment, maintenance burden, rollback, and ownership.
4. **Elena Brooks — adversarial reviewer.** Searches for security, reliability, governance, misuse, and hidden failure modes.
5. **Jordan Lee — target-user representative.** Represents the actual affected demographic, device constraints, expectations, and practical friction.
6. **Samira Okafor — evidence/research reviewer.** Challenges unsupported assumptions, checks external practice, and asks what evidence would falsify the recommendation.

For another domain, replace the engineering seats with appropriate experts but preserve the structure: **opposed methods + operator + adversarial perspective + target demographic + evidence perspective**.

## Opposing-Ideology Rule

“Opposite” means meaningfully different professional philosophy or method, not artificial political disagreement.

Examples:

- simplicity-first vs platform/reliability-first engineering;
- strict TDD vs rapid prototype-and-observe development;
- privacy-minimization vs observability/telemetry optimization;
- centralized orchestration vs bounded autonomous delegation;
- conservative release engineering vs progressive delivery/experimentation.

The opposing pair must disagree for substantive reasons and be allowed to reject the other approach.

## Naming and Expert Persona Rule

Every seat gets a stable human-readable name and a specific method.

Names may represent fictional composite professionals or personas explicitly inspired by documented public methods. Never imply that a real external professional participated unless they actually did. If a real practitioner is used as inspiration, extract and cite the public reasoning method rather than impersonating the person.

## Research Requirement

For consequential or unfamiliar domains, the Human Gate should research the relevant professional schools before final composition.

Research should ask:

- What are the strongest competing methods used by practitioners?
- Which failure modes does each school optimize against?
- What current evidence or real-world adoption supports each approach?
- What do affected users report in practice?
- Is a missing role or constituency material enough to add another seat?

Research informs the personas; it does not create fake endorsements.

## Protocol

### 1. Frame the Gate

State the decision, options, evidence, constraints, invariants, unknowns, reversibility, and affected users.

### 2. Build the Committee

Choose at least 5–6 named seats. Verify that critical roles have genuine methodological opposition and that one seat represents the actual target demographic.

### 3. Independent Review

Each member independently returns:

- preferred option;
- strongest supporting evidence;
- one failure mode or objection;
- confidence;
- evidence that would change their view.

Do not let members see or simply echo an earlier member's conclusion when independent review is possible.

### 4. Cross-Examination

Opposed experts must directly challenge each other's assumptions. The operator and target-user representative may reject technically elegant options that create unacceptable operational or user cost.

### 5. Consensus Challenge

If three or more members converge, explicitly assign one member to make the strongest case against the emerging consensus before closing deliberation.

### 6. Synthesis

Return:

- points of agreement;
- material disagreements;
- strongest dissent;
- evidence quality;
- risk-adjusted recommendation;
- safest reversible next step;
- remaining human choice, if any.

### 7. Human Gate

When project policy requires human approval, stop the consequential action and present the decision clearly. Continue only with reversible work that does not pre-empt the unresolved choice.

## Authority Boundary

The Human Gate may recommend, rank, challenge, and document. It does not independently gain authority to:

- merge or enable auto-merge;
- publish externally;
- weaken a safety or verification gate;
- invent evidence or endorsements;
- overrule repository authority files or explicit human decisions.

## Output

```markdown
# Human Gate

## Decision

## Committee
- Name — role / method
- Name — opposing role / method
- Name — operator
- Name — adversarial reviewer
- Name — target-user demographic
- Name — evidence/research reviewer
- Additional specialists when warranted

## Independent Views

## Cross-Examination

## Consensus

## Dissent

## Evidence Quality

## Risk-Adjusted Recommendation

## Safest Reversible Next Step

## Human Choice Required
YES | NO
```

## Integration

This workflow is reusable across Agents-of-AI. Repo-specific private evidence, project casts, demographic definitions, and durable decision records belong in the consuming project's private memory layer when one exists.

Repo Nanny should invoke **Human Gate** at consequential maintenance gates rather than inventing an ad-hoc committee each time.

## Allergy

Human Gate refuses synthetic unanimity, single-expert authority, decorative personas, fake expert attribution, demographic omission, and decisions where competing professional methods were never allowed to disagree.
