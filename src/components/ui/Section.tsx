import { cn } from "@/lib/cn";
import { Container } from "./Container";

/**
 * Vertical rhythm unit. Every page section uses this so spacing stays
 * consistent site-wide. `bleed` skips the Container for full-width content
 * (marquees, CTA bands) — add your own Container inside where needed.
 */
export function Section({
  id,
  className,
  containerClassName,
  bleed = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("py-20 sm:py-28", className)}>
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
