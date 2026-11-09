import {
  devFaqs,
  devServices,
  founder,
  marketingFaqs,
  marketingPackages,
  servicePages,
  servicePagePath,
  site,
  type Faq,
} from "@/config/site";

const link = (label: string, path: string, description: string) =>
  `- [${label}](${site.url}${path}): ${description}`;

/** Generated from public editorial config so the text follows brand and service changes. */
export function llmsIndex(): string {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Location: ${site.location}. Contact: ${site.email}. Pricing is quoted after scoping.`,
    "",
    "## Services",
    link("Product engineering", "/development", "Web, mobile, SaaS, AI integration and ongoing support."),
    ...servicePages.map((service) => link(service.title, servicePagePath(service), service.description)),
    link("Creator marketing", "/marketing", "Sponsored LinkedIn posts, X threads and launch campaigns."),
    "",
    "## Company and evidence",
    link("Work", "/work", "Reported campaign highlights and illustrative development capabilities."),
    link("About", "/about", "Founder and team background."),
    link("Contact", "/contact", "Project and campaign inquiries."),
    link("Privacy", "/privacy", "Visitor data and contact information handling."),
    link("Extended overview", "/llms-full.txt", "Service scope, workflows and common questions."),
    "",
  ].join("\n");
}

function questions(items: readonly Faq[]): string {
  return items.map((item) => `### ${item.q}\n\n${item.a}${item.link ? `\n\n[${item.link.label}](${item.link.href})` : ""}`).join("\n\n");
}

/** An extended service overview, not an independent source of claims or customer results. */
export function llmsOverview(): string {
  const packages = [...marketingPackages.linkedin, ...marketingPackages.x];
  return [
    `# ${site.name} — Company and service overview`,
    "",
    `> ${site.description}`,
    "",
    "## Company",
    `Website: ${site.url}/`,
    `Location: ${site.location}.`,
    `Contact: ${site.email}`,
    `${founder.name}: ${founder.role}.`,
    `Background: ${site.url}/about`,
    "",
    "## Product engineering",
    `Source: ${site.url}/development`,
    ...devServices.map((service) => `\n### ${service.title}\n\n${service.description}\n\n${service.deliverables.map((item) => `- ${item}`).join("\n")}`),
    "",
    questions(devFaqs),
    ...servicePages.map((service) => [
      `\n## ${service.title}`,
      `Source: ${site.url}${servicePagePath(service)}`,
      service.answer,
      ...service.scope.map((item) => `\n### ${item.title}\n\n${item.body}`),
      "\n### Delivery process",
      ...service.steps.map((item, i) => `${i + 1}. ${item.title}: ${item.body}`),
      "\n### Planning considerations",
      service.considerations,
      "\n### Prepare for scoping",
      ...service.preparation.map((item) => `- ${item}`),
      "",
      questions(service.faqs),
    ].join("\n\n")),
    "",
    "## Creator marketing",
    `Source: ${site.url}/marketing`,
    `Campaigns run through ${founder.name}'s LinkedIn and X channels. Pricing is quoted for the format, timing and scope.`,
    ...packages.map((pkg) => `\n### ${pkg.name}\n\n${pkg.description}\n\n${pkg.features.map((feature) => `- ${feature}`).join("\n")}`),
    "",
    questions(marketingFaqs),
    "",
    "## Evidence and interpretation",
    `Source: ${site.url}/work`,
    "The work page presents reported campaign highlights and development capability archetypes. Capability previews are illustrative, not named client case studies. Combined platform follower counts may overlap and are not unique reach or guaranteed campaign impressions. Consult linked source posts and the media kit for current figures.",
    "",
    "## Inquiries and privacy",
    `Share a project brief at ${site.url}/contact or email ${site.email}.`,
    `Privacy: ${site.url}/privacy`,
    "",
  ].join("\n");
}
