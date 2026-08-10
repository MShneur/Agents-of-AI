---
id: cleanerz
type: workflow
trigger: >
  Invoked by name: "cleanerz", "activate cleanerz", "run cleanerz", "send in the
  cleanerz", "something's off". Also fires on its own — see Auto-Fire below. The
  coined spelling is deliberate: it cannot be mistaken for a generic instruction,
  so it never collides with crisis response or with an ordinary audit request.
purpose: >
  The meta-workflow. Every other workflow operates inside the current plan;
  Cleanerz operates on the plan. It runs when work has started looping, when
  effort is rising while progress falls, or when the operator senses something is
  wrong but cannot name it. It does not produce findings. It produces a handled
  situation, one decision, and less to read than the mess it cleaned.
anti-goal: >
  Will not produce a findings list, a status report, or a document longer than the
  work it is cleaning. Will not be run by whoever caused the loop without saying so.
  Will not end in "further analysis needed". Will not fire repeatedly — a cleaning
  crew that lives on site is the mess.
steps: 6
agents_used: [auditor, conductor, archaeologist]
personas_used: [mirror, burden, verdict, compass]
confidence: EXPERIMENTAL
version: "1.0"
tags: [meta, loop-breaking, replan, strategy, intervention, horizon, cleanerz]
compatible_with: [any-ai]
---

# Cleanerz

**Canonical name:** Cleanerz
**Invocation:** `cleanerz` · `activate cleanerz` · `something's off`

## What It Is

A cleaner arrives after the situation is already blown. They do not ask how it
happened, they do not file a report, and they do not hand it back until it is
handled.

Every other workflow works *inside* the plan. Cleanerz works *on* it. That is the
whole distinction, and it is why an audit cannot substitute: an audit finds what
is broken within the current direction. Cleanerz asks whether the direction is
the thing that is broken.

## Auto-Fire

Cleanerz does not wait to be called. By the time the operator notices a loop, the
loop has already cost them. Any one of these is sufficient:

- a fix that fixes a previous fix
- three consecutive correction passes with no net progress
- the same decision revisited a third time
- a version, draft, or plan revised more than twice in one working session
- output volume rising while operator clarity falls
- **the operator says something is off** — always sufficient, never needs a reason

## The Adapter [REQUIRED FIRST]

Cleanerz is domain-neutral. Before anything else, define two words for *this*
project. Everything downstream reads from them.

```
DONE   = what counts as genuinely shipped here
BROKEN = what counts as failure here
```

A repository: merged and gates passing / gate red or reverted. A manuscript:
chapter accepted / rewritten twice without acceptance. An incident record:
evidence preserved and deadline met / a date missed or a document lost. A
research pipeline: a claim sourced and reproducible / a claim that cannot be
traced.

If these two words cannot be stated, that is the finding. Stop and get them.

## The Six Moves

### 1. Stop the work
No building, no commits, no drafting during a cleaning. State plainly what
actually reached DONE versus what was claimed. These diverge more than anyone
expects, and the gap is usually where the loop lives.

### 2. Name the loop
What triggered it, how many passes it consumed, what it cost. An unnamed loop
re-forms. Say who caused it — including when the answer is the AI running this.
Whoever caused the loop cannot be the sole voice assessing it.

### 3. Salvage
What is genuinely working and must survive any replan. Name it explicitly and
protect it. Replans destroy good work by accident more often than by decision.

### 4. Kill
What is not working, will not work, or exists only because it was started. Killing
is the output people avoid, which is why it gets its own move. A cleaning that
kills nothing has not cleaned.

### 5. Horizon
Four buckets, against real constraints rather than wishes:

```
NOW        actionable today with what exists
NEXT       this week, with one dependency to clear
LATER      this month, needs a decision or a resource first
OUT OF REACH  not available at current capability, budget, or authority
```

`OUT OF REACH` is a required output. A horizon with nothing unreachable is a
fantasy, and the honesty of the other three buckets depends on it.

### 6. Hand it back
One page. One decision to the operator. One next move. Then stop.

## Output Ceiling [BINDING]

The whole cleaning fits on one page. If the cleaning produces more text than the
mess did, it failed and the failure is structural, not stylistic — the operator
came here because there was already too much to read.

```
DONE / BROKEN     the two definitions
LOOP              what it was, what it cost
SALVAGE           what survives
KILL              what stops
HORIZON           now / next / later / out of reach
DECISION          the fork, the options, the recommendation
KILL CONDITION    what would prove this new plan wrong
```

## Kill Conditions

- **One pass.** If a cleaning cannot conclude, that is the finding — escalate,
  do not iterate. A second pass on the same mess is the loop wearing a new name.
- **Cooldown.** Cannot re-fire on the same project immediately. Frequent cleanings
  are themselves a loop.
- **Must decide.** A cleaning ending in "needs further analysis" has failed.
- **Self-retirement.** If two consecutive cleanings produce plans that do not
  survive their own kill conditions, Cleanerz is the problem and gets retired.

## Friction Requirement

Before the new plan is accepted, the operator states in their own words what they
think is actually wrong. One sentence is enough.

This is not ceremony. A plan received passively gets deferred to; a plan
contributed to gets tested. The operator's sentence is also the strongest
available signal — they sensed the loop before any trigger fired.

## Allergy

Findings lists. Status reports. Cleanings longer than the mess. Being run by the
party that caused the loop without that being said out loud. Replans that protect
nothing and kill nothing. Horizons with no unreachable bucket. Firing so often
that it becomes the process rather than the interruption to it.
