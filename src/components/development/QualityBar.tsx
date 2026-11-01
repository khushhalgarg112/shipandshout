import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const standards = [
  {
    title: "Type-safe codebases",
    text: "Strict TypeScript from schema to UI, so whole classes of bugs never reach production.",
  },
  {
    title: "Core Web Vitals in the green",
    text: "Performance budgets enforced in CI, which means speed survives every release after launch.",
  },
  {
    title: "Accessibility as a requirement",
    text: "Semantic markup, keyboard flows and contrast checks from the first commit — not a retrofit.",
  },
  {
    title: "CI/CD from day one",
    text: "Every change is reviewed, tested and deployed to a preview before it touches production.",
  },
  {
    title: "Documentation and clean handover",
    text: "READMEs, runbooks and a recorded walkthrough. Your team can run it without us.",
  },
  {
    title: "Post-launch support window",
    text: "A defined window for fixes, monitoring and tuning after launch, written into every quote.",
  },
] as const;

export function QualityBar() {
  return (
    <Section className="border-t hairline">
      <SectionHeading
        eyebrow="03 — The quality bar"
        title="The boring stuff, done right."
        lead="None of this is glamorous. All of it is why the work still holds up a year later."
      />
      <div className="grid gap-x-10 sm:grid-cols-2">
        {standards.map((standard, i) => (
          <Reveal key={standard.title} delay={(i % 2) * 0.08}>
            <div className="flex gap-4 border-t hairline py-6">
              <ShieldCheck size={22} className="mt-0.5 shrink-0 text-flame" aria-hidden />
              <div>
                <h3 className="font-medium text-ink">{standard.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{standard.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
