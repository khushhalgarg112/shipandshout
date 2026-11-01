import { cn } from "@/lib/cn";

/** Broadcast rings pulsing outward on a tilted 3D plane, with a glowing core. Decorative. */
export function Rings({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("[perspective:900px]", className)}>
      <div className="rings size-full">
        <span className="ring" />
        <span className="ring" />
        <span className="ring" />
        <span className="absolute inset-[40%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffd2c9,var(--color-flame)_45%,#7a1206)] shadow-[0_0_40px_6px_rgb(255_57_40/0.45)]" />
      </div>
    </div>
  );
}
