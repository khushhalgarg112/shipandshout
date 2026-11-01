"use client";

import { useEffect, useRef, useState } from "react";
import { fragmentShader, vertexShader } from "./shader";
import { cn } from "@/lib/cn";

export type Shape3D = "orb" | "stack" | "waves";

const SHAPE_ID: Record<Shape3D, number> = { orb: 0, stack: 1, waves: 2 };
/** Max rendered pixels — keeps the shader cheap on large/retina screens. */
const PIXEL_BUDGET = 900_000;

/**
 * Interactive 3D object rendered by a tiny raymarching shader (no three.js).
 * Cost control: nothing happens until the object is near the viewport *and*
 * the page has loaded and gone idle; the shader is specialised to one shape
 * and compiled off the main thread where KHR_parallel_shader_compile exists;
 * frames render only while on screen with the tab visible, at a capped pixel
 * count; reduced-motion users get one still frame; low-memory/Data Saver
 * devices skip WebGL entirely. A CSS-gradient sphere shows until the first
 * frame (and stays if WebGL is unavailable), so layout never shifts.
 */
export function Object3D({
  shape = "orb",
  tone = "light",
  className,
}: {
  shape?: Shape3D;
  tone?: "light" | "night";
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if ((device.deviceMemory ?? 8) <= 2 || device.connection?.saveData) return;

    let gl: WebGLRenderingContext | null = null;
    let raf = 0;
    let visible = false;
    let disposed = false;
    let uniforms: Record<string, WebGLUniformLocation | null> = {};
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const clockStart = performance.now() - 2000;

    const resize = () => {
      if (!gl) return;
      const rect = canvas.getBoundingClientRect();
      let dpr = Math.min(window.devicePixelRatio || 1, 2);
      const pixels = rect.width * rect.height * dpr * dpr;
      if (pixels > PIXEL_BUDGET) dpr *= Math.sqrt(PIXEL_BUDGET / pixels);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduceMotion) draw(performance.now());
    };

    const draw = (now: number) => {
      if (!gl) return;
      pointer.x += (pointer.tx - pointer.x) * 0.06;
      pointer.y += (pointer.ty - pointer.y) * 0.06;
      gl.uniform2f(uniforms.uRes, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uTime, reduceMotion ? 2 : (now - clockStart) / 1000);
      gl.uniform2f(uniforms.uPointer, pointer.x, pointer.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden || !gl) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf && visible && !document.hidden && !reduceMotion && gl) {
        raf = requestAnimationFrame(loop);
      }
    };

    let pollTimer = 0;
    const init = () => {
      if (disposed) return;
      const g = canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        powerPreference: "low-power",
      });
      if (!g) return;
      const program = g.createProgram();
      const vs = g.createShader(g.VERTEX_SHADER);
      const fs = g.createShader(g.FRAGMENT_SHADER);
      if (!program || !vs || !fs) return;
      g.shaderSource(vs, vertexShader);
      g.compileShader(vs);
      g.shaderSource(fs, fragmentShader(SHAPE_ID[shape]));
      g.compileShader(fs);
      g.attachShader(program, vs);
      g.attachShader(program, fs);
      g.linkProgram(program);

      const finish = () => {
        if (disposed || !g.getProgramParameter(program, g.LINK_STATUS)) return;
        g.useProgram(program);

        // One oversized triangle covers the viewport.
        g.bindBuffer(g.ARRAY_BUFFER, g.createBuffer());
        g.bufferData(g.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), g.STATIC_DRAW);
        const loc = g.getAttribLocation(program, "aPos");
        g.enableVertexAttribArray(loc);
        g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);

        uniforms = Object.fromEntries(
          ["uRes", "uTime", "uPointer", "uNight"].map((n) => [n, g.getUniformLocation(program, n)]),
        );
        g.uniform1f(uniforms.uNight, tone === "night" ? 1 : 0);

        gl = g;
        resize();
        draw(performance.now());
        setReady(true);
        kick();
      };

      // Querying LINK_STATUS blocks until compilation ends; with the parallel
      // extension we poll its non-blocking completion flag instead.
      const parallel = g.getExtension("KHR_parallel_shader_compile");
      if (!parallel) return finish();
      const poll = () => {
        if (disposed) return;
        if (g.getProgramParameter(program, parallel.COMPLETION_STATUS_KHR)) finish();
        else pollTimer = window.setTimeout(poll, 32);
      };
      poll();
    };

    let cancelIdle = () => {};
    let scheduled = false;
    const schedule = () => {
      if (scheduled) return;
      scheduled = true;
      const go = () => {
        if (window.requestIdleCallback) {
          const id = window.requestIdleCallback(init, { timeout: 1500 });
          cancelIdle = () => window.cancelIdleCallback(id);
        } else {
          const id = window.setTimeout(init, 300);
          cancelIdle = () => window.clearTimeout(id);
        }
      };
      if (document.readyState === "complete") go();
      else window.addEventListener("load", go, { once: true });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        kick();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(host);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onPointer = (e: PointerEvent) => {
      if (!visible) return;
      const rect = host.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      pointer.tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (window.innerWidth / 2)));
      pointer.ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (window.innerHeight / 2)));
    };
    if (finePointer && !reduceMotion) {
      window.addEventListener("pointermove", onPointer, { passive: true });
    }
    const onVisibility = () => kick();
    document.addEventListener("visibilitychange", onVisibility);
    const onLost = (e: Event) => {
      e.preventDefault();
      gl = null;
      setReady(false);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      disposed = true;
      cancelIdle();
      window.clearTimeout(pollTimer);
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl?.getExtension("WEBGL_lose_context")?.loseContext();
      gl = null;
    };
  }, [shape, tone]);

  return (
    <div ref={hostRef} aria-hidden className={cn("relative aspect-square", className)}>
      {/* Ground shadow */}
      <div className="absolute inset-x-[26%] bottom-[15%] h-[7%] rounded-[50%] bg-black/25 blur-2xl" />
      {/* CSS stand-in until the first WebGL frame */}
      <div
        className={cn(
          "absolute inset-[24%] rounded-full transition-opacity duration-700",
          "bg-[radial-gradient(circle_at_34%_30%,#ffd2c9_0%,#ff8a6e_9%,#ff3928_34%,#b81f10_66%,#4d0a03_100%)]",
          ready ? "opacity-0" : "opacity-100",
        )}
      />
      <canvas
        ref={canvasRef}
        className={cn(
          "absolute inset-0 size-full transition-opacity duration-700",
          ready ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
