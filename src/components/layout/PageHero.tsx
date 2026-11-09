import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { cn } from "@/lib/cn";

/**
 * Shared inner-page hero: breadcrumb trail, eyebrow, oversized h1, lead,
 * actions, and an optional 3D visual on the right. The heading and lead stay
 * visible from the first paint; decorative elements can animate independently.
 */
export function PageHero({
  crumb,
  parentCrumbs = [],
  eyebrow,
  title,
  lead,
  actions,
  visual,
  footer,
  className,
}: {
  crumb: { name: string; path: string };
  parentCrumbs?: readonly { name: string; path: string }[];
  eyebrow: string;
  title: React.ReactNode;
  lead: React.ReactNode;
  actions?: React.ReactNode;
  visual?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <Container
        className={cn(
          "page-hero-grid relative grid items-center gap-10 pt-8 pb-20 sm:pt-10 sm:pb-24",
          Boolean(visual) && "lg:grid-cols-[1.15fr_0.85fr]",
        )}
      >
        <div className="relative z-10">
          <Breadcrumbs trail={[...parentCrumbs, crumb]} />
          <p className="text-eyebrow mt-10 animate-fade-up" style={{ animationDelay: "60ms" }}>
            {eyebrow}
          </p>
          <h1
            className="text-display mt-6 text-[clamp(2.75rem,7vw,6.5rem)] text-ink"
          >
            {title}
          </h1>
          <div
            className="mt-7 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg"
          >
            {lead}
          </div>
          {actions ? (
            <div
              className="mt-10 flex animate-fade-up flex-wrap items-center gap-3"
              style={{ animationDelay: "280ms" }}
            >
              {actions}
            </div>
          ) : null}
          {footer ? (
            <div className="mt-12 animate-fade-up" style={{ animationDelay: "360ms" }}>
              {footer}
            </div>
          ) : null}
        </div>
        {visual ? (
          <div className="relative mx-auto w-full max-w-md animate-fade-up lg:max-w-none" style={{ animationDelay: "160ms" }}>
            {visual}
          </div>
        ) : null}
      </Container>
    </section>
  );
}
