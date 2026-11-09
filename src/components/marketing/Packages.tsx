import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { audience, marketingPackages } from "@/config/site";

const groups = [
  {
    title: "LinkedIn",
    note: `${audience.linkedin.followers} followers`,
    packages: marketingPackages.linkedin,
  },
  {
    title: "X / Twitter",
    note: `${audience.x.followers} followers`,
    packages: marketingPackages.x,
  },
] as const;

export function Packages() {
  return (
    <Section id="packages" className="border-t hairline">
      <SectionHeading
        align="split"
        eyebrow="02 — Packages"
        title="Pick a format. We'll quote the launch."
        lead="Every campaign is priced around your goals, timing and audience fit — so there's no rate card. Choose a starting point, send a short brief, and you'll have a tailored quote within 24 hours."
      />

      <div className="space-y-16">
        {groups.map((group) => (
          <div key={group.title}>
            <Reveal className="mb-6 flex items-baseline gap-4">
              <h3 className="text-display text-xl text-ink sm:text-2xl">{group.title}</h3>
              <span className="font-mono text-xs text-ink-faint">{group.note}</span>
              <span aria-hidden className="h-px flex-1 self-center bg-line" />
            </Reveal>

            <div className="grid gap-5 md:grid-cols-3">
              {group.packages.map((pkg, i) => (
                <Reveal key={pkg.name} delay={i * 0.08} className="h-full">
                  <article
                    data-tilt="5"
                    className={cn(
                      "surface tilt relative flex h-full flex-col overflow-hidden p-7 hover:border-line-strong sm:p-8",
                      pkg.highlight && "night glow-flame",
                    )}
                  >
                    <span className="tilt-glare" />
                    <div className="package-labels flex items-start justify-between gap-3">
                      <p className="min-w-0 font-mono text-xs tracking-wide text-ink-faint">{pkg.format}</p>
                      {pkg.highlight ? (
                        <Badge tone="flame" className="shrink-0 whitespace-nowrap">
                          Most booked
                        </Badge>
                      ) : null}
                    </div>
                    <h4 className="text-display mt-6 text-3xl text-ink">{pkg.name}</h4>
                    <p className="mt-3 text-sm font-medium text-flame-deep">Custom quote</p>
                    <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                      {pkg.description}
                    </p>
                    <ul className="mt-6 flex-1 space-y-2.5">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 text-sm text-ink-muted"
                        >
                          <Check
                            size={18}
                            aria-hidden
                            className="mt-0.5 shrink-0 text-ink-faint"
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={pkg.highlight ? "flame" : "secondary"}
                      href="/contact"
                      className="mt-8 w-full"
                    >
                      Get a quote
                    </Button>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
