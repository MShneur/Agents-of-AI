# 🧭 Control Walkthrough has moved

Control Walkthrough started here while its engine, schema, handoff format, and novice-first UX were being proven.

It now has its own public home:

**https://github.com/MShneur/Ctrl-Walkthrough**

Current engine: **v0.5.1**.

The copy of `ctrl-walkthrough.user.js` in this folder is retained as a **migration bridge for existing Tampermonkey installs**. Its `@updateURL`, `@downloadURL`, and canonical manifest now point to the standalone repository, so an existing install can move forward without losing its browser-local state.

New development, documentation, public modules, authoring rules, changelog, and security guidance belong in the standalone repository.

## Public-safety boundary

This folder and the new repository are public. Never commit passwords, API keys, bearer tokens, PATs, OAuth secrets, cookies, SSH/private keys, recovery codes, private hosts/IPs, account identifiers, personal/private project data, billing information, or screenshots containing private account state.

CWZ2/CW2 are encodings, **not encryption**. Deleting a committed secret later does not make the original public history private.

For current guidance, see:

- [Control Walkthrough README](https://github.com/MShneur/Ctrl-Walkthrough)
- [Authoring rules](https://github.com/MShneur/Ctrl-Walkthrough/blob/main/AUTHORING_RULES.md)
- [AI handoff protocol](https://github.com/MShneur/Ctrl-Walkthrough/blob/main/AI_HANDOFF_PROTOCOL.md)
- [Security policy](https://github.com/MShneur/Ctrl-Walkthrough/blob/main/SECURITY.md)
- [Changelog](https://github.com/MShneur/Ctrl-Walkthrough/blob/main/CHANGELOG.md)

---

## The AI Duct Tape Collection

- **[CTRL-AI](https://github.com/MShneur/CTRL-AI)** — governance: evidence, dissent, uncertainty, and behavioral rules.
- **[Agents of AI](https://github.com/MShneur/Agents-of-AI)** — reusable agents, personas, workflows, teams, techniques, and failure modes.
- **[R-Duck](https://github.com/MShneur/R-Duck)** — turns fuzzy intent into structured autonomous work.
- **[Ghost in the Loop](https://github.com/MShneur/ghost-in-the-loop)** — moves/export work between AI sessions without dropping context.
- **[CTRL-FORGE](https://github.com/MShneur/ctrl-forge)** — durable memory/control state when the chat window is not enough.
- **[Control Walkthrough](https://github.com/MShneur/Ctrl-Walkthrough)** — guide, click, fill, verify, and get out of the way.
