import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/config/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Product studio × creator distribution",
    title: "We ship products. Then we make them",
    accent: "loud.",
  });
}
