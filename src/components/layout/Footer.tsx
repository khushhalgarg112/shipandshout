import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/brand/Wordmark";
import { socials, SocialLink } from "@/components/layout/SocialLinks";
import { LocalTime } from "@/components/layout/LocalTime";
import { site, footerNav } from "@/config/site";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="text-eyebrow">{title}</h2>
      <ul className="mt-4 space-y-0.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-block py-1.5 text-sm text-ink-muted transition-colors duration-300 hover:text-flame-deep"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Dark footer: link columns, availability + live IST clock, giant extruded 3D wordmark. */
export function Footer() {
  return (
    <footer className="night relative overflow-hidden">
      <Container className="relative pt-20 pb-10 sm:pt-24">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-ink">
              <Wordmark />
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">{site.tagline}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block text-display text-xl text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-flame hover:decoration-flame sm:text-2xl"
            >
              {site.email}
            </a>
          </div>

          <FooterColumn title="Services" links={footerNav.services} />
          <FooterColumn title="Company" links={footerNav.company} />

          <div>
            <h2 className="text-eyebrow">Connect</h2>
            <ul className="mt-4 space-y-0.5">
              {socials.map((social) => (
                <li key={social.label}>
                  <SocialLink {...social} />
                </li>
              ))}
            </ul>
            <p className="mt-8 flex items-center gap-2.5 text-sm text-ink">
              <span aria-hidden className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-flame/70" />
                <span className="relative size-2 rounded-full bg-flame" />
              </span>
              Open for new projects
            </p>
            <p className="mt-2 text-sm text-ink-faint">
              {site.location} · <LocalTime />
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t hairline pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>
            <Link href="/privacy" className="inline-block py-1.5 transition-colors hover:text-ink">
              Privacy
            </Link>
            <span aria-hidden> · </span>
            <a href="/sitemap.xml" className="inline-block py-1.5 transition-colors hover:text-ink">
              Sitemap
            </a>
          </p>
        </div>
      </Container>

      {/* Giant extruded wordmark, tipped back in 3D and clipped by the page edge. */}
      <div aria-hidden className="pointer-events-none relative -mt-2 h-[11vw] min-h-14 select-none overflow-hidden">
        <p className="type-3d text-display absolute inset-x-0 top-0 text-center text-[13vw] leading-[0.85] whitespace-nowrap text-flame uppercase">
          {site.name}
        </p>
      </div>
    </footer>
  );
}
