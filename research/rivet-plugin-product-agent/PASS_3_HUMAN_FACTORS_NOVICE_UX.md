# Rivet Research Pass 3 — Human Factors / Novice UX

Status: **COMPLETE — research pass 3 of 5**  
Working name: **Rivet** (still provisional)  
Scope: human-centered design, cognitive load, mental models, novice-to-expert progression, progressive disclosure, mobile/touch interaction, accessibility, status/error language, and user control.

## Executive finding

The strongest correction from this pass is simple:

> **Simplification should reduce cognitive load without deleting capability.**

The recurring Ghost mistake was treating “make this easier” as “remove advanced features.” Human-factors research points in the opposite direction: keep the important core path obvious, move advanced options behind progressive disclosure, preserve expert power, and make system status/recovery understandable in the user’s language.

This pass therefore adds a mandatory **Novice Contract** to Rivet. It complements the Product Packet and Runtime Envelope:

- Product Packet = what the product must remain;
- Runtime Envelope = where/how it must work;
- Novice Contract = how a first-time user understands, operates, and recovers from it.

---

## 1. Human-centered design: solve the actual problem, not the presented symptom

Don Norman’s human-centered design principles are directly relevant to Ghost’s repair history: solve the root/core problem rather than the presenting symptom, focus on people, take a systems view, and continually test/refine the result.

Source:
- https://jnd.org/the-four-fundamental-principles-ofhuman-centered-design-and-application/

Implication for Rivet:
- Before deleting, hiding, or redesigning product capability, ask whether the user asked to remove the capability or merely to reduce confusion around it.
- A local bug report does not automatically authorize a product simplification.
- “Play is broken” is a transport problem unless evidence proves the surrounding product model is also broken.

### Rivet question

Before changing code or UI:

```text
What user outcome is failing?
What is merely the visible symptom?
What working capability does the user still rely on?
What would solving the symptom accidentally destroy?
```

---

## 2. Progressive disclosure: preserve advanced power without overwhelming novices

Jakob Nielsen’s progressive-disclosure method explicitly addresses the conflict between feature richness and simplicity: show the small set of high-value options first, keep specialized controls available on request, and avoid forcing novices to scan advanced features they do not need.

Source:
- https://www.nngroup.com/articles/progressive-disclosure/

Ben Shneiderman’s universal-usability work reaches a similar conclusion through multi-layer interfaces: novice users can begin with a limited first layer while expert users move upward to richer layers as needed.

Sources:
- https://www.cs.umd.edu/users/ben/goldenrules.html
- https://www.cs.umd.edu/users/ben/publications.html

### Critical Rivet rule

**Advanced does not mean disposable.**

If a feature is useful but cognitively expensive, Rivet should first attempt:

```text
KEEP + EXPLAIN
KEEP + GROUP
KEEP + HIDE ONE LEVEL DEEPER
KEEP + PRESET
KEEP + SAFE DEFAULT
```

before considering:

```text
DELETE
```

Deletion requires an explicit Product Packet `KILL` decision, not an implicit “simplification” edit.

### Ghost application

A novice Ghost surface can expose:

```text
Play
Stop
Save conversation
```

while advanced layers still contain:

```text
personas
workflows
AoA activators
roadmap/flow controls
skins
sound/notifications
export options
advanced diagnostics
```

The user should not have to see all of them to begin, but the product should not lose them merely to make the first screen simple.

---

## 3. Universal usability: novice and expert are both first-class users

Shneiderman’s Eight Golden Rules specifically call for universal usability across novice/expert differences, informative feedback, easy reversal, user control, and reduced short-term-memory load.

Source:
- https://www.cs.umd.edu/users/ben/goldenrules.html

Implications for Rivet:
- novice guidance and expert shortcuts may coexist;
- destructive or surprising state changes need reversal/recovery;
- a control should not silently change the behavior of another unrelated surface;
- users should not have to remember hidden state from another tab/screen;
- status must be visible and timely.

This directly supports keeping Ghost’s power-user options while making the default experience understandable to someone who has never used an AI automation tool.

---

## 4. Cognitive load: guide the novice rather than making them infer the system

John Sweller’s cognitive-load work emphasizes the limits of working-memory capacity and the stronger role of explicit guidance/feedback for novices learning unfamiliar material.

Sources:
- https://www.unsw.edu.au/newsroom/news/2019/12/i-had-an-idea-in-the-1980s-and-to-my-surprise--it-changed-educat
- https://doi.org/10.1207/s15516709cog1202_4

This should not be imported literally as an education model, but it provides a useful design warning: a novice interface should not require users to construct the operating model by trial and error.

### Rivet translation

For unfamiliar software:

- identify the action;
- explain the consequence in one short sentence;
- reveal the next decision only when relevant;
- show progress/stage when the task is staged;
- do not make users remember internal terminology or hidden state;
- do not require reading a manual before the first successful action.

---

## 5. Mental models: design around what people are trying to accomplish

Indi Young’s Mental Models / thinking-styles work maps people’s reasons, cognition, and purpose to what a product supports or fails to support. Her method is explicitly oriented toward finding gaps between how people approach a purpose and what the solution provides.

Sources:
- https://indiyoung.com/about-indi/
- https://indiyoung.com/books/

Implication for Rivet:
- product design cannot stop at “what button does the user click?”
- Rivet should model the user’s intended outcome and the assumptions they bring into the task.

### Ghost mental model example

A novice does not think:

```text
I need an API-first transcript acquisition route with DOM fallback semantics.
```

They think:

```text
I want to save this whole conversation.
```

The UI should therefore say:

```text
Save this conversation
```

and move implementation detail into optional technical details.

Likewise, `DOM partial` is an engineering label, not a user mental model. A novice-facing equivalent is:

```text
Page backup — older or collapsed messages may be missing.
```

---

## 6. Plain language and visible labels are accessibility, not cosmetic polish

W3C Cognitive Accessibility guidance repeatedly recommends clear, familiar language, conventional controls, visible labels, nearby instructions, and avoiding unexplained jargon or novel meanings.

Sources:
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p05-clear-controls/
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p06-clear-labels/
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o3p01-clear-words/
- https://www.w3.org/WAI/WCAG2/supplemental/objectives/o1-understandable/
- https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/

### Novice-language rule

Internal identifiers may exist in diagnostics, logs, code, and machine-readable exports.

They should not be the primary user-facing label when a plain-language equivalent exists.

Examples:

```text
COMPOSER-002          -> Could not verify the message before sending.
DOM partial           -> Page backup; some older/collapsed content may be missing.
API raw               -> Structured platform backup.
uncertain transaction -> Send was attempted, but Ghost could not confirm delivery.
```

Technical detail remains available under `Details` / `Copy diagnostic` for support and debugging.

---

## 7. Every control needs a purpose, consequence, and local explanation

W3C cognitive guidance says controls should be clearly identifiable, understandable, and usable, with instructions on the same page or one action away when the control is unfamiliar. It also recommends making the relationship between controls and the content they affect unambiguous.

Sources:
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p05-clear-controls/
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o1p06-control-actions/
- https://www.w3.org/WAI/WCAG2/supplemental/patterns/o4p07-step-instructions/

### Rivet UI acceptance pattern

For every non-obvious option, require:

```text
LABEL
one-sentence explanation in smaller typography
current state
what changes when toggled
```

This matches the Ghost requirement that Export, personas, agents, workflows, skins, sound, notifications, and other options be self-explanatory to a first-time user.

---

## 8. Status should explain state without stealing control

Nielsen’s heuristics emphasize visibility of system status and matching the real world; W3C status-message guidance requires important dynamic status to be available programmatically without unnecessarily moving focus.

Sources:
- https://www.nngroup.com/articles/ten-usability-heuristics/
- https://www.w3.org/WAI/WCAG21/Understanding/status-messages
- https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22

### Rivet status model

The user-facing state should answer:

```text
What is happening?
Did my last action work?
Do I need to do anything?
Can I safely stop/retry?
```

For Ghost, preferred public states are conceptually:

```text
Ready
Working
Waiting for AI
Paused — needs your choice
Stopped to prevent a duplicate
Complete
```

Diagnostic codes may appear beneath them, not replace them.

---

## 9. Mobile/touch is a first-class human-factors boundary

WCAG 2.2 requires minimum target sizing/spacing at Level AA and recommends larger targets for easier activation; mobile guidance also emphasizes reflow, single-pointer operation, and touch-target requirements.

Sources:
- https://www.w3.org/TR/WCAG22/
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced
- https://www.w3.org/TR/wcag2mobile-22/

### Rivet mobile rule

Important, frequent, destructive, or hard-to-reverse actions should use comfortably large targets rather than merely squeezing through the formal minimum.

A mobile-first product must also test:
- one-hand use;
- touch precision;
- no accidental adjacent activation;
- no nested/competing scroll regions where avoidable;
- no panel that obscures the host task;
- no desktop-only hover dependency;
- readable labels without forcing horizontal scanning.

This explains why Ghost’s old tiny committee control and screen-covering panel were product defects even if the underlying click handler technically worked.

---

## 10. The Novice Contract — new Rivet artifact

Before a release that exposes new/changed user-facing behavior, Rivet should emit:

```text
[NOVICE CONTRACT]
Primary user job:
First successful action:
Visible default controls:
What is hidden behind progressive disclosure:
What each visible control does:
One-line help required:
Current-state vocabulary:
Error/recovery vocabulary:
Reversible actions:
Irreversible/destructive actions:
Technical jargon hidden from default UI:
Expert shortcuts preserved:
Mobile/touch constraints:
Keyboard/assistive-tech requirements:
First-time-user proof:
Expert-user regression proof:
```

The Novice Contract does not replace accessibility review or user testing. It prevents a build from reaching review with an incoherent first-use model.

---

## 11. First-Time Path Test — proposed mandatory release check

A representative first-time user should be able to complete the primary task without external instructions.

The test should record whether they can:

1. identify what the product does;
2. identify the primary action;
3. understand what will happen before activating it;
4. recognize whether the action succeeded;
5. recover from the most likely failure;
6. find advanced options if they deliberately look for them;
7. complete the task on the smallest supported mobile surface.

If the evaluator must explain the interface, the path is not self-explanatory yet.

This is a release artifact, not merely a design opinion.

---

## 12. Expert Path Preservation — paired with the novice test

The opposite failure must also be tested.

After simplification, a prior expert/power user must still be able to access the accepted advanced capability unless the Product Packet explicitly killed it.

For Ghost this includes, when in scope:
- personas/custom persona selection;
- workflows/flows;
- AoA activators;
- export format and visible-thinking options;
- skins/theme preferences;
- sound/notifications;
- diagnostics;
- advanced roadmap/posture behavior.

This creates a paired gate:

```text
NOVICE PATH PASS
AND
EXPERT PATH PRESERVED
```

A release that passes only one side is incomplete.

---

## 13. Practitioner-method candidates for live Quorum sourcing

These are method sources, not permanent seats and not endorsements.

### Don Norman — human-centered systems
Method contribution:
- root problem vs symptom;
- people-first field observation;
- systems view;
- continual test/refine.

### Jakob Nielsen — usability heuristics / progressive disclosure
Method contribution:
- visibility of system status;
- user language over system jargon;
- user control/freedom;
- consistency;
- recognition over recall;
- progressive disclosure of advanced features.

### Ben Shneiderman — universal usability / layered interfaces
Method contribution:
- novice + expert support;
- informative feedback;
- reversal;
- user control;
- reduced memory load;
- multi-layer interface progression.

### Indi Young — problem-space mental models
Method contribution:
- understand reasons and internal cognition behind tasks;
- map solution support against people’s actual purpose;
- expose opportunity gaps rather than assuming the interface defines the problem.

### John Sweller — cognitive load
Method contribution:
- novice working-memory constraints;
- explicit guidance and feedback when schemas are not yet established.

### Steve Krug — lightweight usability testing
Method contribution:
- practical usability-test scripts/checklists for websites and mobile apps;
- test actual people rather than debating usability abstractly.

Source:
- https://sensible.com/download-files/

### W3C COGA / Accessibility Guidelines practitioners
Method contribution:
- clear words;
- clear labels/instructions;
- conventional controls;
- understandable relationships between controls and effects;
- cognitive and assistive-tech accessibility.

At run time, Rivet/Quorum must re-source the actual practitioner(s) appropriate to the specific decision instead of freezing this list.

---

## 14. Opposing method tensions Rivet should preserve

### Tension A — progressive disclosure vs immediate discoverability
Too much disclosure can hide useful capability; too much visible power overwhelms the novice.

Rivet response:
- put the highest-frequency/highest-value path first;
- keep advanced capability one predictable level away;
- test both novice discovery and expert access.

### Tension B — guided novice experience vs expert efficiency
Too much instruction slows experts; too little instruction strands novices.

Rivet response:
- concise local help;
- remember user choices;
- optional shortcuts;
- avoid repeated explanations after mastery.

### Tension C — plain language vs diagnostic precision
Support engineers need exact codes; novices need understandable outcomes.

Rivet response:
- two-layer language:
  - human state first;
  - machine/debug detail second.

### Tension D — consistency vs platform-native behavior
A perfectly identical UI across hosts can violate each platform’s conventions.

Rivet response:
- preserve conceptual consistency while allowing host-native control patterns when they reduce confusion/accessibility risk.

---

## 15. Candidate Rivet invariants added by Pass 3

1. **Simplification cannot silently delete accepted capability.**
2. **Progressive disclosure before removal.**
3. **Every non-obvious user control gets a nearby one-sentence explanation.**
4. **Human language first, diagnostic jargon second.**
5. **State must be visible, timely, and actionable.**
6. **Novice success and expert preservation are separate release gates.**
7. **Recognition beats recall for important settings/workflow state.**
8. **Important mobile controls must be comfortably tappable and separated.**
9. **No design is accepted solely from screenshots; actual interaction and assistive-tech semantics matter.**
10. **User testing evidence outranks the builder’s claim that the interface is obvious.**

---

## 16. Cleanerz auto-fire additions from Pass 3

Route to Cleanerz when any of these appear:

- “simplification” removes accepted features without an explicit Product Packet kill;
- internal diagnostic language reaches the normal user surface without translation;
- a novice needs support instructions to discover the primary task;
- the product gains more help text because the interaction itself keeps getting harder;
- the same advanced feature is removed and later re-added after operator complaints;
- mobile requires a different conceptual workflow rather than only responsive adaptation;
- every control is visible at once because the team is afraid to prioritize;
- advanced features are hidden so deeply that expert users cannot find them.

Cleanerz still owns the replan; Rivet only triggers it.

---

## 17. Pass-3 conclusion

Rivet should not optimize for “fewest controls.”

It should optimize for:

```text
FIRST SUCCESS IS OBVIOUS
ADVANCED POWER SURVIVES
STATUS IS UNDERSTANDABLE
RECOVERY IS SAFE
MOBILE IS OPERABLE
EXPERTS ARE NOT PUNISHED
```

The professional-method evidence strongly supports a layered product rather than a stripped product. For Ghost specifically, that means restoring rich prompt/workflow/persona/settings/export surfaces while keeping the core Play actuator mechanically simple.

## Pass 4 target

Next research pass: **verification, observability, analytics, privacy-preserving diagnostics, release evidence, real-device matrices, field canaries, guardrail metrics, and rollback criteria.**

The key question will be:

> What evidence should Rivet require before it is allowed to say “this works,” and what telemetry/diagnostics are sufficient to learn from failures without turning the product into a surveillance system?
