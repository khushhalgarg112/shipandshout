import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/** Rotating circular-text badge (Snellenberg-style kinetic CTA). Pure SVG + CSS spin. */
export function OrbitBadge({ className }: { className?: string }) {
  // useId output contains non-URL-friendly wrapper chars; strip for the textPath ref.
  const id = `orbit-${useId().replace(/[^a-zA-Z0-9-]/g, "")}`;
  return (
    <span className={cn("relative inline-flex size-32 items-center justify-center", className)}>
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full animate-spin-slow">
        <defs>
          <path id={id} d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" fill="none" />
        </defs>
        <text className="fill-ink-muted font-mono text-[7.4px] uppercase" letterSpacing="2.6">
          <textPath href={`#${id}`}>{`Start a project · ${site.name} ·`}</textPath>
        </text>
      </svg>
      <span className="flex size-10 items-center justify-center rounded-full bg-flame text-flame-ink">
        <ArrowUpRight size={18} aria-hidden />
      </span>
    </span>
  );
}
