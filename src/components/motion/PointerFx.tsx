"use client";

import { useEffect } from "react";

/**
 * One delegated pointer listener for the whole site (mounted once in the
 * layout, after hydration):
 *  - [data-tilt] elements get --rx/--ry (tilt) and --mx/--my (glare) vars
 *  - <html> gets --px/--py (-1…1 from viewport centre) for .parallax layers
 * Writes are batched into one rAF. Skipped on touch and reduced motion.
 */
export function PointerFx() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduce.matches) return;

    const root = document.documentElement;
    let frame = 0;
    let event: PointerEvent | null = null;
    let active: HTMLElement | null = null;

    const release = (el: HTMLElement) => {
      el.removeAttribute("data-tilt-active");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const apply = () => {
      frame = 0;
      if (!event) return;
      const { clientX: x, clientY: y, target } = event;

      const el = target instanceof Element ? target.closest<HTMLElement>("[data-tilt]") : null;
      const rect = el?.getBoundingClientRect();

      root.style.setProperty("--px", ((x / window.innerWidth) * 2 - 1).toFixed(3));
      root.style.setProperty("--py", ((y / window.innerHeight) * 2 - 1).toFixed(3));

      if (active && active !== el) release(active);
      active = el;
      if (!el || !rect) return;

      const nx = (x - rect.left) / rect.width;
      const ny = (y - rect.top) / rect.height;
      const max = Number(el.dataset.tilt) || 8;
      el.setAttribute("data-tilt-active", "");
      el.style.setProperty("--ry", `${((nx - 0.5) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - ny) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(nx * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(ny * 100).toFixed(1)}%`);
    };

    const onMove = (e: PointerEvent) => {
      if (reduce.matches) return;
      event = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      event = null;
      if (active) release(active);
      active = null;
      root.style.setProperty("--px", "0");
      root.style.setProperty("--py", "0");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    reduce.addEventListener("change", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      reduce.removeEventListener("change", onLeave);
      cancelAnimationFrame(frame);
      if (active) release(active);
    };
  }, []);

  return null;
}
