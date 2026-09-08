# Source Admission Policy

New sources are default-deny until an admission record exists. Admission records must name the canonical domain/type, permitted route, terms/robots review timestamps or an explicit `UNKNOWN`, request pattern, rate limit, authentication requirement, allowed fields, retention rationale, owner, known failure modes, and kill switch.

`authentication_required: true`, access challenge, login wall, or a route whose intended method requires bypass/evasion makes automated extraction `REJECTED` for this Origin lane. A public URL is not itself permission to automate unrestricted collection. Admission is an operational policy record, not legal advice.
