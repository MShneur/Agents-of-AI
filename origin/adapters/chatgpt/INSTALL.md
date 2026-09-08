# Installation / Use

Product compatibility checked against OpenAI documentation on 2026-09-07.

## Eligible ChatGPT workspace with Skills

Use the package beginning at `skill/SKILL.md`. Current OpenAI documentation exposes Skills under Plugins -> Skills for eligible workspaces and supports upload from a computer.

## Workspace Agents

Use `agent/AGENT-INSTRUCTIONS.md` as the agent definition, attach `origin-protocol` as a Skill when available, and add only the files/tools the agent actually needs.

## Personal plan / ordinary chat reference

If installable Skills or Workspace Agents are not available, upload `ORIGIN_CHATGPT_REFERENCE.md` to the chat and instruct ChatGPT:

`Use the uploaded Origin reference as the operating protocol for this task.`

That is a file-reference workflow, not an installed Skill or Workspace Agent.

## Repository-aware use

If the chat can access the user's repositories, it must read canonical `AGENTS.md`, `ECOSYSTEM.md`, and current handoff/control files before assuming roles. Repository truth supersedes this adapter if they conflict.

## Security

Review a Skill before installation. This adapter contains no executable scripts and grants no tool authority, credential access, deployment, publication, purchasing, or destructive action.
