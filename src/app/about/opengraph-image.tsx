import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/config/site";

export const alt = `About ${site.name} — the story, values and people`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "About", title: "The story", accent: "so far." });
}
