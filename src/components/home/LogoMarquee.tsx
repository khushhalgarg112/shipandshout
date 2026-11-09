import { Container } from "@/components/ui/Container";
import { Ribbons } from "@/components/three/Ribbons";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { brandPartnerships, brands, engines } from "@/config/site";

const loop = [
  `${engines.ship.label} it`,
  `${engines.shout.label} it`,
  "Launch it",
  "Measure it",
] as const;

/** Brand roster as two crossing 3D tapes with each client's logo. The list is also rendered for screen readers. */
export function LogoMarquee() {
  return (
    <section aria-labelledby="brands-heading" className="brand-proof">
      <Container>
        <div className="brand-proof-heading">
          <h2 id="brands-heading">Creator partnerships with teams you know.</h2>
          <p>{brandPartnerships} brand partnerships — including</p>
        </div>
        <ul className="sr-only">
          {brands.map((brand) => (
            <li key={brand.name}>{brand.name}</li>
          ))}
        </ul>
      </Container>
        <Ribbons
          front={brands.map((brand) => ({
            label: brand.name,
            icon: <BrandLogo brand={brand} size={34} />,
          }))}
          back={loop}
        />
    </section>
  );
}
