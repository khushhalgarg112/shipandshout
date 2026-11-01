import { ogContentType, ogSize, renderOg } from "@/lib/og";
import { site } from "@/config/site";

export const alt = `${site.name} privacy policy`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg({ eyebrow: "Legal", title: "Privacy", accent: "policy." });
}
