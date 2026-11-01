import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { LogoMarquee } from "@/components/home/LogoMarquee";
import { Pillars } from "@/components/home/Pillars";
import { Paths } from "@/components/home/Paths";
import { StatsBand } from "@/components/home/StatsBand";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Process } from "@/components/home/Process";
import { CampaignHighlights } from "@/components/home/CampaignHighlights";
import { FounderSplit } from "@/components/home/FounderSplit";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";

const seo = pageMetadata({
  title: site.seoTitle,
  description: site.metaDescription,
  path: "/",
});

const homeTitle = `${site.name} — ${site.seoTitle}`;

// The home page leads with the brand rather than using the title template.
export const metadata: Metadata = {
  ...seo,
  title: { absolute: homeTitle },
  openGraph: { ...seo.openGraph, title: `${site.name} — ${site.tagline}` },
  twitter: { ...seo.twitter, title: homeTitle },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={webPageLd({ path: "/", name: homeTitle, description: site.description })}
      />
      <Hero />
      <LogoMarquee />
      <Pillars />
      <Paths />
      <div className="night">
        <StatsBand />
        <FeaturedWork />
      </div>
      <Process />
      <CampaignHighlights />
      <FounderSplit />
      <CtaBand secondary={{ label: "See the work", href: "/work" }} />
    </>
  );
}
