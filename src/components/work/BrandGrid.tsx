import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { brandPartnerships, brands, founder, site, type Brand } from "@/config/site";

function BrandRow({ brand, index }: { brand: Brand; index: number }) {
  const body = (
    <>
      <span aria-hidden className="w-6 font-mono text-xs text-ink-faint">
        {String(index + 1).padStart(2, "0")}
      </span>
      <BrandLogo brand={brand} size={44} />
      <span className="min-w-0 flex-1">
        <span className="text-display block text-2xl text-ink sm:text-3xl">{brand.name}</span>
        <span className="mt-0.5 block text-xs text-ink-faint">
          Sponsored LinkedIn post
        </span>
      </span>
    </>
  );

  return (
    <a
      href={brand.post}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 border-b hairline py-5"
    >
      {body}
      <span className="flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-flame-deep">
        <span className="hidden sm:inline">View post</span>
        <span className="flex size-10 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,border-color,color] duration-500 ease-out-expo group-hover:-rotate-45 group-hover:border-flame group-hover:bg-flame group-hover:text-flame-ink">
          <ArrowUpRight size={18} aria-hidden />
        </span>
        <span className="sr-only"> — {brand.name} campaign on LinkedIn (opens in a new tab)</span>
      </span>
    </a>
  );
}

/**
 * Featured client roster with official logos. Every row links straight to
 * the brand's LinkedIn campaign; hovering one row dims the rest (desktop).
 */
export function BrandGrid({ eyebrow }: { eyebrow: string }) {
  return (
    <Section id="campaigns">
      <SectionHeading
        align="split"
        eyebrow={eyebrow}
        title={`Some of our ${brandPartnerships} brand partners.`}
        lead={`Sponsored posts, threads and launch boosts written in ${founder.displayName}’s voice — shipped to people who build with these tools every day. Open any campaign and check the numbers yourself.`}
      />
      <ul className="group/list grid border-t border-ink sm:grid-cols-2 sm:gap-x-12">
        {brands.map((brand, i) => (
          <Reveal
            as="li"
            key={brand.name}
            delay={(i % 2) * 0.06}
            y={16}
            className="transition-opacity duration-300 lg:group-hover/list:opacity-40 lg:hover:opacity-100!"
          >
            <BrandRow brand={brand} index={i} />
          </Reveal>
        ))}
      </ul>
      <Reveal delay={0.2} className="mt-10">
        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-2 text-sm font-semibold text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-300 hover:text-flame-deep"
        >
          See every campaign on LinkedIn
          <span aria-hidden>↗</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}
