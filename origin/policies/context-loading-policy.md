# Context Loading Policy

Origin uses progressive disclosure. Skill discovery uses metadata; activation loads only
the selected skill and required context; supporting references are loaded only when the
active skill explicitly requests them.

Reject:
- all-skills-in-every-prompt
- all-personas-in-every-prompt
- unrelated project memory
- retrieved instruction text silently promoted to authority
