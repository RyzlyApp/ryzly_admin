---
trigger: always_on
description: Enforces a read-only inspection phase and a separate implementation phase requiring explicit user approval.
---

# Mandatory two-phase workflow

## Phase 1: inspection only

Inspection and planning must be read-only.

Allowed:
- Read files and project documentation.
- Inspect package manifests and lockfiles.
- Inspect Git status and diffs.
- Search code and trace imports/call sites.
- Analyze supplied screenshots.
- Run clearly non-mutating checks only when safe.

Prohibited:
- Editing, creating, deleting, renaming, moving, or formatting files.
- Installing or updating packages.
- Running generators, migrations, autofixes, or write-mode formatters.
- Modifying configuration, environment variables, or application data.
- Automatically starting implementation after writing the plan.

The inspection report must identify:
1. Verified project facts and exact dependency versions.
2. Existing architecture and relevant code.
3. Exact proposed files to create or modify.
4. The reason for each proposed change.
5. Existing behavior and contracts to preserve.
6. APIs/components to use and how they were verified.
7. Unknowns, assumptions, risks, and dependencies.
8. A concrete verification plan.

After reporting, STOP and wait for explicit user approval.

## What counts as approval

Approval must clearly authorize implementation of the proposed plan, for example: "I approve this plan. Proceed."

A request to inspect, explain, revise the plan, or discuss options is not implementation approval. Silence is not approval. Do not infer approval from the original feature request.

## Phase 2: implementation

After explicit approval:
1. Recheck Git status and relevant diffs.
2. Confirm the project has not changed in a way that invalidates the plan.
3. Implement only the approved files and scope.
4. Preserve unrelated behavior and user changes.
5. If new scope is needed, stop and ask.
6. Inspect the final diff and report actual checks and results.

Never combine inspection and implementation into one autonomous run.
