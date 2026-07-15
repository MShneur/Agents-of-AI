---
id: root-cause
type: workflow
purpose: Identify why a failure happened and what should change. Separates triggers from root causes. Refuses to stop at the first plausible explanation.
steps: 8
agents_used: [tracker, auditor]
personas_used: [gridlock, wireframe]
confidence: PRACTICED
version: "1.0"
tags: [operations, debugging, incidents, analysis, post-mortem, five-whys]
compatible_with: [any-ai]
---

# Root Cause

## Purpose
After a failure: understand what actually happened, why, and what to change. Not blame assignment — system improvement.

## Steps

### 1. Describe the Event
- What happened?
- When did it happen?
- Who or what was affected?
- What was the measurable impact?

### 2. Build the Timeline
- Events in chronological order
- Separate confirmed facts from assumptions
- Note information gaps

### 3. Identify Contributing Factors
- Technical factors
- Process factors
- Communication factors
- Environmental factors
- Incentive or expectation mismatches

### 4. Trace Causal Links
- Ask why each event occurred
- Continue until reaching system-level causes
- Don't stop at human error — ask what system allowed the error

### 5. Separate Root Causes from Triggers
- Trigger: what set the failure in motion
- Root cause: what allowed the failure to occur or persist
- Contributing factors: what made the failure worse

### 6. Generate Fixes
- Immediate containment (stop the bleeding)
- Short-term correction (fix the specific instance)
- Long-term prevention (change the system so this class of failure can't recur)

### 7. Prioritize Actions
For each fix: impact, effort, confidence, owner, deadline.

### 8. Write the Review
Clear narrative, evidence cited, root causes named, action items with owners, unknowns acknowledged.

## Allergy
- Blame assignment
- Single-cause thinking (most failures have multiple contributing factors)
- Vague action items ("improve communication")
- Fixes with no owner or deadline
- Stopping at the trigger instead of the root cause
