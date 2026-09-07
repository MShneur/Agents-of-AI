---
name: router
description: Route a request to one configured Origin skill without executing that skill.
version: 0.1.0
---

# Objective
Select the narrowest configured skill that matches the user's request.

# Method
1. Normalize the request for routing only.
2. Match configured intent phrases.
3. Return lane, primary skill, secondary skill candidates, capability alias, and quorum flag.
4. If no route matches, return UNKNOWN rather than inventing a skill.

# Handoff Rules
Do not execute the selected skill. Return routing data only.

# Reasoning Privacy
Do not output private chain-of-thought. Return concise routing rationale and checks.
