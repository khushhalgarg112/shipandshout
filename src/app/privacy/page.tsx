import { Section } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} handles visitor data — what analytics we collect, how contact form submissions are used, cookies, and how to request deletion.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section containerClassName="max-w-3xl">
      <Breadcrumbs trail={[{ name: "Privacy", path: "/privacy" }]} className="mb-10" />
      <p className="text-eyebrow mb-4">Legal</p>
      <h1 className="text-display text-5xl text-ink sm:text-7xl">Privacy policy</h1>
      <div className="reading-copy mt-10 space-y-8 leading-relaxed text-ink-muted">
        <div>
          <h2 className="mb-2 text-display text-2xl text-ink">What we collect</h2>
          <p>
            We use Google Analytics to understand how visitors use this site — pages viewed,
            approximate location, device type, and how you found us. This data is aggregated and
            does not personally identify you. If you submit the contact form, we receive the
            details you choose to share (name, email, company, and your message).
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-display text-2xl text-ink">How we use it</h2>
          <p>
            Analytics data helps us improve the site. Contact details are used solely to respond
            to your inquiry and discuss your project. We never sell or share your information with
            third parties for marketing.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-display text-2xl text-ink">Cookies</h2>
          <p>
            Google Analytics sets cookies to distinguish visitors. You can block cookies in your
            browser settings, or install Google&apos;s Analytics opt-out extension — the site works
            fine without them.
          </p>
        </div>
        <div>
          <h2 className="mb-2 text-display text-2xl text-ink">Your rights</h2>
          <p>
            Want your inquiry data deleted, or have any privacy question? Email{" "}
            <a href={`mailto:${site.email}`} className="touch-target font-medium text-ink underline decoration-line-strong underline-offset-4 hover:text-flame-deep">
              {site.email}
            </a>{" "}
            and we&apos;ll take care of it.
          </p>
        </div>
      </div>
    </Section>
  );
}
