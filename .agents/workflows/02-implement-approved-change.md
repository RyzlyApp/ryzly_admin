# Workflow: implement an approved change

Use only after the user explicitly approves a specific inspection report and plan.

## Preflight

1. Re-read the approved plan.
2. Recheck Git status and diffs.
3. Confirm relevant files have not changed.
4. Confirm the approved scope remains safe.
5. If anything material changed, stop and request renewed approval.

## Implementation

- Modify only approved files and scope.
- Reuse existing architecture and conventions.
- Verify exact installed APIs and types.
- Do not add dependencies or change config unless specifically approved.
- Do not invent business logic or API contracts.
- Preserve unrelated work.
- Keep changes small and reviewable.

## Verification

Run appropriate existing checks only when safe and relevant. Inspect the final diff. Test the requested interactions and responsive behavior where tooling permits.

## Report

List actual files changed, purpose, behavior, checks executed and results, and unresolved issues. Never claim unperformed tests.
