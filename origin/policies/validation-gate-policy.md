# Validation Gate

A change cannot pass because the author says it is done. PASS requires the task's declared acceptance checks plus applicable lint/typecheck/unit/integration/browser checks and an independent review record. UI changes require rendered user-flow verification; screenshots alone do not satisfy the gate. Failed or unrun required checks are retained as FAIL or NOT_RUN.
