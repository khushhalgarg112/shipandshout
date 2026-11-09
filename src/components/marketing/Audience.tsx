import { ArrowUpRight, AtSign, Briefcase } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { GeoBars } from "./GeoBars";
import { site, founder, audience } from "@/config/site";

/** "42K avg. impressions" → ["42K", "avg. impressions"] for typographic contrast. */
function splitStat(stat: string): [string, string] {
  const i = stat.indexOf(" ");
  return [stat.slice(0, i), stat.slice(i + 1)];
}

const platforms = [
  {
    name: "LinkedIn",
    href: site.links.linkedin,
    icon: Briefcase,
    followers: audience.linkedin.followers,
    stats: [audience.linkedin.impressions, audience.linkedin.engagement],
  },
  {
    name: "X / Twitter",
    href: site.links.x,
    icon: AtSign,
    followers: audience.x.followers,
    stats: [audience.x.impressions, audience.x.engagement],
  },
] as const;

export function Audience() {
  return (
    <Section id="audience" className="border-t hairline">
      <SectionHeading
        eyebrow="01 — The audience"
        title="The creator channels behind your campaign."
        lead={`The numbers below come straight from the public media kit — the same ones every brand sees before booking ${founder.displayName}.`}
      />
      <p className="mb-8 text-sm leading-relaxed text-ink-muted">
        <a href={site.links.passionfroot} target="_blank" rel="noopener noreferrer" className="touch-target font-medium text-ink underline underline-offset-4">
          View the source media kit
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        . Combined followers are the sum of platform counts, which may overlap. They are not
        unique reach or guaranteed campaign impressions. Check the media kit for current figures.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        {platforms.map((platform, i) => (
          <Reveal key={platform.name} delay={i * 0.08} className="h-full">
            <article className="surface flex h-full flex-col p-6 transition-colors hover:border-line-strong sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line bg-sunken text-flame">
                    <platform.icon size={22} aria-hidden />
                  </span>
                  <h3 className="text-display text-xl text-ink">{platform.name}</h3>
                </div>
                <a
                  href={platform.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${founder.displayName} on ${platform.name}`}
                  className="-m-2 flex size-11 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-sunken hover:text-flame-deep"
                >
                  <ArrowUpRight size={18} aria-hidden />
                </a>
              </div>

              <p className="mt-8 text-display text-5xl text-ink">{platform.followers}</p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                followers
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-4 border-t hairline pt-6">
                {platform.stats.map((stat) => {
                  const [value, label] = splitStat(stat);
                  return (
                    <div key={stat} className="flex flex-col">
                      <dt className="order-2 mt-1 text-xs text-ink-faint">{label}</dt>
                      <dd className="order-1 font-mono text-lg text-ink">{value}</dd>
                    </div>
                  );
                })}
              </dl>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 max-w-3xl">
        <h3 className="text-display text-xl text-ink sm:text-2xl">
          Where the audience lives
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Follower geography, as reported in the media kit. Majority US and UK —
          useful if that is where your customers are.
        </p>
        <div className="mt-8">
          <GeoBars />
        </div>
      </Reveal>
    </Section>
  );
}
