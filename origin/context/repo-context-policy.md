# Repository Context Policy

Context is a dependency, not a dump. Build each pack against an exact repository + base commit.

Priority: task-specific files → direct dependencies/imports → relevant tests → runtime/config → current architecture docs → schemas/contracts → active diff → broader summary.

Default exclusions: secrets, `.env*`, vendor/build output, binaries, unrelated generated files, unrelated history. Lockfiles enter only when dependency work requires them.

If a source-of-truth file is missing: return `UNKNOWN`. If docs conflict with current code, label `CONFLICT`; code is authoritative for current behavior unless the task is specifically to implement the documented contract. Never silently truncate a source-of-truth file to meet budget; shrink lower-priority context instead.
