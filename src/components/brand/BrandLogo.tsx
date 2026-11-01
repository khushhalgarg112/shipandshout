import Image from "next/image";
import type { Brand } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * A client's official mark on a white app-icon tile, so every logo reads the
 * same on light, dark and flame backgrounds. Decorative (`alt=""`): the brand
 * name is always rendered as text next to it.
 */
export function BrandLogo({
  brand,
  size = 40,
  className,
}: {
  brand: Brand;
  /** Tile edge in CSS px. */
  size?: number;
  className?: string;
}) {
  const inner = brand.bleed ? size : Math.round(size * 0.66);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[24%] bg-white ring-1 ring-black/10",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <Image
        src={brand.logo}
        alt=""
        width={inner}
        height={inner}
        className="object-contain"
        style={{ width: inner, height: inner }}
      />
    </span>
  );
}
