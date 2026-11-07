import { Container } from "@/components/ui/Container";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Object3D } from "@/components/three/Object3D";
import { audience, engines, homeHero, site } from "@/config/site";

const partnerships = audience.stats[3];
const heroStats = [
  { value: audience.linkedin.followers, label: "LinkedIn followers" },
  { value: audience.x.followers, label: "X followers" },
  { value: `${partnerships.value}${partnerships.suffix}`, label: partnerships.label },
];

/** The product and its distribution share one frame, with an immediately visible headline. */
export function Hero() {
  return (
    <section className="home-hero">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-kicker"><span aria-hidden />{homeHero.eyebrow}</p>
            <h1 className="hero-title text-display">
              <span>{homeHero.headline[0]}</span>{" "}
              <span>{homeHero.headline[1]}</span>
            </h1>
            <p className="hero-description">{site.description}</p>
            <div className="hero-actions">
              <Button size="lg" href="/contact">Start a project <ButtonArrow /></Button>
              <Button size="lg" variant="secondary" href="/work">Our work</Button>
            </div>
          </div>

          <figure className="hero-art">
            <div className="hero-art-top" aria-hidden="true">
              <span className="hero-monogram">{site.shortName}</span>
              <span>Engineering meets distribution</span>
              <span className="hero-art-dot" />
            </div>
            <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
            <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
            <Object3D shape="orb" className="hero-orb" />
            <div className="hero-engine hero-engine-ship">
              <span className="hero-engine-index" aria-hidden="true">01</span>
              <div><p>{engines.ship.label}</p><span>{homeHero.shipDetail}</span></div>
            </div>
            <div className="hero-engine hero-engine-shout">
              <span className="hero-engine-index" aria-hidden="true">02</span>
              <div><p>{engines.shout.label}</p><span>{homeHero.shoutDetail}</span></div>
            </div>
            <figcaption>{homeHero.visualCaption}</figcaption>
          </figure>
        </div>

        <ul className="hero-proof" aria-label="Creator channel statistics">
          {heroStats.map((stat) => (
            <li key={stat.label}>
              <p className="hero-proof-value text-display">{stat.value}</p>
              <p className="hero-proof-label">{stat.label}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
