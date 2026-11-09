import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Social destinations + brand glyphs shared by the footer and mobile menu.
 * X/LinkedIn marks aren't in lucide, so they're inline SVGs per the spec.
 */

type IconProps = { className?: string };

function XIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="currentColor"
      className={className}
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="currentColor"
      className={className}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function PassionfrootIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="currentColor"
      className={className}
    >
      <path d="M13.2 6.8c-.4-3 1.7-5.4 5.2-5.6.4 3.3-1.9 5.4-5.2 5.6Z" />
      <path d="M12 8.4c4.7 0 8 3.2 8 7.2 0 3.5-2.6 6.4-8 6.4s-8-2.9-8-6.4c0-4 3.3-7.2 8-7.2Z" />
    </svg>
  );
}

export const socials = [
  { label: "X", href: site.links.x, Icon: XIcon },
  { label: "LinkedIn", href: site.links.linkedin, Icon: LinkedInIcon },
  { label: "Passionfroot", href: site.links.passionfroot, Icon: PassionfrootIcon },
] as const;

export function SocialLink({
  label,
  href,
  Icon,
  className,
}: {
  label: string;
  href: string;
  Icon: (props: IconProps) => React.JSX.Element;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "touch-target inline-flex items-center gap-2.5 text-sm text-ink-muted transition-colors duration-300 hover:text-ink",
        className,
      )}
    >
      <Icon className="shrink-0" />
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
