# Agents of AI — Substrate Router

Agents of AI has two kinds of reusable material:

1. **Reasoning library** — the seven canonical composable layers:
   `personas/`, `agents/`, `workflows/`, `techniques/`, `modes/`, `teams/`, `failures/`.
2. **Technical substrate** — the reusable machinery and contracts that let those components operate safely and portably across runtimes.

`substrate/` is **not an eighth reasoning layer**. A substrate document is not a persona to cast or a workflow to pretend ran. It describes reusable capability boundaries, runtime patterns, protocol mappings, execution contracts, and evaluation infrastructure.

## Surfaces

| Surface | Question it answers |
|---|---|
| `runtime/` | How are capabilities mounted, replaced, scheduled, resumed, and observed? |
| `context/` | What reaches the model, at what detail, and what stays outside context? |
| `memory/` | What survives, why, with what confidence/lifecycle, and how is it recalled? |
| `execution/` | Where can agent-generated actions run, and how can they be isolated/reverted? |
| `protocols/` | Which interoperability protocol belongs at which boundary? |
| `sensors/` | How does changing external reality become structured agent input? |
| `adapters/` | How do interchangeable providers satisfy one capability without hard-coding a vendor? |
| `evals/` | How do we verify the trajectory, tool calls, and resulting state—not only final prose? |
| `skills/` | How are AoA methods packaged for progressive, portable loading? |
| `research/` | How are external open/public foundations discovered, licensed, distilled, and independently implemented? |

## Governing invariants

1. **Replaceability over lock-in.** Depend on capability contracts, not one provider's implementation.
2. **Deterministic where possible.** Use normal code/policy for guarantees; spend model judgment where ambiguity actually exists.
3. **Progressive context.** Give the model the least detail needed for the current decision; retain deeper material outside the prompt until required.
4. **Reversible execution.** Risky experimentation prefers isolated, snapshot-capable environments and commit-or-rollback behavior.
5. **Observable history.** Model-visible inputs, tool calls, decisions, and state transitions should be reconstructable when the runtime supports it.
6. **Authority at the boundary.** A prompt can propose; the actual side-effect boundary must enforce permissions/policy when deterministic enforcement exists.
7. **Source provenance.** External skills, plugins, sensors, code, and architectural ideas retain source/license records.
8. **No phantom capability.** Selecting or naming a plugin/protocol/agent is not proof that it was loaded or executed.

## Relationship to CTRL-AI and R&Duck

- **CTRL-AI** defines governance and user-facing policy/choice.
- **R&Duck** orchestrates projects and autonomous work.
- **Agents of AI substrate** supplies the reusable technical capability those systems can mount.

Example:

```text
CTRL-AI: publishing needs approval
        ↓
R&Duck: schedules a release task and reaches the gate
        ↓
AoA execution substrate: blocks the publish tool until an approved policy decision exists
        ↓
provider adapter: performs the actual publish call
```

The policy is not copied into AoA; the execution hook is not copied into CTRL-AI; the project lifecycle is not copied into either.

## Current foundation patterns

The first substrate batch distills independent AoA-native contracts from public/open projects and practitioner methods. See `substrate/research/SOURCE-LEDGER-2026-09-07.md` for provenance and licenses.

Initial high-value patterns:

- capability backplane / swappable seams;
- durable event history;
- progressive context + compute-outside-context;
- evidence-scored memory lifecycle;
- disposable workspaces with snapshot/fork/rollback;
- deterministic action firewall;
- protocol router;
- sensor plane;
- collector mesh with primary/fallback/doctor behavior;
- trajectory-first verification;
- portable skill contract;
- autonomous ratchet loops;
- license-aware source distillation and an early-signal radar.

## Origin

Origin will live inside Agents of AI as the R&D/scouting build that automates parts of `substrate/research/` and turns promising foundations into reviewed AoA candidates.

Origin's actual Custom GPT, agent, and skills implementation remains on hold until the user's historical Origin source outline is supplied.
