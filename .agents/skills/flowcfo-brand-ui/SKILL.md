---
name: flowcfo-brand-ui
description: Build or revise FlowCFO marketing, authentication, admin, dashboard, or product-demo interfaces while preserving the house brand and UI quality bar.
---

# FlowCFO brand and interface rules

Use this skill for any visible FlowCFO surface: public pages, auth/access pages, admin, enterprise demos, reusable UI, logo and visual assets.

## Before editing

1. Read the nearest `AGENTS.md`, inspect the existing route/component, and follow the current Next.js documentation requirement.
2. Identify whether the surface is public marketing, customer product, internal admin, or a presentation. Keep its purpose and interaction model intact.
3. Check the current brand assets and global tokens first; do not introduce a parallel brand system.

## Brand system

- FlowCFO is a global financial-intelligence product for consumers, small businesses, and partner institutions/platforms. A bank prospect is not the sole product identity.
- Default visual language: light paper surfaces, deep harbor green (`#123e3b`), clear teal (`#087f75`), restrained mint and citrus accents (`#c9ec88`), readable slate/green-gray copy, and fine green-tinted borders.
- Optimize contrast and hierarchy before decoration. Avoid black text on dark translucent panels, low-contrast pastel copy, muddy gold/brown surfaces, and oversized all-caps microcopy.
- Do not reproduce another FlowCFO product’s specific design system (including RoutineLoop). Inspiration can be “clean and light”; layouts, illustrations, components, and palette use must be original to this surface.
- Use custom diagrams and purposeful illustrations that explain money movement, timing, context, or decisions. Do not use generic AI gradients, stock-fintech arrows, rising-chart glyphs, or decorative art without a clear role.
- Treat the open-ledger FlowCFO symbol as the current mark. Do not add arrows or redraw a generic line-chart logo. Keep wordmark, favicon, touch icon, and social previews consistent.

## Interaction and accessibility

- Preserve working behavior, data, validation, authentication, and route semantics while redesigning presentation.
- Use semantic headings, labels, buttons/links, visible focus, keyboard support, reduced-motion awareness, and touch-friendly targets.
- Responsive layouts must work from narrow phones to desktop; do not hide essential navigation or critical status information.
- For demos, make the action and resulting evidence obvious. Label synthetic/sample data and distinguish real API responses from simulation.
- Use customer-facing language in presentation copy. Never expose internal implementation notes, caveats for the presenter, or unsupported promises.

## Verify

- Review the changed page in the local preview when available at desktop and mobile widths.
- Check contrast, tab order, focus, empty/loading/error states, overflow, and primary actions.
- Run the narrowest relevant lint/type/build checks. Report remaining visual or functional gaps explicitly.
