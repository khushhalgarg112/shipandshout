import { audience } from "@/config/site";

/**
 * Horizontal audience-geography bars. Widths are static in the HTML;
 * RevealScript grows them in (`data-reveal="grow"`) on first view.
 */
export function GeoBars() {
  return (
    <ul className="space-y-5">
      {audience.geo.map((row, i) => (
        <li
          key={row.country}
          className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-4 sm:grid-cols-[9rem_1fr_auto]"
        >
          <span className="text-sm text-ink-muted">{row.country}</span>
          <div className="h-3 overflow-hidden rounded-full bg-sunken">
            <div
              data-reveal="grow"
              data-delay={i * 0.08 || undefined}
              className="h-full origin-left rounded-full bg-flame"
              style={{ width: `${row.pct}%` }}
            />
          </div>
          <span className="font-mono text-xs tabular-nums text-ink-faint">{row.pct}%</span>
        </li>
      ))}
    </ul>
  );
}
