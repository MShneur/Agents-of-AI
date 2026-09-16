# Alt-ssembly Required — Development B Hardening

Status: **COMPLETE**  
Branch: `research/rivet-plugin-product-agent`

## Objective

Red-team Development A against Ghost in the Loop's actual failure history, run a Cleanerz pass on Alt-ssembly itself, create a portable ChatGPT Skill adapter, create the Ghost-specific activation prompt, and prepare the branch for review without repeating the same overcorrection patterns the agent is meant to prevent.

## Red-team evidence used

Ghost issue/PR history was re-read, including:

- issue #40 — 8.8.2 remained field-broken despite deterministic/browser success; authenticated Firefox/Tampermonkey remained the acceptance authority; parallel fixes had to be reconciled; stale tests must not resurrect obsolete UI architecture;
- PR #36 — corrected an overclaimed root cause, preserved exact-one Send authority, and explicitly refused to treat signed-out DOM evidence as authenticated field proof;
- PR #37 — showed whole-composer replacement after injection, a live-host behavior missing from stable-node fixtures;
- PR #46 — v9 simplified the Play/Send mechanism and correctly bounded its certification, but later product feedback showed that controller simplification had been overextended into product-feature removal.

## Gaps found in Development A

### 1. Operator corrections were not first-class invalidation events
Ghost repeatedly continued from an obsolete interpretation after the owner clarified scope.

**Fix:** added the **Operator Correction Gate**. An explicit correction updates the Product Packet/Preservation Ledger before more implementation. Repeated correction on the same scope point is treated as process failure.

### 2. The agent preserved existing features but did not proactively discover missing ones
The target agent is supposed to take an original idea and surface useful adjacent capabilities before the owner has to discover them one by one.

**Fix:** added the conditional **Opportunity Sweep** for greenfield/broad work. It inspects analogous products, open-source projects, platform capabilities, relevant AoA methods, and common product surfaces, then classifies suggestions as `NOW | NEXT | LATER | REJECT`. Discovery does not silently grant implementation authority.

### 3. Stale tests could still be mistaken for product authority
Ghost had a legacy test expecting an obsolete committee toggle.

**Fix:** added the **Stale-Test Gate**: establish accepted current behavior first, then update an obsolete test. Never restore obsolete architecture merely to turn CI green.

### 4. Evidence invalidation existed only as a Cleanerz trigger
A candidate can change after field proof, making earlier evidence stale.

**Fix:** promoted this to a binding **Proof Invalidation Gate**. A changed artifact invalidates affected proof and requires targeted rerun.

### 5. Development A still risked becoming ceremonial
The four contracts appeared in both the agent and workflow at substantial length.

**Fix:** added the default compact **Assembly Card** and rewrote agent/workflow v1.1 so contracts expand only when load-bearing. Workflow compressed from 8 stages to 7 by combining related mapping/proof work.

### 6. Operator-facing output still risked being too long
Ghost history includes repeated owner requests for a short answer: fixed/not fixed, what failed, what next.

**Fix:** added a default operator surface of exactly three priorities: `Ready / Not ready / Blocked`, one load-bearing reason, one next action. Detailed evidence remains durable in repo artifacts.

### 7. Development A roster arithmetic was wrong
The Development A changelog/tracker said 86 entries. The pre-branch repo had 85; adding one agent and one workflow yields **87**, not 86.

**Fix:** Development B corrects the roster to 87 and treats the arithmetic miss as evidence for using the canonical sync/check rather than memory.

## Cleanerz pass on Alt-ssembly itself

### SALVAGE
Keep:
- one accountable chief operator;
- Product Packet;
- Runtime Envelope;
- Novice Contract;
- Evidence Contract;
- Preservation Ledger;
- evidence ladder;
- live-practitioner Quorum rule;
- Human Gate for consequential irreversible choices;
- Cleanerz auto-fire;
- field-canary discipline.

### KILL / COMPRESS
Kill or compress:
- repeated explanations of the same contract in agent + workflow;
- mandatory long-form contract output for small tasks;
- duplicate ceremony between mapping stages;
- detailed matrices in operator-facing chat when they can live in durable artifacts;
- any implication that Alt-ssembly itself replaces Tracker, Root Cause, Buildhouse, Repo Nanny, Stresstest, Locksmith, Chisel, Scout, Cleanerz, Quorum, or Human Gate.

### CLEANED RESULT
- Agent v1.1 uses one Assembly Card by default and expands only load-bearing contracts.
- Workflow v1.1 has 7 stages and a Lite Variant.
- The agent remains orchestration/product-preservation logic, not a new giant framework.

## Independent external-model lens

A Token Router multi-model comparison was attempted. It failed closed because fewer than two models were currently verified zero-priced. A single verified-free Nemotron model was then attempted, but Token Router returned HTTP 403 / zero remaining credit. No external-model output is counted as review evidence.

## Portable Skill

Created a ChatGPT/Codex/API/Atlas-compatible Skill adapter under:

`adapters/chatgpt/alt-ssembly-required/`

Files:
- `SKILL.md`
- `agents/openai.yaml`
- `references/protocol.md`
- `references/ghost-regression.md`

The Skill was also initialized and packaged with the canonical OpenAI `skill-creator` scripts. Validation passed and produced `skill.zip` for installation.

## Ghost activation

Created:

`adapters/chatgpt/alt-ssembly-required/GHOST_ACTIVATION_PROMPT.md`

It binds Ghost-specific preservation and evidence rules without hardcoding Ghost behavior into the universal agent.

## Development B claim ceiling

Development B now supports:

- canonical AoA agent v1.1;
- canonical AoA workflow v1.1;
- Ghost-history red-team dispositions;
- Cleanerz simplification pass;
- portable validated ChatGPT Skill package;
- Ghost-specific activation prompt;
- corrected roster arithmetic.

Remaining pre-merge work is documentation roster synchronization/check plus normal human review of the branch. No GitHub-hosted Actions were dispatched.
