import { Marquee } from "@/components/ui/Marquee";
import { RibbonStage } from "@/components/motion/RibbonStage";

export type RibbonItem = { label: string; icon?: React.ReactNode };

/**
 * In-flow tapes: compact separate rows on phones and gently angled on desktop.
 * Reduced motion presents all items without rotation or clipped duplicates.
 */
export function Ribbons({
  front,
  back,
  className,
}: {
  front: readonly RibbonItem[];
  back: readonly string[];
  className?: string;
}) {
  return (
    <RibbonStage className={className}>
      <div className="ribbon ribbon-b">
        <Marquee reverse fade={false}>
          {back.map((item) => (
            <span key={item} className="ribbon-item">
              {item}
              <span className="ribbon-dot" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="ribbon ribbon-a">
        <Marquee fade={false}>
          {front.map((item) => (
            <span key={item.label} className="ribbon-item">
              <span className="ribbon-item-label">
                {item.icon}
                {item.label}
              </span>
              <span className="ribbon-separator" aria-hidden>✦</span>
            </span>
          ))}
        </Marquee>
      </div>
    </RibbonStage>
  );
}
