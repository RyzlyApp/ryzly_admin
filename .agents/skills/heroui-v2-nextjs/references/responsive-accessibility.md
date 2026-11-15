# Responsive design and accessibility

## Responsive behavior

Use the supplied reference viewport as the desktop baseline. Inspect existing breakpoints and conventions before adding new ones.

Check:
- no unintended horizontal overflow;
- columns collapse in a logical order;
- navigation remains usable;
- text wraps without clipping;
- buttons and controls remain touch-friendly;
- dialogs fit within the viewport;
- tables have a deliberate small-screen strategy;
- images preserve suitable aspect ratios;
- content order remains meaningful.

Do not merely shrink the desktop layout. Use a suitable alternate arrangement when necessary.

## Accessibility

- Use semantic landmarks and headings.
- Provide accessible names for controls.
- Associate labels, hints, and errors with form fields.
- Ensure keyboard navigation and visible focus.
- Ensure dialogs support appropriate focus behavior.
- Use sufficient contrast.
- Do not rely on color alone to communicate status.
- Give icon-only buttons accessible labels.
- Use meaningful alternative text for informative images and empty alt text for decorative images.
- Respect reduced-motion preferences when adding animation.

Verify the actual component's accessibility behavior rather than assuming a component automatically solves every requirement.
