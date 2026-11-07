import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PageHero } from "@/components/layout/PageHero";
import { Rings } from "@/components/three/Rings";
import { ContactForm } from "@/components/contact/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { webPageLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import { site, founder } from "@/config/site";

const title = "Contact — Build or Launch a Product";
const description = `Tell ${site.name} about your build or creator campaign. Share your scope, timeline and budget, or contact the team directly by email.`;

export const metadata = pageMetadata({
  title,
  description,
  path: "/contact",
  keywords: ["hire a development agency", "book a sponsored post", "project inquiry"],
});

const socials = [
  { label: "X", detail: founder.handle, href: site.links.x },
  { label: "LinkedIn", detail: founder.displayName, href: site.links.linkedin },
  { label: "Passionfroot", detail: "Media kit", href: site.links.passionfroot },
] as const;

const sideLabelCls = "text-eyebrow";

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={webPageLd({ type: "ContactPage", path: "/contact", name: `${title} — ${site.name}`, description })}
      />
      <PageHero
        crumb={{ name: "Contact", path: "/contact" }}
        eyebrow="Contact"
        title={
          <>
            Tell us what you&apos;re <span className="text-flame">building.</span>
          </>
        }
        lead={
          <p>
            One founder reads every message. Expect a real reply — not an autoresponder — within 24
            hours.
          </p>
        }
        visual={<Rings className="contact-rings mx-auto" />}
      />

      <Section className="pt-0 sm:pt-0">
        <div className="grid gap-14 lg:grid-cols-[2fr_3fr] lg:gap-20">
          <Reveal>
            <h2 className="text-display text-3xl text-ink">Direct lines</h2>
            <div className="mt-10 space-y-10">
              <div>
                <p className={sideLabelCls}>Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="touch-target contact-email mt-4 flex w-fit items-center gap-2.5 text-display text-2xl text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors hover:text-flame-deep hover:decoration-flame"
                >
                  <Mail size={22} aria-hidden className="shrink-0" />
                  {site.email}
                </a>
              </div>
              <div>
                <p className={sideLabelCls}>Elsewhere</p>
                <ul className="mt-4 divide-y divide-line border-y hairline">
                  {socials.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between gap-4 py-4"
                      >
                        <span className="font-medium text-ink">{social.label}</span>
                        <span className="flex items-center gap-2 text-sm text-ink-faint">
                          {social.detail}
                          <ArrowUpRight
                            size={18}
                            aria-hidden
                            className="transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-flame-deep"
                          />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className={sideLabelCls}>Location</p>
                <p className="mt-4 flex items-center gap-2 text-ink-muted">
                  <MapPin size={18} aria-hidden className="shrink-0 text-ink-faint" />
                  {site.location}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="surface p-6 sm:p-10">
              <h2 className="text-display text-3xl text-ink">Project brief</h2>
              <p className="mt-2 text-sm text-ink-muted">Two minutes. Required fields marked *.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
