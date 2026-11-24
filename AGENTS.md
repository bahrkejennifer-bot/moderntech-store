# Project rules
- Keep Kids & STEM ordering and image corrections in a page-scoped presentation helper; preserve catalog products and affiliate URLs, and omit failed photos instead of substituting unrelated imagery.
- Keep homepage merchandising in a small, explicit ordered catalog-ID list while reading live product details and affiliate URLs from `scraped_products`; this keeps picks reversible without fabricating offers or replacing older destinations.
- Use stable homepage product anchors for campaign destinations and existing Pinterest event tracking for CTA clicks; an outbound click is not a sale.
- Keep homepage digital offers in a small explicit route map while reading public titles from safe product metadata; use curated contents and omit prices until checkout alignment is audited, preserving secure checkout and preventing unsupported inventory.
- Record digital-product signups and newsletter consent through the shared server-side signup helper, deduped per Stripe session or product+email; delivery must never depend on marketing opt-in, and the business notification inbox stays server-side only.
- Newsletter curated picks remain an explicit list of at most four catalog slugs; older lists are dated archives, and longer articles get a text-only dated preview linking the full archive rather than invented current campaign picks.
- Compose client-side PDFs with jsPDF's text engine instead of html2pdf.js/html2canvas, which silently produces blank pages here; the PDF is laid out from the same model the page reads, so it can never show a photo or claim the page does not.
- Keep gift-finder matching local to eligible curated picks, with an explicit external Amazon search link for unmatched queries; this avoids fabricated inventory and unsolicited redirects.
- All free email signups go through `saveSubscriber` (one row per email in the subscribers list; anon insert-only, admin-only read) before anything else, and freebies unlock on screen immediately; the confirmation/welcome email runs in the background and never gates delivery.

- Keep the November 18 edition and collection additions in their shared code-level module behind one default-off publication flag checked by listing, article and collection presentation; this preserves draft assets without exposing unreviewed content.
- Render stored editorial titles, excerpts and body text directly without the editorialPresentation helper; this preserves owner-approved live content without historical database edits.
- Derive queued email text from its HTML through the shared email-content helper; remove Amazon destinations from email bodies so multipart content stays aligned without changing template design.
- Keep tablet episode picks in a page-specific static module and its blush/ivory tokens scoped to the two page mains via a CSS module; this preserves the catalog, signup flow, and shared navigation/footer styling.
- Serve the original tablet handout only through its email-validating function and expiring signed tokens; keep its asset outside public and its email queue independent of on-page delivery.
