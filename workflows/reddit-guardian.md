---
id: reddit-guardian
type: workflow
purpose: Review Reddit-bound writing against current community rules, sitewide policy, thread context, and available activity evidence; produce an authentic draft or a reasoned hold.
steps: 7
agents_used: [scout, scribe, auditor]
personas_used: [provenance, mirror, distiller]
confidence: EXPERIMENTAL
version: "1.0"
tags: [reddit, moderation, community, writing, ghostwriting, appeals, spam, authenticity]
compatible_with: [any-ai]
---

# Reddit Guardian

**Form:** Reddit-specific prepublication workflow, not a second general ghostwriter, moderation-bypass mechanism, Reddit classifier, or system-wide governance policy.

## Purpose and routing

Use when drafting, reviewing, or rewriting posts, titles, comments, replies, moderator messages, ban appeals, educational resources, or community notices **for Reddit**. Compose with the existing [Scribe](../agents/scribe.md) Public Post profile; use Scout for policy evidence and Auditor/Mirror for a skeptical community-context review. Use Distiller for brevity without creating repetitive templates.

Inputs may include draft/idea, destination subreddit, thread, source links, screenshots, disclosure interests, account restriction status, and character limit. Ask for missing information only when it changes a material eligibility or compliance finding.

## Seven steps

### 1. Scope and account state (Scribe + Provenance)

Identify destination, author intent, content type, audience, and what account/distribution history is actually known. Separate screenshots and firsthand user statements from independently checked policies. An account restriction, if known, must inform recommendations: prepare appeals or drafts while restricted, not alternate-account posting routes.

**Done:** channel, purpose, limitations, and known/unknown activity evidence are explicit.

### 2. Sitewide and community rules (Scout + Provenance)

When access permits, read current [Reddit Rules](https://redditinc.com/policies/reddit-rules), [Spam guidance](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam), [Disrupting Communities](https://support.reddithelp.com/hc/en-us/articles/360043066412-Disrupting-Communities), and the target subreddit's posted rules or current pinned moderator updates. Inspect flair, title templates, megathread requirements, karma/account eligibility, link/promotion restrictions, and whether AI assistance is prohibited. Treat community-specific "90/10" promotion guidance as local, not a universal sitewide exemption. AutoModerator examples reveal possible checks, not the private rule configuration for a target subreddit.

If community rules are inaccessible, label them **UNKNOWN**. Never invent the hidden reason a post was removed.

**Done:** applicable sourced restrictions, explicit unknowns, and source date are recorded.

### 3. Relevance and truth floor (Scribe + Provenance)

Determine whether the contribution directly answers the thread or fits the community. Keep technical claims, first-person experience, affiliations, offer eligibility, and quotations evidence-grounded. Avoid false credentials, undisclosed material relationships, fabricated testing, sales pitches posing as advice, or framing uncertainty as fact.

**Done:** supported intent and claims survive; unsupported claims are corrected or held.

### 4. Behavioral and distribution review (Auditor + Mirror)

Review the *available* account/distribution context independently of wording: substantially repeated posts across communities, repeated low-value replies, unsolicited chats/invitations, affiliate/referral links, mass promotion, link shorteners, and ban or enforcement history. Do not invent account-history access or secret spam-score thresholds.

Related posts can be legitimate when they seek materially different answers relevant to each destination; cosmetic paraphrasing is not a substitute for a distinct substantive purpose.

**Done:** content risks and activity risks are separately recorded as observed, suspected, or UNKNOWN.

### 5. Context-native ghostwriting (Scribe + Distiller)

Preserve the user's actual meaning and legitimate dissent. Match the thread's terminology, length, and natural conversational register. Use measured, professional "manager-speak" *when useful* to remove gratuitous accusation, combative phrasing, or unsupported absolutes; otherwise keep ordinary Reddit voice. Avoid repeated AI-style introductions, promotional endings, rigid structures, and forced slang. Never promise that a rewritten phrase will bypass automated moderation.

**Done:** complete draft reads as helpful discussion and is appropriately specific.

### 6. Skeptical moderator review (Auditor + Mirror)

Ask whether a reasonable moderator could identify an actual rule conflict: off-topic content, prohibited AI assistance, spam/distribution patterns, disguised promotion, fabricated expertise, community manipulation, or ban evasion. If a subreddit prohibits AI-generated or AI-edited submissions, do **not** supply ready-to-post writing for that subreddit; provide policy analysis or non-submission factual guidance instead. Resolve fixable concerns by revising the full draft, not hiding prohibited behavior.

This is **one-model internal critique** unless real independent reviewers/tools participated.

**Done:** each material objection is fixed, explicitly unknown, or causes a hold.

### 7. Release recommendation and response (Scribe)

Return the ready-to-use draft in the requested format with a short caveat only when consequential. Count exact character limits including spaces. Use:
- **READY:** no identified rule conflict in checked material; never guaranteed approval.
- **REVISE:** a correctable content/context issue; rewrite then recheck.
- **HOLD:** known publishing restriction or substantive prohibition; explain the legitimate alternative.
- **UNKNOWN:** current subreddit rules or relevant behavior evidence are missing; do not certify publication safety.

For appeals, name the known action/policy, give concise good-faith context, and request manual review. Do not assert that an automated system caused a mistake unless evidence establishes that conclusion.

**Done:** the user receives either a complete defensible draft or a specific blocker and permitted next action.

## Example — technical post

> I need independent outbound IPs for different Linux browser sessions. Is per-app SOCKS5 easier to maintain than multiple WireGuard interfaces? I'm interested in reliability and routing trade-offs.

Check that this actually reflects the user's question and the target subreddit's rules. No wording style can guarantee approval.

## Source notes and limitations

Read [Reddit moderation research notes](../origin/research/reddit-guardian-moderation-notes-2026-10-20.md) when policy or implementation nuance is important. That register is a curated selection, not a model of Reddit's private enforcement. Local subreddit policy must be checked afresh at publication time.

**Distinct from Scribe:** Scribe constructs truthful writing; Reddit Guardian sequences platform/community rule checks, distribution context, ghostwriting, and skeptical moderator assessment for Reddit specifically.
