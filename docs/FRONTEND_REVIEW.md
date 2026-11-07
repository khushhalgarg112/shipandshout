# Frontend fixes and verification

Implemented 7 November 2026 in the existing Next.js 16.3.3 / React 19 / Tailwind 4 site.
Both installed design skills were read. The UI/UX skill's Python search was unavailable
because Python is not installed; its bundled web accessibility and responsive references
were used instead. Next's installed component/routing guides were reviewed before editing.

The existing design remains: Geist, left-aligned editorial type, canvas `#ebebeb`, card
`#f5f5f5`, ink `#1a1a1a`, flame `#ff3928`, and readable small accent `#c22414`. This pass
changes layout constraints and interaction behavior rather than introducing a new theme.
Native mobile-first CSS complements the existing utility classes; no dependency was added.

## Reproduced root causes

| Issue | Evidence before changes | Root cause |
|---|---|---|
| Homepage statistics | At 320px, numeric text needed 127–173px inside 120px columns | Fixed `text-6xl` inside a two-column grid |
| Campaign metrics on home/work | At 768px, text needed 196px inside 151px card content | Fixed `text-5xl` on a three-column card layout |
| Marketing package headers | At 768px, format labels were squeezed into 40px beside badges | Unwrapped horizontal flex row with a non-shrinking badge |
| Contact hero | At 320px, heading and lead boxes expanded to 288px beyond the content gutter | Fixed-size decorative rings set the implicit grid's minimum width |
| Mobile menu | No modal semantics/focus containment; scroll lock depended only on `open` | Conditional fixed div plus Escape listener, with no desktop resize cleanup |
| Tap targets | Footer/social links typically 28–37px high; X link 36px wide | Visual text size also determined the hit area |
| Contact validation | Invalid submit returned without moving focus | Inline errors were rendered without directing the user to the first error |
| Privacy reading measure | Paragraphs measured about 1185px wide at a 1280px viewport | The default max-width utility beat the intended narrower utility in CSS order |

The document's horizontal scroll width alone did not expose the clipped text, because the
site already clips decorative overflow. Checks therefore included individual text/control
boxes and their intrinsic scroll widths. No new page-level overflow hiding was added.

## Before → after excerpts

The edits below are already applied. Paths and line numbers in the priority table refer to
the resulting files; use the working-tree diff for the complete component replacements.

### 📱 Numeric type follows the available layout

```diff
// src/components/home/StatsBand.tsx
- <p className="text-display text-6xl text-ink sm:text-7xl">
+ <p className="stat-value text-display text-ink">
```

```diff
// src/components/home/CampaignHighlights.tsx
- <p className="text-display mt-6 text-5xl text-ink">{primary}</p>
+ <p className="campaign-result text-display mt-6 text-ink">{primary}</p>
```

```css
/* src/app/globals.css */
.stat-value { font-size: clamp(2rem, 10vw, 4.5rem); }
.campaign-result { font-size: clamp(2rem, 3.5vw, 3rem); }
.package-labels { flex-wrap: wrap; }
.package-labels > p { flex: 1 1 8rem; }
```

### 📱 The hero grid can shrink independently of its decoration

```diff
// src/app/contact/page.tsx
- visual={<Rings className="mx-auto size-72 sm:size-96" />}
+ visual={<Rings className="contact-rings mx-auto" />}
```

```css
/* src/app/globals.css: class is applied to PageHero's Container */
@layer components {
  .page-hero-grid { grid-template-columns: minmax(0, 1fr); }
  .page-hero-grid > * { min-width: 0; }
}
.contact-rings { width: min(18rem, 100%); aspect-ratio: 1; }
@media (min-width: 40rem) {
  .contact-rings { width: min(24rem, 100%); }
}
```

Desktop utility columns still override the component-layer single-column default.
The decorative visual retains its aspect ratio rather than forcing the text track wider.

### 🎨 Narrower containers now override the shared default

```diff
// src/components/ui/Container.tsx
- <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}>
+ <div className={cn("site-container", className)}>
```

```css
/* src/app/globals.css */
@layer components {
  .site-container { width: 100%; max-width: 80rem; margin-inline: auto; }
  .reading-copy { max-width: 65ch; }
}
.site-container {
  min-width: 0;
  padding-left: max(var(--page-gutter), env(safe-area-inset-left, 0px));
  padding-right: max(var(--page-gutter), env(safe-area-inset-right, 0px));
}
```

Gutters are 1.25rem initially, 2rem from 40rem and 2.5rem from 64rem. The privacy page's
`max-w-3xl` now resolves to a 768px outer container; its content measured 688px at the
wide viewport checked, instead of about 1185px.

### ♿ Mobile navigation is a modal with a predictable keyboard loop

`Header.tsx` replaces the fixed div with a persistently mounted, initially closed native
`dialog`. Opening uses `showModal()`, which makes the underlying page inert. The close
button receives focus; Escape closes the dialog and returns focus to the opener. Explicit
Tab/Shift+Tab handling wraps between the last link and close button.

```tsx
// src/components/layout/Header.tsx: complete Tab boundary handler
const containTab = (event: React.KeyboardEvent<HTMLDialogElement>) => {
  if (event.key !== "Tab") return;
  const controls = event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last?.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first?.focus();
  }
};
```

The menu uses `100dvh`, a sticky close row, safe-area padding and an independently
scrollable body. Link navigation closes it even when the selected route is already open.
Crossing the 48rem desktop breakpoint closes it and restores the previous scroll style.

### ♿ Validation directs focus and keeps delivery state honest

```diff
// src/components/contact/ContactForm.tsx
  setErrors(nextErrors);
+ const firstInvalid = Object.keys(nextErrors)[0];
+ requestAnimationFrame(() => {
+   formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
+ });
  return;
```

Required fields now expose `required` semantics alongside the existing custom validation,
error descriptions and `aria-invalid`. A disabled fieldset and `aria-busy` describe the
pending state. A 20-second abort bounds the request; errors retain the entries and offer
retry/email. The success region is focusable and receives focus after confirmed success.
Delivery is not shown optimistically before the server responds.

## Full review disposition

- **🎨 Spacing/type:** preserved the established section spacing and token system; repaired
  oversized card metrics and constrained long-form reading width. Package metadata wraps
  before the badge or label is compressed beyond legibility.
- **♿ Contrast:** normal small accent on canvas measures 4.95:1; muted text on canvas
  5.04:1; dark-scope faint text 5.79:1. The new input border `#7c7c7c` measures 3.83:1
  against the `#f5f5f5` field surface. Existing flame is suitable for large text on canvas
  at about 3.002:1, not ordinary small body copy. These checks are not a full WCAG audit.
- **♿/📱 Targets:** shared buttons, footer navigation, social links, breadcrumbs, service
  links and table links have 44×44 CSS-pixel minimum hit areas. The user's 44px target
  is a stricter project choice than WCAG 2.2 AA's general 24px minimum with exceptions.
- **📱 Viewport/safe areas:** retained unrestricted zoom and added `viewport-fit=cover`;
  shared gutters, header and menu account for safe-area insets. Existing stable `svh`
  hero sizing stays appropriate for content; the full-screen menu uses dynamic `dvh`.
- **📱 Short screens:** process cards are ordinary flowing blocks on phones and short
  landscape viewports. Sticky/scroll-driven stacking applies only from 64rem width and
  45rem height, so tall cards do not cover content on smaller screens.
- **♿ Keyboard:** verified menu wrap, Escape, focus return, same-route closing, desktop
  resize cleanup and first-invalid-field focus. Existing global visible focus styling and
  sticky-header scroll clearance remain. FAQ uses native details/summary.
- **📱 Forms:** measured form input font size is 16px. Existing native select controls,
  labels, placeholders and described errors remain.
- **⚡ Images/fonts:** existing next/image dimensions, decorative alt handling, reserved
  aspect ratios and the Geist swap strategy remain. No image preload or dynamic import
  was added without evidence of a benefit. Lucide imports remain named; lint passes.
- **⚡ Motion:** geometry is read before pointer style writes; `will-change` is applied
  only to an active tilt card. Pointer effects reset when leaving and when motion
  preferences change. Scroll-reveal animations cancel, counters settle, and WebGL renders
  a still frame when reduced motion is enabled during a visit. Reduced-motion changes
  were reviewed in source; OS preference switching was not emulated by the browser test.

## Prioritized fix list

| # | Fix | Tag | Impact | Effort | Resulting source |
|---|---|---|---|---|---|
| 1 | Modal mobile menu, focus loop, Escape and resize cleanup | ♿ 📱 | High | M | `src/components/layout/Header.tsx:24` |
| 2 | Fluid audience and campaign metrics | 📱 🎨 | High | S | `src/app/globals.css:223`, `StatsBand.tsx`, `CampaignHighlights.tsx` |
| 3 | Shrinkable hero tracks and fluid contact decoration | 📱 | High | S | `src/components/layout/PageHero.tsx`, `src/app/contact/page.tsx:50` |
| 4 | 44px shared navigation/control targets | ♿ 📱 | High | M | `src/app/globals.css:166`, shared Button/SocialLinks/Breadcrumbs/footer |
| 5 | First-error focus, pending state and bounded requests | ♿ | Medium | S | `src/components/contact/ContactForm.tsx:91` |
| 6 | Restore narrow reading containers and safe gutters | 🎨 📱 | Medium | S | `src/components/ui/Container.tsx`, `src/app/privacy/page.tsx` |
| 7 | Wrap package formats and badges | 📱 🎨 | Medium | S | `src/components/marketing/Packages.tsx:53` |
| 8 | Higher-contrast input boundaries | ♿ | Medium | S | `src/app/globals.css:230` |
| 9 | Flow process cards on short screens | 📱 | Medium | S | `src/components/home/Process.tsx:50`, `src/app/globals.css:517` |
| 10 | Reduced-motion updates and pointer/compositing cleanup | ⚡ ♿ | Medium | M | `RevealScript.tsx`, `Counter.tsx`, `PointerFx.tsx`, `Object3D.tsx` |

## Test matrix and results

Checked `/`, `/development`, both development detail pages, `/marketing`, `/work`,
`/about`, `/contact` and `/privacy` in the in-app browser against the production build.

| CSS viewport width | Routes checked | Text/page overflow | Visible control minimums |
|---|---|---|---|
| 320 | 9 | Pass | Pass |
| 375 | 9 | Pass | Pass |
| 390 | 9 | Pass | Pass |
| 414 | 9 | Pass | Pass |
| 768 | 9 | Pass | Pass |
| 1024 | 9 | Pass | Pass |
| 1280 | 9 | Pass | Pass |
| 1536 | 9 | Pass | Pass |

All 72 viewport/route combinations passed. Checks excluded decorative/hidden elements
and the intentionally horizontally scrollable comparison table from text-overflow errors;
table links were included in target-size checks. Short landscape at 812×375 also showed no
page overflow and confirmed static process cards. This is viewport testing, not physical
iPhone/Android or Safari certification. Safe-area values were not tested on a real notched device.

`npm run lint` and `npm run build -- --webpack` pass, including TypeScript and prerendering.
The existing `npm run check:seo` suite passed after the interaction/motion changes; the
subsequent container-only fix was verified by the full browser matrix. All nine public
routes remain prerendered. No field CWV improvement is claimed without production data.

Invalid empty form submission was tested without sending an inquiry. Network failure,
delivery success and real email receipt were not exercised against the live mail provider;
their UI branches were reviewed in code. Existing SEO work and business metrics remain.

## Visual upgrade and ribbon follow-up

The subsequent visual pass adds a new homepage composition: “Built to ship. Made to
shout.” with a framed orbital Ship/Shout figure, a compact statistics row, and clearer
primary/secondary actions. Section headings now scale fluidly; service paths have quieter
hover surfaces and visible keyboard treatment. Showcase previews gain subtle tonal depth.
All colors continue to use the established tokens. Copy is shared through `homeHero`.

The supplied ribbon markup exposed two connected defects: the tapes shared a vertical
center, and the reduced-motion fallback wrapped their entire contents while leaving the
tapes rotated. At a narrow viewport, the front tape became a tall skewed panel obscuring
the back tape. Both tapes now participate in normal document flow. Phones get separate
rows; desktop adds gentle angles with enough vertical clearance.

`Marquee.tsx` now uses two identical groups instead of mixing individual items with one
nested copy. Each group covers at least the marquee viewport. A half-track translation
therefore returns to an identical group without exposing an empty end. Reduced motion
shows an unrotated 2/3/5-column roster, hides the duplicate copy and stops animation.
The small `RibbonStage.tsx` island provides Play/Pause/Resume; motion under a reduced-motion
preference starts only after an explicit Play action. The host's preference is not changed.

Validation of this final visual pass:

- Lint, TypeScript and `npm run build -- --webpack` pass.
- The complete nine-page SEO response suite passes, including social image routes.
- All 72 viewport/page combinations pass again at 320, 375, 390, 414, 768, 1024, 1280
  and 1536px: no detected page/text overflow or undersized visible controls.
- The browser's actual reduced-motion preference was enabled. Both ribbon sections were
  checked for separated rows, fitting labels and hidden duplicate copies at all eight widths.
- Six additional animated checks cover home and development at 320, 768 and 1536px after
  explicit Play: both groups have equal widths, cover their viewport and run; rows remain
  separated. Pause and Resume were exercised in the UI and update both tracks.
- Desktop and mobile screenshots were visually inspected. Physical-device Safari testing
  and production field CWV measurements remain outside these browser viewport checks.

The implementation is in `src/app/visual-polish.css`, the homepage Hero, the shared
Ribbons/Marquee components and the RibbonStage control island. No dependency was added.
