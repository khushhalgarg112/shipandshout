import { cn } from "@/lib/cn";

/**
 * Isometric three-layer stack (design → code → infra) that pulls apart on
 * hover of the nearest `.group`. CSS 3D only. Decorative.
 */
export function IsoStack({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("[perspective:1000px]", className)}>
      <div className="iso-stack size-full">
        <div className="iso-layer border border-line-strong bg-sunken" />
        <div className="iso-layer grid grid-cols-3 gap-1.5 border border-line-strong bg-card p-2.5">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={cn("rounded-md", i === 1 ? "bg-flame/80" : "bg-line-strong")} />
          ))}
        </div>
        <div className="iso-layer flex flex-col gap-1.5 bg-flame p-3 shadow-[0_30px_40px_-20px_rgb(0_0_0/0.4)]">
          <span className="h-2 w-1/2 rounded-full bg-flame-ink/70" />
          <span className="h-2 w-3/4 rounded-full bg-flame-ink/40" />
          <span className="h-2 w-2/5 rounded-full bg-flame-ink/40" />
        </div>
      </div>
    </div>
  );
}
