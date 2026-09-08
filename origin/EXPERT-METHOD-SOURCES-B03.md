# B03 Named Practitioner Method Sources

These practitioners did not participate in or endorse Origin. Their published methods are external review lenses.

- **Kent Beck — TDD / Tidy First.** Canon TDD: test list, one runnable test at a time, make it pass, then refactor; separate structural from behavioral work. Sources: https://newsletter.kentbeck.com/p/canon-tdd and https://newsletter.kentbeck.com/p/augmented-coding-beyond-the-vibes
- **Martin Fowler — Continuous Integration.** Version-controlled source, automated/self-testing builds, frequent integration, and tests before integration. Source: https://martinfowler.com/articles/continuousIntegration.html
- **Jez Humble — deployment pipeline / Continuous Delivery.** Multi-stage automated test/deployment workflow with rollback as a core property. Source: https://continuousdelivery.com/about/ and deployment-production-line paper.
- **Charity Majors — observability-driven development.** Instrumentation and observable behavior are necessary to know what software actually does. Source: https://charity.wtf/p/in-praise-of-normal-engineers
- **Simon Willison — prompt injection/tool boundary.** Untrusted content combined with privileged tools materially increases risk; repository text/tool output does not gain authority by being read by the model. Sources: https://simonwillison.net/2025/Apr/9/mcp-prompt-injection/ and https://simonwillison.net/2023/Apr/25/dual-llm-pattern/

## Method synthesis
Kent Beck constrains change size and test feedback; Fowler/Humble make integration and release evidence explicit; Majors requires runtime observability; Willison constrains the authority of repository/tool content. Together they support Origin's bounded change-set model.
