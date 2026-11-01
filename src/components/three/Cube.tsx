import { cn } from "@/lib/cn";

const faceTones = [
  "bg-flame text-flame-ink",
  "bg-ink text-canvas",
  "bg-card text-ink",
  "bg-ink text-canvas",
  "bg-flame text-flame-ink",
  "bg-card text-ink",
] as const;

/** Slowly spinning CSS cube with a word on each face. Hover pauses it. Decorative. */
export function Cube({
  faces,
  size = "9rem",
  className,
}: {
  /** Six short words, front → right → back → left → top → bottom. */
  faces: readonly [string, string, string, string, string, string];
  /** Edge length (any CSS length). */
  size?: string;
  className?: string;
}) {
  return (
    <div aria-hidden className={cn("cube-stage flex items-center justify-center", className)}>
      <div className="cube" style={{ "--s": size } as React.CSSProperties}>
        {faces.map((word, i) => (
          <div key={i} className={cn("cube-face text-display text-2xl", faceTones[i])}>
            {word}
          </div>
        ))}
      </div>
    </div>
  );
}
