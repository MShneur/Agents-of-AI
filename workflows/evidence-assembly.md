---
id: evidence-assembly
type: workflow
purpose: Convert verifiable external professional methods into controlled experiments, authorized corrections, and independently checked task outcomes.
steps: 7
agents_used: [scout, archaeologist, conductor, auditor, stresstest]
personas_used: [provenance, burden, mirror, verdict]
confidence: EXPERIMENTAL
version: "1.0"
tags: [quorum, research, professional-methods, execution, acceptance, evidence]
compatible_with: [any-ai]
---

# Evidence Assembly

## Purpose

Use automatically for substantive, uncertain engineering or research work where method selection or a root-cause diagnosis materially changes the result; it is also the default **execution continuation** after a task-triggered Quorum. An explicit Quorum still uses `workflows/quorum.md` for its named seats, sourcing, Spike, and dissent. This workflow neither requires a large panel for trivial work nor invents participation by external professionals.

## Steps

1. **Anchor (Archaeologist):** Identify the actual target, live authoritative version, owner, known attempts, permitted actions, real failure and meaningful success condition. Preserve explicit scope and project history. Done when a reproducible observation is separated from inference.
2. **Broaden carefully (Mirror):** Reconcile the likely outcome with surrounding system effects, tests and existing reusable components. Preserve verbatim limits and authority. Done when adjacent impacts have explicit owner/scope rather than an automatic permission expansion.
3. **Source methods (Scout + Provenance):** When named Quorum is warranted, use its five core seats and at least two real independently documented practitioners per seat, with a third bridge specialist only when needed. Trace primary contributions across multiple relevant projects/periods where available, exact source/revision, documented design decisions, limitations, competing methods and task fit. Separate documented professional questions from AI-derived questions. A famous name, organization repo or job advertisement is not proof of the individual's contribution. Missing expertise triggers further task-specific sourcing or an `INCOMPLETE` seat.
4. **Form competing tests (Burden):** State at least two distinct causal hypotheses, a cheap discriminating experiment, the null/negative control, accepted resource and authorization bounds, and a way to disprove the leading approach. A sourced opinion is not a test result.
5. **Run and repair (Conductor):** Within the current owner and safety permissions, execute the bounded experiment and implement the smallest justified correction. Test the actual environment when accessible, then adjacent regressions. A refused external operation must not be rerouted to evade the refusal. When tools are unavailable, mark `NOT_TESTED` rather than claim a field fix.
6. **Challenge (Auditor + Stresstest):** Verify target identity, result, negative case, independent evidence axis, documented dissent, data leakage, and rollback. Repeated unrooted patches trigger the existing Cleanerz/Stall Guard process. Same-model simulated reviewers are not independent professional endorsement.
7. **Close (Conductor):** Return `PASS | FAIL | PARTIAL | BLOCKED | NOT_TESTED` with the actual evidence, remaining outcome gap, owner and one next bounded action in the existing canonical handoff. Use Easy Handoff for the short human status; do not publish a committee transcript by default.

## Done Condition

The intended outcome is evidenced by an authorized discriminating test and independent acceptance, or a precisely identified blocker is preserved without invented success. Quorum deliberation alone never certifies implemented behavior.

## When NOT to Use

Simple factual questions, a verbatim edit, ordinary text drafting, or a closed task with no material uncertainty. This workflow never installs a simulation engine, sends private source to an unapproved model, or grants external-network bypass.

## Failure Signal

An agent cites a recognizable expert without verifying contributions, mistakes synthetic review for independent participation, returns a strategy essay where authorized runnable tests existed, or labels a file edit as production proof.
