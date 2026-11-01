import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { audience } from "@/config/site";
import { cn } from "@/lib/cn";

const steps = [
  {
    number: "01",
    title: "Discover",
    copy: "Scope, users and architecture mapped in week one. You get a written plan with real estimates, not a slide deck.",
    tone: "bg-card",
  },
  {
    number: "02",
    title: "Design",
    copy: "The design system and flows land before any code does. You approve every screen while changes are still cheap.",
    tone: "bg-sunken",
  },
  {
    number: "03",
    title: "Build",
    copy: "Weekly sprints that end in shippable software. Demos every Friday, from the first week to the last.",
    tone: "night",
  },
  {
    number: "04",
    title: "Amplify",
    copy: `Launch content goes out to ${audience.combined.value}${audience.combined.suffix} people the day you ship. Distribution is part of the build, not an afterthought.`,
    tone: "bg-flame text-flame-ink",
  },
] as const;

/**
 * Sticky card stack: each step pins under the header and the next one slides
 * over it; where scroll-driven animations exist, covered cards tip back in 3D.
 */
export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        align="split"
        eyebrow="03 — How we work"
        title="From first call to front page."
        lead="One team owns the product from scoping to launch day. Four steps, the same on every engagement."
      />
      <ol className="stack relative">
        {steps.map((step, i) => (
          <li
            key={step.number}
            className="sticky mb-6 last:mb-0"
            style={{ top: `calc(5.5rem + ${i * 1.25}rem)`, "--i": i } as React.CSSProperties}
          >
            <article
              className={cn(
                "stack-card grid min-h-[22rem] gap-8 rounded-[2rem] border hairline p-8 shadow-[0_-20px_60px_-30px_rgb(0_0_0/0.25)] sm:grid-cols-[1fr_1.2fr] sm:p-12",
                step.tone,
              )}
            >
              <div className="flex flex-col justify-between gap-6">
                <span className="text-sm font-semibold">Step {step.number}</span>
                <h3 className="text-display text-6xl sm:text-8xl">{step.title}</h3>
              </div>
              <div className="flex flex-col justify-end gap-6">
                {/* Decorative numeral via CSS content — not text, so it stays out of the a11y tree. */}
                <span
                  aria-hidden
                  data-num={step.number}
                  className="text-display text-[7rem] leading-none opacity-15 before:content-[attr(data-num)] sm:self-end sm:text-[10rem]"
                />
                <p className="max-w-md text-lg leading-relaxed">{step.copy}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
