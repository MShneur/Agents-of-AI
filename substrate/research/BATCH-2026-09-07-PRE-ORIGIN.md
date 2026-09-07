# Pre-Origin Architecture Batch — 2026-09-07

Status: **FOUNDATION COMPLETE / DRAFT BRANCH / NO MERGE**

## User outcome captured

Before the historical Origin build file is supplied:

1. make CTRL-AI, R&Duck, and Agents of AI unmistakably different to an AI entering the repositories;
2. make Agents of AI the reusable capability **substrate**, not only a persona/workflow catalog;
3. identify both established and early/emerging public open-source foundations worth distilling;
4. preserve open-source provenance/licensing instead of copying current commercial products;
5. prepare an Origin-compatible research pathway without inventing Origin's historical Custom GPT/agent/skills design.

## Named expert-method lanes

These practitioners did **not** participate in, review, or endorse Agents of AI. Their public methods were retrieved on 2026-09-07 and applied as independent review lenses.

| Lane | Named practitioner | Method applied |
|---|---|---|
| Architecture / boundaries | **Michael Nygard** | small explicit architecture decisions; preserve rationale/consequences rather than burying them in a mega-document |
| Documentation / discoverability | **Daniele Procida** | reference structure should mirror the machinery; separate reference contracts from task how-to |
| Agent systems | **Lilian Weng** | planning, memory, tool use, and specialist routing are separable agent-system components |
| Evaluation | **Chip Huyen** | evaluate planning/tool failures and efficiency directly; outcome quality alone is insufficient |
| Security / prompt injection | **Simon Willison** | private data + untrusted content + external communication is a structural hazard; prompts are not a hard security boundary |
| Autonomous improvement | **Andrej Karpathy** | freeze evaluator/budget, narrow mutation surface, keep measurable wins and discard regressions |

Source URLs and project provenance: `SOURCE-LEDGER-2026-09-07.md`.

## Independent lane findings

### Nygard / architecture

**Finding:** the three repositories need explicit bounded responsibilities at their AI entrypoints before adding more functionality. Otherwise every new protocol multiplies overlap.

**Decision:** add identical role vocabulary (`GOVERNOR`, `AUTOPILOT`, `SUBSTRATE`, `R&D LAB`) and collision routing while keeping each repository independently usable.

### Procida / documentation

**Finding:** substrate documentation should mirror actual technical surfaces rather than be mixed into persona/workflow catalogs.

**Decision:** create `SUBSTRATE.md` plus folders for runtime/context/memory/execution/protocol/sensor/adapter/eval/skill/research contracts. Keep seven canonical reasoning layers unchanged.

### Weng / agent systems

**Finding:** modern agent quality depends on system components around the model—planning/tool routing, memory, context, and adapters—not only persona prompting.

**Decision:** add capability-backplane, memory/context, protocol, and execution primitives as reusable substrate.

### Huyen / evaluation

**Finding:** new dynamic routing and tool layers create failure surfaces invisible in final prose.

**Decision:** add trajectory verification with explicit tool/argument/gate/state failure classes.

### Willison / security

**Finding:** Origin-style external research creates a dangerous path from untrusted public content into privileged agent actions if provenance and tool authority are not structurally separated.

**Decision:** add Sensor Plane trust classification, Action Firewall, credential/isolation rules, and source-distillation boundaries. External data cannot promote itself to instruction/authority.

### Karpathy / autonomous improvement

**Finding:** continuous self-improvement is useful only if an evaluator and protected constraints stay outside the mutable search surface.

**Decision:** add Autonomous Ratchet Loop and pair it with Autonomy Graduation rather than uncontrolled “keep improving” loops.

## External foundation signals reviewed

Primary architectural sources in this batch:

- DeepSeek Harness
- Karpathy autoresearch
- OpenViking
- Context Mode
- CubeSandbox
- Microsoft Agent Governance Toolkit
- World2Agent
- Agent Reach
- Agent Client Protocol / acpx
- BrowserSkill
- agent-browser / WebMCP evidence
- NVIDIA Object Oriented Agents
- Vercel Eve
- Loop Engineering
- Agent Skills ecosystems
- agent memory ecosystems

They are evidence/inspiration, not imported products.

## Decisions

| Candidate mechanism | AoA disposition | Why |
|---|---|---|
| repo role router | ADD cross-repo | fixes actual documented overlap |
| capability seams / plugin replaceability | ADD substrate | technical runtime primitive, not existing reasoning method |
| durable event log / projections | ADD substrate | enables reconstruction/continuation without transcript dependence |
| progressive context | ADD substrate + compose with `observation-masking` | loading method complements existing pruning method |
| compute outside context | ADD substrate | distinct deterministic bulk-processing pattern |
| memory lifecycle | ADD substrate | current AoA mentions memory but lacks lifecycle/provenance contract |
| disposable sandbox/workspace | ADD substrate | containment/rollback is runtime infrastructure |
| deterministic action firewall | ADD substrate | enforcement seam; policy remains CTRL-AI |
| protocol router | ADD substrate | prevents MCP-everywhere and acronym/version confusion |
| sensor plane | ADD substrate / EXPERIMENT | promising world→agent boundary; still emerging |
| collector mesh | ADD substrate | direct fit for robust source acquisition / future Origin |
| trajectory verification | ADD substrate | materially distinct from final-output-only review |
| portable skill contract | ADD substrate | packaging surface, not eighth reasoning layer |
| autonomous ratchet | ADD substrate | distinct from generic RARV because evaluator/mutation budget is frozen |
| autonomy graduation | ADD substrate | maps to governing autonomy systems; does not replace R&Duck levels |
| source distillation | ADD substrate | required to absorb open/public foundations safely/provenance-first |
| early-signal radar | ADD substrate / EXPERIMENT | needed to get ahead of consensus without star-chasing |

## Cross-examination

### Objection: “Substrate” is just another framework layer

**Response:** substrate is explicitly non-composable infrastructure/reference. Personas/agents/workflows remain the reasoning library; R&Duck remains orchestration; CTRL-AI remains governance.

**Disposition:** MITIGATED. If substrate entries begin acting like personas/workflows, move them to the canonical seven layers or merge them.

### Objection: CTRL-AI and R&Duck already contain overlapping governance language

**Response:** true. This batch fixes the **entrypoint contract first** rather than attempting a risky full rewrite of mature repositories in one pass.

**Disposition:** RESIDUAL. A later migration audit should identify duplicated canonical content and replace copies with references where safe.

### Objection: open source is copyrighted; “reverse engineer” can become copy-by-renaming

**Response:** Source Distillation separates provenance, license disposition, architecture specification, and implementation path. Default to independent AoA expression when direct reuse is not clearly desirable/license-compatible.

**Disposition:** MITIGATED, not legal clearance.

### Objection: early-signal systems chase hype

**Response:** radar score weights novelty, architecture depth, AoA gap, evidence, portability, license, and security; stars/Trendshift are discovery/velocity signals only.

**Disposition:** MITIGATED. `WATCH` is a first-class result.

### Objection: deterministic enforcement belongs in CTRL-AI, not AoA

**Response:** CTRL-AI owns **what policy says**; AoA owns a reusable capability boundary capable of enforcing a policy decision; R&Duck owns when the project reaches that action.

**Disposition:** RESOLVED by responsibility split.

### Objection: Origin has not been supplied yet

**Response:** no Origin Custom GPT/agent/skill implementation was created. Only reusable research primitives and an explicit Origin hold were added.

**Disposition:** RESOLVED.

## Spike — case against this batch

The strongest contrary position is: do nothing until Origin arrives, because new substrate terminology could anchor the design prematurely.

That objection is material. The batch therefore keeps:

- all changes isolated on draft branches;
- Origin's historical build unresolved;
- substrate contracts provider-neutral and reversible;
- the existing seven reasoning layers unchanged;
- merge/release behind a Human Gate.

If the Origin source demonstrates that a substrate assumption is wrong, the source wins and this branch can be revised or discarded.

## Verification status

### PASS

- role documents/AI entrypoints added on isolated branches;
- existing AoA seven canonical reasoning directories were not modified;
- substrate files are additive and explicitly non-governance/non-autopilot;
- source/license ledger exists;
- current protocol facts were live-checked on 2026-09-07;
- Origin implementation remains unbuilt.

### NOT RUN

- executable implementations of substrate contracts;
- runtime benchmarks;
- full repository-wide duplicate/ownership migration;
- Origin source-line reconciliation;
- Origin Custom GPT Preview;
- Origin agent runtime;
- Origin skill install tests;
- merge/release.

## Human Gate

This architecture can continue to be reviewed on draft branches. **Merge/release remains a human decision.**
