# Action Firewall

Status: **FOUNDATION / governance-neutral enforcement primitive**

## Problem

A system prompt can say “do not delete production data” and the model may still request a destructive tool call. If the same stochastic component both interprets the rule and controls the action, the rule is advisory rather than structural.

## Responsibility split

```text
CTRL-AI / active governance
    defines policy, consequence class, approvals
              ↓
R&Duck / orchestrator
    plans and requests project actions
              ↓
AoA ACTION FIREWALL
    deterministically checks request at the real capability boundary
              ↓
PROVIDER
    executes only an allowed request
```

AoA does **not** define the organization's policy here. It defines the reusable enforcement seam.

## AoA invariant

**Consequential capability calls are checked immediately before execution using current authority, scope, arguments, and policy state.**

## Minimum request envelope

```yaml
actor: <agent/runtime identity>
project: <scope>
capability: <canonical capability id>
provider: <actual provider>
action: <operation>
arguments: <normalized arguments>
side_effect_class: read | local-reversible | external-write | destructive | privilege-change | disclosure
source_trust: trusted | mixed | untrusted
approval_ref: <gate/decision id or null>
```

## Decision

```text
ALLOW
DENY
REQUIRE_APPROVAL
REQUIRE_NARROWER_SCOPE
```

The firewall must fail closed for policy states that are missing where an explicit decision is required.

## Boundary checks

At minimum:

1. is this actor allowed to request the capability?
2. does the action fit the current project/task scope?
3. are arguments structurally valid and within allowed paths/domains/recipients?
4. does the current policy permit this side-effect class?
5. is a required Human Gate/approval present and still valid?
6. did untrusted content influence the request while private data/external communication are also available?
7. does the selected provider widen access beyond what the capability contract requires?
8. after execution, can the resulting state be verified independently of the model's claim?

## Rule of capability separation

When practical, structurally separate:

```text
READ capability
WRITE capability
PUBLISH/SEND capability
ADMIN/PRIVILEGE capability
```

Do not expose one giant `do_anything()` tool and rely on prompt instructions to create boundaries inside it.

## Untrusted-content risk

When the system combines:

- access to private/sensitive data;
- exposure to attacker-controlled or otherwise untrusted content;
- external communication capability;

treat the combination as high risk. Prefer removing or tightly mediating at least one leg rather than relying only on prompt defenses.

## Audit receipt

For consequential calls, retain a compact decision record:

```yaml
request_id: <id>
decision: ALLOW | DENY | REQUIRE_APPROVAL | REQUIRE_NARROWER_SCOPE
policy_ref: <active policy/version>
actor: <id>
capability: <id>
provider: <id>
approval_ref: <id or null>
result_state_verified: true | false | not_run
```

## Failure signals

- the model can edit its own allowlist/permission file;
- tool execution starts before approval is resolved;
- a denied operation can be reached through a differently named provider;
- authorization is checked when planning but not when the real call executes;
- a fluent “done” response is accepted without checking resulting state;
- retrieved content can induce outbound calls carrying private information.

## Sources distilled

- `microsoft/agent-governance-toolkit`: deterministic interception before tool/action execution and explicit decision records.
- Simon Willison: structural prompt-injection risk when private data, untrusted content, and external communication coexist.
- `deepseek-ai/deepseek-harness`: guarded tool execution pipeline/capability seams.
- AoA `skill-provenance` and R&Duck Rule-of-Two principles.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
