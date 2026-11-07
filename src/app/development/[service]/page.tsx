import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { CtaBand } from "@/components/home/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button, ButtonArrow } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { servicePages, servicePagePath, site } from "@/config/site";
import { faqLd, serviceLd, webPageLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ service: slug }));
}

function getService(slug: string) {
  const service = servicePages.find((page) => page.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: PageProps<"/development/[service]">) {
  const service = getService((await params).service);
  return pageMetadata({ title: service.title, description: service.description, path: servicePagePath(service) });
}

export default async function ServicePage({ params }: PageProps<"/development/[service]">) {
  const service = getService((await params).service);
  const path = servicePagePath(service);

  return (
    <>
      <JsonLd data={[
        webPageLd({ path, name: `${service.title} — ${site.name}`, description: service.description }),
        serviceLd({
          name: service.title,
          serviceType: service.title,
          description: service.description,
          path,
          offers: service.scope.map((item) => ({ name: item.title, description: item.body, url: `${site.url}${path}#scope` })),
        }),
        faqLd(service.faqs),
      ]} />
      <PageHero
        crumb={{ name: service.title, path }}
        parentCrumbs={[{ name: "Development", path: "/development" }]}
        eyebrow="Product engineering"
        title={service.heading}
        lead={<p>{service.answer}</p>}
        actions={<>
          <Button href="/contact" size="lg">Discuss your project <ButtonArrow /></Button>
          <Button href="#scope" variant="secondary" size="lg">Explore the scope</Button>
        </>}
      />
      <Section id="scope" className="pt-0 sm:pt-0">
        <SectionHeading eyebrow="01 — Scope" title="What goes into the engagement?" lead="Use these areas to shape the brief. The final deliverables and exclusions are agreed during scoping." />
        <div className="grid gap-5 md:grid-cols-3">
          {service.scope.map((item) => (
            <article key={item.title} className="surface p-7 sm:p-8">
              <h3 className="text-display text-2xl text-ink">{item.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-muted">{item.body}</p>
            </article>
          ))}
        </div>
      </Section>
      <div className="night">
        <Section>
          <SectionHeading eyebrow="02 — Delivery" title="From a useful brief to a working release." />
          <ol className="grid gap-8 md:grid-cols-3">
            {service.steps.map((step, i) => (
              <li key={step.title} className="border-t hairline pt-6">
                <p className="font-mono text-sm text-ink-faint" aria-hidden>{String(i + 1).padStart(2, "0")}</p>
                <h3 className="text-display mt-4 text-2xl text-ink">{step.title}</h3>
                <p className="mt-4 leading-relaxed text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>
      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <section aria-labelledby="considerations-heading">
            <h2 id="considerations-heading" className="text-display text-3xl text-ink sm:text-4xl">What should you plan for?</h2>
            <p className="mt-6 leading-relaxed text-ink-muted">{service.considerations}</p>
          </section>
          <section aria-labelledby="brief-heading">
            <h2 id="brief-heading" className="text-display text-3xl text-ink sm:text-4xl">What to bring to the scoping call</h2>
            <ul className="mt-6 list-disc space-y-3 pl-5 text-ink-muted">
              {service.preparation.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <Link href="/development#engagement" className="touch-target mt-6 inline-block py-2 font-semibold text-ink underline underline-offset-4">Compare development engagement options</Link>
          </section>
        </div>
      </Section>
      <Section className="pt-0 sm:pt-0">
        <SectionHeading eyebrow="03 — Questions" title={`${service.title}: common questions`} />
        <FaqList items={service.faqs} />
        <nav aria-label="Related development services" className="service-links mt-10 flex flex-wrap gap-x-8 gap-y-4">
          <Link href="/development" className="font-semibold text-ink underline underline-offset-4">All development services</Link>
          {servicePages.filter((item) => item.slug !== service.slug).map((item) => (
            <Link key={item.slug} href={servicePagePath(item)} className="font-semibold text-ink underline underline-offset-4">{item.title}</Link>
          ))}
        </nav>
      </Section>
      <CtaBand title="Start with the right scope." lead="Share the workflow, your current product and what you want to change. We'll discuss the approach, timeline and engagement that fit." secondary={{ label: "Development capabilities", href: "/work#builds" }} />
    </>
  );
}
