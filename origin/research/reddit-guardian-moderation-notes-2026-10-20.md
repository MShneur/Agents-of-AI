# Reddit Guardian — Public Moderation and Research Notes

**Compiled:** 2026-10-20. **Scope:** curated primary sources and illustrative public implementations. This is not an exhaustive inventory or proof of Reddit's private account-level classifiers. Check live rules for every subreddit and at publication time.

## Official policy sources

1. [Reddit Rules](https://redditinc.com/policies/reddit-rules) — sitewide rules, especially authentic participation, community rules, and disruption.
2. [Spam](https://support.reddithelp.com/hc/en-us/articles/360043504051-Spam) — repeated, unsolicited, low-value, or promotional behavior.
3. [Disrupting Communities](https://support.reddithelp.com/hc/en-us/articles/360043066412-Disrupting-Communities) — community interference and relevant examples.
4. [Full AutoModerator documentation](https://support.reddithelp.com/hc/en-us/articles/52866343172500-Full-automoderator-documentation) — publicly described rule conditions, not a target community's active configuration.
5. [Writing basic AutoModerator rules](https://support.reddithelp.com/hc/en-us/articles/52865423682452-Writing-basic-automoderator-rules) — examples for subreddit-controlled filters.
6. [Post and Comment Guidance](https://support.reddithelp.com/hc/en-us/articles/17625458521748-Automations-Post-Comment-Guidance-Set-Up) — community-configured guidance, not publication certification.
7. [How do I keep spam out of my community?](https://support.reddithelp.com/hc/en-us/articles/28012014962580-How-do-I-keep-spam-out-of-my-community) — reputation controls and community-specific promotional preferences.
8. [Poster Eligibility Guide](https://support.reddithelp.com/hc/en-us/articles/33702751586836-Poster-Eligibility-Guide-Post-Check) — account/post eligibility and guidance.
9. [Account ban appeals](https://support.reddithelp.com/hc/en-us/articles/360045734911-My-account-was-banned-for-spam-inauthentic-activity-or-ban-evasion) — official restriction and appeal route.
10. [Reddiquette](https://support.reddithelp.com/hc/en-us/articles/205926439-Reddiquette) — advisory community participation norms.

## Public repository examples (not Reddit's private enforcement engine)

- [Archived Reddit AutoModerator component](https://github.com/reddit-archive/reddit/blob/master/r2/r2/lib/automoderator.py): historical, not authoritative for the current stack.
- [AutoModerator example rules](https://github.com/KanchiMoe/Reddit-AutoModerator-rules): regex/rule examples, not proof of any target subreddit's setup.
- [ContextMod](https://github.com/FoxxMD/context-mod): history-aware community moderation patterns.
- [ContextMod Devvit](https://github.com/StephenSook/context-mod-devvit): configurable community-level conditional controls.
- [Automod Neo](https://github.com/fsvreddit/automod-neo): alternative community rule engine.
- [Stickler](https://github.com/numemac/stickler-bot): semantic moderation triage patterns.
- [AutoModLab](https://developers.reddit.com/apps/automodlab): moderation false-positive / false-negative testing patterns.

These third-party sources show *possible kinds of moderation logic*; they do not reveal or predict Reddit admin enforcement of a given user.

## Reusable lessons

- **Content ≠ activity ≠ account standing.** A helpful individual post cannot establish that a whole account or distribution pattern will be treated as compliant.
- **Subreddit rules vary.** AI-writing restrictions, promotion policies, flair, age and karma requirements, and duplicate-post standards are community-specific.
- **No magic bypass wording.** A neutral professional tone can reduce accidental antagonism; it does not legitimize prohibited activity or overcome private platform classifiers.
- **Causal discipline.** Removal, filtering, moderator action, and Reddit-admin suspensions are distinct. If evidence of enforcement cause is missing, root cause is UNKNOWN.
- **Respect restrictions.** No alternate-account ban evasion, covert advertising, impersonation, automated mass-posting instructions, or hiding prohibited AI assistance.
- **Source freshness.** Official pages have priority; examples from repositories and discussions are only interpretive context.

## Review limits

The four official links in the first group (Rules, Spam, Disrupting Communities, AutoModerator documentation) were re-opened on 2026-10-20. Other references are a curated carryover from the standalone Reddit Guardian research package; their full current text was not independently rechecked in this AoA integration. The existence of third-party rule engines is not evidence that a particular Reddit account was scored or banned by them.
