import { notFound } from "next/navigation";
import { servicePages, site } from "@/config/site";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const alt = `Product engineering services — ${site.name}`;
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({ params }: { params: Promise<{ service: string }> }) {
  const { service: slug } = await params;
  const service = servicePages.find((page) => page.slug === slug);
  if (!service) notFound();
  return renderOg({ eyebrow: "Product engineering", title: service.title, accent: "Built to launch." });
}
