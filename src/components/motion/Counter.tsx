"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Animated stat counter: counts from 0 to `value` when scrolled into view.
 * Server HTML carries the final value (good for SEO and no-JS); the count-up
 * only starts after hydration. Reduced-motion users keep the static value.
 */
export function Counter({
  value,
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!el || motion.matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / (duration * 1000), 1);
          setDisplay(value * (1 - Math.pow(1 - t, 4))); // ease-out-quart
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(0);
        frame = requestAnimationFrame(tick);
      },
      // Fire at the viewport edge — earlier than Reveal's margin — so the reset
      // to 0 happens while the surrounding Reveal still has it hidden.
      { rootMargin: "0px" },
    );
    observer.observe(el);
    const onMotionChange = () => {
      if (!motion.matches) return;
      observer.disconnect();
      cancelAnimationFrame(frame);
      setDisplay(value);
    };
    motion.addEventListener("change", onMotionChange);
    return () => {
      motion.removeEventListener("change", onMotionChange);
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      <span className="tabular-nums">{display.toFixed(decimals)}</span>
      {suffix}
    </span>
  );
}
