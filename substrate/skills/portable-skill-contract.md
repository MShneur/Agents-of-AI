# Portable Skill Contract

Status: **FOUNDATION / cross-runtime packaging**

## Problem

A useful AoA method should not require pasting the whole repository into every model. Skills provide a portable, progressively loaded package, but skill ecosystems can also become unversioned prompt bundles with hidden dependencies and authority creep.

## AoA invariant

**A skill packages a bounded capability; it does not become a new source of governance or silently expand permissions.**

## Minimum skill package

A portable AoA skill should expose:

```yaml
name: <stable id>
purpose: <one job-to-be-done>
version: <version>
inputs: <required/optional>
process: <ordered method>
outputs: <testable contract>
capabilities_needed: []
side_effect_class: <none/read/local-reversible/external-write/...>
sources: []
compatibility: []
```

The exact on-disk syntax may follow the target runtime's current skill specification (for example `SKILL.md`) while keeping the semantic fields above.

## Progressive loading

Prefer:

```text
catalog metadata
   ↓ selected when relevant
skill instructions
   ↓ only if needed
supporting references/examples/scripts
```

over injecting every installed skill into the system prompt.

## Dependency rule

A skill must declare material dependencies such as:

- another AoA method;
- an external CLI/library;
- an MCP/A2A/ACP endpoint;
- runtime hooks;
- a browser/sandbox capability;
- credentials or user-authenticated state.

A missing dependency returns `UNAVAILABLE` or a bounded degraded mode. It must not be replaced with an invented capability.

## Authority rule

Installing/selecting a skill does not authorize its side effects.

A skill may say how to publish or delete; the Action Firewall and active governance still decide whether that action can execute.

## Provenance / update rule

For externally sourced skills:

- record canonical source and version/commit;
- record license;
- review instruction provenance before operational loading;
- check updates for changed permissions/tools/network behavior;
- retire stale/removed skills rather than keeping orphaned local copies indefinitely.

## Portability rule

Separate **method** from **adapter**.

Example:

```text
skill: verify-web-ui
method: acceptance contract + browser checks + evidence receipt
adapters:
  - browser provider A
  - browser provider B
```

Do not fork the skill merely because a different runtime provides the same capability under another tool name.

## Skill quality gate

A skill is ready when:

1. its job is unambiguous;
2. inputs/dependencies are explicit;
3. the ordered method differs materially from existing skills or has been merged;
4. output can be verified;
5. failure/degraded behavior is explicit;
6. side effects and authority needs are declared;
7. installation does not inject unrelated always-on instructions;
8. the skill works from a clean session with only its declared dependencies.

## Sources distilled

- `addyosmani/agent-skills`: lifecycle-oriented skills and automatic task matching while retaining verification.
- `NVIDIA/skills`: continuously synchronized skill catalog and update/version hygiene.
- `vercel/eve`: conventional filesystem placement for instructions/tools/skills/channels/schedules.
- Agentskills-style progressive disclosure observed across current agent ecosystems.
- AoA `skill-provenance`: external instruction content requires provenance review.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
