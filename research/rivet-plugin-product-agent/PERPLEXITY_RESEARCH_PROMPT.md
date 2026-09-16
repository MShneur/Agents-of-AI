# Perplexity Research Prompt — Universal Plugin/Product Builder Agent

Use this prompt in Perplexity as an independent research lane. This is **research only**; do not write the final agent or workflow yet.

```text
Activate PLEX from MShneur/Agents-of-AI and operate as a live research lane.

OBJECTIVE
Research the best professional methods, protocols, and review structure for a universal AI agent that can take a software-product idea from concept through implementation and verification, especially for browser extensions, plugins, userscripts, adapters, integrations, and small cross-platform tools.

The target agent must be capable of building a rich product without two opposite failures:
1. underbuilding the product because it only follows the immediate coding request;
2. overengineering or overcorrecting one subsystem and accidentally deleting or regressing working features elsewhere.

CASE STUDY
Use MShneur/ghost-in-the-loop as the principal failure/growth case. Inspect current and historical issues, PRs, handoffs/docs, changelog, and relevant code history. Pay special attention to repeated operator corrections involving:
- Play/Send failures and uncertain delivery;
- DOM/selectors versus platform-native data paths;
- preserving working UI while repairing core behavior;
- skins, sound, notifications, personas, workflows, settings, novice help;
- Roadmap/Auto/Flow becoming too much controller logic;
- prompt/protocol features being incorrectly removed as if they were transport logic;
- mobile Firefox/Android behavior;
- export completeness, Markdown/JSON, visible Thinking/Reasoning, API-first export, and truthful fallback labels;
- novice-facing language versus internal engineering jargon;
- fixes that became fixes for earlier fixes;
- claims of “working” before real field-path evidence.

AOA AUTHORITY
Inspect the current MShneur/Agents-of-AI repository, especially:
- AGENTS.md
- origin/adapters/chatgpt/skill/SKILL.md
- workflows/cleanerz.md
- workflows/root-cause.md
- workflows/quorum.md
- workflows/human-gate-committee.md
- teams/buildhouse.md
- agents/repo-nanny.md
- workflows/nursery-sweep.md
- workflows/repo-prd.md
- techniques/single-dispatch-operator.md
- existing failure vocabulary

Do not duplicate existing methods. Determine what new agent/workflow responsibilities are genuinely missing.

PROFESSIONAL RESEARCH
Source named real practitioners live. Do not invent composite experts and do not imply participation or endorsement. For every person, retrieve a current or durable public portfolio, talk, paper, book page, official article, or documented method. Cite the method actually published.

Research at least these method families:
- human-centered product systems / cognitive psychology / human factors;
- novice usability, discoverability, progressive disclosure, status and recovery;
- software architecture and complexity control;
- browser extension/WebExtensions/platform engineering;
- cross-browser/mobile compatibility;
- exploratory testing and QA;
- observability/diagnostics for unknown failures;
- product analytics / controlled experimentation / guardrail metrics;
- accessibility and assistive-tech interaction;
- security/privacy/least privilege;
- maintenance, rollback, upgrade compatibility, and operator burden.

A psychiatrist is not automatically the correct human-behavior expert. Compare clinical psychiatry against HCI, cognitive psychology, behavioral science, and human-factors engineering and explain which discipline actually fits this software-product problem.

QUESTIONS TO ANSWER
1. What questions would an excellent practitioner ask BEFORE changing code?
2. What artifacts would they require before implementation?
3. What would they preserve by default?
4. What evidence would make them stop or reverse a change?
5. How would they distinguish a local bug fix from a product redesign?
6. How would they catch feature deletion caused by overcorrection?
7. How would they test a browser/plugin product across real user paths, browsers, mobile, lifecycle states, permissions, and host changes?
8. How should novice UX and advanced power features coexist?
9. What telemetry/diagnostics are enough to debug failures without collecting unnecessary conversation/user data?
10. Which decisions require a live named Quorum/Human Gate, and which should remain a single-operator decision?
11. What should auto-trigger Cleanerz?
12. What existing AoA methods should the new agent route to rather than reimplement?

OUTPUT
Return a RESEARCH DOSSIER, not an agent definition.

Use these sections:
A. Ghost failure patterns — evidence-backed, with issue/commit/doc references.
B. Existing AoA coverage — what already exists and must be reused.
C. Missing capability — what the new agent uniquely needs to add.
D. Practitioner method table — name, domain, public method/source, questions they ask, failure mode they catch, relevance.
E. Opposing schools — at least three genuine method conflicts worth preserving.
F. Proposed Quorum seats — roles only; do not freeze names permanently because Quorum must re-source live at run time.
G. Candidate agent invariants — concise, testable.
H. Candidate kill conditions — what would prove the agent itself is becoming the problem.
I. Open questions for the next research pass.

Do not write generic “best practices.” Do not generate decorative personas. Do not decide the final name. Do not write the final AoA agent/workflow. Research what would make it difficult for the future agent to repeat Ghost in the Loop's historical mistakes.
```
