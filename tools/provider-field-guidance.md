# Provider Field Guidance — novice/mobile exact-value protocol

**Status:** Public reusable supporting-tool method, not an eighth Agents-of-AI composable layer. **Verified against official documentation:** 2026-10-20. This protocol covers form setup on websites/apps when the operator sends screenshots or browser HTML and requests exact field values and tap-by-tap instructions. Use alongside [Control Walkthrough authoring rules](https://github.com/MShneur/Ctrl-Walkthrough/blob/main/AUTHORING_RULES.md), not as a replacement for its runtime.

## Trigger / user intent

Activate when the operator says "for dummies", "tell me exactly what to enter", "copy-paste code boxes", "what fields?", "where do I tap?", or shares an image/saved page while doing cloud/DNS/API/security/account setup. The intent is **finish the visible form safely and quickly**, not read a general tutorial. The expected output is location-aware, value-accurate guidance for the **current screen** with minimal context-switching.

## PRECHECK before instructing

1. **Identify the current provider + current screen** from the screenshot, current URL or uploaded page, and the last verified step; identify field labels, option values, active toggle state, and exact Save/Continue control. Never call the user "on step 3" if the screenshot is on a different step.
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
