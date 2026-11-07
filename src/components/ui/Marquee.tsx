import { cn } from "@/lib/cn";

/**
 * Infinite horizontal marquee (pure CSS — no JS cost). Children are
 * arranged in two equal groups for a seamless loop; the copy is aria-hidden.
 * Pauses on hover. Stops entirely under prefers-reduced-motion.
 */
export function Marquee({
  children,
  className,
  innerClassName,
  reverse = false,
  fade = true,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  reverse?: boolean;
  /** Fade the left/right edges. Off for full-bleed tapes. */
  fade?: boolean;
}) {
  return (
    <div
      className={cn(
        "marquee",
        fade && "marquee-fade",
        className,
      )}
    >
      <div
        className={cn(
          "marquee-track",
          reverse && "marquee-track-reverse",
        )}
      >
        <div className={cn("marquee-group", innerClassName)}>{children}</div>
        <div aria-hidden className={cn("marquee-group marquee-copy", innerClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
