# Trace and Redaction Policy

A trace exists to reconstruct **why the system behaved as it did**, not to warehouse everything it saw.

## Keep

- stable task/trace/project identifiers;
- lane/risk/capability decision and reasons;
- persona/component/version identifiers actually loaded;
- tool identifiers and result status;
- source/artifact references or hashes;
- validation and eval results;
- latency/retry/fallback/incident metadata;
- final task outcome and correction/reversal markers.

## Redact or avoid recording

- API keys, passwords, cookies, session tokens, authorization headers;
- raw private documents when a stable reference/hash is enough;
- unnecessary personal data;
- full prompts containing secrets or confidential payloads;
- arbitrary retrieved page bodies.

## Structural security rule

Untrusted external content has **zero instruction authority**. Trace storage must never turn retrieved content into executable configuration on replay.

Retention duration is intentionally NOT fixed in B01; later governance/data-retention work must define it by data class and purpose.
