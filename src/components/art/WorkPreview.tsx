import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Skeleton-UI previews for the work showcase — inline SVG drawn entirely from
 * design tokens so the art re-themes with the system. Deliberately abstract:
 * these read as build archetypes, not fake client screenshots.
 */

export type WorkArt = "dashboard" | "storefront" | "ai" | "mobile";

function Chrome({ children }: { children: ReactNode }) {
  return (
    <>
      <rect x="0.5" y="0.5" width="479" height="299" rx="14" className="fill-sunken stroke-line-strong" />
      {[20, 34, 48].map((cx) => (
        <circle key={cx} cx={cx} cy="18" r="3.5" className="fill-line-strong" />
      ))}
      <rect x="70" y="11" width="180" height="14" rx="7" className="fill-line" />
      <path d="M0 36h480" className="stroke-line" />
      {children}
    </>
  );
}

const DASH_BARS = [46, 72, 58, 92, 64, 100, 80, 52] as const;

function DashboardArt() {
  return (
    <Chrome>
      <rect x="12" y="48" width="92" height="240" rx="10" className="fill-card" />
      <rect x="24" y="62" width="52" height="7" rx="3.5" className="fill-flame" />
      {[84, 102, 120, 138].map((y) => (
        <rect key={y} x="24" y={y} width="66" height="6" rx="3" className="fill-line-strong" />
      ))}
      {[116, 238, 360].map((x, i) => (
        <g key={x}>
          <rect x={x} y="48" width="108" height="52" rx="10" className="fill-card stroke-line" />
          <rect x={x + 12} y="60" width="40" height="5" rx="2.5" className="fill-line-strong" />
          <rect x={x + 12} y="74" width={i === 1 ? 64 : 52} height="9" rx="4.5" className="fill-ink/80" />
        </g>
      ))}
      <rect x="116" y="112" width="238" height="130" rx="10" className="fill-card stroke-line" />
      <rect x="130" y="126" width="64" height="6" rx="3" className="fill-line-strong" />
      {DASH_BARS.map((h, i) => (
        <rect
          key={i}
          x={132 + i * 26}
          y={232 - h * 0.84}
          width="14"
          height={h * 0.84}
          rx="3"
          className={i === 5 ? "fill-flame" : "fill-line-strong"}
        />
      ))}
      <rect x="366" y="112" width="102" height="130" rx="10" className="fill-card stroke-line" />
      {[132, 158, 184, 210].map((y, i) => (
        <g key={y}>
          <circle cx="382" cy={y} r="6" className={i === 0 ? "fill-flame/60" : "fill-line-strong"} />
          <rect x="394" y={y - 3} width="60" height="6" rx="3" className="fill-line-strong" />
        </g>
      ))}
      <rect x="116" y="254" width="352" height="34" rx="10" className="fill-card stroke-line" />
      <path
        d="M128 278c14-10 22 4 34-6s18 2 30-4 20 6 32-2 18-4 30-8 22 8 34 0 18-6 30 2 20-8 32-2 18 6 30-4"
        fill="none"
        strokeWidth="2"
        className="stroke-flame/70"
      />
    </Chrome>
  );
}

function StorefrontArt() {
  return (
    <Chrome>
      <rect x="12" y="48" width="56" height="8" rx="4" className="fill-ink/80" />
      {[300, 344, 388].map((x) => (
        <rect key={x} x={x} y="49" width="30" height="6" rx="3" className="fill-line-strong" />
      ))}
      <circle cx="452" cy="52" r="7" className="fill-flame/20 stroke-flame/60" />
      <rect x="12" y="68" width="456" height="88" rx="12" className="fill-card stroke-line" />
      <rect x="32" y="88" width="170" height="11" rx="5.5" className="fill-ink/80" />
      <rect x="32" y="107" width="128" height="7" rx="3.5" className="fill-line-strong" />
      <rect x="32" y="126" width="66" height="16" rx="8" className="fill-flame" />
      <circle cx="404" cy="112" r="30" fill="none" className="stroke-flame/40" />
      <circle cx="404" cy="112" r="18" fill="none" className="stroke-line-strong" />
      {[12, 128, 244, 360].map((x, i) => (
        <g key={x}>
          <rect x={x} y="168" width="108" height="120" rx="10" className="fill-card stroke-line" />
          <rect x={x + 10} y="178" width="88" height="62" rx="8" className="fill-line" />
          <rect x={x + 10} y="250" width="64" height="7" rx="3.5" className="fill-line-strong" />
          <rect x={x + 10} y="265" width="34" height="8" rx="4" className={i === 1 ? "fill-flame" : "fill-ink/70"} />
        </g>
      ))}
    </Chrome>
  );
}

function AiArt() {
  return (
    <Chrome>
      <rect x="12" y="50" width="200" height="34" rx="10" className="fill-card stroke-line" />
      <rect x="24" y="60" width="150" height="5" rx="2.5" className="fill-line-strong" />
      <rect x="24" y="71" width="110" height="5" rx="2.5" className="fill-line-strong" />
      <rect x="122" y="96" width="200" height="26" rx="10" className="fill-flame/15 stroke-flame/40" />
      <rect x="136" y="106" width="140" height="6" rx="3" className="fill-flame/70" />
      <rect x="12" y="134" width="240" height="72" rx="10" className="fill-card stroke-line" />
      <rect x="24" y="146" width="130" height="5" rx="2.5" className="fill-line-strong" />
      <rect x="24" y="158" width="216" height="38" rx="6" className="fill-canvas" />
      <rect x="34" y="166" width="80" height="4" rx="2" className="fill-flame/70" />
      <rect x="34" y="176" width="120" height="4" rx="2" className="fill-line-strong" />
      <rect x="34" y="186" width="60" height="4" rx="2" className="fill-line-strong" />
      {[24, 38, 52].map((cx, i) => (
        <circle key={cx} cx={cx} cy="224" r="3.5" className={i === 0 ? "fill-flame" : "fill-ink-faint"} />
      ))}
      <rect x="12" y="248" width="308" height="36" rx="18" className="fill-card stroke-line-strong" />
      <rect x="30" y="263" width="120" height="6" rx="3" className="fill-line-strong" />
      <circle cx="302" cy="266" r="12" className="fill-flame" />
      <path d="M297 266h9m0 0-3.5-3.5m3.5 3.5-3.5 3.5" strokeWidth="1.8" fill="none" className="stroke-flame-ink" />
      <rect x="336" y="50" width="132" height="234" rx="10" className="fill-card stroke-line" />
      <rect x="350" y="64" width="70" height="6" rx="3" className="fill-line-strong" />
      <path d="M398 121 366 146M406 121l32 25" fill="none" className="stroke-line-strong" />
      <circle cx="402" cy="114" r="9" className="fill-flame" />
      <circle cx="366" cy="152" r="7" className="fill-sunken stroke-line-strong" />
      <circle cx="438" cy="152" r="7" className="fill-sunken stroke-line-strong" />
      {[186, 208, 230, 252].map((y) => (
        <g key={y}>
          <rect x="350" y={y} width="104" height="14" rx="7" className="fill-sunken stroke-line" />
          <rect x="358" y={y + 4} width="56" height="5" rx="2.5" className="fill-line-strong" />
        </g>
      ))}
    </Chrome>
  );
}

function MobileArt() {
  return (
    <Chrome>
      <rect x="118" y="72" width="92" height="200" rx="18" fill="none" className="stroke-line" />
      <rect x="270" y="72" width="92" height="200" rx="18" fill="none" className="stroke-line" />
      <rect x="188" y="56" width="104" height="232" rx="20" className="fill-card stroke-line-strong" />
      <rect x="222" y="66" width="36" height="6" rx="3" className="fill-sunken" />
      <rect x="200" y="84" width="56" height="7" rx="3.5" className="fill-ink/80" />
      <circle cx="272" cy="87" r="5" className="fill-flame/30 stroke-flame/60" />
      <rect x="200" y="102" width="80" height="44" rx="8" className="fill-sunken stroke-line" />
      <rect x="208" y="112" width="30" height="5" rx="2.5" className="fill-line-strong" />
      <rect x="208" y="126" width="48" height="9" rx="4.5" className="fill-flame" />
      <rect x="200" y="154" width="80" height="52" rx="8" className="fill-sunken stroke-line" />
      <path
        d="M208 194c8-6 12 2 18-8s10-2 16-10 12 4 18-6"
        fill="none"
        strokeWidth="2"
        className="stroke-flame/80"
      />
      {[214, 234].map((y) => (
        <g key={y}>
          <circle cx="208" cy={y + 6} r="6" className="fill-line-strong" />
          <rect x="220" y={y + 2} width="46" height="6" rx="3" className="fill-line-strong" />
        </g>
      ))}
      <rect x="200" y="260" width="80" height="18" rx="9" className="fill-sunken stroke-line" />
      {[212, 230, 248, 266].map((cx, i) => (
        <circle key={cx} cx={cx} cy="269" r="3" className={i === 0 ? "fill-flame" : "fill-ink-faint"} />
      ))}
    </Chrome>
  );
}

const artByVariant: Record<WorkArt, () => React.JSX.Element> = {
  dashboard: DashboardArt,
  storefront: StorefrontArt,
  ai: AiArt,
  mobile: MobileArt,
};

export function WorkPreview({ variant, className }: { variant: WorkArt; className?: string }) {
  const Art = artByVariant[variant];
  return (
    <svg aria-hidden viewBox="0 0 480 300" className={cn("h-auto w-full", className)}>
      <Art />
    </svg>
  );
}
