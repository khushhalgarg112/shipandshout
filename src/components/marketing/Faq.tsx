import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqList } from "@/components/ui/FaqList";
import { marketingFaqs } from "@/config/site";

export function Faq() {
  return (
    <Section id="faq">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          eyebrow="04 — Questions"
          title="Asked before booking."
          lead="The short version of every pre-campaign email thread. Anything else, ask through the contact page."
          className="mb-0 lg:sticky lg:top-28 lg:self-start"
        />
        <FaqList items={marketingFaqs} />
      </div>
    </Section>
  );
}
