import { cn } from "@/lib/cn";

/** Small pill label — status dots, category tags. */
export function Badge({
  children,
  tone = "line",
  className,
}: {
  children: React.ReactNode;
  tone?: "line" | "flame";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium tracking-tight",
        tone === "flame"
          ? "border-flame/40 bg-flame/10 text-flame-deep"
          : "border-line-strong text-ink-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
