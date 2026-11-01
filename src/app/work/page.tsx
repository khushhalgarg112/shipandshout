import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { DeviceStack } from "@/components/three/DeviceStack";
import { ShowcaseCard } from "@/components/work/ShowcaseCard";
import { BrandGrid } from "@/components/work/BrandGrid";
import { CampaignHighlights } from "@/components/home/CampaignHighlights";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { audience, brandPartnerships, engines, showcase, site } from "@/config/site";

const combined = `${audience.combined.value}${audience.combined.suffix}`;
const title = "Work & Campaign Results";
const description = `Sponsored-campaign results from ${brandPartnerships} brand partnerships in front of ${combined} tech professionals, plus the web, mobile and AI products we ship.`;

export const metadata = pageMetadata({
  title,
  description,
  path: "/work",
  keywords: ["agency portfolio", "sponsored post results", "SaaS case studies", "creator campaign results"],
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({ type: "CollectionPage", path: "/work", name: `${title} — ${site.name}`, description })}
      />
      <PageHero
        crumb={{ name: "Work", path: "/work" }}
        eyebrow="The proof"
        title={
          <>
            Shipped and <span className="text-flame">shouted.</span>
          </>
        }
        lead={
          <p>
            Creator campaigns for {brandPartnerships} brands, plus the products our
            engineering team builds behind the scenes. Public numbers on the marketing side, real
            architecture on the build side — no invented testimonials, no stock screenshots.
          </p>
        }
        actions={
          <>
            <Button href="#receipts" size="lg">
              Campaign receipts
              <ButtonArrow />
            </Button>
            <Button href="#builds" variant="secondary" size="lg">
              Capability builds
            </Button>
          </>
        }
        visual={
          <div className="night rounded-[2rem] px-4 py-14 sm:px-8">
            <DeviceStack />
          </div>
        }
      />

      <CampaignHighlights id="receipts" eyebrow="01 — Campaign receipts" />

      <div className="night">
        <Section id="builds">
          <SectionHeading
            align="split"
            eyebrow={`02 — What the ${engines.ship.label} side builds`}
            title="Capability builds."
            lead="Four archetypes, spec to production. Each preview is drawn in our own design system — client work stays confidential; the same care goes into yours."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {showcase.map((item, i) => (
              <Reveal key={item.slug} delay={(i % 2) * 0.08} className="h-full">
                <ShowcaseCard item={item} />
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 flex justify-center">
            <Button variant="secondary" size="lg" href={engines.ship.href}>
              Explore development services
              <ButtonArrow />
            </Button>
          </Reveal>
        </Section>
      </div>

      <BrandGrid eyebrow="03 — The roster" />

      <CtaBand shape="orb" secondary={{ label: "See campaign packages", href: "/marketing#packages" }} />
    </>
  );
}
