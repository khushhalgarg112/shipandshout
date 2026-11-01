import { devServices, engines, founder, site, type Faq } from "@/config/site";

/**
 * Schema.org builders. Entities reference each other by `@id` so search
 * engines can stitch the graph: WebSite → publisher → Organization → founder.
 */

type Thing = Record<string, unknown>;

export const ids = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  founder: `${site.url}/#founder`,
} as const;

/** Matches Next's canonical output: no trailing slash on the root. */
const abs = (path: string) => (path === "/" ? site.url : `${site.url}${path}`);

export function organizationLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ids.organization,
    name: site.name,
    alternateName: site.shortName,
    url: abs("/"),
    logo: {
      "@type": "ImageObject",
      url: `${site.url}/apple-icon`,
      width: 180,
      height: 180,
    },
    image: `${site.url}/opengraph-image`,
    slogan: site.tagline,
    description: site.description,
    email: site.email,
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: "Worldwide",
    knowsAbout: [...devServices.map((service) => service.title), engines.shout.name],
    founder: { "@id": ids.founder },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      url: abs("/contact"),
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [site.links.x, site.links.linkedin, site.links.passionfroot],
  };
}

export function founderLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": ids.founder,
    name: founder.name,
    alternateName: founder.displayName,
    jobTitle: founder.role,
    description: founder.bio,
    worksFor: { "@id": ids.organization },
    sameAs: [site.links.x, site.links.linkedin, site.links.passionfroot],
  };
}

export function websiteLd(): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    name: site.name,
    url: abs("/"),
    description: site.description,
    inLanguage: "en",
    publisher: { "@id": ids.organization },
  };
}

export function webPageLd({
  type = "WebPage",
  path,
  name,
  description,
}: {
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
}): Thing {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.organization },
  };
}

export function breadcrumbLd(trail: readonly { name: string; path: string }[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  };
}

export function faqLd(items: readonly Faq[]): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

type OfferInput = { name: string; description: string; url: string; price?: string };

/** "$1,275" → "1275"; undefined when the string isn't a USD amount. */
function usd(price?: string): string | undefined {
  const match = price?.match(/^\$([\d,]+(?:\.\d+)?)$/);
  return match ? match[1].replaceAll(",", "") : undefined;
}

export function serviceLd({
  name,
  serviceType,
  description,
  path,
  offers,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
  offers: readonly OfferInput[];
}): Thing {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    serviceType,
    description,
    url: abs(path),
    areaServed: "Worldwide",
    provider: { "@id": ids.organization },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: offers.map((offer) => {
        const amount = usd(offer.price);
        return {
          "@type": "Offer",
          url: offer.url,
          ...(amount ? { price: amount, priceCurrency: "USD" } : {}),
          itemOffered: {
            "@type": "Service",
            name: offer.name,
            description: offer.description,
          },
        };
      }),
    },
  };
}
