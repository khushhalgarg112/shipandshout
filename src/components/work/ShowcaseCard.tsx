import Link from "next/link";
import { WorkPreview } from "@/components/art/WorkPreview";
import type { ShowcaseItem } from "@/config/site";

/** Capability-build tilt card shared by the home FeaturedWork section and /work. */
export function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  return (
    <Link
      href={item.href}
      data-tilt="6"
      className="showcase-card tilt group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border hairline bg-card hover:border-line-strong"
    >
      <span className="tilt-glare z-10" />
      <div className="showcase-preview relative overflow-hidden border-b hairline bg-sunken p-6 sm:p-8">
        <WorkPreview
          variant={item.art}
          className="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04] group-hover:-rotate-1"
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-ink-faint">{item.category}</p>
            <h3 className="text-display mt-2 text-2xl text-ink sm:text-3xl">{item.title}</h3>
          </div>
          <span
            aria-hidden
            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-strong text-ink transition-[background-color,color,rotate,border-color] duration-500 ease-out-expo group-hover:-rotate-45 group-hover:border-flame group-hover:bg-flame group-hover:text-flame-ink"
          >
            →
          </span>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.description}</p>
        <ul className="mt-auto flex flex-wrap gap-2 pt-6">
          {item.stack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-xs text-ink-faint"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
