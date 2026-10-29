---
name: flowcfo-seo
description: Implement or audit FlowCFO technical SEO, structured data, metadata, canonical URLs, sitemap, robots, and social previews.
---

# FlowCFO SEO and sharing rules

Use for new or changed public pages, blog posts, images, redirects, crawl directives, and SEO audits.

## Metadata

- Use the shared helpers in `src/lib/seo.ts`; keep titles and descriptions accurate, unique, and human-readable. Do not keyword-stuff.
- Set canonical URLs on indexable pages and use the production origin from the shared `siteUrl`. Never canonicalize preview/staging domains.
- Add correct `openGraph` and Twitter card metadata. Use the branded 1200×630 default preview and a page/article-specific image when available; verify images load publicly without authentication.
- Every image needs meaningful alt text where informative; decorative marks get empty alt. Optimize dimensions, file type and loading priority for actual placement.

## Blog and structured data

- Blog detail pages must be server-rendered for indexing and include a unique title/description, canonical, article OG image, readable text, author and truthful publication/modified dates.
- Preserve the article source links and show the FlowCFO CTA only where relevant. Never hide substantive content behind client-only rendering.
- Use valid JSON-LD (`BlogPosting`/`Article`, `Organization`, `WebSite`, or relevant page schema) matching visible page content. Escape JSON-LD safely and avoid duplicate/conflicting schemas.
- Include only intended public pages and published posts in the sitemap. Do not include login, admin, preview, or draft URLs. Keep `lastModified` truthful.

## Technical checks

- Check metadata output, canonical, robots, sitemap, structured data, social image response/type/dimensions, and internal links.
- Keep redirects and route aliases unambiguous; do not let retired `/demo` or private admin routes appear as crawlable marketing pages.
- Avoid duplicate titles, stale “Journal” naming, empty metadata, broken 404 behavior, and accidental `noindex` on public pages.
- Treat hreflang as opt-in: add only when real localized variants exist; do not imply geographic editions that FlowCFO does not maintain.
