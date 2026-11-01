import { Button, ButtonArrow } from "@/components/ui/Button";
import { PageHero } from "@/components/layout/PageHero";
import { Object3D } from "@/components/three/Object3D";
import { engines } from "@/config/site";

/** Page hero for the Ship side of the house — layered-stack 3D object. */
export function DevHero() {
  return (
    <PageHero
      crumb={{ name: "Development", path: "/development" }}
      eyebrow={`The ${engines.ship.label} engine`}
      title={
        <>
          We build the thing. <span className="text-flame">Properly.</span>
        </>
      }
      lead={
        <p>
          A senior product team shipping web apps, mobile apps and SaaS platforms — by the project,
          by the hour, or on a maintenance plan that keeps them running. The people you scope with
          are the people who build.
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
