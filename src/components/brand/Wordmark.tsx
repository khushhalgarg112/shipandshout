import { site } from "@/config/site";

/**
 * The brand name as a wordmark. Reads `site.name` only — rename the brand in
 * config and every header/footer/badge follows. A " & " in the name gets the
 * flame accent; any other name renders as-is.
 */
export function Wordmark({ className }: { className?: string }) {
  const parts = site.name.split(/\s*&\s*/);
  if (parts.length !== 2) return <span className={className}>{site.name}</span>;
  return (
    <span className={className}>
      {parts[0]}
      <span className="text-flame"> &amp; </span>
      {parts[1]}
    </span>
  );
}
