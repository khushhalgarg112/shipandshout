# Ship & Shout — Agency Website

Dark, modern agency site for **Ship & Shout**: product engineering ("Ship") + creator-led
marketing through Anuj J.'s 117K+ audience ("Shout").

**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4 · hand-written WebGL (no 3D library)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start
```

## Google Analytics

1. Copy `.env.example` to `.env.local`
2. Paste your GA4 measurement ID (looks like `G-XXXXXXXXXX`):

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

That's it — the `<GoogleAnalytics>` component in `src/app/layout.tsx` picks it up and tracks
page views (including client-side navigation) automatically. Leave the variable empty and GA
is completely disabled (nothing is loaded). In GA Admin, keep **Enhanced Measurement →
"Page changes based on browser history events"** enabled.

## Renaming the brand

The agency name is written **once**: `BRAND_NAME` at the top of `src/config/site.ts`.
Page titles, meta/Open Graph/Twitter tags, every share image, JSON-LD, the favicon and
app icons, the manifest, header/footer wordmarks, the orbit badge and the inquiry email all
derive from it. The two halves of the agency ("Ship" / "Shout") live in `engines` in the same
file. Also update `NEXT_PUBLIC_SITE_URL` (and the default URL in `site.url`) when the domain
changes.

## Editing content

Everything editorial lives in **`src/config/site.ts`** — agency name, emails, social links,
audience stats, sponsorship rates, brand list, dev services, FAQs, nav, sitemap routes.
Change a price or follower count there and it updates everywhere (pages, JSON-LD, share images).

- Design tokens (colors, fonts, animations, CSS-3D scenes): `src/app/globals.css`
- Design contract: `docs/DESIGN_SPEC.md` · benchmark research: `docs/COMPETITOR_RESEARCH.md`
- 3D: `src/components/three/` — `Object3D` (WebGL raymarched orb/stack/waves) plus CSS-3D
  pieces (`DeviceStack`, `Ribbons`, `Cube`, `IsoStack`, `Rings`). Tilt cards use `data-tilt`.
- Motion: `Reveal` + `RevealScript` (~1 KB, Web Animations API) — no animation library
- SEO: `src/lib/seo.ts` (`pageMetadata()` per page), `src/lib/jsonld.ts` (Organization,
  WebSite, Person, Service + Offer prices, FAQPage, BreadcrumbList), per-route
  `opengraph-image.tsx` (rendered by `src/lib/og.tsx`), `icon.tsx`/`apple-icon.tsx`,
  `sitemap.ts`, `robots.ts`, `manifest.ts`, branded `not-found.tsx`
- Optional: `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` adds the Search Console meta tag

## Search and AI-readable content

- `/development/saas-mvp-development` and `/development/ai-integration` are prerendered
  service pages. Their content, FAQs, metadata and sitemap paths come from `servicePages`
  in `src/config/site.ts`; service cards and the footer link to them. Existing fragment links
  on `/development` continue to work.
- `/llms.txt` and `/llms-full.txt` are static text responses generated from the same public
  config by `src/lib/llms.ts`. These optional summaries do not guarantee AI citations.
- The sitemap omits `lastmod` until real per-page modification dates are available.
- `NEXT_PUBLIC_SITE_URL` must be an HTTPS origin (for example `https://shipnshout.com`),
  without a path, credentials, query or fragment. Trailing `/` is normalized.
- To cite a campaign highlight, add `evidence: { sourceUrl, observedAt: "YYYY-MM-DD" }`
  to its record in `campaignHighlights`. Use the exact post and date its displayed counts
  were observed. No evidence dates or post mappings are inferred from the audit date.

After deployment, verify the canonical host/HTTPS redirects, GSC sitemap coverage,
GA4's existing `generate_lead` event and actual contact email delivery. Host-level headers
and crawler access require checks on the deployed site. The code audit and proposed
measurement plan are in `docs/SEO_AEO_GEO_AUDIT.md`.
Implemented changes and validation limits are in `docs/SEO_IMPLEMENTATION.md`.
Responsive/accessibility fixes, before/after excerpts and the browser test matrix are in
`docs/FRONTEND_REVIEW.md`.

Run `npm run check:seo` against a running production build (`npm run build`, then
`npm start`) to verify server-rendered metadata, canonical parameters, schema, share images,
sitemap coverage, text summaries and 404 behavior. `SEO_CHECK_BASE_URL` selects another
server; use the build's `NEXT_PUBLIC_SITE_URL` when checking a non-default canonical origin.

## Sharing the dev server (ngrok)

`next.config.ts` allows `*.ngrok-free.app`, `*.ngrok.app`, `*.ngrok.io` (and `.dev`) via
`allowedDevOrigins` — without it Next 16 blocks `/_next/*` assets for tunnel visitors.

## Contact form

The form posts to `src/app/api/contact/route.ts`, which validates input (plus a honeypot
field) and delivers each inquiry by email through [Resend](https://resend.com). The email's
`Reply-To` is set to the visitor's address, so replying from your inbox answers them directly.

Setup:

1. Create an API key at [resend.com/api-keys](https://resend.com/api-keys) and put it in
   `.env.local` as `RESEND_API_KEY`.
2. By default emails come from Resend's shared `onboarding@resend.dev` sender, which only
   delivers to the address on your Resend account. To send to any inbox, verify your domain
   under **Domains** in Resend, add the DNS records it gives you, then set
   `CONTACT_FROM_EMAIL="Brand Name <leads@yourdomain.com>"`.
3. Inquiries go to `site.email` from `src/config/site.ts`. Override with `CONTACT_TO_EMAIL`.

Without `RESEND_API_KEY`, development logs submissions to the terminal and production returns
a 500 so the form shows its mailto fallback instead of silently dropping leads.

## Deploy

Set these env vars in your host (Vercel recommended):

```bash
NEXT_PUBLIC_SITE_URL=https://shipnshout.com   # your real domain — drives canonical URLs & sitemap
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
RESEND_API_KEY=re_...                            # contact form delivery (server-only)
CONTACT_FROM_EMAIL="Brand Name <leads@yourdomain.com>"     # after verifying the domain in Resend
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=                        # optional Search Console token
# CONTACT_TO_EMAIL=                              # optional; defaults to site.email
```
