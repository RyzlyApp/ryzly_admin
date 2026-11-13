---
name: heroui-v2-nextjs
description: Implements and refines existing Next.js interfaces with HeroUI v2.2.20, including functional components, forms, state, API integration, responsive layouts, and screenshot-to-code design replication. Use when building or modifying a HeroUI v2 interface in an existing project.
---

# HeroUI v2.2.20 + Next.js engineering skill

## Purpose

Use this skill to implement approved frontend changes in an existing Next.js application using its verified HeroUI v2.2.20 installation. Produce interfaces that are visually faithful to supplied references and function correctly within the project's real architecture.

This skill does not authorize edits. The workspace inspection/approval rules and `AGENTS.md` always apply first.

## Non-negotiable version and truthfulness rules

1. Verify the installed HeroUI package version from `package.json`, the lockfile, and package metadata before coding.
2. Verify the project's import style. Do not assume a global `@heroui/react` entry point if the project uses individual packages or a different setup.
3. Use HeroUI v2 APIs only. Never mix in HeroUI v3 component names, props, provider patterns, or styling instructions.
4. Verify unfamiliar APIs using version-matched HeroUI v2 docs and the installed TypeScript declarations.
5. Never invent component props, exports, hooks, CSS variables, Tailwind plugins, or configuration.
6. If the installed version is not 2.2.20, report the mismatch. Do not upgrade or downgrade without approval.
7. If documentation is unavailable or conflicts with the installed declarations, inspect the package and report uncertainty rather than guessing.

## Workflow

### A. Understand the existing app

Inspect:
- Next.js and React versions.
- App Router or Pages Router.
- HeroUI package(s) and exact versions.
- Tailwind version and configuration.
- Existing provider and theme setup.
- Global styles, fonts, design tokens, and aliases.
- Existing shared components and feature structure.
- State management, forms, API clients, auth, and validation patterns.
- Current Git changes.

Do not replace existing providers, styles, or architecture just to match a tutorial.

### B. Analyze the design reference

When a screenshot or image is supplied, inspect it before implementation.

Record:
- Viewport dimensions and overall page composition.
- Header, navigation, sidebar, footer, and content regions.
- Grid/flex relationships, widths, heights, alignment, and spacing.
- Typography hierarchy, font weights, line heights, and text wrapping.
- Backgrounds, surfaces, borders, radii, shadows, and colors.
- Component states visible in the image.
- Image assets, aspect ratios, crop, and placement.
- Responsive behavior that is visible; distinguish this from assumptions.

Do not invent content or hidden states. Ask for clarification when an unknown materially changes the implementation. Otherwise label conservative assumptions in the plan.

### C. Plan the implementation

Map the reference to the existing project:
- Reuse existing layout and feature components.
- Identify which HeroUI components fit the visual and semantic role.
- Identify where custom CSS or native semantic elements are more suitable.
- Identify actual state transitions and API calls.
- List exact files to create or modify.
- Identify responsive and accessibility work.
- Identify tests/checks.

Present this plan during inspection and wait for approval.

### D. Implement after approval

Implement in this order:
1. Existing page/layout integration.
2. Structural layout and responsive grid.
3. Shared/reusable component patterns where genuinely needed.
4. HeroUI controls and component composition.
5. Styling and design tokens.
6. Real interactions and state.
7. Existing API integration and validation.
8. Loading, empty, error, and success states.
9. Accessibility and responsive refinements.

Keep changes narrow and reviewable. Do not add unrelated cleanup.

## HeroUI component usage

Use HeroUI components when they match the intended interaction and appearance. Common v2 component families include buttons, inputs, textareas, selects, checkboxes, radio groups, switches, cards, modals, tables, tabs, dropdowns, navbar, pagination, avatars, chips, progress, skeletons, spinners, and tooltips.

This list is conceptual, not proof that a particular export or prop exists in the installed package. Confirm the exact component, import, subcomponent composition, and props in the v2.2.20 docs and package declarations.

Choose semantically:
- Button for actions.
- Input for single-line text.
- Textarea for multiline input.
- Select for a finite selection.
- Checkbox for independent choices.
- RadioGroup for mutually exclusive choices.
- Switch for immediate binary settings.
- Modal for dialogs.
- Tabs for related views.
- Table for structured records.
- Dropdown for contextual actions.

Do not use a menu as a substitute for a form select. Do not force a component into a role it was not designed for. Use semantic HTML for page structure and where native controls are more appropriate.

## Styling and fidelity

- Preserve the existing design system and styling conventions.
- Use the screenshot as the primary visual specification.
- Establish or reuse design tokens for colors, typography, spacing, radii, borders, and shadows.
- Prefer existing Tailwind utilities and theme tokens.
- Use custom CSS for complex or repeated patterns where it is clearer.
- Avoid arbitrary one-off values, `!important`, and broad overrides.
- When HeroUI styles do not respond as expected, inspect rendered DOM and computed styles before adding overrides.
- Do not replace the reference's visual identity with default HeroUI styling.
- Use existing icon and font libraries; do not introduce duplicates.
- Use actual project assets where available.

## Next.js and component boundaries

- Follow the existing router and folder structure.
- Prefer Server Components in the App Router unless interactivity requires a Client Component.
- Keep client boundaries narrow.
- Keep data fetching and secrets on the server where appropriate.
- Do not expose private credentials to client code.
- Reuse existing provider, auth, routing, cache, and API patterns.
- Avoid putting an entire page or dashboard into one oversized component.
- Avoid unnecessary abstractions for one-off UI.

## Functional behavior

Every visible interactive control must have its intended behavior. Before implementation, identify initial state, actions, transitions, validation, loading, success, error, disabled, and empty states.

Use local React state for local UI state. Use the existing shared state solution for cross-feature state. Do not add a state library for a trivial interaction.

For forms:
- Use the project's existing form library and validation approach.
- Inspect existing schemas and API payload types.
- Provide accessible labels and field-level errors.
- Prevent duplicate submission where appropriate.
- Show loading and failure states.
- Do not invent business validation rules.

For API integration:
- Trace the existing API client, request/response types, auth, cache invalidation, and mutation conventions.
- Do not hardcode fake production data.
- Do not simulate backend success.
- Do not invent endpoints, response shapes, or database fields.

For modals:
- Support the intended open, close, cancel, confirm, loading, and error states.
- Close after success or explicit cancellation, not before a request has succeeded when the operation requires confirmation.

For tables:
- Implement only required sorting, filtering, pagination, selection, and row actions.
- Include loading, empty, and error states when relevant.

## Responsive design and accessibility

- Preserve desktop proportions at the reference viewport.
- Adapt columns and navigation at smaller widths.
- Prevent unintended horizontal overflow.
- Ensure forms, dialogs, tables, and actions remain usable on mobile.
- Use semantic elements, accessible labels, keyboard support, visible focus, sufficient contrast, and meaningful icon-button labels.
- Do not use color as the only status indicator.

## Visual verification

When browser preview or screenshot capture is available:
1. Run the existing development command.
2. Capture the same viewport size as the reference.
3. Compare macro layout first, then component dimensions, spacing, typography, colors, borders, shadows, and small details.
4. Fix the largest visual mismatches first.
5. Repeat the comparison.
6. Separately test behavior; visual similarity does not prove functionality.

Do not claim visual comparison or testing if it was not performed.

## Completion checklist

- [ ] Installed HeroUI version and API style verified.
- [ ] Only approved files and scope changed.
- [ ] Existing architecture and functionality preserved.
- [ ] Screenshot layout and visual hierarchy reproduced.
- [ ] Real interactions implemented.
- [ ] Existing API and validation patterns reused.
- [ ] Responsive behavior checked.
- [ ] Accessibility considered.
- [ ] TypeScript/build/lint checks run where available.
- [ ] Final diff inspected.
- [ ] Results and limitations reported honestly.

## Reference material

Read the relevant bundled reference before implementing:
- Component selection and composition: `references/component-guide.md`
- Styling and theming: `references/styling-and-theming.md`
- Forms and validation: `references/forms-and-validation.md`
- State and API logic: `references/application-logic-and-api.md`
- Screenshot-to-code workflow: `references/screenshot-replication.md`
- Responsive and accessibility guidance: `references/responsive-accessibility.md`

Official reference: https://v2.heroui.com/docs

Always verify version-sensitive details against the installed package.
