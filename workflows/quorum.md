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
steps: 7
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
2. **Research** — what are the strongest competing methods practitioners actually
   use here, and which failure mode does each optimize against?
3. **Seat** — assign heavy/light pairs from that research. Name the sourcing.
4. **Independent pass** — each seat returns position, strongest support, one
   objection, confidence, and what would change their view. No seat sees another
   first where independence is achievable.
5. **Cross-examine** — seats challenge each other's assumptions directly.
   Operator and Affected may reject technically correct options on cost grounds.
6. **Spike** — mandatory per trigger above.
7. **Dispose and decide** — every objection gets a disposition, then the
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
