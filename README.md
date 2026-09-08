# Agents of AI — Portable Agent Packet

Built 2026-09-08 from the canonical `MShneur/Agents-of-AI` agent library at main commit `7d81d2bc3f98d1c61add5c4563e2228d675fcb54`, plus the new portable Origin agent derived from the current Origin implementation branches.

## Included agents

1. archaeologist
2. auditor
3. chisel
4. conductor
5. firehose
6. locksmith
7. repo-nanny
8. scout
9. scribe
10. showrunner
11. sieve
12. stresstest
13. tracker
14. origin

The `agents/` directory contains one markdown file per agent. `schema/agent.schema.md` contains the canonical AoA agent format.

## Origin

`agents/origin.md` is the portable agent wrapper for Origin, the Agents-of-AI R&D / Master-of-Masters capability router. It preserves Origin's role boundaries: R&Duck remains Prime/autopilot when active, CTRL-AI remains governance authority when active, and Origin routes/selects capabilities rather than silently replacing either.

For website/product work, Origin can route the relevant Origin capability stack, including requirements, roadmap, design system, UX, conversion copy, ecommerce, API/database, repo engineering, security, browser verification, SEO, and shipping/operations.

## Portable use

Upload the whole packet as project knowledge, or load the specific file from `agents/` that matches the task. These are agent definitions, not credentials and not connector grants. External actions still require the receiving AI environment to have the needed tools/connectors and permissions.

## Provenance

The 13 pre-existing agent files are unchanged canonical blobs from the repository's main branch. Origin is new and remains `EXPERIMENTAL` until it is reviewed/merged into the canonical public agent set.
