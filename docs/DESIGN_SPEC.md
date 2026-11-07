# Design & Engineering Spec

Read this fully before writing any component. Every page must look like one team built it.

## Brand

- **Name:** lives only in `BRAND_NAME` (`src/config/site.ts`). Never type it in a component —
  use `site.name`, `<Wordmark />`, or `engines.ship.label` / `engines.shout.label` for the two halves.
- **Positioning:** Hybrid agency. "Ship" = product engineering (web, mobile, SaaS, SEO, systems, AI). "Shout" = creator-led marketing through Anuj J.'s 117K+ audience.
- **Voice:** Confident, plain-spoken, a little playful. Short sentences. No agency clichés, no exclamation marks. Numbers over adjectives.
- All business data (stats, rates, brands, services, FAQs, links) comes from `src/config/site.ts`. **Never hardcode** a number, price, or link that exists in config.

## Look & feel — light editorial + 3D

Benchmarks: **zajno.com** (palette, editorial type, lowercase dotted labels) and
**phenomenonstudio.com** (floating 3D device mockups, pain-point CTAs, dark media panels).

- Light canvas (`bg-canvas` #ebebeb), near-black ink (#1a1a1a), **one accent**: flame red (#ff3928).
- Dark panels: add the `night` class to any block — every token flips inside it (#121212 canvas).
  Alternate light/night sections for rhythm; the footer is always night.
- Oversized display type (`text-display`, Geist 600, −0.045em). Body Geist, `text-ink-muted`.
- Eyebrows: `text-eyebrow` (dotted, lowercase) numbered `01 — What we do`.
- Flame for display-size words only (3:1 on canvas). Small accent text uses `text-flame-deep` (5:1).

## Design tokens (Tailwind v4 — `globals.css`)

Colors: `canvas`, `card`, `sunken`, `ink`, `ink-muted`, `ink-faint`, `line`, `line-strong`,
`flame`, `flame-deep`, `flame-ink` (text on flame). All AA-checked; see comments in `globals.css`.
**No arbitrary hex in components** — exceptions: WebGL/OG/icon code (no CSS vars there) and the
radial-gradient "sphere" fills that stand in for the 3D material.

Utilities: `text-display`, `text-eyebrow`, `text-gradient-flame`, `text-outline`, `surface`,
`glow-flame`, `noise`, `noise-layer`, `hairline`.
Animations: `animate-marquee(-reverse)`, `animate-fade-up`, `animate-line-up`, `animate-float`,
`animate-blink`, `animate-spin-slow`.

## 3D — keep it light

| Piece | Where | Cost |
| --- | --- | --- |
| `Object3D` (`three/Object3D.tsx` + `shader.ts`) | home hero, page heroes, CTA bands | ~4 KB JS, WebGL |
| `DeviceStack` | home work, /work hero | CSS 3D |
| `Ribbons` | brand + stack tapes | CSS 3D + marquee |
| `Cube`, `IsoStack`, `Rings` | about, founder, pillars, contact, 404 | CSS 3D |
| `.tilt` + `data-tilt="6"` | cards | one shared pointer listener (`PointerFx`) |
| `.stack` / `.stack-card` | process | sticky + scroll-driven CSS |
| `.type-3d` | footer wordmark | CSS |

Rules for WebGL: one canvas per viewport-ish region, never more than two per page. `Object3D`
already handles: lazy start (near viewport + after load + idle), per-shape shader specialisation,
async compile (`KHR_parallel_shader_compile`), offscreen/tab-hidden pause, pixel budget,
reduced-motion still frame, low-memory/Data-Saver CSS fallback. Don't bypass it.

## Layout rhythm

- Sections: `<Section>` (`py-20 sm:py-28`). Full-bleed: `<Section bleed>`.
- Width: `<Container>` (max-w-7xl). Inner-page heroes: `<PageHero>` (breadcrumbs + optional 3D visual).
- Headers: `<SectionHeading eyebrow title lead align="split">` — split puts the lead beside the title.
- Cards: `surface` (radius built in) + `p-7 sm:p-8`. Tilt cards: `tilt relative overflow-hidden` +
  `data-tilt` + a `<span className="tilt-glare" />` child. Don't add `transition-*` utilities to
  `.tilt` elements — they'd override the tilt transition.

## Primitives (import — never re-implement)

```tsx
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonArrow } from "@/components/ui/Button";     // variant: primary | secondary | flame | ghost
import { Badge } from "@/components/ui/Badge";                     // tone: line | flame
import { Marquee } from "@/components/ui/Marquee";                 // reverse?, fade?
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/motion/Reveal";               // variant: up | fade | tilt | grow
import { Counter } from "@/components/motion/Counter";
import { PageHero } from "@/components/layout/PageHero";
import { Wordmark } from "@/components/brand/Wordmark";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
```

## Motion rules

- Home hero: a left-aligned two-line headline and a framed orbital visual showing the Ship
  and Shout engines. Keep primary text immediately visible. Home copy lives in `homeHero`
  in the site config; the 3D object is decorative, with a visible figure caption.
- Ribbons: separate in-flow rows on phones, with gentle angles only at desktop sizes.
  Two identical marquee groups each cover at least their viewport, so the loop travels
  exactly half a track without exposing an empty region. Never absolutely overlay the tapes.
- Reduced-motion ribbons: no transforms, no duplicate copy displayed, and a readable 2/3/5-column
  roster. Movement starts only after an explicit Play action. Pause/Resume remains available.
- `src/app/visual-polish.css` contains these scoped visual refinements and imports after
  the core tokens in the root layout. Keep colors tied to the existing semantic tokens.

- Entrance: `<Reveal>` (server component; `RevealScript` animates it with WAAPI, once).
  Stagger with `delay` 0, 0.08, 0.16… Keep transforms off the Reveal element itself.
- Above-the-fold hero headings and lead copy stay visible from first paint. Decorative
  elements and secondary actions may use CSS keyframes; never Reveal the primary text.
- Micro-interactions in CSS. No animation libraries. Everything respects reduced motion.

## SEO rules

- Every page: `export const metadata = pageMetadata({ title, description, path, keywords })`
  (title 30–60 chars incl. brand, description 110–160), an `opengraph-image.tsx` using
  `renderOg()`, one `h1`, a `PageHero` breadcrumb (emits BreadcrumbList), and a `webPageLd()`.
- Service pages also emit `serviceLd()` and `faqLd()` from the same config data they render.
- New routes: add to `routes` in config (drives the sitemap) and to nav/footer if public.

## Code rules

- Server components by default; `"use client"` only for interactivity.
- TypeScript strict. Icons: `lucide-react`. External links: `target="_blank" rel="noopener noreferrer"`
  plus an sr-only "(opens in a new tab)".
- No new npm dependencies without a measured reason. No remote images or fonts.

## Content honesty

- Real numbers only (they're in config). Never invent testimonials, client quotes, revenue figures, or case-study results. Showcase items are capabilities, not fictitious clients.
