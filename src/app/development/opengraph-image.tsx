import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/config/site";

export const alt = `Web, app & SaaS development by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Development",
    title: "Web, mobile & SaaS — built",
    accent: "properly.",
  });
}
