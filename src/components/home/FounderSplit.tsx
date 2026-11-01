import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Cube } from "@/components/three/Cube";
import { engines, founder, site } from "@/config/site";

const founderLinks = [
  { label: "X", href: site.links.x, aria: `${founder.displayName} on X` },
  { label: "LinkedIn", href: site.links.linkedin, aria: `${founder.displayName} on LinkedIn` },
  {
    label: "Passionfroot",
    href: site.links.passionfroot,
    aria: `${founder.displayName} media kit on Passionfroot`,
  },
] as const;

const founderInitials = founder.name
  .split(" ")
  .map((word) => word.charAt(0))
  .join("");

const crew = ["Design systems", "Full-stack engineering", "QA & launch ops"] as const;

export function FounderSplit() {
  return (
    <Section id="who">
      <SectionHeading
        align="split"
        eyebrow="05 — Who's behind it"
        title="A face you know. A team you don't."
        lead={`The ${engines.shout.label} side is public by design. The ${engines.ship.label} side works heads-down and prefers it that way.`}
      />
      <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Reveal className="h-full">
          <article className="surface flex h-full flex-col p-8 sm:p-10">
            <div className="flex items-center gap-5">
              <span
                aria-hidden
                className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb3a6,var(--color-flame)_45%,#8a1408)] text-display text-2xl text-flame-ink shadow-[0_20px_40px_-18px_rgb(255_57_40/0.7)]"
              >
                {founderInitials}
              </span>
              <div>
                <h3 className="text-display text-3xl text-ink">{founder.displayName}</h3>
                <p className="mt-1.5 text-sm text-ink-muted">{founder.role}</p>
              </div>
            </div>
            <p className="mt-8 text-lg leading-relaxed text-ink-muted">{founder.bio}</p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-8">
              {founderLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.aria} (opens in a new tab)`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-4 py-2 text-sm font-medium text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-canvas"
                  >
                    {link.label}
                    <ArrowUpRight size={16} aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
        <Reveal delay={0.08} className="h-full">
          <article className="night relative flex h-full flex-col overflow-hidden rounded-[2rem] p-8 sm:p-10">
            <Cube
              faces={["Design", "Code", "QA", engines.ship.label, "&", "Ops"]}
              size="8rem"
              className="mx-auto my-6"
            />
            <h3 className="text-display mt-6 text-3xl text-ink">The build crew</h3>
            <p className="mt-4 leading-relaxed text-ink-muted">
              Behind every campaign sits a quiet senior product team — design, engineering and QA —
              building the things worth shouting about. They do not post. They ship.
            </p>
            <ul className="mt-6">
              {crew.map((row, i) => (
                <li key={row} className="flex items-baseline gap-4 border-t hairline py-3 text-sm text-ink-muted">
                  <span aria-hidden className="font-mono text-xs text-flame">
                    0{i + 1}
                  </span>
                  {row}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-6">
              <Button variant="secondary" href="/about">
                Meet the team
                <ButtonArrow />
              </Button>
            </div>
          </article>
        </Reveal>
      </div>
    </Section>
  );
}
