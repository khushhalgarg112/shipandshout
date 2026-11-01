import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    title: "Brief",
    line: "You share the goal, the product, and the key points. About 15 minutes of your time.",
  },
  {
    title: "Draft",
    line: "Anuj writes the post in his own voice — copy that reads like his feed, not an ad.",
  },
  {
    title: "Review",
    line: "You see the full draft before anything ships. One revision round is included.",
  },
  {
    title: "Publish",
    line: "Goes live in the peak engagement window, disclosed with #ad — every time.",
  },
  {
    title: "Report",
    line: "A performance recap with reach and engagement lands in your inbox 7 days later.",
  },
] as const;

export function CampaignTimeline() {
  return (
    <Section id="process" className="border-t hairline">
      <SectionHeading
        eyebrow="03 — How a campaign runs"
        title="Brief to report in five steps."
        lead="No decks, no discovery phases. One tight loop from your brief to a published post and the numbers behind it."
      />

      <ol className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, i) => (
          <Reveal
            as="li"
            key={step.title}
            delay={i * 0.08}
            className="relative border-t border-line pt-6"
          >
            <span aria-hidden className="absolute -top-px left-0 h-px w-10 bg-flame" />
            <span className="font-mono text-xs tracking-[0.18em] text-flame">
              0{i + 1}
            </span>
            <h3 className="mt-3 text-display text-lg text-ink">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">{step.line}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.4} className="mt-12 flex flex-wrap gap-3">
        <Badge>7-day performance recap on every campaign</Badge>
        <Badge>Every sponsored post carries an honest #ad disclosure</Badge>
      </Reveal>
    </Section>
  );
}
