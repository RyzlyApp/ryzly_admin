# HeroUI v2 styling and theming

## Inspect before styling

Inspect the current:
- Tailwind version and config;
- HeroUI plugin/provider/theme setup;
- global CSS;
- CSS variables and design tokens;
- fonts and icon library;
- existing reusable styles.

Do not install or reconfigure Tailwind or HeroUI as part of a feature unless approved.

## Design token extraction

For a screenshot, identify and record:
- brand and accent colors;
- page, surface, and elevated-surface backgrounds;
- primary, secondary, muted, and disabled text;
- borders and separators;
- spacing scale;
- radius scale;
- typography family, weights, sizes, and line heights;
- shadows;
- content max-width and breakpoints.

Reuse existing tokens whenever possible. If estimating values from an image, label them as estimates and refine through screenshot comparison.

## Styling order

1. Reuse existing project utility classes and tokens.
2. Use documented HeroUI v2 props and supported styling APIs.
3. Use Tailwind utilities for layout and local styling.
4. Use scoped CSS for complex or repeated patterns.
5. Use narrowly targeted overrides only after inspecting the rendered DOM and computed styles.

Avoid global selectors that unintentionally affect unrelated HeroUI components. Avoid `!important` as a first-line fix.

## Layout

Use Grid and Flexbox for structural layout. Use absolute positioning only for genuine overlays, anchored controls, or decorative elements. Avoid hardcoding every element's coordinates.

Match the reference's proportions and visual hierarchy, not just its colors.

## Fonts and icons

Reuse the project's font and icon setup. Do not add another icon package if one already exists. Do not use emoji as replacement UI icons. Use consistent icon size, stroke, and alignment.
