/**
 * Scroll-reveal wrapper — a server component. It only tags the element;
 * RevealScript (in the root layout) animates it once on entry. Use `delay`
 * (seconds) to stagger siblings: 0, 0.08, 0.16…
 *
 * Keep transforms (hover lifts, tilt) on a child, not on this wrapper.
 */
export function Reveal({
  children,
  delay = 0,
  y,
  variant = "up",
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  variant?: "up" | "fade" | "tilt" | "grow";
  className?: string;
  as?: "div" | "li" | "span" | "section" | "article";
}) {
  return (
    <Tag
      data-reveal={variant}
      data-delay={delay || undefined}
      data-y={y}
      className={className}
    >
      {children}
    </Tag>
  );
}
