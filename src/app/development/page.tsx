import { DevHero } from "@/components/development/DevHero";
import { ServiceGrid } from "@/components/development/ServiceGrid";
import { StackMarquee } from "@/components/development/StackMarquee";
import { EngagementModels } from "@/components/development/EngagementModels";
import { QualityBar } from "@/components/development/QualityBar";
import { DevFaq } from "@/components/development/DevFaq";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqLd, serviceLd, webPageLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { devFaqs, devServices, engines, site } from "@/config/site";

const title = "Web, App & SaaS Development";
const description =
  "Senior team building Next.js web apps, React Native apps and SaaS MVPs — plus SEO, AI integration, hourly development and ongoing maintenance & support.";

export const metadata = pageMetadata({
  title,
  description,
  path: "/development",
  keywords: [
    "Next.js development agency",
    "React Native app development",
    "SaaS MVP development",
    "technical SEO services",
    "AI integration services",
    "hire developers by the hour",
    "website and app maintenance services",
  ],
});

export default function DevelopmentPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageLd({ path: "/development", name: `${title} — ${site.name}`, description }),
          serviceLd({
            name: engines.ship.name,
            serviceType: "Software development",
            description,
            path: "/development",
            offers: devServices.map((service) => ({
              name: service.title,
              description: service.description,
              url: `${site.url}/development#${service.slug}`,
            })),
          }),
          faqLd(devFaqs),
        ]}
      />
      <DevHero />
      <ServiceGrid />
      <StackMarquee />
      <EngagementModels />
      <QualityBar />
      <DevFaq />
      <CtaBand
        title="Have a build in mind?"
        lead="Tell us what you want to ship. You'll get a straight answer on scope, timeline and cost — not a sales deck."
        shape="stack"
        secondary={{ label: `Then make it loud`, href: engines.shout.href }}
      />
    </>
  );
}
