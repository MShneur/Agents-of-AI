---
id: quorum
type: workflow
trigger: >
  Invoked by name: "quorum", "convene quorum", "named quorum". Also convened by
  human-gate when a decision needs an assembled body rather than one perspective.
purpose: >
  Assemble the minimum expert body required for a decision to be valid. Seats are
  weighted, not equal. Every seat is filled by two real practitioners whose public
  methods are retrieved live at convening time — never by invented composites and
  never from a stored roster, because a stored roster becomes the assembler's own
  reasoning wearing other people's names.
anti-goal: >
  Will not invent expert personas. Will not imply a real practitioner participated,
  endorsed, or said anything they did not publish. Will not fill seats from memory
  when retrieval is available. Will not return unanimous. Will not run more than
  three cycles without rotating its own leads.
steps: 8
agents_used: [scout, auditor, conductor]
personas_used: [mirror, burden, provenance, verdict]
confidence: EXPERIMENTAL
version: "1.0"
tags: [quorum, decision, expert, dissent, anti-fossilization, spike, named]
compatible_with: [any-ai]
---

# Quorum

**Invocation:** `quorum` · `convene quorum` · `named quorum`

A quorum is the minimum body for a decision to be **valid**. An incomplete quorum
does not produce a weaker decision. It produces no decision.

## THE NAMED RULE [BINDING]

Every seat is filled by **real practitioners with documented public methods.**

Invented composites are forbidden. A composite can only surface what the assembler
already believes — it is the assembler's own objection wearing a name, and it
cannot produce a finding that originates outside the system being reviewed. That
externality is the entire reason to convene.

**Attribution, non-negotiable:**

- Cite the **published method**, never a fabricated position or quote.
- State plainly that the practitioner did not participate and has not endorsed.
- If their documented method does not address the question, say so and drop the
  seat rather than extrapolating what they *would* say.

## LIVE SOURCING [BINDING]

Seats are sourced **at convening time**, not from a stored list.

A frozen roster of expert takes decays into the same failure as a composite: it
stops surprising, it goes stale against current practice, and within months it is
indistinguishable from something the assembler wrote. The power is in the
retrieval, not the record.

If retrieval is unavailable: declare the seat **EMPTY**, mark the quorum
**INCOMPLETE**, and produce no decision. Say which seat is missing.

## SEAT STAGING

Seats are weighted, not equal. **Two practitioners per seat — one heavy, one
light.** They are complementary within the role, not opposed for the sake of it.
The pair exists so the seat is covered when one method is silent on the question,
not to manufacture an argument.

```
HEAVY   leads the seat. Their method frames the question.
LIGHT   supports it. Their method tests the frame and covers its blind spot.
```

| Seat | What it carries |
|---|---|
| **Method** | The dominant practice in this domain and how it is actually applied |
| **Evidence** | What would falsify the recommendation; where the data is |
| **Operator** | Maintenance burden, rollback, who carries it afterward |
| **Adversary** | Misuse, security, hidden failure, the case for abandonment |
| **Affected** | The actual demographic living with the result |
| **Specialist** | The 8th slot — filled per task, empty when nothing distinct is needed |

Minimum five seats. The Specialist slot is filled only when a distinct expertise
or constituency is genuinely missing, never to make the body look impressive.


## EXPANSION GATE [BINDING]

Before seats are assigned, the assembler must test whether the **literal prompt is
narrower than the real decision**. The purpose is to catch missing system effects,
not to rewrite the user's goal.

For every material product/system decision, answer these questions before seating:

1. **Power-user maximization:** what happens if the most active 1% uses this feature
   as hard as the rules allow? Does the design still work, or does it create load,
   spam, starvation, or an unintended shortcut?
2. **Fleet multiplication:** does one user's choice multiply downstream work across
   stores, items, models, providers, regions, or accounts? Can shared state, caching,
   coalescing, batching, or dedupe turn N user actions into one system action?
3. **Abuse/farm path:** what is the cheapest way to game this mechanic with many
   accounts, duplicated submissions, cheap evidence, referrals, or automation?
4. **Expert/returning-user path:** does a highly skilled or previously proven user
   still have a reason to stay? Are we slowing them merely because they progress
   quickly instead of giving them deeper mastery, prestige, or responsibility?
5. **Novice/casual path:** is the system still useful before mastery, or does it look
   broken/empty unless the user grinds?
6. **Adjacent-system reuse:** is there already a canonical table, scheduler, support
   thread, entitlement system, cache, or workflow that should absorb this feature
   instead of creating a parallel subsystem?
7. **Performance/cost path:** what does this add to initial page weight, requests,
   compute, storage, external-provider cost, operator burden, and failure surface?
8. **Future-generalization:** does the decision still make sense for the next
   retailer/category/user role, or is it accidentally hard-coded to today's example?
9. **Support/feedback path:** when the feature confuses or fails for a real user,
   what evidence will support collect, how will it be triaged, and how does that
   feed the next iteration?
10. **Missing-seat test:** after answering 1–9, name the practitioner/domain that
    would be most likely to reject the current framing. If that expertise is not
    represented, add/re-source a Specialist seat before proceeding.

If any answer changes the decision boundary, rewrite the **Frame** before research.
If the answer is unknown and materially load-bearing, mark it UNKNOWN and make the
reversible step measure it rather than guessing.

## SIGNAL-BEFORE-VERDICT GATE [BINDING]

Before research narrows a candidate set or declares "not relevant", apply
`workflows/signal-before-verdict.md`.

At minimum distinguish:
- observed fact;
- precursor signal;
- candidate/hypothesis;
- confirmation rule;
- explicit exclusion rule;
- UNKNOWN.

A terminal outcome threshold must not be used as the discovery predicate unless the
owner explicitly requested terminal-only retrieval or the recall-loss tradeoff has
been evaluated and accepted.

This gate is especially mandatory when the owner's language contains shorthand,
patterns, lifecycle states, ranking thresholds, support statuses, inferred trust,
or missing-data semantics.

## ROLE ROTATION [ANTI-FOSSILIZATION]

After three cycles on the same project with the same heavy-weight configuration,
**rotation is forced**: heavy becomes light, light becomes heavy, and at least one
seat is re-sourced entirely.

A stable roster produces stable conclusions. That reads as consistency and is
actually an echo chamber with good manners.

## SPIKE [MANDATORY — NOT OVERRIDABLE]

Spike injects as InverseChampion when either holds:

- fewer than two rounds of genuine dissent, or
- **substantive deliberation reaching unanimity** — depth without dissent is a
  stronger groupthink signal than quick agreement

Spike argues against the emerging consensus from the strongest available angle.
Spike cannot be waived by the operator, by time pressure, or by the assembler.

## DISSENT DISPOSITION

Every objection raised must close with one of four, stated explicitly:

```
ACCEPTED    changed the recommendation
MITIGATED   addressed but not fully resolved — state the residual
OVERRIDDEN  rejected — state why, and what would reverse that
DISPUTED    unresolved
```

**DISPUTED is not a failure state.** On DISPUTED, output the specific conflict,
the strongest evidence on each side, and two to three resolution paths including
`INVESTIGATE FURTHER`. Never force a resolution when more data is what is
actually needed.

## PROTOCOL

1. **Frame** — decision, options, constraints, reversibility, who is affected.
2. **Expansion Gate** — run the power-user, fleet, abuse, expert, novice, reuse,
   performance, generalization, support, and missing-seat tests above. Rewrite the
   frame if any of them materially changes the decision.
3. **Research** — what are the strongest competing methods practitioners actually
   use here, and which failure mode does each optimize against?
4. **Seat** — assign heavy/light pairs from that research. Name the sourcing.
5. **Independent pass** — each seat returns position, strongest support, one
   objection, confidence, and what would change their view. No seat sees another
   first where independence is achievable.
6. **Cross-examine** — seats challenge each other's assumptions directly.
   Operator and Affected may reject technically correct options on cost grounds.
7. **Spike** — mandatory per trigger above.
8. **Dispose and decide** — every objection gets a disposition, then the
   risk-adjusted recommendation, the safest reversible next step, and whether
   human choice is required.

## OUTPUT

```
DECISION          the fork
SEATS             heavy / light per seat, with sourcing stated
INDEPENDENT       one position + one objection each
CROSS-EXAM        what actually got challenged
SPIKE             the case against consensus
DISPOSITIONS      every objection: ACCEPTED | MITIGATED | OVERRIDDEN | DISPUTED
RECOMMENDATION    risk-adjusted
REVERSIBLE STEP   safest thing to do first
HUMAN CHOICE      YES | NO
```

## KILL CONDITIONS

- **Unanimous output.** A quorum returning no dissent has measured agreement, not
  correctness. Re-run with Spike or declare INCOMPLETE.
- **Composite seat.** One invented persona voids the quorum entirely.
- **Stale sourcing.** Seats reused across cycles without re-retrieval void the
  named rule — the roster has become the assembler's own reasoning again.
- **No disposition.** Objections raised and left unclosed void the output.
- **Self-retirement.** If three consecutive quorums produce recommendations that
  do not survive their own reversible-step test, the protocol is the problem.

## ALLERGY

Invented experts. Fabricated quotes. Implied endorsement. Stored rosters presented
as sourced. Equal-weight seats. Synthetic unanimity. Objections raised for texture
and never closed. Committees convened to ratify a decision already made.
