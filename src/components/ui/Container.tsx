import { cn } from "@/lib/cn";

/** Page-width wrapper. All sections align to this grid. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("site-container", className)}>
      {children}
    </div>
  );
}
