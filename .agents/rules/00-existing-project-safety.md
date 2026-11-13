---
trigger: always_on
description: Protects existing project code, user changes, configuration, dependencies, and business logic.
---

# Existing project safety

- Treat this repository as an existing production or in-progress application, not a blank starter.
- Make the smallest safe change that satisfies the approved task.
- Never replace a file with generated boilerplate without explicit approval.
- Never delete, rename, move, or restructure existing files unless explicitly approved.
- Never perform project-wide refactors for a localized UI task.
- Never modify authentication, authorization, database schemas, API contracts, environment variables, routing, or business logic unless the approved scope requires it.
- Never add, remove, or upgrade dependencies without approval.
- Never reset, clean, stash, revert, commit, or push user work without explicit instruction.
- Inspect and preserve uncommitted changes.
- Reuse existing components and conventions rather than creating parallel implementations.
- Do not hide errors by weakening types, removing checks, or changing unrelated code.
- If an unanticipated change is necessary, stop and explain why before proceeding.
