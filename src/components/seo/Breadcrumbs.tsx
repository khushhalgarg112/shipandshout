import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbLd } from "@/lib/jsonld";
import { cn } from "@/lib/cn";

type Crumb = { name: string; path: string };

/** Visible trail + matching BreadcrumbList JSON-LD. Home is prepended automatically. */
export function Breadcrumbs({ trail, className }: { trail: readonly Crumb[]; className?: string }) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...trail];
  return (
    <>
      <nav aria-label="Breadcrumb" className={cn("text-sm", className)}>
        <ol className="flex flex-wrap items-center gap-2 text-ink-faint">
          {full.map((crumb, i) => {
            const last = i === full.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="inline-block py-1.5 font-medium text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="inline-block py-1.5 transition-colors hover:text-ink">
                      {crumb.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(full)} />
    </>
  );
}
