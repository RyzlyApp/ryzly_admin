# Forms and validation with HeroUI v2

## Inspect first

Find the project's existing form library, schema validation, server actions or API mutations, field wrappers, error display, and notification conventions. Reuse them.

Do not add React Hook Form or Zod if the project already uses another established approach. Do not add either dependency without approval.

## Form behavior checklist

For each form, identify:
- field names and actual data types;
- required/optional fields;
- validation rules from verified product requirements or existing schemas;
- initial values;
- submit action and real payload;
- loading/disabled behavior;
- server-side errors;
- success feedback;
- reset/close behavior.

Do not infer backend constraints from visual labels alone.

## Implementation guidance

- Use the installed HeroUI v2 field components and verified props.
- Ensure each field has a programmatic label.
- Associate validation messages with their fields.
- Use appropriate input types and autocomplete attributes.
- Prevent duplicate submission where needed.
- Preserve server-side validation; client validation is not a replacement.
- Show errors in a useful, non-destructive way.
- Keep field state and submission state coherent.
- Do not show success until the real operation succeeds.

## Review

Test valid input, invalid input, missing required values, server failure, loading state, and repeated submission where applicable.
