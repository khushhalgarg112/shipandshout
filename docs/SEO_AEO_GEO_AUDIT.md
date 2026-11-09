# Ship & Shout: SEO, AEO and GEO audit

Audit date: 7 November 2026. Domain confirmed by owner: https://shipnshout.com.

Scope: repository review and attempted public fetches. Qualified leads and worldwide English discovery are provisional goals inferred from the contact funnel and `site.location`; the owner confirmed the domain but did not specify markets or goals. No competitors were supplied. No application files were changed. Snippets below are proposals, not applied or tested patches.

Evidence limits: the web tool could not access the homepage, robots.txt or sitemap.xml. That does **not** establish an outage, a crawl block or a DNS failure. No GSC, GA4, server logs, field CWV or production trace was examined. Dependencies are not installed: `node_modules/next/dist/docs/` is absent. Before implementing Next-specific changes, install the lockfile dependencies and read the relevant bundled guides required by AGENTS.md. Build output must confirm rendering and generated metadata. No numerical traffic forecast is defensible yet.

## Ten priorities

| # | Channel | Action | Evidence / status | Impact |
|---|---|---|---|---|
| 1 | SEO | Verify public reachability, canonical host redirects, indexability and delivery of the contact funnel | Production fetches unsuccessful; release check, not a confirmed defect | High if failing |
| 2 | SEO/AEO/GEO | Attach each campaign result to its exact post and observation date | `src/config/site.ts:376`, `CampaignHighlights.tsx:25` | High trust opportunity |
| 3 | SEO/GEO | Separate founder identities from agency identities | `src/lib/jsonld.ts:53` and `:67` repeat personal profiles | Medium |
| 4 | SEO | Replace generated sitemap modification dates with real dates or omit them | `src/app/sitemap.ts:5` | Medium |
| 5 | SEO/AEO | Describe services in visible hero headings and lead copy | `DevHero.tsx:14`, marketing `Hero.tsx:25`, home `Hero.tsx:44` | Medium |
| 6 | SEO | Publish substantive service pages for the highest-value intent clusters | Seven services currently live at `/development#…` | High opportunity; demand unmeasured |
| 7 | SEO/AEO/GEO | Publish one evidenced campaign case study before expanding content volume | `/work` currently lists outcomes and capability archetypes | High opportunity |
| 8 | SEO | Measure headline animation before retaining it on the LCP candidate | `PageHero.tsx:43`, `globals.css:42`, home `Hero.tsx:28` | Medium, conditional |
| 9 | AEO | Add direct answers and an engagement comparison table | Existing FAQs are usable but mostly tucked into accordions | Medium opportunity |
| 10 | SEO/GEO | Validate existing GA4 lead event and baseline search/referral measurement | `ContactForm.tsx:96` already emits `generate_lead` | High decision value |

Impact describes likely business importance, not a measured ranking lift. No confirmed Critical SEO blocker was identified in source.

## Phase 0 — Discovery and reconnaissance

### 📋 Recon Report

| Discovered | Status | Severity |
|---|---|---|
| Next.js 16.3.3 App Router, React 19.2.8, TypeScript, Tailwind 4 | `package.json`; no CMS, custom routing plugin or i18n framework found | Low / informational |
| Server-renderable page composition | Route pages are Server Components; client islands handle menu, form, counters and WebGL. Client Components can still produce server HTML. Static prerendering is expected, not build-verified | Low |
| Seven indexable routes | `/`, `/development`, `/marketing`, `/work`, `/about`, `/contact`, `/privacy` in `site.ts:425` | Low |
| Head management | Next Metadata API; common helper at `src/lib/seo.ts:23`; root metadata and viewport in layout | Low |
| Canonical URL | Root `metadataBase`, per-page canonical paths; environment override can change the origin | Medium deployment check |
| Sitemap | Seven intended URLs; every generation labels all routes freshly modified | Medium |
| robots.txt | Wildcard allows site, blocks `/api/`, advertises sitemap; resources not blocked by source | Low |
| Navigation depth | Four primary links and contact CTA; footer links all six non-home routes. All current pages reachable within one click in source | Low |
| Service discovery | Footer links to seven service fragments; fragments are sections, not independently targeted documents | Medium opportunity |
| Schema | Organization, Person, WebSite, WebPage subtypes, Service/OfferCatalog, FAQPage and BreadcrumbList builders | Medium identity correction |
| Images | `BrandLogo.tsx:29` uses next/image with dimensions; decorative empty alt accompanied by brand text; SVGs need no forced conversion | Low |
| Social sharing | Per-route OG image files; metadata helper sets OG/Twitter titles and descriptions | Low; output unverified |
| Headings | One visible H1 per inspected page template; H2 section headings and H3 cards. Hero text is brand-led rather than descriptive | Medium opportunity |
| Motion | CSS headline reveals, observer-based scroll reveals, WebGL, pointer effects | Medium measurement target |
| Trust | Founder bio, about/contact/privacy, sponsored disclosures and public campaign links exist. Individual headline results lack direct citations/date | High opportunity |
| HTTPS/CDN/TTFB/WWW | Production responses unavailable to this audit; no host/CDN configuration found | High verification priority |
| Headers and redirects | No custom `headers()` or `redirects()` in `next.config.ts`; edge headers and redirects unknown | Medium verification priority |
| Crawl traps and duplicates | No faceted nav, pagination, search results, infinite scroll or locale routes found | Low |
| llms files | No `public/llms.txt` or `llms-full.txt`; optional publishing aids | Low |

Architecture: home → development / marketing (commercial hubs), work (proof), about (identity), contact (conversion), privacy (trust). Development → seven fragment sections; marketing → packages, audience, FAQs. Header is a Client Component, but desktop links render initially. Mobile menu links mount on click; footer links provide an initial-HTML alternative. No current orphan route is apparent from source.

`src/app/not-found.tsx:8` supplies noindex metadata and recovery links. Verify actual production status on a random missing path; do not infer a soft 404 from the existence of a custom error page.

✅ Phase 0 Summary

- Preserve server-renderable commercial copy.
- Preserve the seven-route navigation and sitemap inventory.
- Preserve canonical and social metadata infrastructure.
- Investigate evidence, entity identity and headline motion first.
- Next gate: production response matrix and business priorities; code findings below can be prepared independently.

## Phase 1 — Technical SEO code review

### T1 [SEO] Sitemap freshness — Medium

Location: `src/app/sitemap.ts:5–9`. `new Date()` represents generation/build time, not each document's substantive modification. This can create misleading freshness signals. Google asks for accurate significant modification dates; it does not use sitemap priority or change frequency as ranking instructions. [Google sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

Minimal proposed diff:

```diff
 export default function sitemap(): MetadataRoute.Sitemap {
-  const lastModified = new Date();
   return routes.map((route) => ({
     url: route.path === "/" ? site.url : `${site.url}${route.path}`,
-    lastModified,
     changeFrequency: route.changeFrequency,
     priority: route.priority,
   }));
 }
```

Prefer explicit per-route `updatedAt` later, supplied by the actual editorial workflow. Do not substitute today's date or the latest repository commit indiscriminately.

### T2 [SEO/GEO] Entity identity — Medium

Location: `src/lib/jsonld.ts:53`. Organization.sameAs currently points to Anuj's personal LinkedIn, X and booking page, also used by Person at line 67. Those links identify the founder; they do not establish a separate agency identity. Keep the founder relationship and personal Person links. Until verified agency profiles exist, omit Organization.sameAs:

```diff
     contactPoint: {
       // existing contact fields unchanged
     },
-    sameAs: [site.links.x, site.links.linkedin, site.links.passionfroot],
```

Apply to `organizationLd()` only. Do not remove the founder's `sameAs`, invent a Wikidata ID, or add unrelated ORCID/LinkedIn accounts. No ranking increase is promised.

### T3 [SEO] Canonical origin and redirect policy — verification required

Location: `src/config/site.ts:28`, `src/lib/seo.ts:30`, `next.config.ts:3`. Source defaults to HTTPS non-WWW and no trailing slash on inner routes. Confirm actual behavior before changing hosting rules. A canonical tag alone does not redirect aliases.

Required production matrix:

| Request | Acceptance condition |
|---|---|
| `https://shipnshout.com/` and six listed pages | 200, expected content, self-canonical, indexable |
| HTTP and WWW equivalents | Permanent redirect to the chosen HTTPS origin, ideally one hop |
| `/development/` | Permanent normalization to `/development` if slashless remains policy |
| `/development?utm_source=audit` | Canonical points to `/development`; attribution parameters remain usable |
| `/audit-missing-20261107` | Genuine missing-page response, noindex; no home redirect |
| `/robots.txt`, `/sitemap.xml` | 200, intended content type and origin; sitemap URLs resolve |

Do not add arbitrary legacy redirects: no migration inventory or old URL list was provided. Build a redirect map from GSC 404s, backlinks and prior routes, with equivalent destinations. No hreflang is required for the current single-language URL set. If localized pages are introduced, publish reciprocal annotations only for real equivalents.

The environment origin should be an origin, not a URL with a subpath/query. Proposed optional guard in `src/config/site.ts`, above the exported `site` object:

```ts
const canonicalOrigin = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shipnshout.com",
);
if (
  canonicalOrigin.protocol !== "https:" ||
  canonicalOrigin.pathname !== "/" ||
  canonicalOrigin.search || canonicalOrigin.hash ||
  canonicalOrigin.username || canonicalOrigin.password
) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin");
}
// Replace site.url with: canonicalOrigin.origin
```

This is deployment hardening, not a confirmed current defect. Preview indexing policy needs the actual hosting setup; do not switch the production-wide robots metadata to noindex.

### T4 [SEO] Headers — verification required, no ranking claim

Location: `next.config.ts:3`, `layout.tsx:81`, `RevealScript.tsx:33`. Check edge responses for HSTS, CSP, nosniff and any X-Robots-Tag. HSTS/CSP are security controls, not direct ranking boosters. Avoid a global X-Robots-Tag on public pages. The inline reveal script, JSON-LD, framework scripts, inline styles and optional GA make a blanket restrictive CSP unsafe to prescribe without the deployed script inventory. Trial CSP in report-only mode, then test hydration, styling, form submission, analytics and structured data before enforcement. Use the installed Next CSP guide before choosing nonces or hashes; that choice can affect prerendering.

### Coverage disposition

Rendering: no critical content loaded only through client fetch was found. Head: metadata, viewport, language, canonicals and index/follow already exist; inspect generated charset/title/canonical and share images after build. Breadcrumbs are generated by `PageHero` and directly on privacy. No Article, Product, LocalBusiness, VideoObject, Dataset or ClaimReview is warranted by current page content. Existing Service schema avoids fabricated prices. Keep `<` escaping in `JsonLd.tsx:6`. Check hard-coded schema image URLs `/apple-icon` and `/opengraph-image` against actual generated routes before calling them broken; file conventions can determine emitted paths. Mobile content uses the same page tree; test layout and keyboard menu behavior. Images, CWV and crawl traps are covered in Phases 0/5; no new crawl-budget system is justified for seven pages.

✅ Phase 1 Summary

- Remove synthetic modification dates.
- Separate Organization and Person identity links.
- Verify canonical host and missing-page responses.
- Validate generated head/schema/image URLs.
- Next gate: installed Next documentation and production checks before applying framework or edge configuration patches.

## Phase 2 — On-page SEO and content architecture

### O1 [SEO/AEO] Exact heading and answer copy proposals

Existing structure is generally sound; generic hero text underspecifies the service. These are relevance and comprehension improvements, not a requirement to repeat exact-match keywords.

At `src/components/development/DevHero.tsx:14`, replace the title fragment:

```tsx
<>Web, mobile and SaaS development <span className="text-flame">built to launch.</span></>
```

Replace its lead paragraph with this 45-word answer:

```tsx
<p>Ship &amp; Shout builds Next.js web applications, React Native mobile apps and SaaS products. You can engage the team for a fixed-scope project, hourly development or ongoing maintenance. Each engagement starts with scoping so you know the deliverables, timeline and cost before development begins.</p>
```

At `src/components/marketing/Hero.tsx:25`, replace the title fragment:

```tsx
<>Creator marketing for <span className="text-flame">AI and SaaS launches.</span></>
```

Proposed 46-word lead, deliberately avoiding unverified audience totals:

```tsx
<p>Ship &amp; Shout runs sponsored LinkedIn posts and X campaigns through Anuj Jangra’s creator channels. Formats include individual posts, coordinated bundles, educational threads and launch-day quote tweets. Each campaign includes a brief, a review round, sponsorship disclosure and a performance recap, with pricing quoted for your scope.</p>
```

At home `Hero.tsx:44`, retain the brand line if desired and replace the eyebrow at line 42 with `Product engineering & creator marketing agency`. At about `page.tsx:102`, use `About Ship & Shout and Anuj Jangra`; at work `page.tsx:39`, use `Creator campaign results & development capabilities`. Proposed work metadata description at line 19:

```ts
const description = "Explore Ship & Shout's creator campaign highlights and web, mobile, SaaS and AI development capabilities. Discuss your next build or launch.";
```

This aligns metadata with the page's explicit capability framing; it does not present illustrative archetypes as commissioned client case studies. Update schema descriptions through the same existing variable.

### Metadata map [SEO]

Use the existing `pageMetadata` helper; it already keeps canonical and social fields aligned. Titles below are proposed final browser titles including brand. Roughly 45–65 characters is an editorial guide, not a ranking rule or guaranteed display width. Descriptions can target roughly 140–160 characters but Google may rewrite them.

| Route | Proposed title / intent | Proposed description |
|---|---|---|
| `/` | Product Engineering & Creator Marketing — Ship & Shout | Build web, mobile and SaaS products, then launch with creator-led LinkedIn and X campaigns. Talk to Ship & Shout about your project. |
| `/development` | Web, App & SaaS Development — Ship & Shout | Build Next.js web apps, React Native apps and SaaS products with a senior team. Explore project, hourly and maintenance engagements. |
| `/marketing` | Creator Marketing & Sponsored Posts — Ship & Shout | Book sponsored LinkedIn posts and X campaigns for AI and SaaS launches. Explore formats, review steps and campaign reporting with Ship & Shout. |
| `/work` | Campaign Results & Build Capabilities — Ship & Shout | Use O1 description above. |
| `/about` | About Anuj Jangra & the Team — Ship & Shout | Meet Anuj Jangra and the team behind Ship & Shout, combining product engineering with creator-led distribution for product launches. |
| `/contact` | Contact Ship & Shout — Build or Launch a Product | Tell Ship & Shout about your build or creator campaign. Share your scope, timeline and budget, or contact the team directly by email. |
| `/privacy` | Privacy Policy — Ship & Shout | Existing description is adequate. |

For inner routes, pass only the pre-brand title to the helper; otherwise the layout appends the brand twice. Homepage uses its existing absolute-title override. Contact can use an absolute title if the proposed brand-first structure is retained. These are alternatives for editorial review, not evidence of broken existing titles.

### Intent clusters and internal links [SEO]

| Pillar | Candidate support URL | Differentiated content required | Existing insertion point and anchor |
|---|---|---|---|
| `/development` | `/development/saas-mvp-development` | Scope boundaries, milestones, billing/auth, assumptions behind 4–8 weeks, handover | `ServiceGrid.tsx:69`: “SaaS MVP development” |
| `/development` | `/development/ai-integration` | RAG architecture, evaluation, data boundaries, maintenance and cost tradeoffs | AI service card: “AI integration services” |
| `/development` | `/development/maintenance` | Support scope, onboarding audit, response terms, exclusions | Maintenance card: “application maintenance and support” |
| `/marketing` | `/marketing/linkedin-sponsored-posts` | Brief requirements, formats, review, disclosure, measurement | `Packages.tsx:61`: “sponsored LinkedIn posts” |
| `/marketing` | `/marketing/x-sponsored-threads` | Thread structure, launch timing, examples and reporting | X package group: “sponsored X threads” |
| `/work` | `/work/<verified-campaign-slug>` | Exact source, dated observations, goal, deliverables and limits | `CampaignHighlights.tsx:45`: specific campaign name |

New routes are proposed, not live URLs. Do not link, sitemap or canonicalize to them before publishing substantive pages. Keep existing fragment IDs so current links continue to work. Add a “Learn more” link in relevant cards, contextual return links from each support page to its hub, a proof link to the matching real case study, and a scoped `/contact` CTA. This produces home → hub → support depth of two clicks. Choose the first two service pages using actual lead value and demand, not the length of `site.keywords`. Meta keywords are not a substitute for content.

Trust changes: preserve the current founder bio and public profile links, add named technical reviewers only with consent, and document campaign measurement methods within real case studies. Add an editorial/methodology page only when a real publishing process exists. A street address, phone, testimonials and certifications must not be invented. Current Section/article/nav/details markup is largely appropriate; use `<time dateTime>` for verified metric dates and timeline dates if edited. Broad div replacement offers little benefit.

✅ Phase 2 Summary

- Describe the offer in commercial H1s and answers.
- Keep metadata concise and aligned with visible evidence.
- Expand only differentiated, commercially useful service pages.
- Connect hubs, support pages, real proof and contact.
- Next gate: select two service priorities and obtain approved case-study evidence.

## Phase 3 — AEO

Existing `site.ts:438` and `:470` FAQs feed both native-details HTML and FAQPage schema. Preserve that single source of truth. Existing direct answers cover pricing, hourly work, timelines, ownership, sponsorship and payment. No PAA data was obtained; the following is a suggested buyer question, **not** a claimed Google PAA result.

At `src/config/site.ts:438`, proposed addition to `devFaqs` using the existing `Faq` shape:

```ts
{
  q: "Should I choose a project, hourly development or a retainer?",
  a: "Choose a fixed-scope project when deliverables are clear, hourly development for smaller changes or uncertain scope, and a retainer for ongoing work. Ship & Shout also offers maintenance for existing applications. Start with a scoping call to agree on responsibilities, reporting and the right engagement for your product.",
},
```

Place this answer openly under an H2 in `EngagementModels.tsx` if it becomes a major decision section. Add an accessible HTML comparison table there:

| Engagement | Best fit | Billing basis | Define before starting |
|---|---|---|---|
| Fixed-scope project | Agreed deliverables | Agreed project quote | Milestones, exclusions, acceptance |
| Hourly development | Small changes or uncertain scope | Tracked time | Scope guardrails, reports |
| Retainer | Continuing roadmap | Monthly agreement | Capacity and responsibilities |
| Maintenance | Operating an existing application | Monthly or hourly agreement | Coverage and response expectations |

Use `<table><caption>Development engagement options</caption><thead>…<th scope="col">…` and plain `<td>` cells. This is a visible buyer aid; don't add comparison schema that invents prices or ratings.

Google's current changelog says FAQ rich results are no longer displayed. Retaining accurate FAQPage can describe content, but no Google FAQ CTR uplift should be projected. Likewise, do not promise HowTo rich results. [Google documentation updates](https://developers.google.com/search/updates).

The visible four-step `CampaignTimeline.tsx` is a service workflow, not necessarily a standalone instruction a reader can execute. Keep the list; only add HowTo semantics if a real how-to page is published. Use Organization/Person identity fixes from T2; no special “voice search schema,” NAP invention or Wikidata guessing. Natural question headings and self-contained answers support retrieval but do not guarantee featured snippets or voice answers.

✅ Phase 3 Summary

- Preserve existing HTML answers and matching schema.
- Add an engagement decision answer.
- Expose a readable comparison table.
- Validate demand questions using research before claiming PAA origin.
- Next gate: review answers against actual commercial terms, then assess snippets and assisted leads.

## Phase 4 — GEO

Google states AI Overviews/AI Mode need no special AI files or schema; indexed, snippet-eligible pages and sound SEO remain the foundation. [Google AI features guidance](https://developers.google.com/search/docs/appearance/ai-features). The llms.txt specification is a publishing proposal, not proof that all listed engines consume it or rank a site more highly. [llms.txt proposal](https://llmstxt.org/).

### G1 [GEO/AEO/SEO] Make claims independently checkable — High opportunity

Locations: `site.ts:82–105`, `:376–394`, `CampaignHighlights.tsx:25–46`, `marketing/Audience.tsx:38`. The page says results are publicly verifiable, but three outcome cards have generic campaign names and no exact post mapping. The separate brand-link list does not resolve which link supports each specific result. Audience averages, geography, engagement and “1000+” partnerships need observation date, scope and method. Treat follower totals as summed platform counts, not deduplicated reach or guaranteed impressions. Existing hero chip at `home/Hero.tsx:20` labels the sum “reach”; proposed replacement:

```diff
- { text: `${audience.combined.value}${audience.combined.suffix} reach`, ... },
+ { text: `${audience.combined.value}${audience.combined.suffix} combined followers`, ... },
```

The ellipsis represents existing class/depth/delay fields to retain. Also change marketing description's `reaching ${combined} tech professionals` to `through creator channels with ${combined} combined followers` if keeping the number. This avoids representing a follower sum as campaign exposure.

Add evidence only after verifying each record. Proposed type, then rendering inside each existing card:

```tsx
// Each approved highlight needs sourceUrl and observedAt (YYYY-MM-DD).
// Do not fill these with guessed post URLs or the audit date.
type CampaignEvidence = {
  sourceUrl: string;
  observedAt: string;
};

// After the note paragraph, once data records carry verified fields:
<p className="mt-3 text-sm">
  <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
    View the source post
  </a>{" · "}
  Observed <time dateTime={item.observedAt}>{item.observedAt}</time>
</p>
```

Add the same sourced date and a direct media-kit citation near audience stats. Record averaging window, sample size, whether paid distribution is included and how engagement rate is calculated. Use observed facts rather than invented expert quotations or aggregate ROI. Do not add ClaimReview to promotional claims, Dataset to unsourced follower counts, Speakable to a general service pitch, or Article schema to capability cards. Use an author/reviewer and date on actual authored case studies; connect publisher to the existing organization @id. Quote external experts only with a real attributable source.

### G2 [GEO] Proposed exact `public/llms.txt` contents — Low priority

```markdown
# Ship & Shout

> Ship & Shout pairs product engineering with creator-led marketing through Anuj Jangra's LinkedIn and X channels.

Ship & Shout is based in Haryana, India and works worldwide. Project and campaign pricing is quoted after scoping. Contact: hello@shipnshout.com.

## Services
- [Product engineering](https://shipnshout.com/development): Web, mobile, SaaS, AI integration and ongoing support.
- [Creator marketing](https://shipnshout.com/marketing): Sponsored LinkedIn posts, X threads and launch campaigns.

## Company and evidence
- [Work](https://shipnshout.com/work): Campaign highlights and illustrative development capabilities.
- [About](https://shipnshout.com/about): Founder and team background.
- [Contact](https://shipnshout.com/contact): Project and campaign inquiries.
- [Privacy](https://shipnshout.com/privacy): Visitor data and contact information handling.
- [Extended overview](https://shipnshout.com/llms-full.txt): Concise service and company overview.
```

### G3 [GEO] Proposed exact `public/llms-full.txt` contents — Low priority

```markdown
# Ship & Shout — Company and service overview

> Product engineering and creator-led marketing for product builds and launches.

## Company
Website: https://shipnshout.com/
Location: Haryana, India; working worldwide.
Contact: hello@shipnshout.com
Background: https://shipnshout.com/about
Anuj Jangra is co-founder for distribution and partnerships.

## Product engineering
Source: https://shipnshout.com/development
Services include Next.js and React web applications, React Native mobile applications, SaaS and MVP development, technical SEO and performance, systems, AI integration, and maintenance.
Engagements include scoped projects, hourly work and monthly agreements. Scope, timing and pricing are agreed for each engagement. Code ownership and handover are addressed during scoping.

## Creator marketing
Source: https://shipnshout.com/marketing
Formats include sponsored LinkedIn image or video posts, coordinated post bundles, sponsored X posts, educational threads and launch-day quote tweets.
Campaigns include review, sponsorship disclosure and reporting. Pricing depends on format, timing and scope. Bookings are handled through Passionfroot as described on the marketing page.

## Evidence
Source: https://shipnshout.com/work
The work page presents campaign highlights and development capability archetypes. Capability previews are illustrative and should not be interpreted as named client case studies. Platform follower counts are not guaranteed campaign impressions or unique audience reach.

## Inquiries
Source: https://shipnshout.com/contact
Share a project brief or email hello@shipnshout.com to discuss a build or campaign.
Privacy: https://shipnshout.com/privacy
```

This is an extended overview, not a verbatim export of all page content. Prefer future generation from shared config/approved copy to avoid drift; do not label this text as independent evidence. Both files must remain consistent with visible pages and be publicly served as text. Their gain is unknown and they should not displace proof or service-page work.

### G4 [GEO] Bot policy

`src/app/robots.ts:6` already permits all bots on public paths. No bot-specific allowlist is needed to express current intent. If explicit groups are later added, repeat the `/api/` exclusion in each relevant group; specific groups do not simply inherit wildcard restrictions. Check CDN controls separately.

Distinguish search visibility from training. OpenAI documents OAI-SearchBot separately from GPTBot; PerplexityBot is for search discovery. [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots), [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers). Before changing GPTBot, ClaudeBot or Google-Extended access, obtain a specific business policy and verify each provider's current controls. Allowing training is not a prerequisite to claim an SEO improvement. No robots change is proposed by this audit.

✅ Phase 4 Summary

- Cite each result with the exact post and date.
- Separate follower counts from exposure and unique reach.
- Publish self-contained, attributable case studies.
- Treat llms files as a small, measurable publishing experiment.
- Next gate: verified evidence records and explicit bot policy if a change is desired.

## Phase 5 — Performance and CWV engineering

No field regression is established. Likely LCP candidates are the oversized hero H1 or lead paragraph, varying by viewport; canvas decoration is not grounds to call it the LCP image. Confirm the element using a production browser trace and field RUM. Don't preload logos or force high-priority images without that evidence.

### P1 [SEO] Headline motion — Medium, conditional

`PageHero.tsx:43–45` adds a 120 ms delay and the `fade-up` animation runs 900 ms from opacity zero (`globals.css:41`, `:56`). Home `Hero.tsx:28` moves clipped headline text into view over 1.1 seconds with staggered delays. Being server-rendered does not guarantee immediate *visible* text paint. Proposed first experiment removes animation only from H1:

```diff
 // src/components/layout/PageHero.tsx
- className="text-display mt-6 animate-fade-up text-[clamp(2.75rem,7vw,6.5rem)] text-ink"
- style={{ animationDelay: "120ms" }}
+ className="text-display mt-6 text-[clamp(2.75rem,7vw,6.5rem)] text-ink"
```

For home `Line`, a complete replacement proposal removes the unused delay argument and all three `delay={…}` attributes at call sites:

```tsx
function Line({ children }: { children: React.ReactNode }) {
  return <span className="block pb-[0.06em]">{children}</span>;
}
```

Compare repeat mobile traces before/after; no specific millisecond saving is promised. Keep movement on decorative elements if within budget.

### P2 [SEO] INP and rendering cost — investigate before rewriting

`Object3D.tsx:81–90` renders continuously while near viewport. Its 900k pixel budget, deferred initialization, visibility checks, low-memory/Data Saver fallback and reduced-motion behavior are already useful. `PointerFx.tsx:29–50` reads geometry and sets custom properties in rAF; `Counter.tsx:37–42` schedules React state each animation frame. These are profiling targets, not proven INP failures. Test mobile contact input and navigation while decorative work is active. Compare WebGL enabled/disabled; consider 30fps or a still visual only if traces show improvement. Do not apply startTransition to controlled input updates, debounce form typing, or dynamically import indexable service copy without evidence.

### P3 [SEO] CLS and delivery — preserve existing protections

`BrandLogo.tsx:29` already provides dimensions; `Object3D.tsx:217` reserves an aspect-square; layout uses one Geist variable font with `display: swap` and next/font. Verify font metric fallback and late text/counter width changes in traces before adding custom font overrides. No external font preconnect is justified merely because `next/font/google` is imported. Inspect actual font delivery. Avoid bulk WebP/AVIF conversion of tiny logos without a byte-size benefit; preserve SVGs.

Scroll reveals in `RevealScript.tsx:23–29` pause animations until an observer fires. HTML remains present and no-JS defaults visible, but test scripted crawlers, hash navigation, failed scripts and keyboard focus to ensure meaningful content isn't left invisible. Don't mislabel accessible native FAQ disclosure as SEO cloaking.

Acceptance targets: mobile and desktop field p75 LCP ≤2.5s, INP ≤200ms, CLS ≤0.1, where sufficient samples exist. Separate lab results from field measurements; collect a 28-day window before calling a field improvement. Cache/ISR changes need build output and response headers first; there is no evidence that these seven static-looking pages need dynamic rendering or a new caching layer. [Web Vitals definitions and thresholds](https://web.dev/articles/vitals).

✅ Phase 5 Summary

- Measure the actual LCP element.
- Trial static hero headings first.
- Profile interaction during WebGL and pointer motion.
- Preserve current image, aspect and font protections.
- Next gate: repeatable production lab baseline and field/RUM coverage.

## Phase 6 — Prioritized execution and measurement

Effort: S = under one day, M = 1–3 days, L = 4+ days, excluding evidence collection. Owners are roles, not assigned individuals. Gain is intentionally expressed as an outcome; baseline data is missing.

| # | Task | Phase | Impact | Effort | Owner | Est. gain |
|---|---|---|---|---|---|---|
| 1 | Production response/canonical/funnel verification | 0/1 | High conditional | S | Dev/ops | Establish accessibility; restore eligible pages if failing |
| 2 | Map results to exact sources, dates and methods | 2/4 | High opportunity | M | Founder/content | Auditable proof and better lead confidence; uplift unknown |
| 3 | Correct Organization identity links | 1/4 | Medium | S | Dev | Reduce entity ambiguity |
| 4 | Remove synthetic sitemap lastmod | 1 | Medium | S | Dev | Accurate freshness signals |
| 5 | Ship descriptive headings and direct answers | 2/3 | Medium | S | Content/dev | Better offer comprehension; test CTR/conversion |
| 6 | Publish first two differentiated service pages | 2 | High opportunity | L | Content/dev | Additional relevant query coverage; volume unknown |
| 7 | Publish an evidence-backed campaign case study | 2/4 | High opportunity | M | Founder/content | Citable proof; no promised citation rate |
| 8 | Measure and trial headline motion change | 5 | Medium conditional | M | Dev | Lower text render delay if confirmed |
| 9 | Publish engagement comparison and question | 3 | Medium | S | Content | Faster engagement selection |
| 10 | Validate GA4/GSC and weekly reporting | 6 | High decision value | S | Analytics | Reliable lead attribution |
| 11 | Validate edge headers and preview indexing | 1 | Medium conditional | M | Dev/ops | Safer deployment and correct index policy |
| 12 | Optional llms overview publication | 4 | Low | S | Dev/content | Experimental machine-readable summary |

### 30 / 60 / 90 days

- Days 1–30: verify deployment responses and contact delivery; baseline 28-day GSC/GA4, content inventory and lab traces. Apply T1/T2 and approved hero copy after reading bundled Next docs. Validate schema and share images. Obtain exact campaign source/date/method records. Mark GA4's existing `generate_lead` as a key event and distinguish production delivery from local development success.
- Days 31–60: publish the first two service pages and one verified case study; add contextual hub/support/proof/contact links, comparison table and a small question set drawn from buyer calls and search data. Submit the updated sitemap and inspect representative URLs. Compare static hero versus current animation under equivalent conditions. Optional llms files come after core content.
- Days 61–90: compare matched query/page cohorts and qualified leads, accounting for indexing time, seasonality and mix. Improve pages with impressions and weak CTR after controlling for position/device. Expand a service cluster only where demand and lead value justify it. Review the next full field window and recurring AI citation observations.

### KPI dashboard and instrumentation

| KPI | Source / setup | Segment and cadence | Interpretation |
|---|---|---|---|
| Qualified leads and pipeline | Existing `generate_lead` in `ContactForm.tsx:96`; match aggregate CRM outcomes separately | Landing page/service/source, weekly | API success is not automatically a qualified lead or inbox delivery |
| Search clicks/impressions/CTR/position | GSC domain property; verification env slot already exists | Brand/nonbrand, URL/query, country/device; 28-day comparisons | No current values available; compare matched cohorts |
| Indexed canonical pages | GSC sitemap and sample URL inspections | Current seven URLs, then new pages; weekly after launch | Report reasons and selected canonicals, not only counts |
| CWV p75 and pass rate | CrUX/GSC where available; RUM if sample size permits | Device and page/template, monthly | Label insufficient samples; lab score is not field pass rate |
| AI referral leads/sessions | GA4 source/referrer exploration | Known assistant domains and landing page, monthly | Referrer loss/direct traffic makes this incomplete |
| AI citations/brand accuracy | Fixed prompt panel, manual or approved monitoring workflow | Engine/model/date/locale; monthly repeats | Observation rate, cited URL, accuracy; not market-wide visibility |
| Content coverage | GSC query clusters plus published inventory | Commercial hub and support pages, monthly | Avoid counting pages as success without relevant discovery/leads |

GA4 already loads only with `NEXT_PUBLIC_GA_ID` (`layout.tsx:98`), and the form sends the event only after HTTP success. Do not duplicate the event with another tag manager trigger. Validate in DebugView, check single firing, register interest/budget custom dimensions only if needed, exclude test/internal traffic, and keep name/email/message out of analytics. Verify Resend sender/domain and actual receipt using an owner-authorized test; no message was sent in this audit. Track Passionfroot outbound interactions separately from completed bookings; cross-domain booking attribution requires access to that system.

Google includes AI-feature traffic within Search Console's Web reporting rather than providing a reliable per-answer citation log. ChatGPT/Perplexity query logs do not reveal every user query about this brand. Use a repeatable panel such as “Who builds SaaS MVPs and helps market the launch?” and “Which creator offers sponsored LinkedIn posts for AI tools?”; record model/search setting and citations. [Google AI reporting guidance](https://developers.google.com/search/docs/appearance/ai-features).

No paid rank tracker or AI visibility subscription is selected without a budget and market scope. An initial weekly GSC query/page export and a small manual panel are sufficient to establish a baseline. If expected gain must be modeled later, use `incremental clicks = matched impressions × tested CTR difference`, and `incremental qualified leads = incremental relevant sessions × observed qualified-lead rate`; do not present assumptions as forecasts.

Risk controls specific to this plan: no fabricated reviews/results/certifications, no mass-produced location/keyword doorway pages, no hidden promotional “instructions” for AI crawlers, no paid link acquisition scheme, and no unsupported review/claim schema. These tactics would undermine the evidence-led content proposed here. Ordinary disclosure accordions, descriptive headings and accurate schema do not imply a manual action risk.

✅ Phase 6 Summary

- Prioritize production eligibility, proof and qualified leads.
- Stage service expansion after demand and evidence checks.
- Reuse the existing conversion event and metadata helpers.
- Measure SEO, referrals and sampled citations separately.
- Next gate: implementation from the proposed patches after bundled documentation review; deployment and field results remain unverified.
