---
id: outcome-reconciliation
type: workflow
purpose: Turn exploratory project requests into verifiable end states without overriding exact instructions or project owners.
steps: 6
agents_used: [archaeologist, conductor, stresstest]
personas_used: [compass, mirror, provenance]
confidence: EXPERIMENTAL
version: "1.0"
tags: [intent, dictation, outcomes, verification]
compatible_with: [any-ai]
---

# Outcome Reconciliation

## Purpose
Apply to substantive, ambiguous requests to improve an existing project. Aim for the real project outcome without treating probable intent as permission. Do not use for simple factual questions or for explicit verbatim-only edits.

## Steps
1. **Preserve (Conductor + Mirror):** Capture the user's exact words, exclusions, uncertain transcription and any explicit narrow scope. Done when the literal request and the interpretation are separately recorded. No interruption unless an essential safety-sensitive choice remains.
2. **Reconcile (Archaeologist + Provenance):** Read only current authoritative project state and relevant past user corrections, not every old message. Done when owner, known failures and prior attempts have verifiable pointers. Hold if ownership collides.
3. **Define (Conductor + Compass):** State the likely end-state, present failure, measurable acceptance condition, non-goals and uncertainty. Done when the outcome could be falsified by a real check. Escalate a consequential interpretation fork to Human Gate.
4. **Map (Archaeologist):** Examine affected implementation, UX, security, evidence, agent/Skill instructions, tests and continuity. Label each `IN_SCOPE_NOW | LINKED_UPDATE | RECOMMEND | DEFER | BLOCKED`; omit unrelated surfaces. Done when all load-bearing dependencies have owners and scopes.
5. **Execute (Conductor):** Make the smallest authorized integrated change inside current ownership and run the proper verifier. Never silently expand public, paid, destructive or sensitive-data permissions. Done only after the bounded change has observable evidence.
6. **Challenge (Stresstest + Mirror):** Check the actual project result and adjacent regressions. Preserve `UNKNOWN`, `NOT_TESTED`, and remaining follow-ups in existing project continuity. Done only when result and next bounded action are recorded.

## Done Condition
A verified outcome delta or an explicit, evidence-backed blocked state with one exact next action. A literal one-file change is not proof the underlying project failure is solved.

## When NOT to Use
Ordinary weather or self-contained lookup; requests explicitly limited to copyediting; prompt rewriting that does not request task execution (route to Scribe).

## Failure Signal
The agent declares success because the last literal instruction passed while the known project failure remains. 
