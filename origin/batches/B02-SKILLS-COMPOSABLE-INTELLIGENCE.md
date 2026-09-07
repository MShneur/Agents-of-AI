# Origin B02 — Skills and Composable Intelligence

Status: IMPLEMENTED ON DRAFT BRANCH
Source basis: uploaded historical `origin .md`, Batch 2 sections 2.1–2.12.

## Historical extraction

The historical source extracts reusable structure from `danielmiessler/Fabric` and
`coreyhaines31/marketingskills` (`copywriting`, `seo-audit`) and explicitly says
not to clone their full prompts.

KEEP:
- intent-triggered skills
- context-before-questioning
- narrow skill boundaries
- reference-bounded answers
- structured output contracts
- explicit tool limitations
- related-skill handoffs
- test fixtures and output rubrics
- clear/specific/honest copy rules
- prioritized audit findings

REJECT:
- giant all-purpose marketing prompt
- implicit cross-skill behavior
- unsupported conversion metrics
- static-fetch-only schema conclusions
- invented proof/testimonials/statistics
- generic SEO recommendations without evidence
- autonomous publication or outreach

## B02 implementation

1. Mandatory skill package contract.
2. Context isolation + budget policy.
3. Provider-neutral routing table + runtime resolver.
4. Atomic reusable patterns.
5. Marketing context templates.
6. Conversion-copy skill with claim ledger and dissent.
7. SEO-audit skill with evidence-ranked findings.
8. Minimum-safe PR communications skill.
9. Typed skill-to-skill handoff.
10. Mandatory dissent before synthesis.
11. Skill package validator and local eval fixtures.

## Current-source reinforcement

A current check on 2026-09-07 confirmed:
- Fabric still supports intent classification, task decomposition, bounded reference text,
  external-tool offload, and gold-answer evals.
- marketingskills still loads product context before generic questioning and routes to
  related skills instead of collapsing every marketing job into one prompt.
- its SEO audit still warns that a static fetch cannot prove JavaScript-injected
  structured data is absent.
- the open Agent Skills format now formalizes progressive disclosure:
  discovery metadata first, full SKILL.md only on activation, optional resources only
  during execution.

This strengthens the historical design without replacing it.

## Named method seats

These practitioners did not participate in or endorse Origin. Their public methods are
used as review lenses.

- Daniel Miessler — modular reusable pattern decomposition.
- Corey Haines — explicit marketing-skill activation, context intake, workflow, output,
  and adjacent-skill routing.
- Daniele Procida — separation of reference and procedural material to avoid monoliths.
- Simon Willison — external/retrieved instructions remain untrusted until admitted.
- Hamel Husain — acceptance cases and failure-driven regression evaluation.
- Erika Hall — keep the user/job question separate from the mechanism chosen to solve it.

## Verification

B02 tests prove:
- deterministic routing from configuration
- required skill package files are enforced
- missing required inputs are surfaced, not invented
- handoffs are schema-valid
- public claims require evidence entries
- SEO static-only evidence cannot assert schema absence
- PR external actions remain approval-gated
- a skill cannot silently run an adjacent skill

## Deferred

- full persona registry
- live model/provider execution
- live browser/Rich Results validation
- publication/send/outreach
- persistent memory-backed context loader
- Batch 3+ repository execution

Stop after B02 until the next user `Proceed`.
