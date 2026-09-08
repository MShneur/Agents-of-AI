# Origin Control Room — ChatGPT deployment compatibility

Checked: 2026-09-07
Status: PACKAGE_READY / CREATION_BLOCKED_ON_PERSONAL_CHATGPT

The historical blueprint calls for a private Custom GPT front door. The configuration package is complete, but current OpenAI product availability does not allow creation of a **new** GPT on personal Free, Go, Plus or Pro accounts.

Managed Business, Enterprise and Edu workspaces may allow GPT creation depending on workspace permissions. Existing GPTs can remain usable and may be editable subject to account/workspace eligibility.

Origin therefore treats this directory as a versioned deployment artifact. It must not be represented as actually created, connected or tested in ChatGPT until an eligible GPT editor is available.

Current Actions compatibility:
- Actions use an OpenAPI schema plus configured authentication.
- A GPT can use either Apps or Actions, not both at the same time.
- This pack exposes only the Oracle-controlled Origin API surface; direct provider, GitHub-write, deployment, database-admin, secret-manager and publishing actions are prohibited.
