# Capability Backplane

Status: **FOUNDATION / provider-neutral**

## Problem

Agent systems drift into vendor lock-in when the project starts depending directly on one model SDK, one browser tool, one memory store, one sandbox, or one subagent implementation. Replacing it later requires rewriting the agent loop and prompts.

## AoA invariant

**Depend on a capability contract; mount providers behind it.**

A capability has three explicit roles:

```text
CONTRACT   what callers may rely on
PROVIDER   one implementation of that contract
CONSUMER   agent/workflow/tool that uses the capability
```

Examples:

```text
browser.read      → provider: browser-A / browser-B / direct HTTP
memory.recall     → provider: local index / remote store / none
sandbox.execute   → provider: container / microVM / remote workspace
agent.delegate    → provider: local subagent / ACP client / another runtime
search.web        → provider: connector A / connector B
```

## Required properties

1. **No privileged provider.** Defaults are allowed; irreplaceable hidden dependencies are not.
2. **Provider identity is observable.** A run should be able to say which implementation actually satisfied a capability.
3. **Contract before adapter.** Define inputs, outputs, side effects, error classes, and authority needs before binding a provider.
4. **Narrow provider scope.** A provider receives only the context/credentials required for its capability.
5. **Replaceability test.** At least one stub/fake/alternate provider should be possible without editing the consumer's reasoning instructions.
6. **Reversible mounting.** Unloading/replacing a provider should unwind its registrations/hooks where the runtime supports it.
7. **Fail visibly.** If no provider can satisfy a required capability, report unavailable; do not simulate success.

## Provider selection

Selection may consider:

- capability coverage;
- trust/auth boundary;
- locality/privacy;
- reliability/health;
- latency/cost;
- reversibility;
- deterministic vs model-mediated behavior;
- evidence requirements;
- compatibility with current execution environment.

Provider selection does **not** grant authority. A provider may be technically capable of sending/deleting/publishing while the active governance still forbids it.

## Minimal registry shape

```yaml
capability: browser.read
contract_version: 1
providers:
  - id: local-browser
    health: PASS
    side_effect_class: read
    trust_boundary: local-authenticated-browser
  - id: http-reader
    health: PASS
    side_effect_class: read
    trust_boundary: public-web
selected: local-browser
reason: requires authenticated page state
```

This is a conceptual contract, not a mandated implementation format.

## Anti-patterns

- importing a vendor SDK throughout every workflow;
- a tool silently changing behavior because provider A disappeared;
- provider-specific prompt instructions treated as the canonical AoA method;
- a capability adapter deciding policy for itself;
- installing plugins that can mutate unrelated capability registrations;
- claiming a provider ran because it appears in configuration.

## Sources distilled

- `deepseek-ai/deepseek-harness`: replaceable services/providers and plugin-composed capability seams.
- `Panniantong/Agent-Reach`: interchangeable primary/fallback access backends.
- Lilian Weng: routing from a general controller to specialized modules/tools.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
