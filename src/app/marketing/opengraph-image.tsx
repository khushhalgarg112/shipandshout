import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/config/site";

export const alt = `Creator marketing and sponsored posts by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Creator marketing",
    title: "Creator marketing for AI and SaaS",
    accent: "launches.",
  });
}
