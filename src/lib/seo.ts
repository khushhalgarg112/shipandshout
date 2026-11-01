import type { Metadata } from "next";
import { founder, site } from "@/config/site";

type PageSeo = {
  /** Short page title — the layout template appends the brand name. */
  title: string;
  /** ~150–160 characters; used for meta, Open Graph and Twitter. */
  description: string;
  /** Route path, e.g. "/development". Becomes the canonical URL. */
  path: `/${string}`;
  keywords?: readonly string[];
};

/**
 * Complete per-page metadata. Next.js merges `openGraph`/`twitter` shallowly,
 * so each page must restate siteName, locale, url etc. — this helper does it
 * in one place. Share images come from each route's `opengraph-image.tsx`
 * (file-based images win over config), and Twitter inherits them.
 */
export function pageMetadata({ title, description, path, keywords }: PageSeo): Metadata {
  const fullTitle = `${title} — ${site.name}`;
  return {
    title,
    description,
    keywords: keywords ? [...new Set([...keywords, ...site.keywords.slice(0, 4)])] : undefined,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      creator: founder.handle,
      title: fullTitle,
      description,
    },
  };
}
