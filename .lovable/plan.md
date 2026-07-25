Rename the blog section from `/blog` to `/weekly-edit` and update all internal references to match the new "Modern Tech: Weekly Edit" branding.

## Scope
1. **Routes** (`src/App.tsx`): Change `/blog` → `/weekly-edit` and `/blog/:slug` → `/weekly-edit/:slug`. Add `<Navigate>` redirects from old `/blog` and `/blog/:slug` paths to preserve existing links/SEO.
2. **Blog landing page** (`src/pages/Blog.tsx`): Update all internal `Link to="/blog"`, canonical/og URLs, breadcrumbs, and structured data to use `/weekly-edit`.
3. **Blog post page** (`src/pages/BlogPost.tsx`): Update canonical/og URLs, breadcrumbs, structured data, and "Back to / Browse All" links to use `/weekly-edit`.
4. **Homepage** (`src/pages/Index.tsx`): Update the "View Latest Weekly Edit" link target to `/weekly-edit`.
5. **Podcast page** (`src/pages/Signal.tsx`): Update blog post card links to `/weekly-edit/:slug`.
6. **Navigation** (`src/components/OffCanvasMenu.tsx`): Update the menu link to `/weekly-edit`.
7. **SEO assets** (`public/sitemap.xml`, `public/robots.txt`): Update blog URLs to `/weekly-edit`.
8. **Edge functions**: Update `blog-rss-feed` and `generate-weekly-tech-spec` links to point to `/weekly-edit`.

## Out of scope
- No database migrations or table renames.
- No changes to the file/folder names of `src/pages/Blog.tsx` or `BlogPost.tsx` themselves.
- Affiliate tracking IDs remain unchanged.

## Verification
- Type-check with `bunx tsc --noEmit`.
- Verify no remaining `/blog` navigation links remain in the frontend (excluding old redirects and data-fetching table names).