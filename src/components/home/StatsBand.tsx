import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { audience } from "@/config/site";

/** Oversized audience counters — sits at the top of the dark work block. */
export function StatsBand() {
  return (
    <section aria-labelledby="stats-heading" className="pt-20 pb-6 sm:pt-28">
      <Container>
        <h2 id="stats-heading" className="text-eyebrow mb-10">
          The audience, in numbers
        </h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {audience.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="border-t hairline pt-6">
              <p className="text-display text-6xl text-ink sm:text-7xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </p>
              <p className="mt-3 text-sm text-ink-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
