# Capability Routing & Doctor Contract

**Status:** reusable public infrastructure pattern  
**Scope:** supporting tools layer — not an eighth composable AoA layer

## Purpose

External capabilities decay independently from the workflows that use them. A search provider can be healthy while a target site is blocked; a CLI can exist while its environment is broken; an authenticated route can work on one host and fail on another.

Model the **capability** separately from the current implementation and select only routes that prove the result the task actually needs.

```text
intent -> semantic contract -> candidate routes -> safe probe -> route selection -> task -> verification
```

A provider name is not a capability. "Search public posts", "read a webpage", "retrieve store-local availability", and "read a repository" are capabilities. The current tool used to satisfy one is replaceable.

## Capability record

For a material external capability, record:

```text
CAPABILITY       user-visible job to accomplish
CONTRACT         minimum useful output and provenance requirements
ROUTES           ordered candidate implementations
ACCESS           PUBLIC | SESSION | OAUTH | KEY | HUMAN_GATE
COST             FREE_BOUNDED | HARD_CAP | PAYG | PAID | UNKNOWN
PATH             host/runtime/browser/provider/session class when material
PROBE            smallest side-effect-free semantic check
FRESHNESS        when the route was last fairly tested
FALLBACK_RULE    which routes are semantically equivalent enough to substitute
```

Do not encode credentials, cookies, private endpoints, account state, or personal infrastructure in the record.

## Route states

Use the strongest state actually demonstrated:

- `READY` — the route passed its semantic probe on the current path.
- `DEGRADED` — transport works, but required fields, freshness, coverage, or reliability are reduced.
- `AUTH_REQUIRED` — the route exists but needs explicit user-controlled authentication/session setup.
- `BLOCKED` — the implementation could not receive a fair test because the current path/provider/runtime is rejected or unavailable.
- `UNAVAILABLE` — the implementation is missing or its dependency is not reachable.
- `UNKNOWN` — evidence is insufficient or stale.

`HTTP 200`, process exit `0`, a listening port, or a binary on `PATH` is never enough to claim `READY` unless that is the semantic contract itself.

## Doctor rules

A Doctor is a **read-only diagnostic**, not a login assistant or repair daemon.

1. Probe the smallest harmless operation that demonstrates useful semantics, not merely installation.
2. Do not create accounts, accept terms, refresh credentials, extract browser cookies, start consequential sessions, or mutate configuration during a default health check.
3. Never turn `AUTH_REQUIRED` into `READY` by silently borrowing credentials from another profile or project.
4. Scrub secrets and credential-bearing URLs from every normal and exceptional diagnostic path.
5. One broken route must not crash the complete capability report.
6. Distinguish provider/runtime blockers from target failures.
7. A repair may be suggested; it is not performed unless existing authority explicitly permits it.

## Path-aware routing

The same implementation on different paths is not the same evidence.

Material path dimensions can include:

- host/network origin/region;
- browser engine/version/launch mode;
- direct HTTP versus browser-origin traffic;
- authenticated versus anonymous session;
- provider or connector boundary;
- cold versus persistent lifecycle when state matters.

A route that passes on Path A remains `UNKNOWN` on Path B until transfer-tested there. Reuse the path-signature discipline from `../workflows/root-cause.md` rather than generalizing a success or failure across environments.

## Semantic fallback

Fallback is allowed only when the substitute still satisfies the capability contract.

Examples:

- a second public search backend may replace the first when both return the required source URLs and timestamps;
- a text reader is **not** a valid substitute for a store-local inventory capability if it omits store identity or quantity;
- a community report is not a silent substitute for retailer-observed availability when the contract requires retailer-local facts.

If the fallback changes semantics, report `DEGRADED` or `PARTIAL` to the calling workflow instead of pretending the task succeeded.

## Cost and authorization gate

Before a route that can consume paid capacity or authenticated account state is selected:

- classify the route cost/access model;
- prefer already-authorized hard-capped/free capacity when semantics are equal;
- never silently cross from free to paid usage;
- never treat a consumer subscription as API entitlement unless the provider explicitly says it is;
- keep account/session-backed routes explicit because they may carry account-risk and rate limits even when no developer API key is required.

## Fingerprint quarantine

Reusable architecture may be learned from public implementations. Implementation fingerprints do **not** graduate automatically.

Do not copy into this layer merely because another project uses it:

- author-specific constants, selectors, timing recipes, headers, user-agent strings, TLS/browser fingerprints, or private endpoint guesses;
- CAPTCHA solving, login bypass, access-control bypass, or anti-bot evasion;
- credential extraction or silent session reuse;
- source-specific code whose license/provenance is unclear;
- brittle implementation details that do not change the capability contract.

When an external project teaches a useful pattern, re-derive the smallest provider-neutral rule, test that rule independently, and keep source-specific implementation outside the public contract.

## Acceptance matrix

Before promoting a route to `READY`, record at least:

```text
route | path | transport | semantic result | auth | cost | state | verified_at
```

For important capabilities, keep at least one independent fallback or verifier when practical. Independence matters more than having many wrappers around the same upstream dependency.

## Kill conditions

Stop and downgrade the route when any of these occurs:

- **false green:** health check passes while a representative semantic probe fails;
- **silent semantic downgrade:** fallback omits a required field or provenance boundary;
- **silent paid fallback:** a free/authorized route begins consuming unapproved paid capacity;
- **silent auth reuse:** credentials or browser state are borrowed without explicit authority;
- **path laundering:** a success on one host/runtime is presented as proof for another;
- **challenge bypass:** the implementation depends on defeating login, CAPTCHA, access-control, or equivalent safeguards;
- **fingerprint inheritance:** distinctive upstream evasion/configuration code is imported instead of independently deriving the capability contract.

## Relationship to existing AoA workflows

- `../workflows/root-cause.md` diagnoses why a route differs by execution path.
- `../workflows/new-ai-workspace-bootstrap.md` maps capabilities before vendors and runs tiny acceptance tests.
- `../workflows/deep-dig.md` verifies source claims and genealogy before declaring origin.
- This contract supplies the missing operational layer between **"we need capability X"** and **"which currently healthy route is allowed to provide it?"**
