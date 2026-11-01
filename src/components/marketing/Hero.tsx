import { Button, ButtonArrow } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { Object3D } from "@/components/three/Object3D";
import { site, founder, audience, engines } from "@/config/site";

const receipts = [
  { value: audience.linkedin.followers, label: "on LinkedIn" },
  { value: audience.x.followers, label: "on X" },
  { value: `${audience.stats[1].value}${audience.stats[1].suffix}`, label: "content impressions" },
] as const;

/** Marketing hero — the Shout pitch in one screenful, broadcast-wave 3D object. */
export function Hero() {
  return (
    <PageHero
      crumb={{ name: "Marketing", path: "/marketing" }}
      eyebrow={`The ${engines.shout.label} engine`}
      title={
        <>
          Marketing with <span className="text-flame">receipts</span>, not vibes.
        </>
      }
      lead={
        <p>
          Sponsored campaigns through {founder.displayName}&apos;s audience of{" "}
          {audience.combined.value}
          {audience.combined.suffix} engineers, founders, and AI-curious professionals. A quote built
          around your launch, one revision round, and a performance recap after every campaign.
        </p>
      }
      actions={
        <>
          <Button href="/contact" size="lg">
            Start a campaign <ButtonArrow />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href={site.links.passionfroot}
            target="_blank"
            rel="noopener noreferrer"
          >
            View the media kit
            <span className="sr-only"> (opens in a new tab)</span>
          </Button>
        </>
      }
      footer={
        <ul className="flex flex-wrap gap-x-10 gap-y-4 border-t hairline pt-6">
          {receipts.map((item) => (
            <li key={item.label}>
              <p className="text-display text-3xl text-ink">{item.value}</p>
              <p className="mt-1 text-xs text-ink-faint">{item.label}</p>
            </li>
          ))}
        </ul>
      }
      visual={<Object3D shape="waves" />}
    />
  );
}
