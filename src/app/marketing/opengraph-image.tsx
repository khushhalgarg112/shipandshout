import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { audience, site } from "@/config/site";

export const alt = `Creator marketing and sponsored posts by ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({
    eyebrow: "Creator marketing",
    title: `Reach ${audience.combined.value}${audience.combined.suffix} builders. With`,
    accent: "receipts.",
  });
}
