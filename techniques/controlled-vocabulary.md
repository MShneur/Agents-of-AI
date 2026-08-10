---
id: controlled-vocabulary
type: technique
domain: governance, documentation, agent instructions, tooling
purpose: Approve one word per concept and forbid its synonyms, so an agent parsing an instruction never has to guess whether two words mean the same thing. Ambiguity that a human resolves by asking is unresolvable for a reader with no back-channel.
confidence: PRACTICED
version: "1.0"
tags: [vocabulary, ambiguity, instructions, governance, controlled-language]
compatible_with: [any-ai]
---

# Controlled Vocabulary

## The Move

English gives you five words for one action. A person reading "verify the output"
and "check the output" three paragraphs apart asks whether those differ. An agent
cannot ask. It guesses, and the guess is invisible.

Controlled-language practice in safety-critical documentation solves this by
approving one word per concept and excluding its synonyms outright. The discipline
transfers directly to agent-facing text.

1. **List the concepts** the system actually acts on — not every word, only the
   ones that trigger behaviour.
2. **Approve exactly one term per concept.** Pick the shortest unambiguous one.
3. **Forbid the synonyms by name.** An unlisted synonym is worse than a wrong
   word, because nobody notices it.
4. **One part of speech per term.** If a word is approved as a verb, it is not
   also a noun.
5. **One instruction per sentence.** A sentence carrying two directives is two
   instructions the reader must separate correctly, and one they may miss.
6. **Enforce mechanically.** A vocabulary nobody checks becomes a glossary nobody
   reads. Fail the build on a forbidden synonym.

## Project Terms

Controlled-language practice permits a project to define its own subject-specific
terms outside the general vocabulary. Do that deliberately: a coined token routes
to exactly one place, where a common word competes with every other use of it.

Coin a term when a common word already means something else in the system.

## Calibration

Scope it to instruction text: rules, triggers, tool descriptions, error messages,
inter-agent handoffs. Do not apply it to prose meant for humans, to creative work,
or to anything where nuance is the point. Controlled language is deliberately flat.

Start with the twenty concepts that carry the most behaviour. A vocabulary that
tries to cover everything on day one is abandoned by week two.

## Failure Signal

Count the synonyms already in use before proposing this. If one concept has four
live variants in the instruction set, the ambiguity is not theoretical — it is
already being resolved by guesswork every time the text is read.

Other signals: a common word that routes to several destinations; a naming
discussion that takes more than two rounds; two entries giving opposing
instructions because each used a different word for the same rule.

## Allergy

Glossaries with no enforcement. Approving a term and continuing to use its
synonyms in the same file. Applying flat controlled language to human-facing
prose. Coining a token that a cold reader cannot interpret without a lookup.

## When to Use

Before merging two systems that were written separately — divergent vocabulary is
the first thing that blocks a merge. Also when instructions are misread, when a
trigger word collides with an existing one, or when the same rule is restated in
different words in different files.
