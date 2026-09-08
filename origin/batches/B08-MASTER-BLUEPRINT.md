# Origin B08 — Master Blueprint Synthesis

Status: DONE / HOLD

Historical mapping: uploaded `origin .md` **Batch 9 / ORION Master Blueprint**. Current product name is **Origin**; `ORION` is retained only as historical provenance.

## Governing architecture

Origin Control Room is a thin command interface. Oracle is the durable control-plane/runtime. Executable skills are narrow/versioned/typed/tested; blueprint-only skill manifests remain `draft` until their full package and eval suite is built. Personas run as independent objection passes. Evidence is separate from inference. Authorization remains server policy. External writes are not exposed in this batch.

## B08 deliverables

- final master architecture and repository map
- Custom GPT configuration pack + exactly 20 curated knowledge files
- one Oracle Action OpenAPI surface
- source-derived registry for 20 primary skills plus control skills
- draft manifests for missing historical skills and a complete executable `adversarial-audit` package required by the first vertical slice
- exactly 30 source-derived persona definitions
- quorum-selection matrix and rotating dissent seats
- model-alias configuration
- PostgreSQL migration + Docker development skeleton
- read-only FastAPI vertical-slice API
- evidence-safe research vertical slice
- 12 non-negotiable acceptance fixtures and B08 contract tests
- current ChatGPT/GPT deployment compatibility note

## Explicit exclusions

No GitHub write endpoint, deployment endpoint, browser automation, scraper activation, external publishing, provider key exposure, payment, email send, social post, arbitrary shell/database/filesystem action, or production deployment.
