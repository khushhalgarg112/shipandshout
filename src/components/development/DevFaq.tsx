import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/ui/FaqList";
import { devFaqs } from "@/config/site";

export function DevFaq() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="04 — FAQ"
          title="What clients ask first."
          lead="Anything not covered here, ask on the contact page — a real person replies within 24 hours."
          className="mb-0 lg:sticky lg:top-28 lg:self-start"
        />
        <FaqList items={devFaqs} />
      </div>
    </Section>
  );
}
