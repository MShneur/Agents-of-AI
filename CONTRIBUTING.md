# Contributing to Agents of AI

## The One Rule

**No governance in the seven composable layers.** If a persona/agent/workflow/etc. contribution contains axioms, override gates, fail-safes, or enforcement rules, it belongs in a governance framework like [CTRL-AI](https://github.com/MShneur/CTRL-AI), not in an AoA library entry.

Supporting files under `tools/` may describe public software capabilities, APIs, setup safety boundaries, and operational patterns. They are reference infrastructure, not an eighth composable layer.

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

## Recommending Software, APIs, or Walkthroughs

Start at [`tools/README.md`](tools/README.md). You can either use the GitHub **Tool or API recommendation** issue template or open a PR.

Tooling contributions can land in several places:

- `tools/software-recommendations.md` — curated choices by use case;
- `tools/api-catalog.md` — APIs, MCP servers, webhooks, event streams, and integration surfaces;
- `tools/free-tool-ledger.md` — public free/student quota facts and caveats;
- `tools/ctrl-walkthrough/modules/` — data-only browser setup walkthroughs;
- `tools/CHANGELOG.md` — material tooling additions/removals/access-model changes.

### Tool/API evidence rule

Time-sensitive claims such as quotas, student offers, pricing, card requirements, or model availability must include an official provider source and `Verified on: YYYY-MM-DD`. If the answer is not known, write `unknown`; do not infer it from another plan, account, or old blog post.

### Public tooling privacy rule

Never contribute:

- API keys, passwords, OAuth tokens, cookies, recovery codes;
- personal account IDs, balances, usage, invoices, entitlements, or eligibility details;
- private repositories/projects, internal paths, private endpoints, hostnames or IPs;
- affiliate IDs or private commercial terms;
- instructions to bypass login, CAPTCHA, anti-bot/access controls, billing, or provider terms.

A walkthrough may point to a public login page and explain that login/MFA/consent is a human step. It may not automate or publish the user's credentials.

## Confidence Tags

Tag composable-library contributions honestly:

| Tag | Meaning |
|---|---|
| `[BATTLE-TESTED]` | Used in production, refined through multiple iterations |
| `[PRACTICED]` | Used personally, works well, not extensively tested |
| `[EXPERIMENTAL]` | New idea, untested or lightly tested |
| `[COMMUNITY]` | Auto-applied to community contributions until reviewed |

## Schema Compliance

Composable entries must follow the schemas in `schema/`. The frontmatter is required — it's how systems discover and load entries programmatically.

Tooling documents use the shapes documented in `TOOLS.md` and `tools/README.md` instead of persona/agent schemas.

## Version and Drift Maintenance

See [`VERSIONING.md`](VERSIONING.md).

When a PR adds/removes/renames a composable entry:

1. run `python3 scripts/sync-roster.py --check` locally if possible;
2. update the curated README count/list if it changed;
3. bump only the changed entry's own version — do not mass-bump unrelated entries;
4. update `CHANGELOG.md` when the change is material to users.

When a PR materially changes tools/APIs/walkthroughs, also update `tools/CHANGELOG.md`.

## What Happens to Your PR

1. **Community review** — contributions start untrusted until reviewed
2. **Schema/shape check** — does it follow the relevant entry or tools format?
3. **Quality check** — is it substantive and useful rather than a generic one-liner/list dump?
4. **Governance/public-safety scan** — composable entries stay governance-free; public tools stay free of secrets/private state
5. **Drift check** — counts, catalogs, and change logs are kept consistent with the files being added
6. **Merged or feedback** — either merged or you get specific feedback on what to change

## Extracting Personas from Custom GPTs

If you've found a great Custom GPT and want to contribute the persona behind it:

1. **Extract the behavioral signature** — what makes it different from a generic AI?
2. **Identify the domain, lexicon, and reasoning framework** — how does it think?
3. **Name what it's allergic to** — what does it refuse or avoid?
4. **Strip the governance** — remove system rules, fail-safes, or enforcement logic
5. **Reformulate** — rewrite in your own words using the schema format
6. **Credit** — use the source field when appropriate and lawful

**Do not copy-paste someone's system prompt.** Extract the pattern, reformulate it, contribute the pattern.

## Code of Conduct

Be helpful. Be honest about what's tested vs. experimental. Don't submit others' paid work. Don't submit prompt injection payloads. Don't submit secrets or private account state. Don't present stale or guessed tool quotas as current facts.