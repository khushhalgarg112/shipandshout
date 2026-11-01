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
    <section aria-labelledby="brands-heading" className="relative">
      <Container>
        <h2 id="brands-heading" className="text-center text-sm font-medium text-ink-faint">
          {brandPartnerships} brand partnerships — including
        </h2>
        <ul className="sr-only">
          {brands.map((brand) => (
            <li key={brand.name}>{brand.name}</li>
          ))}
        </ul>
      </Container>
      <div aria-hidden>
        <Ribbons
          front={brands.map((brand) => ({
            label: brand.name,
            icon: <BrandLogo brand={brand} size={34} />,
          }))}
          back={loop}
        />
      </div>
    </section>
  );
}
