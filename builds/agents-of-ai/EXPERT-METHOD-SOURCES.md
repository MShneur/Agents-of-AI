# Foundation Expert Method Sources

Verified: **2026-09-07**

These practitioners did **not** participate in, review, or endorse Agents of AI. Their published methods were retrieved as external lenses for the foundation architecture under `workflows/quorum.md`.

This is a sourcing record, not a stored roster for future quorums. Consequential future batches must source their seats again at convening time, per Quorum's anti-fossilization rule.

## Method / structure seat

### Michael Nygard — Architecture Decision Records

Published source: **Documenting Architecture Decisions**  
https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions

Method used here:

- preserve architecturally significant decisions as small, modular records;
- make context, decision, status, and consequences explicit;
- retain prior decisions when superseded so rationale is not erased.

Foundation application: isolate the `builds/` architecture choice in an ADR and keep it reversible rather than burying rationale in one large prompt.

### Daniele Procida — Diátaxis

Published source: **Diátaxis — Start here**  
https://diataxis.fr/start-here/

Method used here:

- separate tutorial, how-to, reference, and explanation because they serve different user needs;
- let reference documentation mirror the architecture of the thing it describes;
- improve documentation through bounded, practical iterations.

Foundation application: keep canonical AoA method/reference layers separate from deployment how-to/runtime packaging.

## Agent design / operator seat

### Lilian Weng — LLM-powered autonomous agents

Published source: **LLM Powered Autonomous Agents**  
https://lilianweng.github.io/posts/2023-06-23-agent/

Method used here:

- reason about agents in terms of planning, memory/context, and tool use;
- decompose complex work and make reflection/tool interaction explicit;
- recognize coordination and tool reliability as core agent-system concerns.

Foundation application: define dynamic method-gap routing and explicit specialist/tool boundaries rather than a single static mega-prompt.

### Andrew Ng — Agentic design patterns

Published source: **Agentic AI**  
https://www.deeplearning.ai/courses/agentic-ai

Method used here:

- reflection;
- tool use;
- planning;
- multi-agent workflows;
- systematic evaluation and error analysis.

Foundation application: keep the build compositional and evaluation-driven, with specialist methods activated only when they add value.

## Evidence / evaluation seat

### Chip Huyen — Agent evaluation and failure modes

Published source: **Agents**  
https://huyenchip.com/2025/01/07/agents.html

Method used here:

- inspect tool inventories and planning behavior;
- evaluate plan/tool failures explicitly;
- start with the simplest system that can work;
- treat tool choice, argument validity, and execution reliability as measurable failure surfaces.

Foundation application: require observable end-to-end success plus routing/tool diagnostics instead of judging fluency.

### Hamel Husain — AI evals and error analysis

Published source: **AI Evals**  
https://hamel.dev/notes/llm/evals/

Method used here:

- begin with end-to-end task success;
- use detailed diagnostics to explain failures rather than substitute for success;
- build evals around real failure modes and iterative error analysis.

Foundation application: require an acceptance suite for Custom GPT, agent, and skill packaging and distinguish PASS/FAIL/PARTIAL/NOT RUN.

## Adversary seat

### Simon Willison — Lethal trifecta for AI agents

Published source: **The lethal trifecta for AI agents: private data, untrusted content, and external communication**  
https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/

Method used here:

- threat-model combinations of sensitive/private data, untrusted inputs, and external communication capability;
- treat prompt injection as a system-design problem, not merely a prompt-wording problem.

Foundation application: elevate side-effect/tool boundaries and external-instruction provenance into the shared activation contract.

### Johann Rehberger — Prompt injection and confused-deputy tool risks

Published source: **ChatGPT Plugin Exploit Explained: From Prompt Injection to Accessing Private Data**  
https://embracethered.com/blog/posts/2023/chatgpt-cross-plugin-request-forgery-and-prompt-injection./

Method used here:

- trace prompt injection through automatic tool invocation and confused-deputy behavior;
- isolate capabilities and preserve human authorization around consequential actions.

Foundation application: validate authority and arguments immediately at side-effecting tool boundaries rather than trusting upstream model intent.

## Affected-user fit seat

### Indi Young — Problem-space / purpose-oriented research

Published source: **Method**  
https://indiyoung.com/method/

Method used here:

- understand people's purpose and thinking before optimizing a solution;
- work from problem space rather than forcing a tool-first frame;
- retain variation in how people reason and pursue outcomes.

Foundation application: treat the user's historical outline as intent-bearing evidence and preserve the desired outcome when implementation details need transformation.

### Erika Hall — Research questions before interview/tool mechanics

Published source: **Research Questions Are Not Interview Questions**  
https://www.muledesign.com/blog/research-questions-are-not-interview-questions

Method used here:

- define what must be learned before choosing a research/interview mechanism;
- separate inquiry goals from the literal questions or mechanics used to investigate them.

Foundation application: distinguish source-line intent from the historical literal mechanism before strengthening or transforming a requirement.

## Foundation seat result

The foundation decision was to:

1. create a reversible `builds/agents-of-ai/` product surface rather than an eighth AoA layer;
2. preserve exact historical `PREBUILT_CAST` and Negative Gate details until the source outline is available;
3. make the build dynamically activate additional canonical AoA methods beyond the pre-built cast;
4. keep R&Duck as governance when present;
5. require tool-boundary authority checks and observable verification.

The strongest dissent — that `builds/` adds another top-level concept and provider-specific documentation can stale — is retained in `ADR-0001-build-surface-not-eighth-layer.md` with explicit mitigations and revisit triggers.
