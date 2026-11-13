---
trigger: model_decision
description: Applies when editing or reviewing Next.js, React, TypeScript, component, or frontend code.
---

# Next.js and TypeScript standards

- Follow the project's installed Next.js and React versions; do not assume the latest version.
- Detect App Router versus Pages Router before proposing changes.
- Preserve the existing `src/` convention, routing structure, aliases, lint setup, and component organization.
- Use TypeScript and the project's existing strictness. Avoid `any`; do not silence type errors with unsafe casts.
- In the App Router, prefer Server Components unless client-side state, effects, browser APIs, or event handlers are required.
- Keep `"use client"` boundaries as narrow as practical.
- Reuse the existing data-fetching, caching, mutation, and error-handling patterns.
- Do not invent API contracts or database fields. Trace the real types and callers.
- Use semantic HTML and accessible labels, keyboard behavior, and focus states.
- Do not introduce a new state, form, styling, or icon library if the project already has an appropriate solution.
- Keep components focused and avoid unnecessary abstractions.
- When implementing designs from images or mockups, never invent or presume generic AI colors (e.g. `#596AFE`, `text-gray-900`, `text-gray-600`). Strictly apply the project's verified palette (`#5160E7` primary, `#F2F4FF` light tint, `#1D1348` heading, `#101828` title, `#475467` body, `#3A3A3C` subtitle, `#64748B` meta, `#10B981` success green, `#ECEBF0` button border).
- For features with multi-tab or multi-subpage structures (e.g. `src/components/workexperience/`), place each tab content page in its own dedicated domain folder with an `index.ts` barrel, re-export through the feature root barrel, and keep `src/app/` route files strictly as lightweight wrappers.
- Run the checks that already exist in the project; do not add scripts or dependencies without approval.
