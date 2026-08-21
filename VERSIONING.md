# Agents of AI — Versioning and Snapshot Rules

Agents of AI contains several kinds of artifacts that change at different rates. One repository-wide semantic version would create false precision, so the project uses **independent component versions plus a dated public snapshot**.

## Current public snapshot

**Snapshot:** `2026.08.21`

Live composable roster at this snapshot:

| Layer | Count |
|---|---:|
| Personas | 23 |
| Agents | 13 |
| Workflows | 16 |
| Techniques | 17 |
| Modes | 4 |
| Teams | 6 |
| Failures | 6 |
| **Total** | **85** |

Supporting tools, software recommendations, APIs, and walkthroughs are **not an eighth composable layer** and are versioned separately.

## What gets a version

### Library entries

Files under `personas/`, `agents/`, `workflows/`, `techniques/`, `modes/`, `teams/`, and `failures/` keep their own frontmatter `version` when their schema supports it.

**Bump an entry version only when that entry changes.** Do not mass-bump 85 unrelated files because a new tool, README, or workflow was added elsewhere.

### Repository snapshot

The dated snapshot (`YYYY.MM.DD`) changes when there is a material public-state change such as:

- a layer is added or removed;
- the live roster changes materially;
- a new public supporting subsystem is introduced;
- discovery/install/update behavior changes;
- public contribution or safety rules change.

The snapshot is a navigation/rebuild marker, not a promise that every file was edited that day.

### Executable/supporting components

Executable or format-sensitive components use their own version channel. Example:

- CTRL Walkthrough userscript: semantic version in its userscript header and runtime constant;
- walkthrough manifest/modules: schema version plus module version/date;
- fast-changing service/API facts: `Verified on` date, because provider terms and quotas can change independently of this repo.

## Required maintenance after material changes

1. Compare the live seven-layer directories with the README and research-prompt roster.
2. Run `python3 scripts/sync-roster.py --check` locally when possible. Do not require hosted CI merely to keep the roster current.
3. Update `README.md` if curated counts or descriptions changed.
4. Update `CHANGELOG.md` for material repository changes.
5. If tools/APIs/walkthroughs changed, update `tools/README.md` and `tools/CHANGELOG.md` as needed.
6. Bump only the component/entry versions that actually changed.
7. Re-check public tooling facts whose verification date is stale before presenting them as current.

## Why this rule exists

The repository previously caught roster drift where generated research prompts and the curated README disagreed with the live directories. On 2026-08-21 another example was found: the live workflow roster contained **16 workflows** while the README still claimed **14**.

The live files are source truth. Version labels and counts are navigation aids; if they disagree with the repository contents, fix the labels rather than rationalizing the mismatch.