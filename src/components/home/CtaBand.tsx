import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { OrbitBadge } from "@/components/art/OrbitBadge";
import { Object3D, type Shape3D } from "@/components/three/Object3D";
import { site } from "@/config/site";

/**
 * Dark closing CTA with a live 3D object. Shared by home, /work and /about;
 * `secondary` lets each page point onward to a different next step.
 */
export function CtaBand({
  title = "Got something worth shouting about?",
  lead = "Tell us what you're building. We'll tell you how we'd ship it — and how loud we can make it.",
  shape = "waves",
  secondary,
}: {
  title?: string;
  lead?: string;
  shape?: Shape3D;
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="night relative overflow-hidden">
      <Container className="relative grid items-center gap-6 py-24 sm:py-32 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10">
          <Reveal>
            <p className="text-eyebrow">Next step</p>
            <h2 className="text-display mt-6 text-5xl text-ink sm:text-7xl">{title}</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{lead}</p>
          </Reveal>
          <Reveal delay={0.16} className="mt-10 flex flex-wrap items-center gap-3">
            <Button size="lg" variant="flame" href="/contact">
              Start a project
              <ButtonArrow />
            </Button>
            {secondary ? (
              <Button size="lg" variant="secondary" href={secondary.href}>
                {secondary.label}
              </Button>
            ) : null}
          </Reveal>
          <Reveal delay={0.24}>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block py-2 text-sm text-ink-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink hover:decoration-flame"
            >
              or email {site.email}
            </a>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <Object3D shape={shape} tone="night" />
          <Link
            href="/contact"
            aria-label="Start a project"
            className="absolute right-0 bottom-4 hidden rounded-full lg:block"
          >
            <OrbitBadge />
          </Link>
        </div>
      </Container>
    </section>
  );
}
