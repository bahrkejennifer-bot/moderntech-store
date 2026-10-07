# Holiday-ready storefront: inspection findings and proposed plan

## What exists today (read-only inspection)

**Homepage (`/`)** — cinematic launch page (unpublished preview): sticky nav, dark hero "Everyday tech. Beautifully simple.", 3-product spotlight with tabs, 4 more tech picks, 3 digital guide cards without prices. Each Amazon pick has a direct "View on Amazon" button **plus** a "Product details" link to an in-site product page (`/product/:id`).

**Other routes kept working** — Weekly Edit blog, 4 category pages, guide/lead pages, creator bundle + guide sales pages, The Signal (`/the-signal`), legal pages, admin, `/go/:slug` redirects, My Downloads.

**Amazon tag** — every live link in pages and functions uses `moderntechs04-20`. The old tag only remains in a historical database script (harmless). Homepage only shows products whose link is a real amazon.com `/dp/` product page with that tag. Clicks are logged through Pinterest tracking; a click is not a sale.

**Digital products and prices** — three paid items plus one free:
- Canva Master Class: page shows $29, checkout sends 2900
- Faceless YouTube: $49 / 4900
- Creator Bundle: $59 / 5900
- Reels guide: free via email
The checkout function re-reads the price from the database by product name and ignores the amount the page sends. The database shows $29 / $49 / $59, which matches. The $199 you reported earlier was never found.

**Checkout and delivery** — Stripe one-time payment using the connected Stripe key. After payment, the Stripe listener records the purchase (a bundle unlocks all three) and emails download links through Resend. **Risk:** those links are fixed Dropbox share links, so anyone who gets the email can share the file.

**Newsletter** — GetResponse signup with one fixed list, plus double opt-in for the free guides. "The Signal" is now a podcast/sleep promo page, not a newsletter. No signup is named "The Signal" yet.

**Seasonal content** — Christmas countdown/music/snow pieces exist but are not on the homepage. There is no Prime Day or holiday content. Shop and tag descriptions still say "2026 hot-selling".

**Project rules** — curated product list, no invented offers, homepage prices hidden until the price check is done, disclosure near every Amazon button. Saved notes still list the old tag `0c` (outdated).

## Risks / blockers before calling it "holiday-ready"
1. **Test checkout:** the connected Stripe key is live (the publishable key is `pk_live`). A real test-mode run needs a Stripe test key that you add yourself, or one small real purchase that you refund. Checkout also does not run inside the Lovable preview. It has to be tested on moderntech.store.
2. **Download links** are permanent Dropbox links, not expiring ones. Your call: keep them or switch.
3. **"The Signal" newsletter** needs the right GetResponse list (current default list token `CiFHU`). Confirm whether The Signal is its own list.
4. **Prime Day / holiday dates and deals** can't be pulled from Amazon automatically. Banners will be date-free unless you give dates.
5. **Product demos:** there are no product videos. Demos would mean animated product photos, not real footage.
6. Homepage title/description in the site header still say "2026 hot-selling". Sitemap has 27 entries and does not list `/product/` pages.

## Proposed build (after approval)
1. Ivory / soft-black / blush single scroll page: replace the dark hero with ivory sections and soft-black accents. Keep tabs, carousel, scroll reveals and reduced-motion support.
2. Amazon buttons go straight to Amazon. Remove the homepage "Product details" links. Old `/product/:id` links keep working for past social posts.
3. Simple "demo" spotlight: gentle zoom/rotate on the real product photo with a short real benefit. No fake renders.
4. Small digital guides shop: 3 cards that open the existing sales pages and existing Stripe checkout. Show $29/$49/$59 only if you confirm them.
5. "The Signal" weekly newsletter block on the homepage using the existing GetResponse signup and double opt-in.
6. Holiday/Prime Day section: "Gift-worthy picks" chosen from current catalog items. No prices, countdowns, deadlines or "deal" claims. Easy to turn off.
7. SEO: update page title/description/social tags, add product pages to the sitemap, fix the outdated tag in saved notes.
8. Checks: phone and desktop browser runs, every Amazon link and tag, guide links, newsletter submit, build. Test checkout + download email only once blocker 1 is resolved. Nothing gets published.

## Questions to settle in approval
- Show guide prices ($29/$49/$59) on the homepage?
- Test checkout via a Stripe test key or a refunded real purchase?
- Is "The Signal" a separate GetResponse list?
