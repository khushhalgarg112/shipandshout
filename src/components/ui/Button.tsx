import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "flame" | "ghost";
type Size = "md" | "lg";

const base =
  "button group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium " +
  "transition-[background-color,border-color,color,transform,box-shadow] duration-300 ease-out-expo " +
  "focus-visible:outline-2 focus-visible:outline-flame-deep active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-canvas hover:bg-flame hover:text-flame-ink hover:-translate-y-0.5 hover:glow-flame",
  flame: "bg-flame text-flame-ink hover:bg-ink hover:text-canvas hover:-translate-y-0.5",
  secondary: "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-canvas",
  ghost: "text-ink-muted hover:text-ink",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-4 text-base",
};

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
} & (
  | ({ href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">)
  | ({ href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">)
);

/** Renders a Next <Link> when `href` is given, otherwise a <button>. */
export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...linkRest } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link href={href} className={cls} {...linkRest}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}

/** Arrow that slides out and back in on hover — pair inside a Button. */
export function ButtonArrow() {
  return (
    <span aria-hidden className="relative inline-flex h-[1em] w-[1em] overflow-hidden">
      <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 ease-out-expo group-hover:translate-x-full">
        →
      </span>
      <span className="absolute inset-0 flex -translate-x-full items-center justify-center transition-transform duration-500 ease-out-expo group-hover:translate-x-0">
        →
      </span>
    </span>
  );
}
