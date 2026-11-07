import Link from "next/link";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Rings } from "@/components/three/Rings";
import { IsoStack } from "@/components/three/IsoStack";
import { audience, devServices, engines, founder } from "@/config/site";

const shoutChecklist = [
  "Sponsored LinkedIn posts",
  "Educational X threads",
  "Launch-day boosts",
  "Campaign performance reports",
] as const;

const shoutStats = [
  { value: audience.linkedin.followers, label: "LinkedIn" },
  { value: audience.x.followers, label: "X" },
  {
    value: `${audience.stats[2].value}${audience.stats[2].suffix}`,
    label: "X engagement",
  },
] as const;

function CardLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-auto inline-flex items-center gap-3 pt-10 text-sm font-semibold after:absolute after:inset-0 after:rounded-[inherit]"
    >
      <span className="flex size-11 items-center justify-center rounded-full bg-flame text-flame-ink transition-transform duration-500 ease-out-expo group-hover:rotate-[-45deg]">
        →
      </span>
      {children}
    </Link>
  );
}

/** The two halves of the agency as 3D-tilt cards: Shout (dark) and Ship (light). */
export function Pillars() {
  const combined = `${audience.combined.value}${audience.combined.suffix}`;

  return (
    <Section id="what-we-do">
      <SectionHeading
        align="split"
        eyebrow="01 — What we do"
        title="Two engines. One flywheel."
        lead={`One team builds the product. The other plans its launch through creator channels with ${combined} combined followers. Product engineering and creator-led distribution work together from the brief onward.`}
      />

      <div className="grid gap-5 lg:grid-cols-2">
        <Reveal variant="tilt" className="h-full">
          <article
            data-tilt="5"
            className="tilt group night relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[2rem] p-8 sm:p-10"
          >
            <span className="tilt-glare" />
            <Rings className="absolute -top-20 -right-24 size-96 sm:size-[28rem]" />
            <Badge tone="flame" className="self-start">
              {engines.shout.label.toUpperCase()}
            </Badge>
            <h3 className="text-display mt-6 max-w-xs text-4xl text-ink sm:text-5xl">
              Creator marketing
            </h3>
            <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
              Sponsored campaigns through LinkedIn and X channels with {combined} combined followers — written
              in {founder.displayName}&rsquo;s voice, reviewed with you before publishing, and
              reported with real numbers.
            </p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {shoutChecklist.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-ink-muted">
                  <Check size={18} aria-hidden className="mt-0.5 shrink-0 text-flame" />
                  {item}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t hairline pt-6">
              {shoutStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <dt className="order-2 mt-1 text-xs text-ink-faint">{stat.label}</dt>
                  <dd className="order-1 text-display text-2xl text-ink sm:text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
            <CardLink href={engines.shout.href}>Explore marketing</CardLink>
          </article>
        </Reveal>

        <Reveal variant="tilt" delay={0.1} className="h-full">
          <article
            data-tilt="5"
            className="tilt group relative flex h-full min-h-[34rem] flex-col overflow-hidden rounded-[2rem] border hairline bg-card p-8 sm:p-10"
          >
            <span className="tilt-glare" />
            <IsoStack className="absolute top-6 right-6 size-40 sm:top-8 sm:right-10 sm:size-48" />
            <Badge className="self-start">{engines.ship.label.toUpperCase()}</Badge>
            <h3 className="text-display mt-6 max-w-xs text-4xl text-ink sm:text-5xl">
              Product engineering
            </h3>
            <p className="mt-5 max-w-md leading-relaxed text-ink-muted">
              A senior product team that takes work from spec to shipped — web, mobile, SaaS and
              the systems behind them — built so your own engineers can extend it, not rewrite it.
            </p>
            <ul className="relative z-10 mt-7 flex flex-wrap gap-2">
              {devServices.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/development#${service.slug}`}
                    className="touch-target relative z-10 inline-block rounded-full border border-line-strong px-3.5 py-1.5 text-sm text-ink-muted transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
            <CardLink href={engines.ship.href}>Explore development</CardLink>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
