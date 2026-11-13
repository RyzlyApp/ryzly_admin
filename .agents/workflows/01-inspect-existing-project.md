# Workflow: inspect existing project (READ-ONLY)

Use this workflow before any implementation task in an existing project.

## User request

[Describe the requested feature or UI change.]

## Constraints

- Follow root `AGENTS.md` and workspace rules.
- Read-only inspection only.
- Do not create/edit/delete/move/format files.
- Do not install/update dependencies.
- Do not run generators, migrations, autofixes, or commands that mutate project state.
- Do not proceed to implementation.

## Inspect

1. Git status and existing user changes.
2. Project structure and package versions.
3. Next.js router and React version.
4. HeroUI package/version/import style/provider.
5. Tailwind and global styles/theme.
6. Relevant route, components, hooks, state, API, auth, validation.
7. Supplied reference image, if any.
8. Existing tests and scripts.

## Report

Provide verified facts, exact proposed file list, reason for every change, components/APIs to use and how verified, existing behavior to preserve, risks/unknowns, and verification plan.

Clearly mark assumptions. Ask only essential clarification questions.

## Stop condition

Stop after the report. Wait for explicit user approval. Do not edit.
