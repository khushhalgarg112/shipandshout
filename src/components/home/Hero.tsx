import { Container } from "@/components/ui/Container";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Object3D } from "@/components/three/Object3D";
import { audience, devServices, engines, site } from "@/config/site";
import { cn } from "@/lib/cn";

const partnerships = audience.stats[3];

const heroStats = [
  { value: audience.linkedin.followers, label: "LinkedIn followers" },
  { value: audience.x.followers, label: "X followers" },
  { value: `${partnerships.value}${partnerships.suffix}`, label: partnerships.label },
];

/** Floating labels orbiting the 3D object — parallax depth via --depth. */
const chips = [
  { text: devServices[2].deliverables[0], className: "right-[4%] top-[12%]", depth: "18px", delay: "-2s" },
  { text: `${audience.combined.value}${audience.combined.suffix} reach`, className: "right-[-2%] top-[46%]", depth: "-26px", delay: "0s" },
  { text: `${engines.ship.label} → ${engines.shout.label}`, className: "right-[18%] bottom-[12%]", depth: "-34px", delay: "-4s" },
  { text: "Next.js · React Native", className: "left-[10%] bottom-[18%]", depth: "24px", delay: "-1s" },
];

/** Headline lines animate in with a CSS mask (no JS) so the LCP text paints immediately. */
function Line({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.06em]">
      <span className="block animate-line-up" style={{ animationDelay: `${delay}ms` }}>
        {children}
      </span>
    </span>
  );
}

/**
 * Full-width headline with the live 3D object docked to the right of the
 * shorter second and third lines (stacked below the copy on small screens).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-center pt-10 pb-16 sm:pt-14 lg:pb-24">
        <p className="relative z-10 animate-fade-up text-eyebrow">Product studio × creator distribution</p>

        <h1 className="text-display relative z-10 mt-6 text-[clamp(3.1rem,9.2vw,9.5rem)] text-ink">
          <Line delay={60}>We ship products.</Line>
          <Line delay={140}>Then we make</Line>
          <Line delay={220}>
            them <span className="text-flame">loud.</span>
          </Line>
        </h1>

        <div className="relative z-10 mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,34rem)_1fr]">
          <div>
            <p
              className="animate-fade-up text-base leading-relaxed text-ink-muted sm:text-lg"
              style={{ animationDelay: "320ms" }}
            >
              {site.description}
            </p>
            <div
              className="mt-9 flex animate-fade-up flex-wrap items-center gap-3"
              style={{ animationDelay: "400ms" }}
            >
              <Button size="lg" href="/contact">
                Start a project
                <ButtonArrow />
              </Button>
              <Button size="lg" variant="secondary" href="/work">
                See the work
              </Button>
            </div>
          </div>
          <ul
            className="flex animate-fade-up flex-wrap gap-x-10 gap-y-4 self-end border-t hairline pt-6 lg:justify-self-end lg:border-t-0 lg:pt-0"
            style={{ animationDelay: "480ms" }}
          >
            {heroStats.map((stat) => (
              <li key={stat.label}>
                <p className="text-display text-3xl text-ink sm:text-4xl">{stat.value}</p>
                <p className="mt-1 text-xs text-ink-faint">{stat.label}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* 3D object + orbiting chips: in flow on mobile, docked right on desktop. */}
        <div
          className="relative mx-auto mt-6 w-full max-w-[30rem] animate-fade-up lg:absolute lg:top-[17%] lg:right-[-3%] lg:mt-0 lg:w-[44%] lg:max-w-[42rem]"
          style={{ animationDelay: "200ms" }}
        >
          <Object3D shape="orb" className="w-full" />
          <div aria-hidden className="pointer-events-none absolute inset-0 hidden sm:block">
            {chips.map((chip) => (
              <span
                key={chip.text}
                className={cn("parallax absolute", chip.className)}
                style={{ "--depth": chip.depth } as React.CSSProperties}
              >
                <span
                  className="block animate-float rounded-full border border-line-strong bg-card/80 px-4 py-2 text-sm font-medium whitespace-nowrap text-ink shadow-[0_18px_40px_-20px_rgb(0_0_0/0.35)] backdrop-blur-md"
                  style={{ animationDelay: chip.delay }}
                >
                  {chip.text}
                </span>
              </span>
            ))}
          </div>
        </div>
      </Container>

      {/* Scroll cue */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center lg:flex">
        <div className="flex h-10 w-6 justify-center rounded-full border border-line-strong pt-2">
          <span className="h-2 w-px animate-blink rounded-full bg-ink-muted" />
        </div>
      </div>
    </section>
  );
}
