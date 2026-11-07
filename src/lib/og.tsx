import { ImageResponse } from "next/og";
import { audience, brandPartnerships, site } from "@/config/site";

/**
 * Shared 1200×630 share-card renderer for every route's opengraph-image.
 * Literal hex values are required here — Satori can't read CSS variables.
 * Colours mirror the tokens in globals.css.
 */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const C = {
  canvas: "#ebebeb",
  ink: "#1a1a1a",
  muted: "#4a4a4a",
  flame: "#ff3928",
  night: "#121212",
} as const;

function Wordmark() {
  const parts = site.name.split(/\s*&\s*/);
  return (
    <div style={{ display: "flex", fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
      {parts.length === 2 ? (
        <>
          <span>{parts[0]}</span>
          <span style={{ color: C.flame, margin: "0 10px" }}>&amp;</span>
          <span>{parts[1]}</span>
        </>
      ) : (
        <span>{site.name}</span>
      )}
    </div>
  );
}

export function renderOg({
  eyebrow,
  title,
  accent,
}: {
  /** Small label above the headline, e.g. "Development". */
  eyebrow: string;
  /** Headline. Keep under ~60 characters. */
  title: string;
  /** Optional trailing words rendered in flame. */
  accent?: string;
}) {
  const footer = `${audience.combined.value}${audience.combined.suffix} combined followers · ${brandPartnerships} brand partners · ${site.url.replace(/^https?:\/\//, "")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          backgroundColor: C.canvas,
          color: C.ink,
          padding: 72,
          overflow: "hidden",
        }}
      >
        {/* Glossy 3D sphere — the site's hero object, drawn with gradients */}
        <div
          style={{
            position: "absolute",
            right: -90,
            top: 70,
            width: 520,
            height: 520,
            borderRadius: 9999,
            backgroundImage: `radial-gradient(circle at 34% 30%, #ffd2c9 0%, #ff8a6e 10%, ${C.flame} 34%, #b81f10 66%, #4d0a03 100%)`,
            boxShadow: "0 60px 90px -30px rgba(120,20,8,0.55)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: -170,
            top: 290,
            width: 680,
            height: 120,
            borderRadius: 9999,
            border: `10px solid ${C.ink}`,
            transform: "rotate(-14deg)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Wordmark />

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 760 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                fontSize: 26,
                fontWeight: 600,
                color: C.muted,
                textTransform: "lowercase",
              }}
            >
              <div style={{ width: 14, height: 14, borderRadius: 9999, backgroundColor: C.flame }} />
              {eyebrow}
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: 22,
                fontSize: 78,
                fontWeight: 700,
                letterSpacing: -3.5,
                lineHeight: 1,
              }}
            >
              {title}
              {accent ? <span style={{ color: C.flame, marginLeft: 18 }}>{accent}</span> : null}
            </div>
          </div>

          <div style={{ display: "flex", fontSize: 24, color: C.muted }}>{footer}</div>
        </div>
      </div>
    ),
    { ...ogSize },
  );
}
