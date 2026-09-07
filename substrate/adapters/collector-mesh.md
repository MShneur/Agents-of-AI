# Collector Mesh

Status: **FOUNDATION / source-acquisition pattern**

## Problem

Scrapers and research agents become brittle when “read source X” is hard-coded to one library, endpoint, browser trick, or unofficial API. Upstream sites change, APIs disappear, auth rules move, and a once-good collector silently starts returning partial data.

## AoA invariant

**Define the acquisition intent once; satisfy it through ranked interchangeable collectors with health checks and provenance.**

Origin will eventually use this pattern, but it is useful to any AoA research/runtime system.

## Acquisition contract

Start from the evidence need, not a specific scraper:

```yaml
intent: repository_source | release_history | issue_discussion | rendered_page | public_search | feed | archive | registry_metadata | custom
source: <canonical target>
requires_auth: true | false
freshness_requirement: <window>
output_contract: <normalized fields/artifact>
trust_class: <expected source class>
```

## Ranked collector set

A capability may have several collectors:

```text
1. canonical structured API
2. canonical raw/file endpoint
3. standard feed / llms.txt / machine-readable export
4. public HTML/text fetch
5. controlled browser rendering
6. authenticated user-controlled browser session
7. archive/historical source when current source is unavailable and provenance is clear
```

Do not treat this order as universal; rank by evidence quality, permission, reliability, cost, and task needs.

## Health / doctor contract

Each collector should be diagnosable without pretending a failed path succeeded.

```yaml
collector_id: <id>
health: PASS | DEGRADED | FAIL | UNCONFIGURED
checked_at: <time>
reason: <compact diagnostic>
auth_state: none | configured | expired | unknown
schema_version: <if relevant>
last_success: <time or null>
known_limitations: []
```

## Failover rule

Failover is allowed only if the alternate collector still satisfies the evidence contract.

Example:

```text
API unavailable
→ HTML collector succeeds
→ but HTML omits commit history required by task
→ result is PARTIAL, not PASS
```

## Normalization

Collectors return source-specific data; downstream reasoning should receive a normalized evidence envelope:

```yaml
canonical_source: <url/repo/id>
collector: <actual collector id>
retrieved_at: <time>
source_timestamp: <if known>
content_ref: <stored/raw artifact pointer>
normalized: <task-specific fields>
limitations: []
license_or_terms_ref: <when relevant>
```

## Browser ladder

Escalate access only as needed:

```text
structured/public endpoint
  → direct text/markdown
  → rendered isolated browser
  → authenticated user-controlled browser
  → human takeover for login/captcha/confirmation
```

Never bypass access controls, CAPTCHAs, or authentication restrictions merely because a collector can be engineered to do so.

## Source archaeology

For research into a product's open-source foundations, collectors may intentionally retrieve:

- earliest public tags/releases;
- archived repositories;
- old documentation still licensed/public;
- commit history and design ADRs;
- issue/PR discussions;
- migration/deprecation notes;
- public forks preserving an earlier architecture;
- package registry metadata;
- papers/blogs linked by maintainers.

The goal is architectural provenance, not reconstruction of private or access-controlled code.

## Failure signals

- one upstream change breaks the entire research capability;
- the fallback silently returns weaker evidence;
- collector output enters reasoning without source/provenance;
- authentication state is copied into unsafe logs/context;
- a browser path is used when a canonical structured source exists;
- scraping ignores robots/terms/access boundaries relevant to the target;
- a tool claims “no results” when the collector itself is unhealthy.

## Sources distilled

- `Panniantong/Agent-Reach`: multi-backend access routing, fallback paths, doctor diagnostics.
- `vercel-labs/agent-browser`: agent-readable text and controlled browser fallback.
- `Tencent/BrowserSkill`: separate agent browser surface and human handback for human-only steps.
- Origin design intent supplied by the user: research the public/open foundations beneath successful and emerging tools.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
