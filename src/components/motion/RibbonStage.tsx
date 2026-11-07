"use client";

import { useState, useSyncExternalStore } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/cn";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = (notify: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
};
const readPreference = () => window.matchMedia(query).matches;
const serverPreference = () => true;

/** A small motion control island; tape content stays server rendered. */
export function RibbonStage({ children, className }: { children: React.ReactNode; className?: string }) {
  const [paused, setPaused] = useState(false);
  const [playRequested, setPlayRequested] = useState(false);
  const reduceMotion = useSyncExternalStore(subscribe, readPreference, serverPreference);
  const staticRoster = reduceMotion && !playRequested;
  const label = staticRoster ? "Play ribbons" : paused ? "Resume ribbons" : "Pause ribbons";
  const toggle = () => {
    if (staticRoster) {
      setPlayRequested(true);
      setPaused(false);
    }
    else setPaused((value) => !value);
  };
  return (
    <div className={cn("ribbon-stage", className)} data-paused={paused || undefined} data-motion={playRequested ? "play" : undefined}>
      <div className="ribbon-viewport" aria-hidden="true">{children}</div>
      <div className="ribbon-control-row site-container">
        <button type="button" className="ribbon-control" onClick={toggle}>
          {staticRoster || paused ? <Play size={14} aria-hidden /> : <Pause size={14} aria-hidden />}
          {label}
        </button>
      </div>
    </div>
  );
}
