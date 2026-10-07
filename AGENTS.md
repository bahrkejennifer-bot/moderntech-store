# Project rules
- Keep homepage merchandising in a small, explicit ordered catalog-ID list while reading live product details and affiliate URLs from `scraped_products`; this keeps picks reversible without fabricating offers or replacing older destinations.
- Use stable homepage product anchors for campaign destinations and existing Pinterest event tracking for CTA clicks; an outbound click is not a sale.
- Keep homepage digital offers in a small explicit route map while reading public titles from safe product metadata; use curated contents and omit prices until checkout alignment is audited, preserving secure checkout and preventing unsupported inventory.
- Record digital-product signups and newsletter consent through the shared server-side signup helper, deduped per Stripe session or product+email; delivery must never depend on marketing opt-in, and the business notification inbox stays server-side only.
- The Signal's current weekly edition is an explicit list (max 4) of curated catalog slugs in one small module, rendered from live catalog data; picks without an eye-verified exact-model photo are dropped, never given a stand-in image.
