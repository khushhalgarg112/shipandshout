import assert from "node:assert/strict";

// Run against a production server: npm start, then npm run check:seo.
const base = process.env.SEO_CHECK_BASE_URL ?? "http://localhost:3000";
const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://shipnshout.com").origin;
const pages = ["/", "/development", "/development/saas-mvp-development", "/development/ai-integration", "/marketing", "/work", "/about", "/contact", "/privacy"];
const titles = new Set();

async function request(path) {
  return fetch(new URL(path, base), {
    headers: { "User-Agent": "bingbot" },
    redirect: "manual",
    signal: AbortSignal.timeout(30_000),
  });
}

function jsonLd(html) {
  return [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .flatMap((match) => JSON.parse(match[1]));
}

function decodeHtml(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (entity, value) => {
    if (value.startsWith("#x")) return String.fromCodePoint(parseInt(value.slice(2), 16));
    if (value.startsWith("#")) return String.fromCodePoint(Number(value.slice(1)));
    return { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">" }[value] ?? entity;
  });
}

for (const path of pages) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path}: HTTP status`);
  const html = await response.text();
  assert.equal([...html.matchAll(/<h1\b/g)].length, 1, `${path}: one server-rendered H1`);
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title, `${path}: title`);
  assert.ok(!titles.has(title), `${path}: unique title`);
  titles.add(title);
  assert.match(html, /<meta name="description" content="[^"]+"/, `${path}: description`);
  assert.ok(!/<meta name="robots" content="[^"]*noindex/.test(html), `${path}: indexable`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical, path === "/" ? origin : `${origin}${path}`, `${path}: canonical`);
  const tagged = await request(`${path}?utm_source=seo-check`);
  const taggedHtml = await tagged.text();
  assert.equal(tagged.status, 200, `${path}: tracking URL`);
  assert.ok(taggedHtml.includes(`<link rel="canonical" href="${canonical}"`), `${path}: parameter canonical`);

  const entities = jsonLd(html);
  assert.ok(entities.some((item) => item["@type"] === "Organization"), `${path}: organization schema`);
  assert.ok(!entities.find((item) => item["@type"] === "Organization").sameAs, `${path}: no personal profiles on organization`);
  assert.ok(entities.find((item) => item["@type"] === "Person").sameAs?.length, `${path}: founder identity preserved`);
  if (path.startsWith("/development/")) {
    assert.ok(entities.some((item) => item["@type"] === "Service"), `${path}: service schema`);
    const crumbs = entities.find((item) => item["@type"] === "BreadcrumbList").itemListElement;
    assert.equal(crumbs.length, 3, `${path}: Home → Development → Service`);
    const faq = entities.find((item) => item["@type"] === "FAQPage");
    assert.equal(faq.mainEntity.length, 3, `${path}: service FAQs`);
    for (const question of faq.mainEntity) {
      // Answers must also exist in visible, server-rendered FAQ markup.
      assert.ok(decodeHtml(html).includes(`<p>${question.acceptedAnswer.text}</p>`), `${path}: visible FAQ answer`);
    }
  }
  const imageUrl = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
  assert.ok(imageUrl, `${path}: social image`);
  const image = await request(new URL(imageUrl.replaceAll("&amp;", "&")).pathname);
  assert.equal(image.status, 200, `${path}: social image resolves`);
  assert.match(image.headers.get("content-type"), /^image\//, `${path}: social image content type`);
  console.log(`PASS ${path}: HTML, metadata, canonical, schema, image`);
}

const sitemapResponse = await request("/sitemap.xml");
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert.equal([...sitemap.matchAll(/<loc>/g)].length, pages.length, "sitemap: all public pages");
assert.ok(!sitemap.includes("<lastmod>"), "sitemap: no synthetic modification dates");
for (const path of pages) assert.ok(sitemap.includes(`<loc>${path === "/" ? origin : `${origin}${path}`}</loc>`), `sitemap: ${path}`);

const robotsResponse = await request("/robots.txt");
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.ok(robots.includes("Disallow: /api/"));
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));

for (const path of ["/llms.txt", "/llms-full.txt"]) {
  const response = await request(path);
  assert.equal(response.status, 200, `${path}: status`);
  assert.match(response.headers.get("content-type"), /^text\/plain/, `${path}: text response`);
  const text = await response.text();
  for (const service of pages.filter((page) => page.startsWith("/development/"))) assert.ok(text.includes(`${origin}${service}`), `${path}: published services`);
}

for (const path of ["/seo-check-missing-page", "/development/seo-check-missing-service"]) {
  const response = await request(path);
  assert.equal(response.status, 404, `${path}: genuine 404`);
  assert.match(await response.text(), /name="robots" content="noindex/, `${path}: noindex`);
}
const slash = await request("/development/");
assert.ok([301, 308].includes(slash.status), "trailing slash: permanent redirect");
assert.equal(new URL(slash.headers.get("location"), base).pathname, "/development");

console.log("PASS sitemap, robots, text summaries, missing routes and slash normalization");
