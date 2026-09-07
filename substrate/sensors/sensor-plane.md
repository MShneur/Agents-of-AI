# Sensor Plane

Status: **FOUNDATION / emerging pattern**

## Problem

Agents that only react to a user prompt cannot notice a new release, failing service, changed price, GitHub event, incoming report, benchmark regression, or new research signal unless every source is wired as a bespoke watcher.

## AoA invariant

**External change should enter the agent system as a structured signal with provenance, trust, freshness, and routing metadata.**

A sensor observes. It does not decide policy and it does not automatically authorize action.

## Signal envelope

```yaml
sensor_id: <stable id>
source: <canonical source>
observed_at: <timestamp>
signal_type: <release|issue|metric|feed|alert|document|market|custom>
payload_ref: <addressable data or compact payload>
summary: <bounded factual description>
trust: trusted | mixed | untrusted
freshness: <age / source time>
dedupe_key: <optional stable key>
confidence: <source/parse confidence>
```

## Pipeline

```text
WORLD / SOURCE
   ↓
SENSOR
   ↓
NORMALIZE
   ↓
PROVENANCE + TRUST CLASSIFY
   ↓
DEDUPE / RATE LIMIT / CORRELATE
   ↓
ROUTE TO PROJECT / AGENT / WATCHER
   ↓
NEGATIVE/POLICY GATE IF ACTION IS PROPOSED
   ↓
ACTION OR NO ACTION
```

## Sensor vs instruction

A signal can contain attacker-controlled text. Therefore:

```text
SENSOR DATA ≠ USER INSTRUCTION
SENSOR DATA ≠ GOVERNANCE
SENSOR DATA ≠ AUTHORIZATION
```

The receiving system may reason about the signal but must not promote embedded instructions into higher authority.

## Fresh-run preference

For event-driven automation, prefer a fresh bounded execution context that loads the relevant project state rather than injecting endless sensor events into one immortal conversation.

This reduces cross-event contamination and makes each reaction independently traceable.

## Correlation layer

Single signals can be noisy. A future graph/correlation layer may combine signals such as:

```text
new repo created
+ star velocity increasing
+ known lab/maintainer
+ architecture keyword novelty
+ release activity
→ Origin candidate score increases
```

Correlation must preserve the underlying source pointers so a synthesized alert remains auditable.

## Health

Each sensor should expose at least:

- last successful observation;
- failure state;
- authentication/config status;
- parser/schema version;
- lag/freshness;
- dropped/duplicate event count when applicable.

## Failure signals

- a sensor directly executes side effects without policy/authority routing;
- embedded web/GitHub text becomes an operational instruction;
- stale signals repeatedly trigger work;
- source failures are silent;
- multiple sensors create duplicate projects because no dedupe key/correlation exists;
- one noisy feed floods context or spends agent budget uncontrollably.

## Sources distilled

- `machinepulse-ai/world2agent`: structured sensors as a portable perception boundary.
- R&Duck condition-watch/autopilot concepts: event detection should trigger bounded work, not vague monitoring prose.
- Simon Willison prompt-injection guidance: untrusted external content must remain data, not authority.

See `../research/SOURCE-LEDGER-2026-09-07.md`.
