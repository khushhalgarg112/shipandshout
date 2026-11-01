import { ImageResponse } from "next/og";
import { site } from "@/config/site";

/**
 * App icon generated from the brand name: the ampersand when the name has
 * one, otherwise its initials. Hex literals because Satori has no CSS vars.
 */
export function renderBrandMark(px: number) {
  const glyph = site.name.includes("&") ? "&" : site.shortName.slice(0, 2);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ff3928",
          color: "#141414",
          borderRadius: px * 0.22,
          fontSize: px * (glyph.length > 1 ? 0.46 : 0.66),
          fontWeight: 700,
          letterSpacing: -px * 0.02,
        }}
      >
        {glyph}
      </div>
    ),
    { width: px, height: px },
  );
}
