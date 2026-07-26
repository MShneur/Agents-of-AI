---
id: institutional-mapper
type: interpretation-model
purpose: Translate a real-world issue into the institutions, standards, authorities, review channels, and document purposes that govern it.
input_classes: [institutional-issue, workplace-event, regulated-process, complaint, grievance, safety-event]
output_schema: institutional-map-v1
confidence: PRACTICED
version: "1.0"
tags: [interpretation, institutions, policy, accountability, routing]
compatible_with: [any-ai]
---

# Institutional Mapper

## Activate When

Use when an issue may involve multiple internal or external authorities, policies, standards, reporting systems, or audiences.

Examples include workplace disputes, patient-safety events, school complaints, insurance disputes, housing matters, professional conduct concerns, regulated services, and organizational investigations.

## Method

1. Identify the institution, jurisdiction, relationship, and event type.
2. Separate the issue into distinct dimensions: safety, operations, conduct, employment, professional standards, contractual duties, regulatory obligations, and legal questions.
3. Identify the authority responsible for each dimension.
4. Determine what each authority reviews, what evidence it uses, and what remedy or action it can provide.
5. Map internal policies separately from external standards.
6. Distinguish mandatory reporting, optional escalation, consultation, preservation, and litigation-oriented channels.
7. Match each channel to its proper document type and requested action.
8. Mark uncertain jurisdiction, stale policies, and unverified authority claims for research.

## Output

```yaml
institutional_map:
  context:
    institution:
    jurisdiction:
    relationship:
    event_type:

  issue_dimensions:
    safety: []
    operations: []
    conduct: []
    employment: []
    professional_standards: []
    contractual: []
    regulatory: []
    legal_questions: []

  authorities:
    - name:
      level: internal | external
      authority_type:
      reviews:
      evidence_expected: []
      possible_actions: []
      filing_or_contact_path:
      verification_status:

  standards:
    internal_policies: []
    professional_standards: []
    accreditation_or_industry: []
    statutes_or_regulations: []
    contractual_terms: []

  routing:
    immediate_safety: []
    management: []
    human_resources: []
    professional_oversight: []
    regulator: []
    private_preservation: []
    legal_research: []

  document_matrix:
    - audience:
      purpose:
      include: []
      exclude: []
      requested_action:
```

## Rules

- One authority's existence does not prove that it has jurisdiction.
- Internal policy, professional guidance, accreditation standards, regulation, and law are not interchangeable.
- Do not combine all concerns into one omnibus complaint when separate reviewers need different facts.
- Do not imply that a standard creates a private legal claim unless verified.
- Preserve overlapping channels without claiming that every channel should be used.
- Current policies and officeholders require verification before final reliance.

## Completion Criteria

- Every material issue has an accountable authority or is marked unresolved.
- The authority's role and limits are stated.
- Evidence expectations are mapped.
- Each proposed document has one audience, one purpose, and one requested action.
- Research gaps are explicit.

## Allergy

Authority-name dumping. Treating policies as statutes. Treating accreditation language as a legal cause of action. Sending one narrative to every reviewer. Inventing jurisdiction. Recommending escalation without identifying what the recipient can actually do.
