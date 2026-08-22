# CTRL Walkthrough Authoring Rules

CTRL is for a user who may be tired, distracted, on a phone, or unfamiliar with the product being configured. A walkthrough should feel like GPS, not documentation.

## Prime directive

**One current task. One obvious action. One short reason. Show only what is needed now.**

Write as if the user does not know where menus live, what an admin panel is, or why a tool is being opened.

## Required shape

For every walkthrough:

1. Start by saying **what we are doing** in plain language.
2. Say **which existing account** to use when that could be ambiguous.
3. Break the job into the smallest useful ordered steps.
4. Each step should normally contain:
   - a short title;
   - one-sentence `why` when the reason is not obvious;
   - one or two short sentences of instruction;
   - one primary action.
5. The engine shows the current step prominently and the next step faintly below it.
6. The full route belongs behind **Steps**, not in the normal current-step view.

If a step needs several independent actions, split it into several steps.

## Prefer doing over explaining

Use this priority:

1. **Direct URL** — if a stable HTTPS URL reaches the exact page, use it. Do not tell the user to hunt through menus first.
2. **Safe auto-click** — when the exact visible control can be identified and clicking it is only navigation/reversible setup movement, use `action.type: click` with `safe: true`.
3. **Find/highlight** — if clicking is not safe or the UI is less predictable, locate and highlight the control.
4. **Manual instruction** — only when CTRL cannot reliably navigate or identify the control.

If automation cannot find the exact target, fail closed. Say what could not be found and let the user do that one step manually. Never guess a nearby button.

## Human gates

Do not auto-click the final consequential control for:

- login, passkeys, MFA or CAPTCHA;
- OAuth/permission consent;
- legal terms;
- billing, trials, purchases or plan changes;
- final creation of a paid or persistent resource when the effect is not trivial;
- deployment, publication, release, deletion or destructive changes;
- account/security changes.

CTRL may navigate to those controls and highlight them. The user performs the final consequential action.

## Secrets and API keys

Never place a real password, API key, bearer token, SSH/private key, recovery code or cookie in:

- Agents of AI;
- Personal Forge walkthrough JSON;
- a CWZ2/CW2 code;
- chat;
- a URL;
- screenshots/logs.

When a temporary secret is needed during a walkthrough, v0.4+ can generate or capture it into **temporary Tampermonkey-local walkthrough memory**. That value is not sent to the walkthrough source or synced to GitHub. It is cleared when the walkthrough ends/completes.

Treat that local storage as convenience storage, not an encrypted password manager. Long-term credentials belong in the provider/server secret store.

## Files and helper scripts

Do not introduce a helper script before the user actually needs it.

Bad:

> Step 2: download a smoke-test script that will be used much later.

Good:

> Near the verification step: download the smoke-test file, then immediately upload/run it where required.

When a file is required, prefer an explicit **Download** action or a clearly labeled prepared source. Tell the user exactly where the file goes next.

## Mobile UI rule

Normal mobile mode is a small navigation HUD, not a full application:

- current step only;
- one main orange action;
- optional short `Why:` line;
- faint `Next:` preview;
- **Steps** opens the scrollable full route;
- `-` minimizes back to the tiny `CW n/N` pill;
- `^` temporarily expands when more room is genuinely needed.

Do not keep a large panel open across unrelated browsing. Progress persists, but the interface should get out of the way.

## Iframes

Do not make iframes the core navigation model. Many provider dashboards, authentication screens and OAuth/security flows block framing with CSP / frame-ancestor policies or behave differently inside frames.

Use normal provider pages/tabs plus Tampermonkey-persisted walkthrough state. This is less visually contained but materially more reliable.

## Plain-language test

Before publishing a walkthrough, ask:

> Could a tired person who has never used this product follow the current step without understanding our architecture?

If not, rewrite or split the step.

Replace phrases such as:

- "go to the admin panel" -> direct URL or "Open Admin" button;
- "configure ingress" -> "Open the upload Worker";
- "provision an R2 binding" -> "Add the R2 bucket named UPLOADS";
- "execute the smoke test" -> "Download this file, upload it to Oracle, then press Run."

Internal architecture can be available in advanced/project documentation. It should not be required knowledge for the ordinary walkthrough.

## Verification rule

A walkthrough may simplify the instructions, but it must not simplify away the proof.

State the real completion condition at the final step. A successful navigation click, green dashboard, HTTP 202, or intermediate save is not proof of an end-to-end system when the actual completion condition is downstream.