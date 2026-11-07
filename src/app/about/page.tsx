import { ArrowUpRight, Code, PenTool, ShieldCheck } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Cube } from "@/components/three/Cube";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site, founder, audience, engines } from "@/config/site";

const combinedAudience = `${audience.combined.value}${audience.combined.suffix}`;
const partnerships = audience.stats[3];

const title = `About ${founder.name} & the Team`;
const description = `Meet ${founder.name} and the team behind ${site.name}, combining product engineering with creator-led distribution for product launches.`;

export const metadata = pageMetadata({
  title,
  description,
  path: "/about",
  keywords: [`${site.name} founder`, founder.name, "creator-led agency", "AI creator"],
});

const timeline = [
  {
    year: "2022",
    title: "First posts on X",
    body: `${founder.handle} starts sharing builds, bugs and lessons on X. No content strategy — just an engineer writing down what actually works.`,
  },
  {
    year: "2023",
    title: "The Python education era",
    body: "LinkedIn becomes a classroom. Python explainers and career posts routinely pull 100+ comments, and the audience starts compounding.",
  },
  {
    year: "2024",
    title: "Six figures, first campaigns",
    body: "The combined audience crosses six figures. The first brands ask for sponsored posts — and the posts hold their own against paid ads.",
  },
  {
    year: "2025",
    title: "Distribution becomes a business",
    body: `${partnerships.value}${partnerships.suffix} AI and SaaS brand partnerships and a 5,000+ member Telegram community make one thing obvious: attention is only half the job.`,
  },
  {
    year: String(site.founded),
    title: `${site.name} opens shop`,
    body: "Distribution finally pairs with a senior engineering team. Build the product, then put it in front of the people who need it — one roof, two jobs.",
  },
] as const;

const values = [
  {
    title: "Ship real things",
    body: "Demos are easy; production is the test. We measure ourselves on software that survives real users, real data and real load.",
  },
  {
    title: "Numbers over noise",
    body: "Every campaign ships with a report and every build ships with metrics. If we can't measure it, we don't claim it.",
  },
  {
    title: "Teach while we sell",
    body: "The audience exists because the content taught people something. Sponsored work follows the same rule — useful first, promotional second.",
  },
  {
    title: "Quiet craft, loud results",
    body: "The engineering team stays heads-down while the work does the talking. Then the distribution side makes sure the right people hear it.",
  },
] as const;

const founderSocials = [
  { label: "X", href: site.links.x },
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "Passionfroot", href: site.links.passionfroot },
] as const;

const crew = [
  { label: "Design", icon: PenTool },
  { label: "Engineering", icon: Code },
  { label: "QA & release", icon: ShieldCheck },
] as const;

const founderInitials = founder.name
  .split(" ")
  .map((word) => word.charAt(0))
  .join("");

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({ type: "AboutPage", path: "/about", name: `${title} — ${site.name}`, description })}
      />

      <PageHero
        crumb={{ name: "About", path: "/about" }}
        eyebrow="About"
        title={
          <>
            About {site.name} and <span className="text-flame">{founder.name}.</span>
          </>
        }
        lead={
          <p>
            {site.name} didn&apos;t start as an agency. It started with one engineer posting what
            he learned — and grew to {combinedAudience} combined followers across LinkedIn and X.
          </p>
        }
        visual={
          <Cube
            faces={[engines.ship.label, engines.shout.label, "Build", "Launch", "&", "Learn"]}
            size="11rem"
            className="h-80 sm:h-96"
          />
        }
      />

      <Section>
        <SectionHeading
          align="split"
          eyebrow="01 — Timeline"
          title="From first post to full stack."
          lead="Four years of building in public, compressed."
        />
        <ol className="relative border-t border-ink">
          {timeline.map((item, i) => (
            <Reveal
              as="li"
              key={item.year}
              delay={i * 0.06}
              className="group grid gap-3 border-b hairline py-8 sm:grid-cols-[10rem_1fr_1.4fr] sm:gap-10"
            >
              <p className="text-display text-4xl text-ink-faint transition-colors duration-300 group-hover:text-flame">
                {item.year}
              </p>
              <h3 className="text-display text-2xl text-ink sm:text-3xl">{item.title}</h3>
              <p className="leading-relaxed text-ink-muted">{item.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <div className="night">
        <Section>
          <SectionHeading
            align="split"
            eyebrow="02 — Values"
            title="How we work."
            lead="Four rules that survived every project so far."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {values.map((value, i) => (
              <Reveal key={value.title} variant="tilt" delay={(i % 2) * 0.08} className="h-full">
                <div data-tilt="5" className="surface tilt relative h-full overflow-hidden p-8 sm:p-10">
                  <span className="tilt-glare" />
                  <p className="text-display text-5xl text-flame">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="text-display mt-8 text-3xl text-ink">{value.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-muted">{value.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <SectionHeading
          align="split"
          eyebrow="03 — Faces"
          title="The people behind it."
          lead="One public face. One deliberately quiet team."
        />
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="surface h-full p-8 sm:p-10">
              <div className="flex items-center gap-5">
                <span
                  aria-hidden
                  className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb3a6,var(--color-flame)_45%,#8a1408)] text-display text-2xl text-flame-ink"
                >
                  {founderInitials}
                </span>
                <div>
                  <h3 className="text-display text-3xl text-ink">{founder.displayName}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{founder.role}</p>
                  <p className="mt-1 font-mono text-xs text-ink-faint">{founder.handle}</p>
                </div>
              </div>
              <p className="mt-8 leading-relaxed text-ink-muted">{founder.bio}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {founderSocials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="touch-target inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
                    >
                      {social.label}
                      <ArrowUpRight size={16} aria-hidden />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08} className="h-full">
            <div className="surface h-full p-8 sm:p-10">
              <div className="flex -space-x-3">
                {crew.map(({ label, icon: Icon }) => (
                  <span
                    key={label}
                    aria-hidden
                    className="flex size-16 items-center justify-center rounded-full border border-line bg-ink text-canvas ring-4 ring-card first:bg-flame first:text-flame-ink"
                  >
                    <Icon size={22} />
                  </span>
                ))}
              </div>
              <h3 className="text-display mt-8 text-3xl text-ink">The crew</h3>
              <p className="mt-1 text-sm text-ink-muted">Senior product team — unnamed on purpose</p>
              <p className="mt-6 leading-relaxed text-ink-muted">
                Design, engineering and QA leads who prefer shipping to self-promotion. No personal
                brands, no bench swaps — the same senior people from kickoff to launch. You&apos;ll
                meet them in the work, the standups and the commit history, not the marquee.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {crew.map(({ label }) => (
                  <li
                    key={label}
                    className="rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-medium text-ink-muted"
                  >
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <CtaBand
        title="Enough about us."
        lead="Tell us what you're building. A real person reads every message and replies within 24 hours."
        shape="orb"
        secondary={{ label: "See the work", href: "/work" }}
      />
    </>
  );
}
