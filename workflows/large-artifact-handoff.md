---
id: large-artifact-handoff
type: workflow
purpose: Move large binary artifacts between AI, storage, processors, and repositories without forcing the binary through an AI context window.
steps: 7
agents_used: [auditor, stresstest]
personas_used: [scaffold, redline]
confidence: PRACTICED
version: "1.0"
tags: [uploads, artifacts, binary, object-storage, queues, github, mobile, free-tier]
compatible_with: [any-ai]
---

# Large Artifact Handoff

## Purpose

Use this workflow when an AI-assisted process needs to move a ZIP, image batch, dataset, build artifact, or other large binary payload and the normal chat/tool/MCP lane is too small, token-expensive, or unreliable.

The central rule is:

> **Move bytes through a byte-transfer system. Move only metadata through the AI/control system.**

A common shape is:

```text
AI / mobile client
    -> authenticated or signed upload
    -> object/file storage
    -> small queue/event containing a pointer
    -> processor
    -> destination API or repository
```

This is an architecture pattern, not a requirement to use any particular provider.

## When to Use

- image or media batches;
- ZIP archives;
- large generated artifacts;
- uploads that would otherwise be base64 encoded into prompts/tool calls;
- workflows hitting request-body, context-window, or repository API limits;
- mobile-first operation where the user should not shuttle files manually between multiple systems.

## When NOT to Use

- a genuinely small text file that already fits safely in the native tool;
- secrets or regulated data without an approved storage/security design;
- a workflow that attempts to bypass provider access controls or upload policies.

## Steps

### 1. Measure the real constraints

Before choosing a route, record:

- binary size;
- number of files;
- largest individual file;
- source upload limit;
- destination object/file limit;
- request-body limit;
- queue-message limit;
- downstream API call/subrequest limits;
- retention requirements.

**Done:** the limiting boundary is known instead of guessed.

### 2. Keep the binary out of the AI context

Do not base64 a large binary payload into a prompt or ordinary tool argument. Base64 expands binary size by roughly one third and also forces a byte-transfer problem through a token-oriented interface.

Send the file directly to a file/object transfer surface instead.

**Done:** the AI sees metadata and references, not the bulk bytes.

### 3. Upload directly and verify integrity

Use an authenticated upload endpoint or a short-lived signed upload URL.

Record at minimum:

- object key or file reference;
- byte size;
- cryptographic checksum such as SHA-256;
- content type;
- idempotency key or equivalent request identity.

The receiving side recomputes the checksum before processing.

**Done:** the stored object is addressable, authenticated, and integrity-checked.

### 4. Queue a pointer, not the payload

If asynchronous processing is useful, the event/queue message should contain small metadata such as:

```text
object_reference
destination_reference
requested_operation
checksum
idempotency_key
created_at
```

Never put a large ZIP or image in a queue merely because the queue accepts messages. Queue limits are generally designed for events, not bulk storage.

**Done:** the event is small and can be retried independently of the binary transfer.

### 5. Process on a suitable worker

A processor with enough CPU, memory, disk, and network budget performs heavy work such as:

- decompression;
- image optimization;
- validation;
- file counting;
- safe-path checks;
- conversion;
- batching downstream API calls.

Apply explicit allowlists for destinations and folder prefixes. Reject path traversal, unexpected file counts, oversized members, and archive bombs.

**Done:** heavy work runs on infrastructure designed for it rather than a thin ingress function.

### 6. Commit or deliver in bounded batches

For Git repositories, prefer normal Git or the provider's Git data APIs for a coordinated batch rather than hundreds of unrelated single-file commits.

Respect repository limits. GitHub currently enforces a 100 MB single-object limit and a 2 GB push-size limit for normal Git repository operations; Git LFS is an alternative when its storage model fits the project.

For any destination:

- use idempotency to prevent duplicate delivery;
- do not force-overwrite moving branches/targets without an explicit policy;
- record the final destination revision/identifier.

**Done:** the artifact reaches the intended destination once, with a verifiable final identifier.

### 7. Recover, clean up, and prove completion

Persist job state so an accepted upload is not silently lost after a process restart.

States may be as simple as:

```text
accepted -> queued -> processing -> complete
                         |-> failed
```

On restart, recover accepted/queued/processing jobs conservatively. Retain enough metadata for diagnosis, then delete temporary objects according to a defined retention policy.

Verification must include:

- checksum matched;
- expected file count/manifest matched;
- destination revision exists;
- duplicate replay did not create a second result;
- a simulated restart can recover an unfinished job.

**Done:** completion is proven and recovery behavior is known.

## Free-tier implementation notes

Free services can compose well when each is used for the job it is good at. For example, a thin serverless ingress can authenticate and issue a direct object upload; object storage holds bytes; a queue carries a pointer; a self-hosted/free-compute worker handles expensive processing.

Do **not** assume one free service should perform every stage. A 10 ms CPU limit, a 100 MB request-body limit, or a 128 KB queue-message limit is an architectural signal to split responsibilities rather than fight the platform.

See [`../tools/free-tool-ledger.md`](../tools/free-tool-ledger.md) for dated public limits.

## Security / privacy invariants

- secrets never go in the artifact manifest;
- destination repositories/folders are allowlisted;
- uploads are authenticated or signed and expire;
- checksums are verified before processing;
- archive paths are normalized and traversal is rejected;
- accepted jobs have durable state;
- logs avoid credentials and unnecessary personal data;
- public documentation uses placeholders, never live endpoints or private infrastructure names.

## Done Condition

The workflow can move a large artifact without embedding the binary in the AI context, can detect corruption/duplicates, can recover accepted work after restart, and can prove the final destination revision or object identifier.
