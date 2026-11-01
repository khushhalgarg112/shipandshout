import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { DeviceStack } from "@/components/three/DeviceStack";
import { ShowcaseCard } from "@/components/work/ShowcaseCard";
import { showcase } from "@/config/site";

/** Selected work on a dark stage: floating 3D device mockups, then tilt cards. */
export function FeaturedWork() {
  return (
    <Section id="selected-work">
      <SectionHeading
        align="split"
        eyebrow="02 — Selected work"
        title="Built to be worth shouting about."
        lead="Capability builds from the engineering side — the archetypes we take from spec to production. Client work stays confidential; the craft doesn't."
      />

      <Reveal variant="tilt" className="mx-auto mt-24 mb-20 max-w-5xl px-2 sm:mb-28 sm:px-10">
        <DeviceStack />
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {showcase.map((item, i) => (
          <Reveal key={item.slug} delay={(i % 2) * 0.08} className="h-full">
            <ShowcaseCard item={item} />
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-14 flex justify-center">
        <Button variant="secondary" size="lg" href="/work">
          All work &amp; campaign receipts
          <ButtonArrow />
        </Button>
      </Reveal>
    </Section>
  );
}
