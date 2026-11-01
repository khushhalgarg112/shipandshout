import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { Faq } from "@/config/site";

/**
 * Native <details> accordion — zero JS, keyboard accessible, and the answers
 * stay in the HTML for crawlers (pages also emit matching FAQPage JSON-LD).
 */
export function FaqList({ items }: { items: readonly Faq[] }) {
  return (
    <Reveal className="border-t border-ink">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-ink">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="text-display text-xl text-ink transition-colors group-hover:text-flame-deep sm:text-2xl">
              {item.q}
            </h3>
            <span
              aria-hidden
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-[transform,background-color,color,border-color] duration-500 ease-out-expo group-open:rotate-45 group-open:border-flame group-open:bg-flame group-open:text-flame-ink"
            >
              <Plus size={18} />
            </span>
          </summary>
          <div className="max-w-3xl pb-7 leading-relaxed text-ink-muted">
            <p>{item.a}</p>
            {item.link ? (
              <a
                href={item.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 font-medium text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:text-flame-deep"
              >
                {item.link.label}
                <ArrowUpRight size={16} aria-hidden />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </div>
        </details>
      ))}
    </Reveal>
  );
}
