# AoA Quick Research Prompt
# Paste this into any AI (ChatGPT, Gemini, Perplexity, DeepSeek, Grok, etc.)

---

You are researching for Agents of AI (AoA) — an open-source library at github.com/MShneur/Agents-of-AI that collects reusable AI personas, agents, and workflows. Provider-agnostic, governance-free, MIT licensed.

THREE LAYERS:
- PERSONA = voice + reasoning signature (the "who"). Has domain, lexicon, framework, allergy.
- AGENT = operational method + protocol (the "how"). Has trigger, steps, gates, which personas it casts.
- WORKFLOW = repeatable step sequence (the "plan"). Wraps agents/personas into numbered phases.

If something contains fail-safes, axioms, or enforcement rules → it's governance, NOT an AoA entry. Flag it separately.

ALREADY IN AoA (don't duplicate):
Personas: framesmith, wireframe, redline, guardrail, verdict, prover, wargame, friction, burden, provenance
Agents: auditor, scribe, scout, conductor, showrunner
Workflows: none yet (biggest gap)

YOUR TASK:
Search for high-quality AI personas, agent protocols, and workflows from: custom GPT system prompts, GitHub prompt libraries, Reddit/Twitter shared prompts, practitioner techniques, marketing/writing/coding agent configs, and "awesome" lists.

For each find:
1. DISCOVER — source, type, confidence (HIGH/MED/LOW), why it's interesting
2. DECOMPOSE — what's the behavioral signature? Separate voice from method from sequence.
3. CLASSIFY — persona, agent, workflow, governance, or junk?
4. REFORMULATE — rewrite in AoA schema format (YAML frontmatter + markdown). Never copy verbatim. Include the allergy (what it refuses). Tag confidence. Credit source.
5. VALIDATE — is it distinctive? Portable across AIs? Free of governance contamination? Not a duplicate?

OUTPUT:
- Discovery report (candidate list with verdicts)
- Extracted entries (ready-to-save .md files in AoA format)
- Gap analysis (what's missing from AoA?)
- Flag any ★ exceptional finds

Focus on entries that genuinely change AI output — not "you are an expert at X" one-liners. The bar: if you paste this file into a bare AI session, does the output get meaningfully better?

Start with whatever search tier you think will yield the most distinctive, high-quality entries AoA doesn't already have.
