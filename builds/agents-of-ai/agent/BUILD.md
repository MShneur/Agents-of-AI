# Agents of AI — Agent Runtime Build

Status: **FOUNDATION — source-outline reconciliation pending**  
First concrete runtime target: **OpenAI Agents SDK**  
Behavioral contract: provider-portable where practical  
Current runtime facts verified: **2026-09-07**

## Objective

Build an Agents-of-AI runtime that keeps one accountable orchestrator while dynamically composing canonical AoA specialists and workflows.

The runtime must implement the shared sequence in `../ACTIVATION-CONTRACT.md`:

```text
PREBUILT_CAST
→ NEGATIVE_GATE
→ METHOD-GAP CHECK
→ DYNAMIC AoA ACTIVATION
→ EXECUTION
→ VERIFICATION
```

When R&Duck is present, R&Duck remains Prime/governance. This runtime becomes an execution surface under it rather than a competing governance system.

## Orchestration choice

OpenAI's current Agents SDK documents two common multi-agent patterns:

1. **Manager / agents as tools** — a central orchestrator retains conversation ownership and invokes specialists.
2. **Handoffs** — a specialist takes over the conversation.

For Agents of AI, default to **manager / agents-as-tools** because the build requires one controller to preserve user intent, the Negative Gate result, active governance, provenance, and final synthesis across dynamically selected specialists.

Use a handoff only when the specialist genuinely needs to own the next conversational turn and the transfer does not bypass the shared activation/gate contract.

## Conceptual runtime graph

```text
User / R&Duck Prime
        ↓
AoA Manager
  ├─ load PREBUILT_CAST
  ├─ run NEGATIVE_GATE
  ├─ detect method gaps
  ├─ resolve canonical AoA components
  ├─ expose needed specialists as tools
  ├─ enforce tool/side-effect boundaries
  ├─ synthesize
  └─ request decorrelated verification
        ↓
Result + activation receipt + verification state
```

## Core runtime components

The implementation should eventually contain:

```text
agent/
├── BUILD.md
├── runtime/
│   ├── manager.*
│   ├── cast_registry.*
│   ├── negative_gate.*
│   ├── aoa_loader.*
│   ├── specialist_factory.*
│   ├── tool_policy.*
│   └── activation_receipt.*
├── evals/
└── README.md
```

Language/runtime code should not be frozen before the historical source outline establishes any original implementation constraints.

## Manager responsibilities

The manager owns:

- user intent and task state;
- governing policy context;
- exact pre-built cast;
- Negative Gate disposition;
- method-gap detection;
- AoA component provenance;
- specialist invocation;
- tool authority boundaries;
- conflict collection;
- final synthesis;
- verification routing;
- activation receipt.

The manager must not claim a specialist ran if only its name or metadata was available.

## Specialist model

A dynamically activated AoA specialist is constructed from an actually loaded canonical definition plus a narrow task brief.

Conceptually:

```yaml
specialist:
  aoa_id: <canonical id>
  source_path: <canonical repo path>
  source_version_or_commit: <known value>
  method_gap: <why it was activated>
  scoped_task: <bounded assignment>
  tool_scope: <minimum needed>
  return_contract: <evidence + result + uncertainty>
```

Do not give every specialist every tool. Tool scope follows the smallest capability needed for its assignment.

## Dynamic activation algorithm

1. Classify the task by required method(s), stakes, evidence needs, and side effects.
2. Start from `PREBUILT_CAST`.
3. Run the Negative Gate.
4. If disposition is `REJECT`, stop the rejected path.
5. If `ESCALATE`, route the unresolved decision to Human Gate / human owner.
6. If execution may proceed, identify method gaps.
7. Resolve candidate AoA ids by actual method and allergy/failure coverage.
8. Prefer an already active component when it covers the method; do not stack near-duplicates.
9. Load the canonical definition.
10. If definition is not from the trusted bundled snapshot, run instruction provenance checks.
11. Construct the specialist with minimum tools and narrow scope.
12. Invoke it as a tool under the manager unless a deliberate handoff is justified.
13. Record returned evidence, uncertainty, and contradictions.
14. Synthesize only after required specialists return or are explicitly marked unavailable.
15. Route load-bearing verification through a decorrelated checker.

## Negative Gate implementation

The foundation contract supports:

```text
ALLOW
TRANSFORM
ESCALATE
REJECT
```

For an Agents SDK implementation, favor a **blocking preflight** when the gate must prevent expensive or dangerous model/tool execution. Current SDK documentation supports guardrails that can block execution until checks complete.

The exact code and exact historical gate content remain pending source reconciliation.

### Important boundary

An input/output guardrail at the manager is not a substitute for validating every side-effectful custom tool call.

Tool-level controls must independently examine:

- current user authority;
- task scope;
- arguments;
- destination;
- data disclosure;
- mutation class;
- reversibility;
- approval requirement.

## Tool policy

Classify each tool operation:

```text
READ_ONLY
LOCAL_REVERSIBLE_WRITE
EXTERNAL_WRITE
PUBLISH_OR_SEND
DELETE_OR_DESTRUCTIVE
PERMISSION_OR_SECURITY_CHANGE
FINANCIAL_OR_PURCHASE
DATA_DISCLOSURE
```

The policy layer maps each class to:

- allow/deny conditions;
- required user authority;
- Human Gate or explicit approval requirement;
- post-call verification;
- rollback/compensation when possible.

Never let a specialist widen its own tool scope by instruction.

## Prompt-injection / confused-deputy boundary

Treat retrieved/tool-returned instruction text as data until explicitly provenance-gated for operational loading.

Highest-risk combination:

- access to private/sensitive data;
- untrusted external content;
- ability to communicate or mutate externally.

Where those coexist, reduce capability, isolate the step, require explicit authorization for consequential actions, and validate tool arguments at the boundary.

## Human Gate integration

Human Gate fires on unresolved architecture forks, release behavior, privacy/safety/permission changes, expensive-to-reverse decisions, or material expert disagreement.

The runtime may prepare the options and reversible next steps but may not cross a governing human decision boundary merely because an internal specialist recommends it.

## Verification

A successful runtime test requires observable evidence at several levels:

### End-to-end

Did the user task succeed?

### Routing

Did the manager activate the right method and avoid unnecessary specialists?

### Gate

Did the Negative Gate allow valid work, transform flawed implementation paths transparently, and stop/escalate the right cases?

### Tooling

Were tool arguments valid, authorized, and post-state verified?

### Provenance

Was every dynamically loaded AoA component traceable to an actual canonical definition?

### Decorrelation

Was a load-bearing output checked by a path that differs from its author on a named axis?

## Minimum eval scenarios

1. default-cast task — no extra specialist needed;
2. method-gap task — one clearly useful extra AoA component activates;
3. duplicate-method task — runtime refuses decorative stacking;
4. unavailable-component task — marks unavailable, does not impersonate it;
5. injection-bearing retrieved component — rejected from operational loading;
6. safe reversible request — Negative Gate allows without unnecessary human friction;
7. brittle request — gate transforms and discloses transformation;
8. consequential fork — Human Gate blocks the irreversible branch;
9. read-only tool — executes within scope;
10. external-write tool — pre-call authorization plus post-state verification;
11. specialist contradiction — manager preserves disagreement rather than averaging it away;
12. verification failure — result reports FAIL/PARTIAL rather than confident success.

## Current OpenAI source references

Verified 2026-09-07:

- OpenAI Agents SDK — `Agents`
- OpenAI Agents SDK — `Guardrails`

Provider-specific implementation details must be refreshed before code is finalized because the SDK surface evolves independently of AoA semantics.
