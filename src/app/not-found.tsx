import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Cube } from "@/components/three/Cube";
import { nav } from "@/config/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn't exist — it may have moved. Head back home or jump to a section below.",
  robots: { index: false, follow: true },
};

/** Branded 404: keeps visitors in the link graph instead of bouncing. */
export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <Container className="grid min-h-[calc(100svh-4rem)] items-center gap-12 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="text-eyebrow">Error 404</p>
          <h1 className="text-display mt-6 text-[clamp(3rem,9vw,8rem)] text-ink">
            Shipped somewhere <span className="text-flame">else.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-muted">
            The page you asked for doesn&apos;t exist — it may have moved. Try one of these instead.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/" size="lg">
              Back home
              <ButtonArrow />
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Contact us
            </Button>
          </div>
          <nav aria-label="Site sections" className="mt-12">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-block py-2 font-medium text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-flame-deep"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <Cube faces={["4", "0", "4", "?", "&", "!"]} size="10rem" className="h-80" />
      </Container>
    </section>
  );
}
