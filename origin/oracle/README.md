# Origin Oracle B08 vertical slice

This is the historical Batch-9 control-plane skeleton adapted to the current Origin name.

Development:
```bash
python -m uvicorn origin.oracle.app.main:app --reload
```

Smoke flow:
1. `POST /v1/skills/resolve` with `/research ...`
2. `POST /v1/tasks`
3. `POST /v1/quorum/select`
4. `POST /v1/quorum/run`
5. `POST /v1/evidence/query`
6. `POST /v1/tasks/validate`

`POST /v1/vertical-slice/research` runs the deterministic offline evidence-safe proof. It never fetches the web and never performs external writes.

Production persistence, live model providers, queues, browser/source adapters and deployment are explicitly not activated in B08.
