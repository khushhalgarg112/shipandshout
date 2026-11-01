import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { brands, campaignHighlights } from "@/config/site";


/** "1,234 reactions · 56 comments" → ["1,234 reactions", "56 comments"] */
const splitResult = (result: string) => result.split(" · ");

export function CampaignHighlights({
  eyebrow = "04 — Receipts",
  id,
}: {
  eyebrow?: string;
  id?: string;
}) {
  return (
    <Section id={id}>
      <SectionHeading
        align="split"
        eyebrow={eyebrow}
        title="Numbers from real campaigns."
        lead="No invented testimonials. Every figure below comes from a public post you can open, scroll and check yourself."
      />
      <div className="grid gap-5 md:grid-cols-3">
        {campaignHighlights.map((item, i) => {
          const [primary, secondary] = splitResult(item.result);
          return (
            <Reveal key={item.brand} variant="tilt" delay={i * 0.08} className="h-full">
              <article
                data-tilt="7"
                className="tilt group relative flex h-full min-h-80 flex-col overflow-hidden rounded-[1.75rem] border hairline bg-card p-7 sm:p-8"
              >
                <span className="tilt-glare" />
                <span
                  aria-hidden
                  className="absolute -right-10 -bottom-10 size-40 rounded-full bg-flame/15 blur-2xl transition-transform duration-700 ease-out-expo group-hover:scale-150"
                />
                <p className="text-xs font-medium text-ink-faint">{item.format}</p>
                <p className="text-display mt-6 text-5xl text-ink">{primary}</p>
                {secondary ? <p className="mt-2 text-lg text-flame-deep">{secondary}</p> : null}
                <div className="mt-auto border-t hairline pt-5">
                  <h3 className="font-semibold text-ink">{item.brand}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{item.note}</p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      {/* Live sponsored posts — open any of them and check the numbers. */}
      <Reveal className="mt-14">
        <h3 className="text-eyebrow">Read the live campaigns</h3>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {brands.map((brand) => (
            <li key={brand.name}>
              <a
                href={brand.post}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-line-strong bg-card p-4 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ink"
              >
                <BrandLogo brand={brand} size={44} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-ink">{brand.name}</span>
                  <span className="block text-xs text-ink-faint">LinkedIn post</span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden
                  className="shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame-deep"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
