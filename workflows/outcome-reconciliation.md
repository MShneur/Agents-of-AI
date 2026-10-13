---
id: outcome-reconciliation
type: workflow
purpose: Turn exploratory project requests into verifiable end states without overriding exact instructions or project owners.
steps: 6
agents_used: [archaeologist, conductor, stresstest]
personas_used: [compass, mirror, provenance]
confidence: EXPERIMENTAL
version: "1.1"
tags: [intent, dictation, outcomes, verification, multi-turn, asr, spirit-pass]
compatible_with: [any-ai]
---

# Outcome Reconciliation

## Purpose
Apply to substantive, ambiguous requests to improve an existing project. Aim for the real project outcome without treating probable intent as permission. Do not use for simple factual questions or for explicit verbatim-only edits.

## SPIRIT PASS — NAME IS THE INVOCATION

**Primary invocation:** `take the spirit of what I'm saying`

Also recognized: `take the spirit` · `spirit pass` ·
`understand what I'm trying to do, not just the words`.

This is not permission to improvise. It is an instruction to reconstruct the
**project-level intent** before routing the task.

Use the current utterance as one piece of evidence, not the entire objective. Read
the smallest relevant set of current project truth, recent turns, accepted
decisions, prior corrections, known failures, and durable continuity needed to
recover the goal. Do not bulk-load history for reassurance.

### Spirit Pass pipeline

1. **Verbatim layer** — preserve the user's actual words and mark uncertain
   transcription, malformed names, abrupt fragments, or likely speech-to-text
   substitutions. Never silently erase the literal request.
2. **Project layer** — recover the current project goal, recent direction, accepted
   constraints, unresolved failure, non-goals, and what previous prompts were
   collectively trying to achieve.
3. **Intent hypotheses** — form a small set of plausible interpretations:
   literal-turn intent, project-level intent, and one credible alternate when
   ambiguity exists. Do not lock onto the first keyword.
4. **Language repair** — consider phonetic neighbors, misspellings, homophones,
   dictated punctuation loss, shorthand, and domain terminology. Example:
   `Quora` may be a transcription of `Quorum` when the project context makes
   that substantially more likely. Permission-critical names, URLs, quantities,
   accounts, recipients, legal terms, or destructive targets are never silently
   normalized.
5. **Terminology expansion** — map colloquial language to the best current
   professional/technical concepts when that changes the solution. Search current
   terminology when the field is fast-moving. The user's word is a clue, not a
   mandatory search keyword.
6. **Goal reconstruction** — derive the likely end-state, emotional/interaction
   intent when relevant, measurable acceptance condition, and what would count as
   solving the *project* rather than merely satisfying the sentence.
7. **Anti-inertia check** — ask internally whether prior answers are being copied
   forward merely because they exist. A new turn can refine or change the goal;
   conversation history is context, not a command to keep the old plan.
8. **Confidence gate** — if one interpretation dominates and the next step is safe
   and reversible, proceed and keep uncertainty proportional. If plausible
   interpretations lead to materially different consequential actions, use the
   smallest Human Gate question instead of pretending certainty.

### Internal reconstruction record

```
VERBATIM                exact current utterance
TRANSCRIPTION_UNKNOWN   uncertain token/name/phrase | NONE
PROJECT_INTENT          best current end-state
TERM_MAP                user's phrase -> likely domain term(s)
ALTERNATIVES            credible competing intent(s)
CONFIDENCE              HIGH | MED | LOW
PERMISSION_BOUNDARY     exact permissions that remain literal
NEXT_ACTION             smallest action that advances the reconstructed goal
```

Do not print this block by default. It exists to keep the interpretation auditable.

### Hard boundary

**Infer meaning, never authority.** Spirit Pass cannot infer permission to spend,
publish, merge, delete, contact someone, expose secrets, modify production data, or
cross another project owner's boundary. Exact consequential permissions remain
literal even when the likely intent seems obvious.

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
