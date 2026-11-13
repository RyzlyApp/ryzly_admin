# Workflow: replicate UI from image

## Phase 1: inspect and plan only

1. Analyze the supplied screenshot's viewport, composition, layout, typography, colors, spacing, component shapes, and visible states.
2. Inspect the existing route, layout, components, design tokens, assets, and application logic.
3. Map visible elements to existing components or verified HeroUI v2 components.
4. Identify missing assets and unknown behavior; do not fabricate them.
5. Propose exact files and changes, responsive decisions, interactions, risks, and verification steps.
6. Stop and wait for explicit user approval.

Do not edit files during this phase.

## Phase 2: implement after approval

1. Recheck Git status and approved scope.
2. Implement macro layout first, then components and styling.
3. Use verified HeroUI v2 APIs and existing design conventions.
4. Wire real state and existing API behavior.
5. Implement loading, empty, error, and success states where required.
6. Adapt for mobile and tablet.
7. Inspect rendered output at the reference viewport when browser tooling is available.
8. Compare and refine the largest visual mismatches.
9. Test interactions separately.
10. Inspect final diff and report results honestly.

Never claim pixel-perfect output or successful verification without evidence.
