import { Button, ButtonArrow } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { Object3D } from "@/components/three/Object3D";
import { engines, site } from "@/config/site";

/** Page hero for the Ship side of the house — layered-stack 3D object. */
export function DevHero() {
  return (
    <PageHero
      crumb={{ name: "Development", path: "/development" }}
      eyebrow={`The ${engines.ship.label} engine`}
      title={
        <>
          Web, mobile and SaaS development <span className="text-flame">built to launch.</span>
        </>
      }
      lead={
        <p>
          {site.name} builds Next.js web applications, React Native mobile apps and SaaS products.
          You can engage the team for a fixed-scope project, hourly development or ongoing
          maintenance. Each engagement starts with scoping so you know the deliverables, timeline
          and cost before development begins.
        </p>
      }
      actions={
        <>
          <Button href="/contact" size="lg">
            Start a build
            <ButtonArrow />
          </Button>
          <Button href="#services" variant="secondary" size="lg">
            See services
          </Button>
        </>
      }
      visual={<Object3D shape="stack" />}
    />
  );
}
