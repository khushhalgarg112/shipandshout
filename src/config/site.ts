/**
 * Single source of truth for brand, business, and content data.
 * Edit this file to update the agency name, links, stats, and packages
 * everywhere across the site.
 */

/**
 * THE BRAND NAME — the only place it is written.
 * Page titles, meta/OG tags, share images, JSON-LD, favicon, manifest,
 * header/footer wordmarks and emails all derive from this constant.
 * A name containing " & " renders with a flame-coloured ampersand.
 */
const BRAND_NAME = "Ship & Shout";

/** "Ship & Shout" → "S&S", "Acme Labs" → "AL". */
function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((word) => (word === "&" ? "&" : word.charAt(0).toUpperCase()))
    .join("");
}

export const site = {
  name: BRAND_NAME,
  /** Short form used in tight spaces (manifest, favicon). */
  shortName: initials(BRAND_NAME),
  /** Registered domain — set NEXT_PUBLIC_SITE_URL in .env for deploys. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://shipnshout.com").replace(/\/$/, ""),
  locale: "en_US",
  tagline: "We ship products. Then we make them loud.",
  /** Keyword-led title used on the home page and as the default <title>. */
  seoTitle: "Product Engineering & Creator Marketing Agency",
  /** ≤160 chars — the home page meta description. */
  metaDescription:
    "Senior product engineering for web, mobile, SaaS and AI — plus creator-led launches to 117K+ tech professionals on LinkedIn and X. Build it, then make it loud.",
  description: `${BRAND_NAME} is a hybrid agency pairing full-stack product engineering — web, mobile, SaaS, SEO and large-scale systems — with creator-led distribution to an audience of 117K+ tech professionals.`,
  keywords: [
    "product engineering agency",
    "creator marketing agency",
    "web development agency",
    "SaaS MVP development",
    "mobile app development",
    "Next.js development",
    "technical SEO",
    "AI integration",
    "sponsored LinkedIn posts",
    "developer marketing",
    "B2B tech influencer marketing",
  ],
  /** Official inbox on the shipnshout.com domain. */
  email: "hello@shipnshout.com",
  founded: 2026,
  location: "Haryana, India — working worldwide",
  address: { region: "Haryana", country: "IN" },
  links: {
    x: "https://x.com/anujcodes_21",
    linkedin: "https://www.linkedin.com/in/anujcodes21/",
    passionfroot: "https://workspace.passionfroot.me/anuj-j",
    // Telegram community (5,000+ members) — add public invite link when available.
    telegram: null as string | null,
  },
} as const;

/**
 * The two halves of the agency. Labels are used as proper nouns across the
 * copy ("the Ship side", "SHOUT" badges) — rename them here with the brand.
 */
export const engines = {
  ship: { label: "Ship", name: "Product engineering", href: "/development" },
  shout: { label: "Shout", name: "Creator marketing", href: "/marketing" },
} as const;

export const founder = {
  name: "Anuj Jangra",
  displayName: "Anuj J.",
  role: "Co-founder — Distribution & Partnerships",
  handle: "@anujcodes_21",
  bio: "AI evangelist and creator with a combined audience of 117K+ across LinkedIn and X. Anuj has partnered with 1000+ brands on sponsored campaigns and hosts a 5,000+ member Telegram community focused on AI tools and careers.",
} as const;

/** Audience numbers as reported on the Passionfroot media kit. */
export const audience = {
  combined: { value: 117, suffix: "K+", label: "Combined audience" },
  linkedin: {
    followers: "87.2K",
    impressions: "42K avg. impressions",
    engagement: "1.2K avg. engagement",
  },
  x: {
    followers: "30.5K",
    impressions: "9.5M lifetime impressions",
    engagement: "5.6% engagement rate",
  },
  stats: [
    { value: 117, suffix: "K+", label: "Combined followers" },
    { value: 9.5, suffix: "M+", label: "Content impressions", decimals: 1 },
    { value: 5.6, suffix: "%", label: "Avg. X engagement", decimals: 1 },
    { value: 1000, suffix: "+", label: "Brand partnerships" },
  ],
  geo: [
    { country: "United States", pct: 45 },
    { country: "India", pct: 20 },
    { country: "United Kingdom", pct: 18 },
    { country: "Canada", pct: 12 },
    { country: "Germany", pct: 5 },
  ],
} as const;

export type Brand = {
  name: string;
  /** Official mark from the brand's own site, stored in /public/brands. */
  logo: string;
  /** Icons that already ship as a full square tile render edge-to-edge. */
  bleed?: boolean;
  /** The public sponsored post — every listed brand links to its campaign. */
  post: string;
};

/**
 * Featured campaign brands (a selection of the 1000+ partnerships).
 * Only brands with a public post are listed; each links to its campaign.
 */
export const brands: readonly Brand[] = [
  {
    name: "Deel",
    logo: "/brands/deel.png",
    bleed: true,
    post: "https://www.linkedin.com/posts/anujcodes21_ai-automation-fintech-ugcPost-7507845499635437568-2VxU/",
  },
  {
    name: "Replit",
    logo: "/brands/replit.png",
    post: "https://www.linkedin.com/posts/anujcodes21_ai-buildinpublic-replit-share-7417768146629214208-m2JV/",
  },
  {
    name: "Krisp",
    logo: "/brands/krisp.png",
    bleed: true,
    post: "https://www.linkedin.com/posts/anujcodes21_ad-ugcPost-7508554895009067008-4dYs/",
  },
  {
    name: "Luma AI",
    logo: "/brands/luma.svg",
    post: "https://www.linkedin.com/posts/anujcodes21_prompt-engineering-was-a-workaround-this-share-7442585304550547457-xjug/",
  },
  {
    name: "Reflex",
    logo: "/brands/reflex.svg",
    bleed: true,
    post: "https://www.linkedin.com/posts/anujcodes21_i-connected-a-database-typed-a-sentence-share-7498942687065268224-7Z3R/",
  },
  {
    name: "Abacus.AI",
    logo: "/brands/abacus.png",
    bleed: true,
    post: "https://www.linkedin.com/posts/anujcodes21_swipe-ugcPost-7512499903189741568-k2iy/",
  },
  {
    name: "Lovable",
    logo: "/brands/lovable.svg",
    post: "https://www.linkedin.com/posts/anujcodes21_stockholms-45-person-rocket-ship-just-redefined-ugcPost-7353796223792787456-zmT8/",
  },
  {
    name: "Guidde",
    logo: "/brands/guidde.png",
    post: "https://www.linkedin.com/posts/anujcodes21_ai-productivity-customereducation-ugcPost-7373190713125154816-RPg4/",
  },
  {
    name: "Liveblocks",
    logo: "/brands/liveblocks.png",
    bleed: true,
    post: "https://www.linkedin.com/posts/anujcodes21_your-product-just-got-a-supercharged-ai-ugcPost-7341023549010190338-1PJM/",
  },
  {
    name: "Pollo AI",
    logo: "/brands/pollo.png",
    post: "https://www.linkedin.com/posts/anujcodes21_seedance-25-1080p-is-now-live-on-pollo-ai-ugcPost-7495431173100171265-jcyD/",
  },
];

/** "1000+" — the total partnership count, for copy outside the stats band. */
export const brandPartnerships = `${audience.stats[3].value}${audience.stats[3].suffix}`;

/**
 * Marketing packages. No public prices — every campaign is quoted after a
 * short call, so `format` describes what's included instead.
 */
export const marketingPackages = {
  linkedin: [
    {
      name: "Single Sponsored Post",
      format: "1 post",
      description:
        "One image or video post to 87K+ LinkedIn followers, written in Anuj's voice and reviewed with you before it goes live.",
      features: [
        "Image or video format",
        "Copy drafted for you, one revision round",
        "Published at peak engagement window",
        "Performance recap after 7 days",
      ],
      highlight: false,
    },
    {
      name: "2× Sponsored Posts",
      format: "2 posts · launch arc",
      description:
        "Two coordinated posts — ideal for a launch announcement followed by a deep-dive or use-case story.",
      features: [
        "Everything in the single post",
        "Launch + follow-up narrative arc",
        "Scheduling across 2–3 weeks",
        "Combined performance report",
      ],
      highlight: true,
    },
    {
      name: "4× Sponsored Posts",
      format: "4 posts · month-long",
      description:
        "A month-long presence: awareness, education, social proof and conversion posts working as one campaign.",
      features: [
        "Full-funnel campaign design",
        "4 formats mixed to fit your goals",
        "Priority scheduling",
        "End-of-campaign strategy call",
      ],
      highlight: false,
    },
  ],
  x: [
    {
      name: "Sponsored Tweet",
      format: "1 tweet",
      description:
        "A single high-signal tweet to 30K+ builders and AI-curious professionals, tuned to a 5.6% engagement rate.",
      features: [
        "Native, non-ad-sounding copy",
        "Optional image or demo clip",
        "Posted at peak hours",
        "48-hour metrics snapshot",
      ],
      highlight: false,
    },
    {
      name: "Sponsored Thread",
      format: "5–8 tweets · educational",
      description:
        "A multi-tweet educational thread that teaches something real with your product at the center of the story.",
      features: [
        "5–8 tweet narrative",
        "Product woven into a genuine use case",
        "Strong hook + CTA close",
        "Metrics snapshot included",
      ],
      highlight: true,
    },
    {
      name: "Quote Tweet Boost",
      format: "1 quote tweet · launch day",
      description:
        "A quote-tweet endorsement of your launch post — perfect for Product Hunt days and feature announcements.",
      features: [
        "Same-day turnaround available",
        "Authentic first-person take",
        "Launch-day timing coordination",
        "Great paired with a thread",
      ],
      highlight: false,
    },
  ],
} as const;

/** Development services — the Ship side of the house. */
export const devServices = [
  {
    slug: "web-development",
    title: "Web Development",
    description:
      "Marketing sites, dashboards and web apps built on Next.js and React — fast, accessible, and easy for your team to extend.",
    deliverables: ["Next.js / React builds", "Headless CMS integration", "Core Web Vitals in the green", "Component design systems"],
  },
  {
    slug: "app-development",
    title: "Mobile App Development",
    description:
      "Cross-platform iOS and Android apps with React Native — one codebase, native feel, shipped to both stores.",
    deliverables: ["React Native / Expo", "App Store & Play Store release", "Push, auth & offline support", "Analytics instrumentation"],
  },
  {
    slug: "saas-development",
    title: "SaaS & MVP Development",
    description:
      "From idea to paying customers: multi-tenant architecture, billing, auth and an admin panel — the whole product, not a prototype.",
    deliverables: ["MVP in 4–8 weeks", "Stripe billing & subscriptions", "Multi-tenant auth & roles", "Scalable cloud deployment"],
  },
  {
    slug: "seo",
    title: "SEO & Performance",
    description:
      "Technical SEO, content architecture and speed work that compounds — built into the codebase, not bolted on.",
    deliverables: ["Technical SEO audits", "Structured data & metadata", "Performance budgets", "Content & keyword strategy"],
  },
  {
    slug: "systems",
    title: "Big System Building",
    description:
      "APIs, data pipelines, integrations and infrastructure for products that outgrew their first version.",
    deliverables: ["API design & microservices", "Database architecture", "Third-party integrations", "CI/CD & cloud infrastructure"],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    description:
      "LLM features your users actually use — chat, search, automation and agents wired into your existing product.",
    deliverables: ["LLM feature development", "RAG & semantic search", "Agent & automation flows", "Eval & cost optimization"],
  },
  {
    slug: "maintenance",
    title: "Maintenance & Support",
    description:
      "Keep what's live healthy — fixes, security patches, upgrades and monitoring for apps we built or inherited. On a monthly plan or by the hour.",
    deliverables: ["Bug fixes & small features", "Security & dependency updates", "Uptime & error monitoring", "Monthly plans or hourly support"],
  },
] as const;

/**
 * Ship-side capability showcase — build archetypes rendered as skeleton-UI previews.
 * Framed as capabilities, not client case studies (see DESIGN_SPEC — content honesty).
 */
export const showcase = [
  {
    slug: "saas-analytics",
    title: "SaaS analytics platform",
    category: "SaaS · Dashboards",
    art: "dashboard",
    description:
      "Multi-tenant analytics with role-based access, usage-based billing and dashboards that stay fast over millions of rows.",
    stack: ["Next.js", "PostgreSQL", "Stripe", "Redis"],
    href: "/development#saas-development",
  },
  {
    slug: "headless-commerce",
    title: "Headless commerce storefront",
    category: "Web · E-commerce",
    art: "storefront",
    description:
      "A storefront that scores green on Core Web Vitals — headless catalog, edge rendering and a checkout that doesn't leak carts.",
    stack: ["Next.js", "Headless CMS", "Edge caching"],
    href: "/development#web-development",
  },
  {
    slug: "ai-copilot",
    title: "AI copilot & agent workflows",
    category: "AI · LLM features",
    art: "ai",
    description:
      "Retrieval-grounded chat, tool-calling agents and eval harnesses wired into existing products — with cost ceilings that hold.",
    stack: ["Claude API", "RAG", "Evals"],
    href: "/development#ai-integration",
  },
  {
    slug: "mobile-app",
    title: "Cross-platform mobile app",
    category: "Mobile · iOS & Android",
    art: "mobile",
    description:
      "One React Native codebase shipped to both stores — push, offline sync, analytics and release automation included.",
    stack: ["React Native", "Expo", "App Store & Play"],
    href: "/development#app-development",
  },
] as const;

export type ShowcaseItem = (typeof showcase)[number];

/** Real campaign outcomes pulled from public posts — used instead of invented testimonials. */
export const campaignHighlights = [
  {
    brand: "AI design tool launch",
    format: "LinkedIn sponsored post",
    result: "792 reactions · 28 comments",
    note: "Multi-format asset story for an image-generation product.",
  },
  {
    brand: "Voice-first dev tool",
    format: "LinkedIn sponsored post",
    result: "754 reactions · 39 comments",
    note: "Developer-workflow narrative for a voice dictation product.",
  },
  {
    brand: "Python education series",
    format: "Organic LinkedIn post",
    result: "351 reactions · 121 comments",
    note: "The educational voice the audience was built on.",
  },
] as const;

export const nav = [
  { label: "Development", href: "/development" },
  { label: "Marketing", href: "/marketing" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
] as const;

export const footerNav = {
  services: [
    { label: "Creator Marketing", href: "/marketing" },
    { label: "Campaign Packages", href: "/marketing#packages" },
    { label: "Web Development", href: "/development#web-development" },
    { label: "Mobile Apps", href: "/development#app-development" },
    { label: "SaaS & MVP", href: "/development#saas-development" },
    { label: "SEO & Performance", href: "/development#seo" },
    { label: "AI Integration", href: "/development#ai-integration" },
    { label: "Hourly Development", href: "/development#hourly" },
    { label: "Maintenance & Support", href: "/development#maintenance" },
  ],
  company: [
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

/** Indexable routes — drives the sitemap. */
export const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/development", priority: 0.9, changeFrequency: "monthly" },
  { path: "/marketing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/work", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
] as const;

export type Faq = { q: string; a: string; link?: { label: string; href: string } };

/** Development FAQ — rendered on /development and emitted as FAQPage JSON-LD. */
export const devFaqs: readonly Faq[] = [
  {
    q: "How does pricing work?",
    a: "Every engagement starts with a short call. Fixed-scope projects get a fixed quote before any code is written; hourly work is billed for tracked time with weekly reports; retainers, maintenance plans and embedded teams run on a flat monthly rate. No surprise invoices.",
  },
  {
    q: "Can we hire you by the hour?",
    a: "Yes. Hourly development suits small features, fixes and work that's hard to scope up front. There's no minimum commitment, time is tracked transparently, and you get a weekly report of what was done.",
  },
  {
    q: "What are typical timelines?",
    a: "An MVP typically ships in 4–8 weeks. Smaller builds move faster, larger systems take longer — you get a dated plan during scoping, and if anything slips we flag it the week we see it, not at the deadline.",
  },
  {
    q: "Who owns the IP?",
    a: "You do. Code, designs, infrastructure and documentation are transferred to accounts you control, and we sign whatever your legal team needs. Nothing is held back after the final invoice.",
  },
  {
    q: "What happens after launch?",
    a: "Every build includes a support window for fixes, monitoring and tuning — it’s written into the quote. After that, most clients roll into a retainer; the rest get a clean handover and bring us back when they need us.",
  },
  {
    q: "Do you maintain apps you didn't build?",
    a: "Yes. We start with a short audit of the codebase, hosting and dependencies, fix anything urgent, then move you onto a monthly maintenance plan or hourly support — with monitoring and agreed response times for production issues.",
  },
  {
    q: "Can you take over an existing codebase?",
    a: "Yes. We start with a paid audit covering architecture, tests, security and performance, then hand you a prioritized plan. If the honest answer is a rebuild, we say so before you spend more.",
  },
];

/** Marketing FAQ — rendered on /marketing and emitted as FAQPage JSON-LD. */
export const marketingFaqs: readonly Faq[] = [
  {
    q: "How fast can a campaign go live?",
    a: "A single post typically goes from brief to publish within a week — most of that is writing and your review. Quote tweet boosts for launch days can move faster when scheduled ahead; multi-post bundles are spread across two to three weeks by design.",
  },
  {
    q: "How much does a campaign cost?",
    a: "It depends on the format, timing and how many posts your launch needs, so we don't publish a rate card. Send a short brief and we'll come back within 24 hours with a quote built around your goals.",
  },
  {
    q: "How many revision rounds are included?",
    a: "One structured revision round per post. You flag everything in a single pass and we resolve it in the next draft. The voice stays Anuj's — that is what the audience responds to, and it is the reason sponsored posts here perform.",
  },
  {
    q: "What formats can we book?",
    a: "On LinkedIn: image or video posts, as singles or 2× and 4× bundles. On X: single sponsored tweets, 5–8 tweet educational threads, and quote-tweet boosts timed to launches. If you are unsure which fits your goal, say so in the brief and we will recommend one.",
  },
  {
    q: "Are posts marked as sponsored?",
    a: "Yes. Every paid post carries an #ad disclosure — no exceptions, no burying it. The audience trusts the feed because that line never gets blurred, and that trust is exactly what you are paying for.",
  },
  {
    q: "How does payment work?",
    a: "Campaigns are booked and paid through Passionfroot, which handles invoicing and payment processing. Your slot is confirmed once the booking completes, and the brief kicks off from there.",
    link: { label: "Open the media kit on Passionfroot", href: site.links.passionfroot },
  },
];
