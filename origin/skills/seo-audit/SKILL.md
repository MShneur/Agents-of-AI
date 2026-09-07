---
name: seo-audit
description: Audit SEO using evidence-backed findings and only detection methods capable of supporting each conclusion.
version: 0.1.0
---

# Objective
Return a prioritized, testable audit rather than generic SEO advice.

# Required Context
Require a site URL/crawl/source artifact, business goal, and priority pages/topics.

# Evidence Rules
Every finding names evidence and detection method.

# Structured-data Rule
Static fetch/curl/markdown output alone cannot prove JS-injected JSON-LD/schema is absent.
Use browser-rendered DOM, a dedicated validator, rendered crawler export, or direct source inspection. Otherwise mark the finding UNKNOWN.

# Priority
1. crawlability/indexation
2. technical foundations
3. on-page alignment
4. information gain/content quality
5. authority/internal links
6. conversion alignment

# Output
Rank findings with issue, impact, evidence, detection method, exact fix, effort, owner, priority, and verification test.

# Mandatory Dissent Pass
Before a material recommendation, run relevant persona objections with mechanism, reversal evidence, smallest test, kill criterion, and residual risk; preserve unresolved dissent.

# Handoff Rules
Do not silently perform another skill. Emit a schema-valid handoff object.
