# SAiPH Bakes — Premium Multi-Brand E-Commerce Front-End

A complete, dependency-free storefront for **SAiPH Bakes** and its three consumer
brands — **DoughReMi**, **SAiPH Signature** and **Khowdy** — plus a role-based
admin console.

38 static pages. No framework, no build step needed to view it, no `node_modules`.
Open `index.html` and it works.

---

## Run it

```bash
# just open it
start index.html            # Windows
open index.html             # macOS

# or serve it (recommended — history.pushState on the shop page prefers a server)
npx serve .
python -m http.server 8000
```

Rebuild the pages after editing anything in `tools/`:

```bash
node tools/build.mjs        # regenerate all 38 pages + sitemap/robots/manifest
node tools/smoke.mjs        # 27 headless tests over data, cart, totals, rendering
node tools/audit.mjs        # heading structure, schema, alt text, broken links
```

All three run on plain Node (tested on v24) with zero dependencies.

For an end-to-end browser pass (38 interactions across desktop and mobile,
screenshots at every step), serve the folder and drive it with Playwright
against your installed Chrome — `playwright-core` plus an `executablePath` is
enough, no browser download needed.

---

## Deployment

Live on Vercel: **https://saiph-bakes.vercel.app**
(project `saiph-bakes`, account `wazidrahman23-6616`)

```bash
node tools/build.mjs        # rebuild first — the deploy ships pre-built HTML
vercel deploy --prod --yes  # push to production
```

`vercel.json` sets `buildCommand: ""` so Vercel serves the committed static
output rather than running the generator; `.vercelignore` keeps `tools/` off the
deployment. Security headers and asset caching are configured there too.

**When you connect the real domain**, rebuild with the origin set so canonicals,
Open Graph URLs, JSON-LD and the sitemap all follow it:

```bash
SITE_URL=https://www.saiphbakes.com node tools/build.mjs
vercel deploy --prod --yes
```

Product-page canonicals and schema derive their origin from
`location.origin` at runtime, so they are correct on any host without a rebuild.

### Claims that stay switched off until they are true

Nothing unverifiable is published. Three gates hold it back:

| Claim | Gate | To enable |
|---|---|---|
| Google rating panel on the homepage | `company.rating.verified` | Set real `score` / `count`, flip `verified: true` |
| `aggregateRating` + `review` in product JSON-LD | same flag | Same — invented review schema earns a Google manual action |
| FSSAI / GSTIN / CIN in the footer and contact page | empty strings in `company` | Fill in the real registration numbers |

The visible testimonials and product reviews are still sample content and read
as design copy; replace them before you drive real traffic.

---

## What is here

### Storefront

| Page | File | Notes |
|---|---|---|
| Home | `index.html` | Hero, brand discovery, categories, featured tabs, Signature feature, cake studio teaser, gifting, ordering steps, stores, business band, social proof, Instagram wall, newsletter |
| Catalogue | `shop.html` | URL-driven filters (brand, category, occasion, diet, badge, price, delivery date), sort, pagination, grid/compact layouts |
| Product | `product.html?id=…` | Gallery with loupe zoom, variants, flavours, eggless toggle, message, add-ons, delivery date + slot, reviews, related, sticky mobile buy bar, Product JSON-LD |
| Cake studio | `cakes.html` | Nine-step live-priced custom cake builder with reference upload |
| Brand landings | `brand-doughremi.html`, `brand-signature.html`, `brand-khowdy.html` | Each themed, each linked back to the parent brand |
| Gifting | `gifting.html` | Collections, personalisation ladder, corporate bridge |
| Cart / Checkout | `cart.html`, `checkout.html` | Coupons, free-ship progress, delivery vs pickup, date + slot honouring the longest lead time in the cart, GSTIN, four payment methods |
| Confirmation / Tracking | `order-confirmation.html`, `track-order.html` | Order summary and a five-state timeline |
| Account | `account.html` | Orders, saved items, addresses, subscriptions, gift cards, profile, points |
| Wishlist | `wishlist.html` | Add-all-to-cart, suggestions |
| Stores | `stores.html` | The Dibrugarh shop, delivery coverage, franchise territories |
| Business | `corporate.html`, `wholesale.html`, `franchise.html` | Full B2B pages with enquiry forms, pricing tables and process timelines |
| Company | `about.html`, `contact.html`, `careers.html`, `blog.html`, `faq.html` | |
| Policies | `shipping.html`, `returns.html`, `privacy.html`, `terms.html` | Written to be read, not survived |
| Not found | `404.html` | |

### SEO landing pages (generated)

Eight category pages and one city page, each with real server-rendered copy,
FAQ + breadcrumb schema and a hydrated product grid:

`birthday-cakes.html` · `celebration-cakes.html` · `croissants-and-breads.html` ·
`cupcakes-and-pastries.html` · `chocolate-gifts.html` · `assam-tea-cookies.html` ·
`healthy-snacks-online.html` · `corporate-gifting-india.html`

`cake-delivery-in-dibrugarh.html`

Edit the copy in `tools/collections.mjs` and rebuild.

### Admin console

`admin/index.html` — dashboard with KPIs and production queue, plus modules for
products, categories & brands, inventory, orders, customers, delivery slots,
stores, coupons, gift cards, reviews, banners, blog, and franchise / corporate /
wholesale enquiries.

Switch roles in the top-right selector (**Super Admin**, **Store Manager**,
**Production Manager**, **Order Manager**, **Marketing Manager**) and the
sidebar, actions and permission matrix all change. Access rules live in
`SAIPH.data.adminModules`.

---

## Architecture

```
index.html … 404.html         generated pages — do not edit by hand
admin/index.html              generated admin console
assets/
  css/
    tokens.css                design tokens + the three brand themes
    base.css                  reset, typography, layout primitives
    components.css            buttons, cards, header, footer, forms, overlays
    pages.css                 page compositions
  js/
    data.js                   catalogue, brands, stores, coupons, content
    store.js                  cart, wishlist, orders, addresses, account (localStorage)
    ui.js                     icons, generated art, product cards, toasts, overlays
    blocks.js                 shared section renderers
    app.js                    header, search, cart drawer, global handlers, page dispatch
    page-*.js                 one controller per page type
  img/                        logo, favicon, OG cover (SVG)
tools/
  build.mjs                   static site generator
  collections.mjs             SEO landing page copy
  partials/                   head, header, footer, overlays, logo
  pages/                      page body fragments — edit these
  smoke.mjs                   headless test suite
  audit.mjs                   static page audit
sitemap.xml robots.txt manifest.webmanifest
```

**Editing flow:** change a fragment in `tools/pages/`, or a partial in
`tools/partials/`, then run `node tools/build.mjs`. Shared chrome lives in one
place; the output is plain static HTML so it deploys anywhere.

### Brand theming

Every brand is a set of CSS custom properties scoped by attribute:

```html
<section data-brand="signature"> … </section>
```

`saiph` (deep navy · warm cream · soft beige · gold) is the default. `doughremi`
(warm chocolate · cream · caramel), `signature` (matte black · champagne gold ·
ivory · burgundy) and `khowdy` (forest green · earth brown · cream · natural
beige) each re-declare the same semantic tokens, so any component dropped inside
adopts that brand without a single component-level override. `data-tone="dark"`
does the same for master-brand editorial blocks.

### Icons

`SAIPH.ui.icon(name)` (and its build-time twin in `tools/build.mjs`) emits a
class-less `<svg viewBox="0 0 24 24">` with **no width or height**. An icon with
no CSS rule sizing it would therefore fall back to the browser's default
replaced-element size — 300×150 — so `base.css` sets a floor:

```css
svg:not([class]) { width: 1.15em; height: 1.15em; flex: none; }
```

Icons now inherit the size of whatever text they sit in. Component rules
(`.btn svg`, `.note svg`, `.value__icon svg`, …) live in `components.css` and
`pages.css`, which load later and win at equal specificity. If you size an icon
*wrapper* rather than the icon, add an explicit `svg` rule too — see
`.cart-empty__glyph svg`.

### Brand lettering

The master brand is **SAiPH**, never *SAIPH*. Much of the UI uses
`text-transform: uppercase` for its boutique labelling, which would flatten
that lowercase `i`. Any brand name inside an uppercased label is therefore
wrapped in `.brandname`, which resets `text-transform` — product card brand
lines, the PDP brand line, brand-card stamps, the hero eyebrow, featured tabs,
search results, footer chips and the admin header. If you add a new uppercased
label that prints a brand name, wrap it the same way.

### State

`SAIPH.store` keeps cart, wishlist, recently viewed, coupon, saved addresses,
orders, subscriptions and account session in `localStorage` under
`saiph.state.v1`. It is event-driven — subscribe with
`SAIPH.store.on("cart:change", fn)` — and syncs across browser tabs via the
`storage` event, so the header count updates in a second tab when you add to the
cart in the first.

Abandoned-cart handling nudges once per session after a quiet filled cart, and
writes a `saiph.abandoned` snapshot on unload for a real backend to pick up for
email recovery.

---

## Imagery

There is no photography in this build. Every image slot is filled by a
**deterministic generated SVG**: a gradient plate tinted with the product's
brand palette, a soft vignette for depth, a fine ring, and a small line-art
emblem chosen from the product's category (cake, croissant, cookie, bread,
chocolate, tart, hamper, tea, bonbon, cupcake, coffee). The same product always
produces the same composition, so the site reads as art-directed rather than
broken while photography is being shot.

Brand tone palettes live in one place — `SAIPH.data.tones` in
`assets/js/data.js` — consumed by the product cards, category tiles, gift
cards, Instagram wall, hero backdrops and blog cards. `tools/build.mjs` keeps a
matching copy for build-time rendering; change both together.

**To drop real photography in**, give a product an `image` property in
`assets/js/data.js`:

```js
{ id: "gold-leaf-saffron-cheesecake", name: "…", image: "assets/img/products/saffron-cheesecake.jpg", … }
```

`SAIPH.ui.media()` prefers `image` over the generated art automatically and
emits a lazy-loaded, dimensioned `<img>` with the product name as alt text. No
other change is needed.

For the static hero and section art, replace the `{{ART:…}}` / `{{RAW:…}}`
tokens in `tools/pages/*.html` with your own markup and rebuild.

**The logo** is a reconstructed SVG (butterfly monogram under a crown, gold on
burgundy) in `tools/partials/logo.html` and `assets/img/logo.svg`. Swap in the
official artwork and rebuild.

---

## Connecting a backend

This is a front-end. Everything below is where a real implementation plugs in:

| Concern | Where | What to do |
|---|---|---|
| Catalogue | `assets/js/data.js` | Replace the literals with a fetch; all consumers read through `SAIPH.data.*` / `SAIPH.query.*` |
| Payments | `page-checkout.js`, submit handler | Replace the `setTimeout` with your PSP handoff (Razorpay, Cashfree, PayU, Stripe). On success, call `store.orders.place(...)` exactly as it is called now |
| Orders / tracking | `store.js` → `orders` | Point `place`, `byId` and status refresh at your order API |
| Enquiry forms | `app.js` → `initForms` | Replace the `setTimeout` with a `POST`; the validation and success-panel handling already work |
| Reviews | `page-product.js` → `bindLateForm` | POST to a moderation queue |
| Search | `data.js` → `query.search` | Swap the local scorer for your search service; the overlay and results page call one function |
| Admin | `page-admin.js` | Wire the `[data-demo-action]` buttons to your admin API; the permission matrix already gates them |
| Product pages | `product.html` | Currently one template driven by `?id=` and marked `noindex`. For production, extend `tools/build.mjs` to emit one static page per product — the PDP renderer and Product JSON-LD are already there |

---

## SEO

- Semantic HTML with exactly one `<h1>` per page (verified by `tools/audit.mjs`)
- Organization, WebSite, Bakery/LocalBusiness schema on every page
- Product, Review and AggregateRating schema on product pages
- FAQPage schema on the FAQ page and on all 9 generated landing pages
- BreadcrumbList schema plus visible breadcrumbs
- Canonical URLs, Open Graph and Twitter cards
- `sitemap.xml` (36 URLs), `robots.txt` with cart/checkout/account/admin disallowed
- Descriptive alt text, `loading="lazy"` and explicit dimensions on real images
- Cart, checkout, confirmation and account marked `noindex`

Update `SITE` at the top of `tools/build.mjs` before deploying — it drives every
canonical, OG URL and sitemap entry.

## Performance

- Zero JavaScript dependencies. Per page load: 162 KB of JS and 120 KB of CSS
  uncompressed — 45 KB and 22 KB gzipped. A typical page is 82 KB raw, 15 KB
  gzipped (the inline SVG art compresses well)
- Three Google Font families, `display=swap`, preconnected
- All imagery is inline SVG — no image requests, no layout shift
- Every media box has a fixed `aspect-ratio` (CLS ≈ 0)
- Animation is transform/opacity only, and fully disabled under
  `prefers-reduced-motion`
- Scroll reveals use one `IntersectionObserver` and unobserve after firing

## Accessibility

Skip link, visible focus rings, semantic landmarks, ARIA on tabs / accordions /
dialogs, focus trapping and restore in every overlay, keyboard-navigable tab
lists, `aria-live` on search and catalogue results, 44px+ touch targets, and
reduced-motion support throughout.

## Mobile

Mobile-first throughout: five-item bottom navigation, hamburger drawer, sticky
add-to-cart on product pages, a filter drawer on the catalogue, thumb-friendly
targets, `env(safe-area-inset-*)` padding, and horizontal scroll rails instead of
cramped grids.

---

## Known scope

- **Front-end only.** No server, no database, no payment gateway. Forms and
  payments simulate success after a short delay and say so on screen.
- **One location.** The site describes a single shop and kitchen at
  Chowkidinghee, RKB Path, Dibrugarh. Fresh delivery is Dibrugarh only; Khowdy
  packaged goods ship pan-India. The address, phone numbers and opening hours in
  `SAIPH.data.company` and `SAIPH.data.stores` are placeholders — replace them
  with the real ones before launch.
- **Content is illustrative.** Products, prices, stores, reviews, statistics,
  phone numbers, GSTIN and FSSAI numbers are plausible placeholders. Replace
  them with real data before going live — particularly the compliance numbers
  in the footer and policy pages, and the Google rating figure on the homepage,
  which should only be shown if it reflects real review data.
- **Order history is per-browser.** Tracking reads from `localStorage`, so an
  order placed in one browser will not appear in another. That is a deliberate
  demo constraint, not a bug.
