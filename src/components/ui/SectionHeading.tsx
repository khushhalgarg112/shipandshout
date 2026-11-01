import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Standard section header: dotted eyebrow, display title, optional lead.
 * Wide layout puts the lead beside the title on large screens (Zajno-style).
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "max-w-3xl",
        align === "split" && "grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-16",
        className,
      )}
    >
      <div>
        {eyebrow ? <p className="text-eyebrow mb-5">{eyebrow}</p> : null}
        <h2 className="text-display text-4xl text-ink sm:text-5xl md:text-6xl">{title}</h2>
      </div>
      {lead ? (
        <p
          className={cn(
            "text-base leading-relaxed text-ink-muted sm:text-lg",
            align === "split" ? "lg:pb-2" : "mt-6",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
