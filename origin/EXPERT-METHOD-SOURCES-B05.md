# B05 Named Practitioner Method Quorum

These practitioners did not participate in or endorse Origin. Their published methods are used only as independent review lenses. Historical fictional Origin personas remain source provenance, not claims of real participation.

## Method / extraction seat
- **Pablo Hoffman — crawler/extractor engineering.** Publicly identifies as having open-sourced Scrapy in 2008; Scrapy's method favors explicit crawling/parsing pipelines over opaque extraction. Source: https://github.com/pablohoffman and https://github.com/scrapy/scrapy
- **Magnus Müller — agent-directed browser automation.** Browser Use publicly credits Müller and Gregor Žunič and documents repeatable browser automation as a software capability. Source: https://github.com/browser-use/browser-use

## Evidence / provenance seat
- **Martin Kleppmann — append-only facts / replayable history.** Event-sourcing/log method keeps changes as immutable facts so state can be reconstructed. Source: https://martin.kleppmann.com/2015/01/29/stream-processing-event-sourcing-reactive-cep.html
- **Tyler Akidau — event time and evolving data.** The Dataflow Model distinguishes event time from processing time and treats unbounded data as continually evolving. Source: https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/

## Operator / reliability seat
- **Michael Nygard — circuit breaker.** Repeated failures should trip a breaker instead of causing retry storms. Source: https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/circuit-breaker.html
- **Charity Majors — observability engineering.** Preserve enough high-cardinality context to explain why a particular operation failed rather than only aggregate symptoms. Source: https://books.google.com/books/about/Observability_Engineering.html?id=PLHrEQAAQBAJ

## Adversary / untrusted-content seat
- **Simon Willison — prompt-injection/tool separation.** Untrusted retrieved content must not be allowed to choose or expand privileged actions. Sources: https://simonwillison.net/tags/prompt-injection/ and https://simonwillison.net/2025/Jun/13/prompt-injection-design-patterns/
- **Johann Rehberger — prompt injection against confidentiality/integrity/availability.** Treat indirect prompt injection as a system-level trust-boundary problem. Source: https://arxiv.org/abs/2412.06090

## Affected / decision-quality seat
- **Erika Hall — evidence before solutioning.** Ask the right questions and reduce unknowns before making product decisions. Source: https://books.google.com/books/about/Just_Enough_Research.html?id=5OLw0AEACAAJ
- **Indi Young — problem-space research.** Understand people's reasoning/process before imposing solution assumptions. Source: https://indiyoung.com/research/

## Specialist / entity-resolution seat
- **Peter Christen — data matching.** Entity resolution requires preprocessing, indexing, comparison, classification, and match-quality evaluation rather than title equality. Source: https://link.springer.com/book/10.1007/978-3-642-31164-2
- **William E. Winkler — record linkage.** Record linkage uses multiple non-unique identifiers and explicit match/non-match decision rules; do not collapse ambiguous pairs silently. Source: https://www.census.gov/library/working-papers/2006/adrm/rrs2006-02.html

## Synthesis
The quorum converges on a bounded acquisition model: deterministic extraction before probabilistic interpretation; immutable evidence + event time; explicit retry/circuit-breaker controls; strict separation between untrusted source text and tool authority; evidence-driven product decisions; and explicit entity-resolution uncertainty. No practitioner is represented as having reviewed Origin itself.
