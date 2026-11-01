import { Marquee } from "@/components/ui/Marquee";
import { cn } from "@/lib/cn";

export type RibbonItem = { label: string; icon?: React.ReactNode };

/**
 * Two marquee tapes crossing in 3D space — flame over ink. Pure CSS: each
 * tape is rotated on X/Z inside a perspective stage; the marquees inside are
 * the same compositor-only animation used elsewhere.
 */
export function Ribbons({
  front,
  back,
  className,
}: {
  front: readonly RibbonItem[];
  back: readonly string[];
  className?: string;
}) {
  return (
    <div className={cn("ribbon-stage relative overflow-hidden py-14 sm:py-20", className)}>
      <div aria-hidden className="ribbon ribbon-b absolute inset-x-[-5%] top-1/2 -translate-y-1/2 bg-ink py-3.5 text-canvas sm:py-4">
        <Marquee reverse fade={false}>
          {back.map((item) => (
            <span key={item} className="flex items-center gap-10 text-display text-2xl whitespace-nowrap sm:text-3xl">
              {item}
              <span className="size-2 rounded-full bg-flame" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="ribbon ribbon-a relative mx-[-5%] bg-flame py-3 text-flame-ink sm:py-3.5">
        <Marquee fade={false}>
          {front.map((item) => (
            <span key={item.label} className="flex items-center gap-10 text-display text-2xl whitespace-nowrap sm:text-3xl">
              <span className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </span>
              <span aria-hidden className="text-flame-ink/50">✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
