# Substrate Source Ledger — 2026-09-07

Purpose: preserve where each external architectural signal came from, what was extracted, and what may or may not be reused.

This ledger records **inspiration/provenance**, not endorsement. The people and organizations named here did not participate in or approve Agents of AI.

## Distillation rule

AoA does not copy a product merely because it is open source.

For every external source:

1. record repository, snapshot/date, and license;
2. identify the underlying invariant/mechanism separately from its branding;
3. compare it against existing AoA methods using `MERGE-PROTOCOL.md`;
4. decide whether to reference, directly reuse under license, or independently implement;
5. keep source-specific wording/code out of an independent implementation unless the chosen license path explicitly allows reuse and required notices are preserved;
6. verify the AoA result against behavior/invariants, not textual similarity.

License notes here are engineering provenance, **not legal advice**. Distribution/commercial edge cases may require qualified legal review.

## Foundation sources

| Source | Observed snapshot | License observed | Foundation extracted | AoA treatment |
|---|---|---|---|---|
| `deepseek-ai/deepseek-harness` | README blob `9f89db3d...`; architecture blob `959ea9ed...` | MIT | everything-as-plugin composition; swappable capability seams; reversible plugin effects; durable session events; model-visible inputs reconstructable from log | independently specify capability backplane + event-history contract; no source-code copy required |
| `karpathy/autoresearch` | README blob `953ea55d...` | MIT | narrow mutation surface + fixed experiment budget + objective evaluator + keep/revert loop | generalize into autonomous ratchet pattern |
| `volcengine/OpenViking` | reviewed 2026-09-07 | AGPLv3 | context as browsable hierarchy; abstract/overview/detail progressive loading; observable retrieval path; session-to-memory commit | concept-level independent specification; do not copy AGPL implementation into permissive AoA material |
| `mksglu/context-mode` | README blob `b7961695...` | Elastic License 2.0 | keep bulk/raw tool data outside the prompt; index it; retrieve only relevant slices; let deterministic code process bulk data | concept-level independent technique; no code/text copying |
| `TencentCloud/CubeSandbox` | README blob `8217e100...` | Apache-2.0 | fast isolated execution; snapshot, clone, rollback, pause/resume; secrets kept outside sandbox through mediated egress | define disposable-workspace and credential-boundary contracts |
| `microsoft/agent-governance-toolkit` | README blob `4c33c065...` | MIT | deterministic action interception; agent identity; decision records/audit; prompt-level policy is not enforcement | split responsibility: CTRL-AI defines policy; AoA supplies boundary enforcement primitive |
| `machinepulse-ai/world2agent` | README blob `44bf5667...` | Apache-2.0 | structured external-world signals through interchangeable sensors; sensor provenance matters because signals influence actions | define sensor-plane contract with trust classification |
| `Panniantong/Agent-Reach` | reviewed 2026-09-07 | MIT | capability routing across changing upstream backends; primary/fallback implementations; diagnostic/doctor path | define collector-mesh/provider-health pattern |
| `openclaw/acpx` | README blob `31370662...` | MIT | common interface to multiple coding agents; persistent named sessions; permissions; machine-readable events; deterministic flow steps around agent turns | define agent-switchboard/protocol-router guidance |
| `Tencent/BrowserSkill` | README blob `136dc6b7...` | MIT | separate agent browser surface; explicit borrow/return of user tabs; human takeover for login/captcha/confirmation; deterministic browser evals | define browser execution ladder and handback boundary |
| `vercel-labs/agent-browser` | README blob `fbe6f2bf...` | verify before reuse | accessibility/agent-readable page snapshots; semantic refs; page-provided WebMCP tools treated as untrusted; host owns consequential authorization | use as protocol/browser evidence; no code reuse without license verification |
| `NVIDIA-NeMo/labs-OO-Agents` | README blob `8cc62adb...` | Apache-2.0 | deterministic methods and LLM-driven methods coexist behind typed contracts; traces span both; in-process validation is not sandbox containment | define deterministic-shell principle + typed capability contracts |
| `vercel/eve` | README blob `53a7590a...`; license blob `d6456956...` | Apache-2.0 | filesystem-first durable agent package: instructions, tools, skills, channels, schedules in inspectable conventional locations | inform portable skill/runtime packaging |
| `cobusgreyling/loop-engineering` | README blob `23f72767...` | MIT | discover → hand off → verify → persist loops; staged autonomy from report-only toward unattended after observed verifier reliability | define autonomy-graduation / loop readiness pattern |
| `addyosmani/agent-skills` | README blob `0d3b2a38...` | verify before reuse | lifecycle-oriented skills; auto-selection by task; bounded build automation with verification retained | inform AoA skill packaging; verify license before direct reuse |
| `NVIDIA/skills` | reviewed 2026-09-07 | Apache-2.0 + CC-BY-4.0 stated in repo | continuously synchronized skill catalog, version/update hygiene, capability-governance framing | inform skill registry/update provenance |
| `HKUDS/nanobot` | README blob `599cd24d...` | MIT | small self-hosted runtime combining tools, memory, MCP, model routing, delegation, schedules, channels, API; novice-first setup | evidence for keeping AoA substrate modular and portable rather than vendor-bound |
| `rohitg00/agentmemory` | README blob `959d68c...` | verify before reuse | shared persistent memory across agent clients; hooks; hybrid recall; lifecycle/confidence concepts | inform memory lifecycle; verify license before direct reuse |

## Named practitioner method lenses

These methods were re-retrieved on 2026-09-07 and used as review lenses. They are not claims of participation or endorsement.

### Michael Nygard — architecture decision records

Source: https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions

Applied principle: architecturally significant decisions should be small, explicit, and preserve context/consequences so future agents can understand why a boundary exists rather than rediscovering it.

### Daniele Procida — Diátaxis

Source: https://diataxis.fr/reference/

Applied principle: reference documentation should mirror the machinery it describes; keep reference contracts separate from task how-to material.

### Lilian Weng — autonomous-agent components

Source: https://lilianweng.github.io/posts/2023-06-23-agent/

Applied principle: reason explicitly about planning, memory, and tool use as separable agent-system concerns; routing to specialized modules is a core architectural pattern.

### Chip Huyen — agent failure modes and evaluation

Source: https://huyenchip.com/2025/01/07/agents.html

Applied principle: evaluate planning/tool failures directly, including invalid tools, bad arguments, wrong parameter values, tool-output failures, and efficiency—not only final prose quality.

### Simon Willison — prompt-injection system risk

Source: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/

Applied principle: untrusted content combined with private data and external communication creates a structural risk; remove or constrain a capability leg rather than relying on prompt wording as the security boundary.

### Andrej Karpathy — autonomous experiment ratchet

Source: https://github.com/karpathy/autoresearch

Applied principle: freeze evaluator/runtime constants, narrow what the agent may mutate, compare runs under a fixed budget, retain measurable gains and discard regressions.

## Revisit policy

Origin will eventually automate parts of this ledger, but every adoption decision must retain:

- source identity;
- observed date/snapshot;
- license status;
- extracted invariant;
- overlap decision against AoA;
- implementation path (`REFERENCE`, `LICENSED_REUSE`, `INDEPENDENT_IMPLEMENTATION`, `WATCH`, `REJECT`);
- evidence that the resulting AoA behavior works.
