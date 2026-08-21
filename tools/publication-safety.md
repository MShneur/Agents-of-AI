# Public Tooling Publication Safety Gate

Use this gate before adding any tool, quota, setup recipe, workaround, sample configuration, or workflow-infrastructure note to the public Agents of AI repository.

## Two-pass review

### Pass 1 — Devil's Advocate

Ask:

1. What is the strongest reason this should **not** be public?
2. Does the entry teach a reusable method, or does it mostly reveal how one person's system is wired?
3. Could the same value be preserved with fewer implementation details?
4. Will a fast-changing quota become misinformation if nobody maintains it?
5. Is a claimed "free" path actually capable of producing charges?
6. Is the tool list becoming an undifferentiated link dump rather than actionable workflow knowledge?

If the strongest objection survives, rewrite or do not publish.

### Pass 2 — Red Team

Assume a hostile reader wants to identify the contributor, find their infrastructure, access their accounts, infer private projects, or abuse the documented system.

Search the draft for:

- names, emails, usernames, phone numbers, schools, organizations, or geographic clues;
- account IDs, tenant IDs, subscription IDs, project IDs, repository IDs, database IDs;
- private repository names, private project names, branch names, internal folder paths;
- domains, IP addresses, hostnames, SSH targets, bucket names, private endpoints;
- API keys, OAuth tokens, PATs, cookies, JWTs, webhook secrets, SSH keys, passwords;
- environment-variable **values** or examples copied from a live deployment;
- affiliate IDs/tags, revenue data, invoices, balances, credits, actual spend, usage history;
- student eligibility status, entitlement dates, account renewal dates;
- screenshots or logs containing any of the above;
- unusual implementation details that unnecessarily fingerprint a private deployment.

Any match is a blocker until removed or replaced with a generic placeholder.

## Public-safe transformations

Prefer these substitutions:

| Private detail | Public-safe replacement |
|---|---|
| exact server/host | `processor host` or `self-hosted worker` |
| private repo/path | `target repository` / `allowed folder` |
| live endpoint | `authenticated ingress endpoint` |
| real secret name/value | `UPLOAD_TOKEN` / `<secret>` |
| actual quota/balance | provider-published public limit |
| private account status | public eligibility or plan description only |
| exact internal topology | provider-neutral architecture diagram in words |
| copied failure log | minimal synthetic error example |

## Quota integrity gate

A free-tier fact may be published only when:

- it has an official public source;
- it has a `verified_on` date;
- its unit is explicit (requests/day, tokens/day, GB-month, operations/day, etc.);
- account/model/region variance is stated when relevant;
- billing risk is stated separately from the free allowance;
- no paid upgrade is presented as necessary for a "free-only" workflow.

If a provider exposes the exact quota only inside an account dashboard, publish **how to find the quota**, not somebody's private dashboard value.

## Architecture disclosure gate

Publish:

- patterns;
- failure modes;
- checksums and idempotency concepts;
- allowlisting as a control;
- queue/object-store separation;
- retry/recovery principles;
- provider-documented limits.

Do not publish:

- real allowlists;
- real endpoints;
- secrets;
- private deployment names;
- private topology details that are not needed to teach the pattern.

## Release verdict

Use one of:

- `SHIP` — generic, sourced, no private markers found.
- `FIX` — useful but contains removable privacy/freshness/billing problems.
- `HALT` — disclosure would expose secrets, private infrastructure, personal/account data, or a dangerous bypass.

A same-model review must be labeled internal; it is useful adversarial checking, not independent verification.
