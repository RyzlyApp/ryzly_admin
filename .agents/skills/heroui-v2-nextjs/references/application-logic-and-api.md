# Application logic, state, and API integration

## Trace before implementing

Inspect the actual code paths for:
- API client and base URL configuration;
- request and response types;
- authentication/session handling;
- query and mutation hooks;
- cache invalidation;
- state management;
- error normalization;
- notifications;
- route navigation;
- server actions or route handlers.

Do not invent endpoints, payload fields, response objects, permissions, or business rules.

## State placement

- Use local component state for local UI behavior.
- Use the existing global state solution for shared state.
- Use existing server/query cache for remote data.
- Derive values when possible instead of duplicating state.
- Avoid effects that merely mirror props or derived state.
- Keep client-side state within the smallest appropriate client boundary.

## API mutations

A mutation should follow the existing project pattern:
1. Validate using existing rules.
2. Submit the verified payload.
3. Show a pending state.
4. Handle the actual success response.
5. Invalidate or update the existing cache correctly.
6. Surface backend errors using the existing error conventions.
7. Avoid duplicate submissions.

Never return fabricated success data or hide a failed request.

## Edge cases

Consider empty results, missing optional values, slow requests, network errors, expired sessions, permission errors, duplicate actions, and stale data. Implement only cases relevant to the feature and existing contracts.
