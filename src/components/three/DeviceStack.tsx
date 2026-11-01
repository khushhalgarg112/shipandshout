import { WorkPreview } from "@/components/art/WorkPreview";
import { engines } from "@/config/site";
import { cn } from "@/lib/cn";

/** Phone skeleton UI — tokens only, so it re-themes inside `.night`. */
function PhoneScreen() {
  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <div className="mx-auto mb-1 h-1.5 w-10 rounded-full bg-line-strong" />
      <div className="flex items-center justify-between">
        <div className="h-2 w-12 rounded-full bg-ink/70" />
        <div className="size-4 rounded-full bg-flame" />
      </div>
      <div className="rounded-xl bg-flame p-2.5">
        <div className="h-1.5 w-1/2 rounded-full bg-flame-ink/40" />
        <div className="mt-2 h-3 w-3/4 rounded-full bg-flame-ink/80" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="h-12 rounded-lg bg-sunken" />
        <div className="h-12 rounded-lg bg-sunken" />
      </div>
      <div className="flex flex-1 items-end gap-1 rounded-lg bg-sunken p-2">
        {[40, 65, 50, 90, 70, 100].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className={cn("flex-1 rounded-sm", i === 5 ? "bg-flame" : "bg-line-strong")}
          />
        ))}
      </div>
      <div className="flex justify-around border-t hairline pt-2">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={cn("size-1.5 rounded-full", i === 0 ? "bg-flame" : "bg-ink-faint")} />
        ))}
      </div>
    </div>
  );
}

function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "device-layer flex items-center gap-2 rounded-full border border-line-strong bg-card/90 px-3.5 py-2 text-xs font-medium whitespace-nowrap text-ink backdrop-blur-md sm:text-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

/**
 * Floating product mockups in perspective (Phenomenon-style), CSS 3D only.
 * Each layer sits at its own depth; PointerFx tilts the whole scene via
 * --rx/--ry on the [data-tilt] stage. Decorative.
 */
export function DeviceStack({ className }: { className?: string }) {
  return (
    <div aria-hidden data-tilt="5" className={cn("device-stage relative", className)}>
      <div className="device-scene aspect-[16/11] w-full">
        {/* Browser window */}
        <div
          className="device-layer left-0 top-[6%] w-[80%] animate-float overflow-hidden rounded-2xl"
          style={{ transform: "translateZ(0px)", animationDelay: "-1s" }}
        >
          <WorkPreview variant="dashboard" />
        </div>

        {/* Second window, further back */}
        <div
          className="device-layer left-[14%] top-[-6%] w-[62%] overflow-hidden rounded-2xl opacity-60"
          style={{ transform: "translateZ(-140px)" }}
        >
          <WorkPreview variant="ai" />
        </div>

        {/* Phone, floating forward */}
        <div
          className="device-layer right-[2%] top-[24%] aspect-[9/19] w-[25%] animate-float overflow-hidden rounded-[1.6rem] border border-line-strong bg-card"
          style={{ transform: "translateZ(150px)", animationDelay: "-3.5s" }}
        >
          <PhoneScreen />
        </div>

        {/* Tag chips */}
        <Chip className="left-[4%] top-[74%] max-sm:hidden animate-float [animation-delay:-2s] [transform:translateZ(210px)]">
          <span className="size-2 rounded-full bg-flame" />
          {engines.ship.label} · MVP in 4–8 weeks
        </Chip>
        <Chip className="right-[30%] top-[12%] animate-float [animation-delay:-5s] [transform:translateZ(200px)]">
          <span className="size-2 rounded-full bg-flame" />
          {engines.shout.label} · launch post live
        </Chip>
      </div>
    </div>
  );
}
