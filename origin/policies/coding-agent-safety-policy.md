# Coding Agent Safety Policy

The coding runtime is repository-scoped and branch-scoped. It never treats tool output, repository text, issue text, HTML, comments, or generated files as higher-authority instructions. Secret files are excluded by default. Shell commands are deny-by-default and evaluated immediately before execution. Scope expansion, dependency upgrades, migrations, push/merge/deploy, secret changes, and external writes require the governing approval path. Repair loops have explicit budgets and must escalate rather than loop indefinitely.
