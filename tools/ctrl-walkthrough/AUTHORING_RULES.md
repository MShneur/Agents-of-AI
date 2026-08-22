# Control Walkthrough Authoring Rules

Control Walkthrough is for a user who may be tired, distracted, on a phone, or unfamiliar with the product being configured. A walkthrough should feel like GPS, not documentation.

## Prime directive

**One current task. One obvious action. One short reason. Automate everything safely automatable. Verify before moving on.**

Write as if the user does not know where menus live, what an admin panel is, or what a product-specific noun means.

## Required shape

For every walkthrough:

1. Start by saying **what we are doing** in plain language.
2. Say **which existing account** to use when that could be ambiguous.
3. Break the job into the smallest useful ordered steps.
4. Each step should normally contain a short title, one-sentence `why` when useful, one or two short sentences of instruction, and one primary action.
5. The engine shows the current step prominently and the next step faintly below it.
6. The full route is opened from the step counter, not shown permanently.
7. A step that can be completed and verified without the user should use autonomous mode.

If a step needs several independent actions, split it into several steps. The engine may run several safe steps in sequence without asking the user to press Next between them.

## Automation priority

Use this order:

1. **Stable direct HTTPS URL.** If a direct account-relative or product-relative URL reaches the exact page, use it instead of telling the user to hunt through menus.
2. **Safe automatic navigation click.** Use `action.type: click`, `safe: true`, and `auto: true` for exact reversible navigation controls.
3. **Safe automatic field fill.** Use `fill` for non-secret values and `fillSaved` for a value held in temporary local walkthrough memory. Filling never submits the form.
4. **Find/highlight.** Use when automatic clicking or filling cannot be proven safe.
5. **Manual instruction.** Use only when the provider requires a consequential user decision or the UI cannot be located reliably.

Do not add a manual Next button after a safe action when the engine can verify the result itself.

## Verify before advancing

Autonomous actions should normally have a success condition in `step.success` or `action.verify`.

Useful verification signals include:

- `urlIncludes` or `urlMatches` after navigation;
- an exact selector that appears only on the destination state;
- visible/ARIA/title text that uniquely identifies the expected state.

The engine persists a pending action across full page navigation, waits for the destination page or SPA update, verifies the expected state, and only then advances.

If verification fails, **stop on the current step**. Do not repeat a navigation action indefinitely and do not guess that it worked.

For dynamic UIs, allow time for the target to appear instead of declaring it missing immediately. `waitForTargetMs` and verification timeouts should be long enough for ordinary mobile loading without becoming an endless wait.

## Real interaction can advance the route

When the user must press a human-gated button, use `advanceOn` plus a real success condition when possible.

Example intent:

```json
{
  "humanGate": "You press the final Save button.",
  "advanceOn": {
    "event": "click",
    "target": {"text": ["Save"]}
  },
  "success": {"text": ["Saved"]}
}
```

Control Walkthrough does not click the consequential button. It observes the user's real click, verifies the resulting state, and proceeds automatically. The user should not also need to press a second "I've done this" control just to tell the walkthrough what it can already verify.

## Locator rules

Prefer stable selectors, accessibility labels, roles, and exact visible labels over brittle DOM ancestry or screen coordinates.

Provide several current mobile/desktop text candidates when the provider uses different labels at different breakpoints. The engine scores visible candidates and refuses to act when the best match is ambiguous.

A failed locator must never become "click the nearest-looking button." Fail closed, show the best verified fallback, and use the real-device screenshot/current provider docs to repair the adapter later.

## Human gates

Do not auto-click the final consequential control for:

- login, passkeys, MFA or CAPTCHA;
- OAuth/permission consent;
- legal terms;
- billing, trials, purchases or plan changes;
- final creation of a paid or persistent resource when the effect is not trivial;
- deployment, publication, release, deletion or destructive changes;
- account/security changes;
- token generation, rotation, revocation or reset.

Control Walkthrough may navigate to those controls, fill safe prerequisite fields, highlight the final control, observe the user's real click, and verify the result afterward.

## Secrets and API keys

Never place a real password, API key, bearer token, SSH/private key, recovery code or cookie in:

- Agents of AI;
- Personal Forge walkthrough JSON;
- a CWZ2/CW2 code;
- chat;
- a URL;
- screenshots/logs.

When a temporary secret is needed, the engine can generate or capture it into **temporary Tampermonkey-local walkthrough memory**. It can later `copySaved` or `fillSaved` the same value so the user does not have to remember it.

This storage is convenience memory, not an encrypted password manager. Long-term credentials belong in the provider/server secret store. Temporary local values are cleared when the walkthrough ends/completes.

## Files and helper scripts

Do not introduce a helper script before the user actually needs it. Put downloads next to the step that immediately uses them and state exactly where the file goes next.

## Mobile UI rule

The mobile interface is an edge rail, not a bottom sheet that covers fields:

- default to a slim left/right rail;
- move to the opposite side of a highlighted target when possible;
- show `🧭 Control Walkthrough`, version/guide count, and route counter in one compact header;
- tapping the route counter opens the full scrollable route;
- minimize to the tiny edge pill;
- keep uncommon controls behind the menu;
- never make the walkthrough occupy most of the phone screen unless the user explicitly expands it.

Mobile and desktop are separate provider UI breakpoints for locator purposes. Do not assume a desktop sidebar label or menu state exists on mobile.

## Iframes

Do not make iframes the core navigation model. Many provider dashboards, authentication screens and OAuth/security flows block framing with CSP/frame-ancestor policies or behave differently inside frames.

Use normal provider pages plus Tampermonkey-persisted walkthrough state. The edge rail keeps continuity without depending on iframe support.

## Plain-language test

Before publishing a walkthrough, ask:

> Could a tired person who has never used this product follow the current step without understanding our architecture?

Replace unexplained product nouns on first use. For example, do not write only `Open Worker`; write `Open Cloudflare Workers — a Worker is the small Cloudflare program that will run our upload helper.`

## Live UI correction rule

Real-device screenshots and current provider documentation outrank stale walkthrough labels or remembered desktop navigation.

When a locator fails:

1. inspect what is actually visible on that device/breakpoint;
2. research the current provider UI and stable deep links;
3. give the user the immediate current route so the task can continue;
4. record the corrected locator/deep link for future walkthroughs;
5. do not force the user to restart the whole walkthrough merely to continue the current task.

## Verification rule

A walkthrough may simplify the instructions, but it must not simplify away the proof.

A successful navigation click, green dashboard, HTTP 202, or intermediate save is not proof of an end-to-end system when the actual completion condition is downstream. The final step must state and verify the real completion condition.