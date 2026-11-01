import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { engines } from "@/config/site";

const paths = [
  {
    need: "I need it built.",
    detail: "Web, mobile, SaaS and AI products from a senior team.",
    cta: engines.ship.name,
    href: engines.ship.href,
  },
  {
    need: "I need it seen.",
    detail: "Sponsored posts and threads to an audience that buys software.",
    cta: engines.shout.name,
    href: engines.shout.href,
  },
  {
    need: "I need both.",
    detail: "Build it, then launch it to people already listening.",
    cta: "Start a project",
    href: "/contact",
  },
] as const;

/** Self-selecting entry points (Phenomenon's pain-point CTAs) as big hover rows. */
export function Paths() {
  return (
    <Section className="pt-0 sm:pt-0">
      <h2 className="sr-only">Where do you want to start?</h2>
      <ul className="border-t border-ink">
        {paths.map((path, i) => (
          <Reveal as="li" key={path.href} delay={i * 0.06} className="border-b border-ink">
            <Link
              href={path.href}
              className="group relative grid items-center gap-2 overflow-hidden py-7 sm:grid-cols-[3rem_1fr_auto] sm:gap-8 sm:py-9"
            >
              {/* Flame wipe on hover */}
              <span
                aria-hidden
                className="absolute inset-0 origin-bottom scale-y-0 bg-flame transition-transform duration-500 ease-out-expo group-hover:scale-y-100"
              />
              <span className="relative hidden text-sm font-medium text-ink-faint transition-colors group-hover:text-flame-ink sm:block">
                0{i + 1}
              </span>
              <span className="relative">
                <span className="text-display block text-4xl text-ink transition-[color,translate] duration-500 ease-out-expo group-hover:translate-x-3 group-hover:text-flame-ink sm:text-6xl">
                  {path.need}
                </span>
                <span className="mt-2 block text-sm text-ink-muted transition-colors group-hover:text-flame-ink sm:text-base">
                  {path.detail}
                </span>
              </span>
              <span className="relative mt-3 inline-flex items-center gap-3 text-sm font-semibold text-ink transition-colors group-hover:text-flame-ink sm:mt-0">
                {path.cta}
                <span className="flex size-12 items-center justify-center rounded-full border border-current text-lg transition-transform duration-500 ease-out-expo group-hover:-rotate-45">
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
