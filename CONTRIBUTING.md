# Contributing to Agents of AI

## The One Rule

**No governance.** Personas, agents, and workflows only. If your contribution contains axioms, override gates, fail-safes, or enforcement rules — it belongs in a governance framework like [CTRL-AI](https://github.com/MShneur/CTRL-AI), not here.

## Adding a Persona

A persona is a **voice and reasoning signature**. It defines *who* the AI becomes for a task.

1. Create a file in `personas/` using the naming pattern: `lowercase-descriptive-name.md`
2. Use the YAML frontmatter from `schema/persona.schema.md`
3. Include at minimum: domain, lexicon (key terms this persona uses), framework (how they think), and allergy (what they refuse to do)
4. If inspired by a real person, use the `inspired_by` field — don't make the person's name the file ID

### Good persona example
A persona that changes how the AI writes, thinks, or evaluates. Includes what it's allergic to. Has been tested across at least two different AI platforms.

### Bad persona example
"You are an expert at marketing." That's a one-liner, not a persona. If it doesn't change the output meaningfully, it doesn't belong here.

## Adding an Agent

An agent is an **operational method**. It defines *how* one operator works — the protocol, the steps, which personas it pulls.

1. Create a file in `agents/` using the naming pattern: `lowercase-role-name.md`
2. Use the YAML frontmatter from `schema/agent.schema.md`
3. Include: trigger (when this agent activates), purpose, anti-goal (what it refuses), and the actual protocol
4. Reference personas by their file ID if the agent casts specific personas

## Adding a Workflow

A workflow is a **repeatable plan**. It's a sequence of steps, often wrapping agents and personas.

1. Create a file in `workflows/` using the naming pattern: `lowercase-workflow-name.md`
2. Use the YAML frontmatter from `schema/workflow.schema.md`
3. Include: purpose, steps (numbered), which agents/personas each step uses, and what "done" looks like

## Confidence Tags

Tag your contribution honestly:

| Tag | Meaning |
|---|---|
| `[BATTLE-TESTED]` | Used in production, refined through multiple iterations |
| `[PRACTICED]` | Used personally, works well, not extensively tested |
| `[EXPERIMENTAL]` | New idea, untested or lightly tested |
| `[COMMUNITY]` | Auto-applied to all community PRs until reviewed |

## Schema Compliance

All contributions must follow the schemas in `schema/`. The frontmatter is required — it's how systems discover and load entries programmatically.

## What Happens to Your PR

1. **Auto-tagged `[COMMUNITY]`** — all community contributions start here
2. **Schema check** — does it follow the format?
3. **Quality check** — is this substantive? Does it change AI output meaningfully?
4. **Governance scan** — does it contain axioms, gates, or override rules? If yes, rejected.
5. **Merged or feedback** — either merged or you get specific feedback on what to change

## Extracting Personas from Custom GPTs

If you've found a great Custom GPT and want to contribute the persona behind it:

1. **Extract the behavioral signature** — what makes it different from a generic AI?
2. **Identify the domain, lexicon, and reasoning framework** — how does it think?
3. **Name what it's allergic to** — what does it refuse or avoid?
4. **Strip the governance** — remove any system rules, fail-safes, or enforcement logic
5. **Reformulate** — rewrite in your own words using the schema format
6. **Credit** — use the `source` field to credit the original

**Do not copy-paste someone's system prompt.** Extract the *pattern*, reformulate it, contribute the pattern.

## Code of Conduct

Be helpful. Be honest about what's tested vs. experimental. Don't submit others' paid work. Don't submit prompt injection payloads. Don't submit governance rules.
