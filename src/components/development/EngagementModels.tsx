import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { engagementAnswer } from "@/config/site";
import { cn } from "@/lib/cn";

/** Ids are deep-link targets (footer, FAQ, contact). No public prices — every model is quoted on a call. */
const models = [
  {
    id: "fixed-scope",
    name: "Fixed-scope project",
    billing: "Fixed quote",
    fit: "Best for a defined spec that needs a price and a date.",
    points: [
      "Fixed quote agreed before work starts",
      "Typical builds run 4–8 weeks",
      "Weekly demos, no surprise invoices",
    ],
    highlight: false,
  },
  {
    id: "hourly",
    name: "Hourly development",
    billing: "Per hour",
    fit: "Best for small features, fixes and work that's hard to scope up front.",
    points: [
      "Pay only for hours worked, tracked transparently",
      "No minimum commitment — start this week",
      "Weekly time reports alongside the work",
    ],
    highlight: false,
  },
  {
    id: "retainer",
    name: "Monthly retainer",
    billing: "Flat monthly",
    fit: "Best for ongoing product work that never really ends.",
    points: [
      "Priority queue for your requests",
      "Senior team with zero ramp-up",
      "Scale up or pause month to month",
    ],
    highlight: true,
  },
  {
    id: "maintenance-plan",
    name: "Maintenance & support",
    billing: "Monthly plan or hourly",
    fit: "Best for live products that need to stay fast, secure and online — including ones we didn't build.",
    points: [
      "Bug fixes, security patches and dependency upgrades",
      "Uptime, error and performance monitoring",
      "Agreed response times for production issues",
    ],
    highlight: false,
  },
  {
    id: "embedded",
    name: "Embedded team",
    billing: "Monthly per engineer",
    fit: "Best for orgs that want a squad inside their walls.",
    points: [
      "Engineers in your standups and tools",
      "Your process, your repos, our people",
      "Knowledge documented as we go",
    ],
    highlight: false,
  },
] as const;

/** Five ways to work together, laid out 3 + 2 on desktop. */
export function EngagementModels() {
  return (
    <Section id="engagement">
      <SectionHeading
        align="split"
        eyebrow="02 — Engagement models"
        title="Which development engagement fits your product?"
        lead={engagementAnswer}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {models.map((model, i) => (
          <Reveal
            key={model.id}
            delay={(i % 3) * 0.08}
            className={cn("h-full", i < 3 ? "lg:col-span-2" : "lg:col-span-3", i === 4 && "md:col-span-2")}
          >
            <article
              id={model.id}
              className={cn(
                "surface flex h-full flex-col p-7 transition-colors duration-300 target:ring-2 target:ring-flame/50 hover:border-line-strong sm:p-8",
                model.highlight && "night glow-flame",
              )}
            >
              <div className="flex min-h-8 items-center justify-between gap-3">
                <p className="text-xs font-medium text-flame-deep">{model.billing}</p>
                {model.highlight ? (
                  <Badge tone="flame" className="shrink-0 whitespace-nowrap">
                    Most flexible
                  </Badge>
                ) : null}
              </div>
              <h3 className="text-display mt-4 text-3xl text-ink">{model.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{model.fit}</p>
              <ul className="mt-6 flex-1 space-y-3 border-t hairline pt-5 text-sm text-ink-muted">
                {model.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <Check size={16} className="mt-0.5 shrink-0 text-flame-deep" aria-hidden />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="touch-target group mt-7 inline-flex items-center gap-2 self-start py-1.5 text-sm font-semibold text-ink"
              >
                Discuss {model.name.toLowerCase()}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          </Reveal>
        ))}
      </div>
      <div className="engagement-comparison mt-14 overflow-x-auto rounded-2xl border hairline" role="region" aria-label="Development engagement comparison" tabIndex={0}>
        <table className="w-full min-w-[40rem] text-left text-sm">
          <caption className="p-5 text-left font-semibold text-ink">Development engagement options</caption>
          <thead className="border-y hairline bg-sunken text-ink">
            <tr>
              <th scope="col" className="px-5 py-4">Engagement</th>
              <th scope="col" className="px-5 py-4">Best fit</th>
              <th scope="col" className="px-5 py-4">Billing basis</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr key={model.id} className="border-b hairline last:border-b-0">
                <th scope="row" className="px-5 py-4 font-medium text-ink">
                  <Link href={`#${model.id}`} className="underline underline-offset-4">{model.name}</Link>
                </th>
                <td className="px-5 py-4 leading-relaxed text-ink-muted">{model.fit}</td>
                <td className="px-5 py-4 text-ink-muted">{model.billing}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
