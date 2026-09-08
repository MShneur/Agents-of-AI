# B01 — Historical Control-Plane Reconciliation

Status: **DONE / HOLD**  
Source lines: **4557–5149**  
Source hash: `e85a0aad3231f60b905231c004beffa85fa56583b28454416f6329cb7a32ad0e`

## Historical intent

The source asks how Origin (historically ORION) decides which model, persona, tool, workflow, and evaluation process handles a task. It derives four foundations from LiteLLM, LangGraph, Langfuse, and Promptfoo.

## Reconciliation

| Source idea | Disposition | B01 implementation |
|---|---|---|
| Application requests capability instead of provider/model | STRENGTHEN | open capability registry; runtime never branches on provider/model names |
| Provider fallback on transient failure | STRENGTHEN | bounded retry/fallback policy; sensitive semantic changes require revalidation |
| Stateful workflows | KEEP | configuration-driven transition engine |
| Human gate for external/irreversible actions | KEEP | approval state/schema exists; no external executor in B01 |
| Trace task/context/model/tools/outcome | STRENGTHEN | wide structured trace + redaction policy |
| Regression tests for prompts/routes/policies | STRENGTHEN | failure-class-separated golden fixtures |
| One overall score | REJECT | hard gates remain independent; safety/evidence cannot be averaged away |
| Endless autonomous loop | REJECT | only declared transitions are legal |
| Full prompt/source logging | REJECT | redaction + minimized trace payload |
| Hard-coded model aliases in universal infrastructure | TRANSFORM | later source explicitly corrects this: capability IDs are configuration data |
| Domain-specific skill/persona literals in universal core | TRANSFORM | later source “universal builder” correction forbids them |

## Cross-examination

**Nygard:** premature control-plane complexity becomes a second framework.  
**Response:** B01 implements only small contracts and an executable proof; no provider gateway, queue, DB, or external action runtime is installed.

**Fateev:** state labels without durable persistence are only documentation.  
**Response:** accepted residual. B01 proves transition legality only. Durable checkpoints belong to the later long-horizon/harness batch and remain NOT RUN.

**Majors:** tracing can become vanity telemetry or leak sensitive context.  
**Response:** trace schema captures task-level debugging dimensions but stores references/hashes rather than unrestricted raw inputs.

**Husain:** synthetic fixtures can miss product-specific failures.  
**Response:** accepted residual. B01 fixtures are seed tests; production trace error analysis is required before calibrated claims.

**Willison:** even read-only research can become dangerous if future tools combine private data, untrusted content, and egress.  
**Response:** source content has zero instruction authority; external actions remain outside this batch; action firewall/approval enforcement stays mandatory later.

**Huyen:** orchestration can become more complex than the task.  
**Response:** low-risk work may use a direct action-free capability path; quorum/state machinery is proportional to risk.

## Verification target

B01 passes when:

1. schemas parse;
2. YAML configs parse;
3. runtime tests demonstrate provider-neutral capability selection;
4. invalid lifecycle transition is rejected;
5. trace redaction removes obvious secret-bearing fields;
6. runtime contains no domain-specific persona/skill literal branches;
7. no external write/deploy/scrape executor is present.

## Explicit NOT RUN

- Custom GPT configuration;
- full named persona registry;
- full AoA boardroom runner;
- live model/provider calls;
- durable database checkpoints;
- scraper/browser execution;
- external actions;
- deployment;
- later historical batches.

## Stop

The historical source explicitly requested a stop between batches. **HOLD after B01.**
