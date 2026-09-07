# Agent Protocol Router

Status: **FOUNDATION / freshness-sensitive**  
Last verified: **2026-09-07**

## Problem

“Use MCP” is no longer a sufficient architecture answer. Different open protocols address different boundaries, and several acronyms collide. Hard-coding one protocol everywhere creates unnecessary coupling and security confusion.

## AoA invariant

**Choose the protocol by boundary and job-to-be-done, not popularity.**

## Current routing map

| Boundary / job | Preferred protocol family | What it is for | Notes |
|---|---|---|---|
| agent ↔ tools/data/context | **MCP** (Model Context Protocol) | portable tools/resources/context and extensions | current spec `2026-07-28`; stateless core; extensions include Tasks and MCP Apps |
| independent agent ↔ independent agent | **A2A** (Agent2Agent) | discovery, capability negotiation, collaborative task exchange without exposing internals | latest released v1.0.0 observed 2026-09-07 |
| agent ↔ user-facing application | **AG-UI** | event-based connection between agents and interactive frontends | use when the main problem is agent-to-UI event/state flow |
| coding agent ↔ editor/client/orchestrator | **ACP — Agent Client Protocol** | structured coding-agent sessions, permissions, events and client integration | `openclaw/acpx` is one headless client; do not confuse with Agent Control Protocol |
| world/event source ↔ agent | **sensor protocol / W2A-like contract** | structured real-time signals from sensors | W2A is an early open implementation; treat sensor trust as instruction provenance |
| webpage ↔ browser agent tools | **WebMCP-like page tools** | page-declared structured actions instead of DOM-only automation | emerging/experimental; page-provided schemas/results remain untrusted claims |
| tool ↔ interactive UI component | **MCP Apps** | tool-returned interactive UI rendered in compatible MCP clients | official MCP extension as of 2026 |
| long-running MCP operation | **MCP Tasks** | durable task handle, poll/update/cancel lifecycle | extension, not old core sessions |

## Acronym collision: ACP

There are at least two distinct current protocols using **ACP**:

1. **Agent Client Protocol** — used for coding-agent/client interoperability.
2. **Agent Control Protocol** — a separate draft protocol for structured control of application UIs.

Always expand `ACP` on first use and record the canonical URL/repository. Never route solely by the acronym.

## Router questions

Before selecting a protocol, ask:

1. What two systems are crossing the boundary?
2. Who owns session/task state?
3. Is the exchange a tool call, agent collaboration, UI event, sensor signal, or control command?
4. Does the peer need access to internal state, or only an external contract?
5. What is the authorization model?
6. Is the input trusted, mixed, or attacker-controlled?
7. Does the protocol provide discovery/capability metadata, and are those claims independently trusted?
8. Is the selected version current, deprecated, experimental, or draft?

## Protocol adapter rule

Expose protocols through the `../runtime/capability-backplane.md` rather than letting every AoA workflow speak protocol-specific details.

Example:

```text
agent.delegate
   ├─ A2A provider
   ├─ Agent Client Protocol provider
   └─ local-subagent provider
```

The caller asks for delegation; the adapter handles protocol mechanics.

## Version/freshness rule

Protocol facts are fast-changing.

Every protocol entry should record:

```yaml
protocol: <expanded name>
version: <verified version>
verified_at: <date>
status: released | draft | experimental | deprecated
canonical_source: <url/repo>
```

Do not fossilize old API shapes into AoA canonical reasoning entries.

## Security rule

A protocol transports capability; it does not make peer content trustworthy.

- Treat remote tool descriptions, agent cards, UI manifests, sensor signals, and page-declared tools as claims with provenance.
- Apply the Action Firewall at real side-effect boundaries.
- Keep private data, untrusted instructions, and unrestricted external communication from forming an unsafe combined capability surface.

## Sources verified 2026-09-07

- MCP `2026-07-28`: https://blog.modelcontextprotocol.io/posts/2026-07-28/
- A2A v1.0.0: https://a2a-protocol.org/dev/specification/
- AG-UI: https://github.com/ag-ui-protocol/ag-ui
- Agent Client Protocol evidence/client: https://github.com/openclaw/acpx
- World2Agent: https://github.com/machinepulse-ai/world2agent
- WebMCP implementation evidence: https://github.com/vercel-labs/agent-browser

See `../research/SOURCE-LEDGER-2026-09-07.md` for repository provenance.
