# SEO, AEO and GEO implementation

Implemented on 7 November 2026 against the baseline in `SEO_AEO_GEO_AUDIT.md`.
The audit's source line references describe the pre-change code.

## Applied

- Validate and normalize `NEXT_PUBLIC_SITE_URL` as an HTTPS origin. Keep per-page
  canonicals free of tracking parameters.
- Remove synthetic sitemap modification dates and keep the founder's personal profiles
  on Person schema rather than Organization schema.
- Use service-focused headings and descriptions; keep primary hero text visible from
  the first paint. Decorative motion remains.
- Distinguish combined follower counts from unique reach and guaranteed impressions,
  including marketing share cards. Add the direct media-kit citation.
- Publish `/development/saas-mvp-development` and `/development/ai-integration` with
  substantive scope, process, preparation and FAQ content. Both are prerendered and
  linked from service cards, the footer and related service navigation. Existing fragment
  targets remain available. Each page has a canonical, social image, three-level
  breadcrumb, WebPage/Service schema and FAQ schema matching its visible answers.
- Add a visible engagement comparison table and answer shared with the development FAQ.
- Add optional `evidence: { sourceUrl, observedAt }` to campaign highlight records. Cards
  render a source link and date when provided. The owner requested citation support;
  no exact post/date mapping was provided, so existing numbers are unchanged.
- Generate `/llms.txt` and `/llms-full.txt` as static text responses from the public
  content config. Neither file is represented as a ranking or citation guarantee.
- Add `npm run check:seo` for repeatable production response checks.

## Validation

- `npm run lint`: passed.
- `npm run build -- --webpack`: passed, including TypeScript and prerendering.
- `npm run check:seo` against the local production server: checks nine public pages,
  unique titles, descriptions, one H1, self-canonicals including tracking URL variants,
  Organization/Person identity, service FAQs and breadcrumb schema, and social image
  responses. Also checks sitemap membership, robots rules, text summaries, random
  missing routes and trailing-slash redirects.
- Browser inspection: desktop SaaS page and mobile service/development pages; no
  page-level horizontal overflow. Native FAQ expansion and mobile menu opening/closing
  verified. The table has scoped headers and a keyboard-focusable scroll container.

The default Turbopack build hit an internal Windows subprocess failure while processing
CSS. Validation therefore used Next's supported `--webpack` build option; the project's
default build command was preserved. The initial sandbox build also could not fetch the
existing Geist font; the successful build ran with network access outside the sandbox.

## Requires production access or business evidence

- Confirm host-level HTTP/WWW redirects, CDN crawler access, security headers and
  preview indexing policy on the deployed domain. No guessed legacy redirects or CSP
  policy were introduced.
- Supply exact campaign source posts and observation dates; verify the media-kit
  measurement windows and methodology. Publish a detailed case study only with evidence.
- Check the deployed GA4 measurement ID and the existing `generate_lead` key event;
  no duplicate analytics event was added. Verify actual email delivery separately.
- Collect GSC/GA4 baselines, field CWV and repeatable AI citation observations. Local
  smoke checks and visible-first headings do not establish a field CWV or ranking gain.
