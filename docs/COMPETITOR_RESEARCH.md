# Competitor & Inspiration Research → Applied Decisions

Research pass over the modern studio canon (August 2026). Each pattern below maps to a
concrete decision on this site. Companion to `DESIGN_SPEC.md`.

## Sources studied

- [basement.studio](https://basement.studio/) — live homepage section audit
- [darkroom.engineering](https://darkroom.engineering/) (Studio Freight successors) — live homepage audit
- [Dennis Snellenberg portfolio](https://dennissnellenberg.com/) via [Awwwards](https://www.awwwards.com/inspiration/freelance-designer-developer-dennis-snellenberg-portfolio) and [Lapa Ninja](https://www.lapa.ninja/post/dennissnellenberg/)
- [HUEMOR — Best Agency Website Designs](https://huemor.rocks/blog/best-agency-website-designs/) — cross-site pattern survey
- [Codrops on basement.studio](https://tympanus.net/codrops/2025/12/15/from-basement-to-breakthroughs-inside-the-studio-powering-the-internets-boldest-brands/), [Siteinspire](https://www.siteinspire.com/website/10917-basement-studio)

## Pattern → decision map

| Pattern (source) | Decision on this site |
| --- | --- |
| "Selected Work" case list directly on home (basement, darkroom) | `FeaturedWork` section: 4 capability builds with SVG UI previews, linking to `/work` |
| Client roster as a plain typographic list, no logos (basement) | `/work` brand roster: numbered index rows of the 13 sponsored-campaign brands |
| Quantified results woven into messaging (HUEMOR) | `/work` opens with campaign receipts — real reaction/comment counts from config |
| Giant clipped outline wordmark in footer (basement) | Footer renders `SHIP & SHOUT` as oversized `text-outline` type, clipped at the bottom edge |
| Location + live local time in footer, availability signal (Snellenberg) | `LocalTime` client leaf (IST clock) + "Open for new projects" pulse pill in footer Connect column |
| Rotating circular text badge as a kinetic CTA (Snellenberg) | `OrbitBadge` — SVG `textPath` ring spinning at 16s, linked to `/contact`, in the home CTA band |
| Sticky minimal nav with blur + one CTA (Linear, darkroom) | Header: sticky, `bg-ink/85 backdrop-blur`, active-page volt underline, "Start a project" button |
| Blueprint grid-line fields behind heroes (basement) | `GridField` — SVG pattern layer with radial mask, used on home and `/work` heroes |
| Modular service blocks with icon systems (HUEMOR) | Pillars cards get inline SVG glyphs: broadcast arcs (Shout), isometric stack (Ship) |
| Illustration = drawn UI, not stock imagery (darkroom, Linear) | All artwork is inline SVG built from design tokens (`fill-volt`, `stroke-line`…) — zero raster images |

## SVG artwork rules (extends DESIGN_SPEC "No remote images")

- All artwork lives in `src/components/art/` as React server components.
- Color only via token utilities (`fill-ink-raised`, `stroke-line-strong`, `fill-volt/70`…) —
  the art re-themes automatically if `globals.css` tokens change.
- Every decorative SVG is `aria-hidden`; ids for `<pattern>`/`<textPath>` come from `useId()`
  (sanitized) so multiple instances never collide.
- Work previews are skeleton UIs (browser/phone chrome + layout bars), so they read as
  "product we ship", not as fake client screenshots — consistent with the content-honesty rule.

## October 2026 redesign — benchmarks

| Source | What we took | Where |
| --- | --- | --- |
| [zajno.com](https://zajno.com/) (palette pulled from its CSS: `#ebebeb`, `#1a1a1a`, `#ff3928`, `#121212`, `#b2b2b2`) | Light editorial canvas, single red accent, dark media panels, dotted lowercase labels, tight grotesk display type | `globals.css` tokens + `.night` scope, `text-eyebrow` |
| [phenomenonstudio.com](https://phenomenonstudio.com/) | Perspective-tilted product mockups floating in 3D (their 3D is pre-rendered video; ours is live CSS 3D at ~0 KB) | `DeviceStack` |
| phenomenonstudio.com | "Extend my team / Launch my MVP" pain-point CTAs | home `Paths` rows |
| phenomenonstudio.com | Dark hero stage for 3D, stacked service steps | night sections, sticky `Process` stack |
| Award-site canon | Live interactive hero object | `Object3D` raymarched WebGL (orb / stack / waves) |
