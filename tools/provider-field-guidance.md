# Provider Field Guidance — novice/mobile exact-value protocol

**Status:** Public reusable supporting-tool method, not an eighth Agents-of-AI composable layer. **Verified against official documentation:** 2026-10-20. This protocol covers form setup on websites/apps when the operator sends screenshots or browser HTML and requests exact field values and tap-by-tap instructions. Use alongside [Control Walkthrough authoring rules](https://github.com/MShneur/Ctrl-Walkthrough/blob/main/AUTHORING_RULES.md), not as a replacement for its runtime.

## Trigger / user intent

Activate when the operator says "for dummies", "tell me exactly what to enter", "copy-paste code boxes", "what fields?", "where do I tap?", or shares an image/saved page while doing cloud/DNS/API/security/account setup. The intent is **finish the visible form safely and quickly**, not read a general tutorial. The expected output is location-aware, value-accurate guidance for the **current screen** with minimal context-switching.

## PRECHECK before instructing

1. **Inspect any existing uploaded provider HTML, screenshots, exported configuration, or captured page first**. If a saved HTML is available, read/search the actual entire file for the required value(s), identify its saved URL/screen stage, and classify extracted values by their role BEFORE asking for another screenshot. Treat older uploads as proof of what appeared on *that captured page*, not current account state. When two artifacts disagree, use their timestamps/page stage; explain the difference. Then **identify the current provider + current screen** from the screenshot, current URL or uploaded page, and the last verified step; identify field labels, option values, active toggle state, and exact Save/Continue control. Never call the user "on step 3" if the screenshot is on a different step.
2. **Research the provider's current official help documentation** for the exact route, field semantics, plans, verification, and side effects. Prefer current provider docs, then observed live UI; do not infer account-specific fields from an evergreen FAQ.
3. **Classify every necessary value** as: (a) safe public constant verified from official provider, (b) user-supplied and visible in this conversation, (c) account-/domain-assigned value that must be copied from the provider's authenticated UI, (d) secret/credential, or (e) unknown. Crucial: being *form-shaped* does NOT make a value knowable.
4. **Check dependencies before irreversible effects.** DNS changes can interrupt web/email services; importing a DNS zone is not equivalent to verifying every record. Account grants, DNS changes, MFA resets, payment, subscriptions, publishing and provider mutation are human gates. Never request passwords, tokens, cookies or recovery codes in chat or shared screenshots. Guide secure provider-native entry/OAuth.
5. **Use provider-specific screen wording** and mobile navigation (browser tab, back, scroll, menu location, copy, paste). Do not cite an outdated desktop menu as mobile fact; provide an alternate **if actually documented**.

## Answer shape: action, fields, verify

- Begin with one sentence: **"You're on [observed screen]. [Known selected setting] is correct. Do not save until [missing required input]."**
- For **each visible field**, give the exact label and one action: SET / KEEP / CLEAR / DO NOT TOUCH / WAIT FOR VERIFIED VALUE. A compact ordered list is preferable on a phone.
- **Copy-paste code boxes** are REQUIRED for user-requested exact copy values, **but only when the value is fully verified** and contains precisely the intended input, without quotes, Markdown labels, explanatory text, placeholders, commas, or trailing filler. Use one short fenced text block per separate field. Preserve case/punctuation exactly. If the value is unknown, **do not emit a fake or example block**: explain where to retrieve the value and ask for one tightly scoped screenshot (or the non-secret values) and promise to return fully populated copy boxes.
- Never put generic examples into copy/paste blocks. Explicitly distinguish instructional examples outside blocks if they are genuinely useful. Do not use `[paste here]`, `<your-value>`, `ns1.example.com`, or invented domain-specific nameservers as if ready to paste.
- Don't re-teach steps the user has already completed. One or two **next actions** per reply; hold the remaining route until the next screen.
- Label any consequential action ("Tap the green checkmark to save both nameservers") and what to verify afterward ("Cloudflare zone Active"), including normal propagation time and a safe troubleshooting source.
- Verify provider-side state (saved confirmation or status) before declaring COMPLETE; distinguish **INPUT_ENTERED**, **SAVED**, **PROPAGATING**, **ACTIVE** and **UNKNOWN**. Avoid suggesting a full public website is hosted merely because DNS is active.


## COMPLETION-FIRST: current screenshots override old pending steps

When the operator says **"I already did it"**, the current screenshot shows the requested values entered, or the provider reports a saved/active state, **immediately stop teaching the earlier step**. Compare the newest screenshot with provider-assigned settings. Reply with the observed completion level (`VALUES_ENTERED` vs `SAVED` vs `PROVIDER_ACTIVE`) and only the one genuinely remaining check. Example: a registrar screenshot with both Cloudflare nameserver hostnames under `Custom DNS`, with no unsaved green-check editing controls, supports **registrar values entered/displayed**, but only the Cloudflare dashboard `Active` status or a live delegation check proves Cloudflare activation. Do not say to press "Continue to activation" on a previous Cloudflare screenshot when a newer registrar screenshot already proves the values have been entered. If the user shifts to an adjacent capability request ("Should we connect a Worker for our AI?"), answer the **new question** rather than redirecting to DNS setup. `No Workers connected` on a DNS page is not an error and is not a prerequisite for AI access. Consider Cloudflare's existing authorized remote MCP at `https://mcp.cloudflare.com/mcp` in compatible AI clients before suggesting building or deploying another Worker; verify account capabilities and OAuth scopes and never promise an arbitrary ChatGPT dot supports generic MCP.

## EXTRACT FIRST: existing-artifact evidence ladder

**This is a correction to the original protocol.** A complete HTML upload is an available evidence source. Asking the user to find or screenshot values that can already be extracted is a protocol failure; guessing values that are NOT present is equally a failure.

**Priority:**
1. Current message image(s) **plus** previous uploaded page/HTML/config/export that could contain requested values. Search the full uploaded file, not just preview/snippet text, and parse displayed value/context. Example: a saved SingleFile HTML may be about 1 MB but one very long line; a 30-line preview may not contain all fields.
2. Existing authenticated tool/browser DOM when approved and connected: focus current URL + visible field labels/roles and assigned values. Follow **Microsoft Playwright** `getByRole` / `getByLabel` semantics for identifying the actual field, NOT arbitrary text matches. Reference: https://github.com/microsoft/playwright/blob/main/docs/src/locators.md .
3. Explicit typed `extract -> validate -> observe` concept from **Stagehand** https://github.com/browserbase/stagehand : return *a structured value plus its evidence and field role*, distinguish uncertain candidates and require current-screen evidence. **ASSIMILATE the pattern only**, do not install Stagehand, call a paid browser service, or hand private HTML to an outside AI. Its untrusted model output is not itself a DNS assignment.
4. **Control Walkthrough** existing first-party system https://github.com/MShneur/Ctrl-Walkthrough : mobile one-task/one-action guide, deep-link then exact locator, optional safe fill but never auto-submit consequential steps. This is the owned user-interface runtime. Avoid starting a parallel walkthrough engine.
5. When direct source extraction genuinely fails, tell the user exactly which captured page was inspected and which value category was found versus missing; give one click or exact page to expose it. **Request only the NEXT relevant screen**, not a repeat of a page already parsed.

### Working CLI: not just a prose promise

`python3 tools/scripts/provider_field_evidence.py saved_page.html` reads a local saved HTML **offline**, prints JSON with `cloudflare_nameservers`, `status`, `on_scanned_records_page`, and a next action. It **never reads login cookies or calls an API**. It deliberately ignores IP/CNAME/A/MX records as candidates for the registrar's Nameserver 1/2 boxes; accepts a Cloudflare pair only when exactly two distinct `*.ns.cloudflare.com` names appear near an assignment label on an appropriate page. If the file is a Cloudflare `/confirm-scanned-records` page, an NS record in its import table is **not an assigned delegation**. If two names are merely mentioned in a script or example text, status stays UNVERIFIED. This is a **preliminary offline classifier**; the current provider screen remains the final evidence for copy-paste and any Save action remains with the user.

Source + unit tests:
- `tools/scripts/provider_field_evidence.py`
- `tools/scripts/test_provider_field_evidence.py`
- `python3 -m unittest discover -s tools/scripts -p 'test_provider_field_evidence.py' -v`
- Script exits 0 when it finds two labeled hostnames requiring current-screen corroboration, 2 when no ready pair. Nonzero is not a runtime failure and no output is a DNS save.

### Error-recovery contract

If a user says "you already have the HTML" or "why are you sending me around?", **stop and inspect the attached file**. Then either:
- **HAS_PAIR:** reply "Nameserver 1 says [verified exact host]" and one clean code block, same for Nameserver 2; note the current provider assignment must agree before saving.
- **EARLIER_STAGE:** reply "Your saved page is *Confirm scanned DNS records*; it shows A/CNAME/MX records, not the assigned Cloudflare nameservers. Continue to activation. Then I can copy them." No fake boxes. The user's registrar screen with empty Nameserver 1 and Nameserver 2 fields is not the Cloudflare assignment source.
- **NEEDS_CORROBORATION:** distinguish `NS` record(s) and documentation examples from the provider's authoritative delegated pair; request one screenshot centered on the assignment panel.
- **NO_SOURCE:** ask for the one relevant screenshot/HTML, not a large provider tour.

Never interpret `192.0.2.1`, a provider parking host, or a copied TXT/MX/CNAME as a nameserver merely because it is under a "DNS" heading. Public example domains and documentation URLs are not valid account-specific inputs. Never emit personally identifying source URLs, account IDs, filenames or live domain names into the public AoA repo.

### Independent evidence test vs claims

The local unit tests include a captured DNS import page, adversarial NS records on that import page, lone/unlabeled hostnames, script-only values, case/period normalization, and leak-check. A unit pass proves the parser's synthetic scenarios, NOT the account's present state or a completed nameserver change. For screenshot-only cases, manual visual extraction is preferable to speculative or repeated OCR; do not infer characters from a clipped image.

## Grounded two-provider case: Cloudflare nameservers -> Namecheap Custom DNS

**Sources checked 2026-10-20**:
- Cloudflare [Full setup: change your nameservers](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/) and [stuck pending nameservers](https://developers.cloudflare.com/dns/zone-setups/troubleshooting/pending-nameservers/): each standard zone is assigned its own two Cloudflare nameservers, visible on that zone's **Overview** screen. Copy the exact strings; do not guess or reuse from another zone.
- Namecheap [How to Change DNS For a Domain](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/): **Domain List -> Manage -> Nameservers -> Custom DNS -> Nameserver 1 and Nameserver 2 -> green checkmark**. Enter nameserver *hostnames*, not IP addresses, with no `https://` and no spaces.
- Cloudflare [Get started](https://developers.cloudflare.com/dns/get-started/): review existing DNS and mail records BEFORE changing nameservers; the scan may be incomplete. Changing nameservers does not automatically configure website hosting.

**Example scenario without private details:**
1. User screenshot already shows `Custom DNS` selected, Nameserver 1 and 2 EMPTY, green save checkmark visible.
2. Correct response: "Custom DNS is right. Leave this tab open; return to Cloudflare -> your domain -> Overview -> copy both assigned nameservers. They are not in your screenshot, so I cannot put exact values into a copy box. Send a screenshot showing only the assigned hostnames (no account/email/token)."
3. Once both real hostnames are supplied, return exactly two separate plain-code copy blocks, each containing **only the respective real hostname**, then direct user to paste box 1/2 and tap the green Namecheap checkmark; return to Cloudflare for zone verification.
4. No unrelated Cloudflare services (Workers, R2, PremiumDNS, tunnels, hosting) should be pushed during this simple DNS delegation task. Do not confuse Namecheap's `Personal DNS Server` feature with the `Custom DNS` registrar nameserver selector.

## Anti-patterns / mandatory recheck

- DON'T: say "paste the following" then show invented fake nameservers.
- DON'T: display a whole completed-looking form when the provider-assigned values are not in evidence.
- DON'T: repeat already-done setup or skip the exact current screen.
- DON'T: recommend paid plans or PremiumDNS when DNS delegation on a free plan meets the goal.
- DON'T: imply imported registrar parking/MX/forwarding records are working after delegation without confirming the receiving provider's email routing.
- DON'T: imply a screenshot of field entry proves saved, published, or globally propagated DNS.
- DON'T: disclose personal registration names, actual domains, account IDs or dashboard URLs in a public Agents-of-AI change.
- DO: admit the missing value precisely, show the shortest official retrieval path, and await one screenshot while continuing any unrelated safe verification off-screen.

## Acceptance check for authors/assistants

```text
[ ] Current mobile screen/field names match the user's actual image.
[ ] Official provider docs and observed UI were checked (date and relevant URL).
[ ] Each field is labeled SET / KEEP / CLEAR / WAIT / DO NOT TOUCH.
[ ] No invented or placeholder data appears inside ready-to-paste code blocks.
[ ] Exact per-account values originate only from user's visible/provider-authorized source.
[ ] Human save/billing/account gates stay with the user.
[ ] Success state is independently observed (not assumed from pressing a button).
[ ] User sees only the next actionable step; technical detail stays out of the way.
```

**Scope:** Public guidance pattern only. Account-specific values remain in the private support conversation/provider dashboard. This protocol does not authorize access to a third-party account or mutate a provider.
