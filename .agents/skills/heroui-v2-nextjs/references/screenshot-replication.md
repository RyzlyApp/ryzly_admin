# Screenshot-to-code replication

## Goal

Recreate the supplied interface in the existing application with high visual fidelity while preserving real application behavior.

## 1. Analyze the image

Record:
- image and viewport dimensions;
- page background and major regions;
- header/sidebar/footer dimensions and positions;
- content width, columns, gaps, and alignment;
- component sizes and spacing;
- font family if identifiable, hierarchy, weight, line height;
- color palette, borders, radii, shadows;
- imagery, cropping, and aspect ratios;
- visible component states.

Separate visible facts from assumptions. Do not invent unseen flows.

## 2. Map to the existing application

Locate the current route, layout, components, tokens, and assets. Identify the smallest set of files required. Reuse existing components and business logic.

## 3. Plan

List the proposed files, component mapping, design tokens, responsive decisions, interactions, data dependencies, risks, and checks. Inspection rules require approval before edits.

## 4. Implement after approval

Build macro structure first:
1. page shell and major regions;
2. grid/flex relationships;
3. component placement and dimensions;
4. typography and spacing;
5. colors, borders, radii, shadows;
6. icons and image details;
7. interactions and states;
8. responsive adaptations.

Do not use absolute positioning for the whole page. Do not substitute unrelated stock images for meaningful reference assets.

## 5. Compare

Capture the running page at the same viewport as the reference when browser tooling is available. Compare in this order:
1. macro composition;
2. widths, heights, and alignment;
3. spacing and typography;
4. colors and surfaces;
5. borders, shadows, and decorative details.

Fix the largest mismatch first and repeat. Test functionality separately.

## 6. Report

State whether a browser screenshot was actually captured and compared. Report remaining differences honestly. Never claim pixel-perfect fidelity without evidence.
