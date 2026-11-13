# HeroUI v2 component guide

## First verify the project

Do not copy imports from examples until you have confirmed:
- exact HeroUI package and version;
- whether components are imported from a package barrel or individual packages;
- existing provider setup;
- existing component wrappers and conventions.

The installed package's TypeScript declarations are authoritative for what is actually available in this project. Use HeroUI v2 documentation, not v3 documentation.

## Component selection map

| UI requirement | Typical HeroUI v2 family | Notes |
|---|---|---|
| Primary/secondary action | Button | Confirm supported variants and sizes |
| Single-line field | Input | Check label, description, validation and adornment APIs |
| Multiline field | Textarea | Check rows, resizing and validation APIs |
| Finite option list | Select / SelectItem | Verify controlled value and selected-key types |
| Independent choice | Checkbox | Use a real boolean state |
| One choice from a set | RadioGroup / Radio | Keep values typed |
| Immediate on/off preference | Switch | Distinguish from form checkbox semantics |
| Content surface | Card family | Match reference padding and composition |
| Dialog | Modal family | Verify composition and dismissal behavior |
| Related page views | Tabs / Tab | Keep selected state and content synchronized |
| Structured records | Table family | Verify row keys, render props and empty/loading behavior |
| Contextual actions | Dropdown family | Use menu semantics, not form-select semantics |
| User identity | Avatar | Provide fallback and alt text |
| Status label | Chip or Badge if present in installed v2 package | Confirm exact component/export; do not assume |
| Loading | Spinner / Skeleton / Progress | Match the type of loading feedback |

The table is a selection guide, not a guarantee of exact exports or props.

## Composition principles

- Follow the v2 component's documented composition pattern.
- Keep data and behavior outside purely presentational components when practical.
- Pass stable keys to repeated React elements.
- Type callback arguments based on actual component declarations.
- Use accessible labels and descriptions.
- Do not pass guessed props such as `loading`, `isLoading`, `color`, `variant`, or `radius` without checking that exact component's v2 API.
- Prefer a project wrapper when one already exists.

## Avoid

- Mixing v2 and v3 examples.
- Importing a component solely because it exists in a newer documentation page.
- Replacing a working native or project-specific control without a reason.
- Using dropdown menus for form selection.
- Building custom modal behavior when an existing accessible dialog component is already used.
