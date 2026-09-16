# Alt-ssembly Required — Protocol Reference

## Assembly Card (default compact form)

```text
USER JOB:
CURRENT TRUTH:
DELTA:
PRESERVE:
RUNTIME PATH:
NOVICE PATH:
PROOF REQUIRED:
KILL: none unless human-approved
NEXT ACTION:
```

Expand only the sections that are load-bearing.

## Full Product Packet

```text
[PRODUCT PACKET]
User job:
Current accepted product:
BUILT:
BROKEN:
MISSING:
OBSOLETE:
UNKNOWN:
Must preserve:
May change:
Explicit KILL (human-approved only):
Feature-layer map:
Target journeys:
Out of scope:
```

## Runtime Envelope

```text
[RUNTIME ENVELOPE]
Product class:
Execution surfaces:
Lifecycle boundaries:
Permissions/grants:
Persistence owner:
Host coupling:
Compatibility targets:
Primary path:
Verified fallback:
Stop condition:
Distributed artifacts:
Field acceptance paths:
```

## Novice Contract

```text
[NOVICE CONTRACT]
Primary task:
First successful action:
Visible defaults:
Progressive disclosure:
One-line explanations:
Status/error language:
Recovery path:
Advanced/expert capabilities that must remain:
Mobile/touch/accessibility requirements:
```

## Evidence Contract

```text
[EVIDENCE CONTRACT]
Claim:
Required paths:
Exact artifact identity:
Required evidence level:
Visible acceptance outcome:
Negative case:
Result per path: PASS | PARTIAL | FAIL | BLOCKED | NOT TESTED
Claim ceiling:
Rollback trigger:
Release disposition:
```

Evidence ladder:

```text
E0 SOURCE
E1 UNIT
E2 INTEGRATION
E3 BROWSER E2E
E4 REAL FIELD
E5 LONGITUDINAL
```

## Preservation Ledger

```text
[PRESERVATION LEDGER]
SURFACE | STATUS | OWNER/LAYER | CHANGE AUTHORITY | REQUIRED REGRESSION PROOF
```

Authority vocabulary:

```text
preserve
repair
extend
replace-human-approved
kill-human-approved
observe-only
```

## Opportunity Sweep

For greenfield or broad product work, inspect:

- user journey gaps;
- comparable products and current open-source projects;
- platform/browser capabilities;
- install/update/recovery surfaces;
- settings/preferences/personalization;
- exports/data portability;
- diagnostics/supportability;
- mobile/accessibility;
- advanced workflows/power features;
- security/privacy/permissions;
- relevant Agents-of-AI methods.

Return candidates:

```text
NOW   — needed for the product's primary job or launch credibility
NEXT  — valuable after the primary path is proven
LATER — plausible but not load-bearing
REJECT — duplicates, conflicts, or adds more burden than value
```

The sweep discovers options; it does not grant implementation authority.

## Field / canary template

```text
SUCCESS SIGNAL:
GUARDRAILS:
TIME WINDOW:
STOP THRESHOLD:
ROLLBACK METHOD:
KNOWN-GOOD ARTIFACT:
EXACT TESTED ARTIFACT:
```

A failed canary requires `ROLLBACK | DIAGNOSE | CONTINUE DELIBERATELY` before another patch.

## Assembly Receipt

```markdown
# Alt-ssembly Required — Assembly Receipt

Status: SHIP | CANARY | HOLD | ROLLBACK | HUMAN GATE

## Product
Requested delta:
Preserved surfaces:
Changed surfaces:
Killed surfaces: none | approved list

## Runtime
Verified paths:
Fallbacks:
Unknowns:

## Human Path
Novice path:
Expert capability preserved:
Recovery/status behavior:

## Evidence
Exact artifact:
Highest evidence level:
Field paths:
Negative/adversarial checks:
Claim ceiling:

## Safety / Privacy
Permissions:
Diagnostics/data:
Security/accessibility:

## Remaining
BLOCKED:
NOT TESTED:
Known risks:

## Next move
One concrete action.
```

## Human Gate

Require a human decision before intentional working-feature deletion, core product-job change, permission/privacy expansion, supported-platform removal, incompatible architecture replacement, weakening fail-closed/duplicate-prevention boundaries, or consequential release with unresolved material dissent.

## Practitioner Quorum

For consequential choices, retrieve current real practitioners and their public methods. Ask what questions their documented methods would force. Cite the source. Preserve disagreement. Never imply participation or endorsement.
