import Link from "next/link";
import {
  Check,
  Globe,
  Rocket,
  Search,
  Server,
  Smartphone,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { devServices, servicePages, servicePagePath } from "@/config/site";
import { cn } from "@/lib/cn";

const icons: Record<(typeof devServices)[number]["slug"], LucideIcon> = {
  "web-development": Globe,
  "app-development": Smartphone,
  "saas-development": Rocket,
  seo: Search,
  systems: Server,
  "ai-integration": Sparkles,
  maintenance: Wrench,
};

/** Service cards preserve fragment targets while linking to published detail pages. */
export function ServiceGrid() {
  return (
    <Section id="services">
      <SectionHeading
        align="split"
        eyebrow="01 — Services"
        title="What we build."
        lead="Seven service lines, one standard: typed, tested, fast and documented — from a landing page to a platform, and the care that keeps it running."
      />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {devServices.map((service, i) => {
          const Icon = icons[service.slug];
          const detail = servicePages.find((page) => page.serviceSlug === service.slug);
          // The ongoing-care line closes the grid as a full-width dark card.
          const wide = service.slug === "maintenance";
          return (
            <Reveal
              key={service.slug}
              delay={(i % 3) * 0.08}
              className={cn("h-full", wide && "md:col-span-2 lg:col-span-3")}
            >
              <article
                id={service.slug}
                data-tilt={wide ? "2" : "6"}
                className={cn(
                  "tilt group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[1.75rem] border hairline bg-card p-7 target:border-flame target:ring-2 target:ring-flame/40 hover:border-line-strong sm:p-8",
                  wide && "night lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-x-16",
                )}
              >
                <span className="tilt-glare" />
                <div>
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-ink text-canvas transition-colors duration-300 group-hover:bg-flame group-hover:text-flame-ink">
                      <Icon size={22} aria-hidden />
                    </span>
                    <span
                      aria-hidden
                      data-num={`0${i + 1}`}
                      className="text-display text-4xl text-line-strong before:content-[attr(data-num)]"
                    />
                  </div>
                  <h3 className="text-display mt-8 text-3xl text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{service.description}</p>
                  {detail ? (
                    <Link href={servicePagePath(detail)} className="touch-target mt-4 inline-block py-1.5 text-sm font-semibold text-ink underline underline-offset-4">
                      Explore {detail.title.toLowerCase()}
                    </Link>
                  ) : null}
                  {wide ? (
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                      <a href="#maintenance-plan" className="touch-target inline-block py-1.5 text-ink underline decoration-line-strong underline-offset-4 hover:text-flame-deep">
                        Monthly maintenance plans
                      </a>
                      <a href="#hourly" className="touch-target inline-block py-1.5 text-ink underline decoration-line-strong underline-offset-4 hover:text-flame-deep">
                        Hourly support
                      </a>
                    </div>
                  ) : null}
                </div>
                <ul
                  className={cn(
                    "mt-6 flex-1 space-y-2.5 border-t hairline pt-5 text-sm text-ink-muted",
                    wide && "lg:mt-0 lg:self-end lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10",
                  )}
                >
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check size={16} className="mt-0.5 shrink-0 text-flame-deep" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
