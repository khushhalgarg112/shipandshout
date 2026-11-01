import { cn } from "@/lib/cn";

/**
 * Infinite horizontal marquee (pure CSS — no JS cost). Children are
 * duplicated once for a seamless loop; the copy is aria-hidden.
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
        "group/marquee overflow-hidden",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max items-center gap-14 pr-14",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover/marquee:[animation-play-state:paused]",
          "motion-reduce:animate-none motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center",
          innerClassName,
        )}
      >
        {children}
        <div aria-hidden className={cn("flex items-center gap-14 motion-reduce:hidden", innerClassName)}>
          {children}
        </div>
      </div>
    </div>
  );
}
