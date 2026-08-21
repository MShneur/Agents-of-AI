# CTRL Walkthrough — AI Handoff Protocol

Purpose: let an AI hand a user a temporary, private or reusable walkthrough without exposing credentials or forcing a private-repository token into the public CTRL Walkthrough userscript.

## Decision rule

Use the smallest safe transport that fits the walkthrough.

| Walkthrough type | Preferred transport | Persistence |
| --- | --- | --- |
| Generic, reusable, public-safe setup | Publish as a canonical module under `tools/ctrl-walkthrough/modules/` and add it to `manifest.json` | Public/stable |
| Personalized or project-specific, no secrets, normal size | `CWZ2:` gzip + Base64URL paste code | Temporary local handoff |
| Same as above, browser cannot decode gzip | `CW2:` Base64URL UTF-8 JSON | Temporary local handoff |
| Large personalized/project-specific walkthrough, no secrets | Local `.walkthrough.json` file/attachment imported with `CW -> + -> Import file` | Local until user removes it |
| Private GitHub walkthrough | `CWG1:` / GitHub blob pointer only as a best-effort convenience when that browser is already proven to support signed-in private import | Temporary if import succeeds |
| Anything requiring passwords, API keys, bearer tokens, SSH keys, recovery codes or other credentials | **Never put the secret in the walkthrough, code, URL or repository.** Use placeholders and a human gate; enter the secret directly in provider/server-local secret storage | Secret stays outside CTRL |

## Default for AI-generated private fixes

When a user says something like:

> I have CTRL Walkthrough installed. Give me a walkthrough to fix this.

The AI should:

1. determine whether the instructions are generic/public-safe or private/project-specific;
2. create/validate a schema-v2 walkthrough;
3. remove credentials and secret values; use placeholders/human gates instead;
4. if generic and reusable, propose or publish a canonical public module only when publication is authorized;
5. otherwise prefer a self-contained **`CWZ2`** handoff;
6. if the code is impractically large, provide a local `.walkthrough.json` attachment/file instead;
7. tell the user only: **`CW -> + -> paste -> Load pasted code`** (or Import file for the large-file path).

The user should not need to create a GitHub Personal Access Token merely to load a private walkthrough.

## Why `CWZ2` is the default

`CWZ2` is:

```text
CWZ2:<Base64URL(gzip(UTF-8 schema-v2 JSON))>
```

Gzip is the default because it is ubiquitous in standard libraries and the browser Compression Streams API. Base64URL makes the binary result safe to copy/paste in a normal text box without `+`, `/` or padding issues.

`CW2` is the fallback:

```text
CW2:<Base64URL(UTF-8 schema-v2 JSON)>
```

It is larger but does not require browser gzip decompression.

### Important: compression is not encryption

`CWZ2` and `CW2` are transport encodings. Anyone who possesses the code can decode it. They are appropriate for private/project-specific **instructions** sent through an already-private conversation, but they must never contain credentials or secret values.

## Expiry / temporary memory

AI-generated paste handoffs should normally include a top-level:

```json
"handoffExpiresAt": "<UTC ISO-8601 timestamp>"
```

Recommended default: **24 hours** unless the user explicitly needs longer.

CTRL treats pasted handoffs as temporary local state. A temporary walkthrough should be removed when it is completed or explicitly ended/cleared; the engine may also purge expired temporary handoffs on startup.

This is Tampermonkey/browser storage, **not AI long-term memory**.

## Do not use a temporary public GitHub commit for private data

A timer that deletes a file from a public GitHub branch does **not** make the content private or ephemeral. Git keeps committed content in repository history unless history is rewritten and cached/forked copies are also dealt with.

Therefore:

- never publish personal, project-private or sensitive walkthrough content to a public repo just because a deletion timer exists;
- public GitHub is only for content that is safe to remain public permanently;
- if content is public-safe and reusable, make it a normal canonical module instead of a timed file;
- if content is private/project-specific, use `CWZ2`, `CW2`, or a local file.

## Private GitHub pointer (`CWG1`)

Format:

```text
CWG1:OWNER/REPO@REF:path/to/walkthrough.json
```

This remains a convenience transport, not the primary private transport. Browser privacy/session/CORS behavior can prevent a userscript from fetching a private GitHub file even while the normal GitHub page is visible. If a `CWG1` import returns a network error, do not ask the user for a PAT as the first fix; generate a `CWZ2` handoff instead.

## Generator

Use the public helper:

```text
tools/ctrl-walkthrough/make_handoff.py
```

Example:

```bash
python3 tools/ctrl-walkthrough/make_handoff.py my.walkthrough.json
```

Default output is a 24-hour `CWZ2` code. Use `--format cw2` for the uncompressed fallback or `--ttl-hours 0` only when a non-expiring paste handoff is intentionally required.

The generator performs basic schema validation and refuses several common credential/token patterns. It is a guardrail, not a substitute for human/AI privacy review.

## Public/private publication boundary

Before publishing anything under Agents of AI:

- no personal information;
- no private repository names/paths or private infrastructure;
- no private source lists/research terms;
- no account-specific billing/entitlement state;
- no affiliate identifiers that are private to one operator;
- no credentials or secrets.

When in doubt, keep the walkthrough out of the public repository and hand it off locally with `CWZ2` or a file.
