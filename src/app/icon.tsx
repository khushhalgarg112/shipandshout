import { renderBrandMark } from "@/lib/brand-mark";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return renderBrandMark(size.width);
}
