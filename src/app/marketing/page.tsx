import { Hero } from "@/components/marketing/Hero";
import { Audience } from "@/components/marketing/Audience";
import { Packages } from "@/components/marketing/Packages";
import { CampaignTimeline } from "@/components/marketing/CampaignTimeline";
import { Faq } from "@/components/marketing/Faq";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd, serviceLd, webPageLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { audience, engines, marketingFaqs, marketingPackages, site } from "@/config/site";

const combined = `${audience.combined.value}${audience.combined.suffix}`;
const title = "Creator Marketing & Sponsored Posts";
const description = "Book sponsored LinkedIn posts and X campaigns for AI and SaaS launches. Explore formats, review steps and campaign reporting.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/marketing",
  keywords: [
    "sponsored LinkedIn posts",
    "tech influencer marketing",
    "developer marketing agency",
    "B2B creator campaigns",
    "sponsored X threads",
  ],
});

const allPackages = [...marketingPackages.linkedin, ...marketingPackages.x];

export default function MarketingPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ path: "/marketing", name: `${title} — ${site.name}`, description }),
          serviceLd({
            name: engines.shout.name,
            serviceType: "Creator-led marketing and sponsored content",
            description,
            path: "/marketing",
            offers: allPackages.map((pkg) => ({
              name: pkg.name,
              description: pkg.description,
              url: `${site.url}/marketing#packages`,
            })),
          }),
          faqLd(marketingFaqs),
        ]}
      />
      <Hero />
      <Audience />
      <Packages />
      <CampaignTimeline />
      <Faq />
      <CtaBand
        title={`Creator channels with ${combined} combined followers.`}
        lead="One brief, one honest post, and a recap that shows exactly what it did."
        shape="waves"
        secondary={{ label: "Need it built first?", href: engines.ship.href }}
      />
    </>
  );
}
