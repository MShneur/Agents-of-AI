# Prompt-refinement Wheel Check — 2026-10-11

Owner: Origin research. Target: Agents-of-AI Scribe prompt-refinement profile; optional ChatGPT Skill adapter. Live AoA baseline: main 54caebab61592cac94b22d9100ee467780055b9f. This is source provenance, not a claimed deployed service or measured quality improvement.

## Original gist and lineage

- Requested source: https://gist.github.com/jonnyzzz/bd4b99f96a7637cf43a73f88edbe101e — publicly visible as a January 3, 2026 three-file "Lyra Prompt Optimizer" Skill (one visible gist revision; two forks shown in web interface). Mechanisms: classify creative/technical/educational/complex tasks; fast BASIC vs thorough DETAIL; prompt structure/output shaping; example library. **No executable live feedback loop or benchmark was demonstrated by the gist.**
- Earlier popular Lyra gist: https://gist.github.com/xthezealot/c873effd9e74225ef3fcfbb9c3a341da — last active October 10, 2026 with five revisions displayed, 4-D structuring and BASIC/DETAIL variants. Its later activity is not evidence of better task success; visible pattern remains broadly similar. Attribution: that gist's comments link to an earlier Reddit post; author/original IP rights beyond these visible links were not established.
- Visible fork: https://gist.github.com/timelordx — May 23, 2026 fork of jonnyzzz/1-SKILL.md, with a sibling fork of an earlier Lyra gist. No materially different mechanism verified from the index.
- Other Lyra app implementation: https://github.com/lyra55945/lyra-ai-prompt-optimizer — browser UI with OpenRouter dependency, 4-D rewrite process. Not needed to run a portable text Skill.
- Source license for the two gists is UNKNOWN: do not copy text, code or exact onboarding prompt under an assumed permissive license. The Skill and agent profile in this PR are independently authored at the behavior/contract level.

## Different kinds of prompt optimization

- Interactive rewrites (gists) improve clarity and structure but do not demonstrate quality gains. ASSIMILATE only fidelity-preserving QUICK/DEEP input/output and user-voice handling into existing Scribe.
- https://github.com/stanfordnlp/dspy (GEPA and MIPROv2): objective-driven, test-set-based prompt evolution. DEFER direct installation; adopt **A/B on a fixed fixture** as the acceptance gate for any claim of quantitative improvement. Use if task volume supports instrumentation, only in an authorized runtime.
- https://github.com/microsoft/promptflow: separates evaluation runs from authoring and preserves comparisons. ASSIMILATE the principle that structural/format checks are not empirical performance checks.

## Other projects by jonnyzzz (Eugene Petrenko)

| Repo | Relevant verified design from README | Disposition / boundary |
|---|---|---|
| https://github.com/jonnyzzz/run-agent | narrow isolated Claude/Codex/Gemini workers, prompt/stdout/stderr/exit/PID traces, append-only message bus, QA gates | ASSIMILATE only provenance-rich bounded worker return where existing AoA Single Dispatch/Easy Handoff lacks it. DO NOT import scripts unchanged: documented CLI launch examples explicitly bypass approval/sandbox and allow up to 16 processes; not suitable as a default in our governed runtime. |
| https://github.com/jonnyzzz/mcp-steroid | semantic IntelliJ/JetBrains IDE actions exposed through an MCP plugin/CLI, native refactoring/inspection/tests | RECOMMEND only when a JetBrains IDE and an authorized plugin bridge actually exist. Never invent access; third-party installer/runtime and broad IDE code execution require security review. |
| https://github.com/jonnyzzz/femto-llm | Go protocol adapter with backend-advertised model discovery, load metrics, prefix-cache affinity and health-aware fallback | DEFER to the existing Personal Forge model-routing control plane; benchmark there instead of adding a conflicting AoA router. Does not prove it is zero-cost to host. |
| https://github.com/jonnyzzz/tart-skills | Linux->SSH->macOS Tart VM remote GUI testing | DEFER, because it requires an approved reachable Mac host, SSH scope and VM lifecycle; not a generic AoA requirement. |
| https://github.com/jonnyzzz/intellij-plugin-hot-reload | token-authenticated restartless IDE plugin iteration | DEFER for JetBrains-specific development; no generic value for mobile/ChatGPT-only prompt refinement. |

No upstream author or repository is a participant in an AoA Quorum or has endorsed this implementation.

## Assimilation boundary

- Agents-of-AI canonical method: agents/scribe.md **Prompt Refinement** profile. No new composable agent or duplicative workflow.
- Host adapter: adapters/chatgpt/prompt-refiner/SKILL.md and targeted tests. No new external runtime dependency, account or API key.
- Novel constraints beyond source examples: requested-target fidelity, portability across different AI access scopes, proposal-vs-decision integrity, no automatic greeting, no compulsory model questionnaire, and no fabricated performance improvement.
- Do not automatically apply the Skill to execution requests, redesign existing hard governance, or create another Backstitch memory master.

## Falsifier / next bounded experiment

Have an independent AI run eight targeted prompt-refinement acceptance cases from the Skill reference against the baseline user's source and the new candidate. Required zero target, authorization, voice or evidence violations; track questions, output length and task success. **Behavioral A/B: NOT RUN in this lane**. A syntactically valid Skill/package is only packaging verification, not proof of better optimization.
