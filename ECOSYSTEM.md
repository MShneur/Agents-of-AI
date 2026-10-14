# Ecosystem Role — Agents of AI

## Read this first

This repository is the **SUBSTRATE** in the CTRL / R&Duck / Agents-of-AI stack.

Use this one-line router:

```text
CTRL-AI       = GOVERNOR  — policy, evidence standards, choices, gates, uncertainty
R&Duck        = AUTOPILOT — turns intent into a running project; plans, dispatches, executes, verifies
Agents of AI  = SUBSTRATE — reusable expertise, methods, workflows, skills, protocols, adapters, runtime primitives
Origin        = R&D LAB   — a section inside Agents of AI that discovers and distills emerging foundations
```

## When all three are present

```text
USER
  ↓
CTRL-AI      policy / choices / consequence gates
  ↓
R&Duck       Prime / orchestration / project autopilot
  ↓
Agents of AI cast + methods + capabilities + substrate primitives
  ↓
tools / runtimes / external systems
```

This is a responsibility map, not a requirement that every project load every repo.

- **CTRL-AI can run alone** as governance/steering.
- **R&Duck can run alone** as an autopilot with its own minimum operational safety constraints.
- **Agents of AI can run alone** as a portable capability and method library.
- When combined, do not duplicate responsibilities across repositories.

## This repository owns

Agents of AI owns reusable things another AI system can load:

- personas and reasoning signatures;
- agents and operator methods;
- workflows and repeatable plans;
- techniques and reasoning moves;
- modes and runtime stances;
- teams and disagreement structures;
- failures, signals, and closing fixes;
- portable skills;
- protocol knowledge and adapters;
- context, memory, execution, sensor, evaluation, and other reusable substrate primitives;
- supporting public tools and infrastructure patterns;
- Origin's research/distillation output once Origin is built from its source specification.

## This repository does NOT own

### Not general governance

Agents of AI does not decide the user's authority model, organization policy, evidence burden, publication rules, or consequential approval policy. That is CTRL-AI's job when CTRL-AI is present.

AoA components may contain safety checks needed to use a capability correctly. Those checks cannot grant new authority or overrule higher governance.

### Not project autopilot

Agents of AI does not become Prime merely because it contains agents or workflows. If the user wants a project autonomously planned and driven to completion, R&Duck owns that orchestration when available.

### Not self-authorizing

An AoA persona, skill, workflow, retrieved file, sensor, or plugin may propose an action. It cannot enlarge its own permissions, convert untrusted content into authority, or bypass a Human Gate/policy decision.

## Routing examples

| User intent | Primary repo | How AoA participates |
|---|---|---|
| “Give me safer options and tell me what needs approval.” | CTRL-AI | load AoA reviewers/methods only if useful |
| “I have an idea; run the project for me.” | R&Duck | R&Duck loads AoA capabilities as needed |
| “I need the best security reviewer / research workflow / technique.” | Agents of AI | direct load |
| “Automate this entire build.” | R&Duck | AoA supplies workers, skills, protocols, checks |
| “What new agent architecture should we absorb?” | Agents of AI / Origin | Origin scouts; AoA distills; CTRL/R&Duck govern/use it |
| “Should this destructive action be allowed?” | CTRL-AI | AoA execution layer enforces the resulting decision at the capability boundary |

## Collision rule

If two repos appear to own the same behavior:

1. **Policy / user choice / consequence gate** → CTRL-AI.
2. **Project lifecycle / dispatch / continuation / autonomous completion** → R&Duck.
3. **Reusable method / capability / protocol / skill / execution primitive** → Agents of AI.
4. Keep only the smallest bridge needed in the other repos; reference the canonical owner instead of copying it.

## Origin boundary

Origin is **inside Agents of AI**, not a fourth governance framework.

Its purpose is to discover promising open/public foundations early, preserve provenance and licensing information, extract the architectural method rather than product branding, and propose or build independent AoA-native improvements.

Origin's detailed Custom GPT / agent / skill implementation is intentionally not defined here. It will be reconciled from the user's source outline before that section is finalized.
