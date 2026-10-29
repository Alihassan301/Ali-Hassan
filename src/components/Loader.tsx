import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";
import { photos } from "../data/photos";

interface LoaderProps {
  quick: boolean;
  onReveal: () => void;
  onExited: () => void;
}

const NAME = "ALI HASSAN";
const NODES = [
{ x: 200, y: 52 },
{ x: 338, y: 158 },
{ x: 292, y: 322 },
{ x: 108, y: 322 },
{ x: 62, y: 158 }];

const LINKS: [number, number][] = [
[0, 1],
[1, 2],
[2, 3],
[3, 4],
[4, 0],
[0, 2],
[1, 3]];


export function Loader({ quick, onReveal, onExited }: LoaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const exitRef = useRef<() => void>(() => undefined);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reduced = prefersReducedMotion();
    const total = 2 + photos.length;
    let done = 0;
    let introFinished = reduced;
    let exiting = false;
    const display = { value: 0 };
    const ctx = gsap.context(() => undefined, root);

    const render = () => {
      const v = Math.round(display.value * 100);
      if (countRef.current) countRef.current.textContent = String(v).padStart(3, "0");
      if (barRef.current) barRef.current.style.transform = `scaleX(${display.value})`;
    };

    const exit = () => {
      if (exiting) return;
      exiting = true;
      ctx.add(() => {
        const tl = gsap.timeline({ onComplete: onExited });
        tl.to(display, { value: 1, duration: 0.25, ease: "power2.out", onUpdate: render, overwrite: true });
        if (reduced) {
          tl.add(onReveal).to(root, { opacity: 0, duration: 0.3 });
          return;
        }
        tl.to("[data-l-geo]", { scale: 5.5, opacity: 0, duration: 0.9, ease: "power3.inOut", transformOrigin: "50% 50%" }, "<0.05").
        to("[data-l-char]", { yPercent: -110, duration: 0.55, stagger: 0.018, ease: "power3.inOut" }, "<").
        to("[data-l-ah] > span, [data-l-sub], [data-l-progress]", { opacity: 0, y: -16, duration: 0.35, ease: "power2.out" }, "<").
        add(onReveal, "-=0.4").
        to(root, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.85, ease: "expo.inOut" }, "-=0.45");
      });
    };
    exitRef.current = exit;

    const tryExit = () => {
      if (introFinished && done >= total) exit();
    };

    const step = () => {
      done += 1;
      if (!exiting) {
        gsap.to(display, { value: done / total, duration: 0.45, ease: "power2.out", onUpdate: render, overwrite: true });
      }
      tryExit();
    };

    const track = (promise: Promise<unknown>) => {
      let fired = false;
      const fire = () => {
        if (fired) return;
        fired = true;
        step();
      };
      promise.then(fire, fire);
    };

    track(document.fonts ? document.fonts.ready : Promise.resolve());
    track(
      new Promise((resolve) => {
        if (document.readyState === "complete") resolve(null);else
        window.addEventListener("load", () => resolve(null), { once: true });
      })
    );
    photos.forEach((p) =>
    track(
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(null);
        img.onerror = () => resolve(null);
        img.src = p.src;
      })
    )
    );

    if (!reduced) {
      ctx.add(() => {
        gsap.set(root, { clipPath: "inset(0% 0% 0% 0%)" });
        const tl = gsap.timeline({
          onComplete: () => {
            introFinished = true;
            tryExit();
          }
        });
        tl.from("[data-l-dot]", { scale: 0, duration: 0.35, ease: "back.out(2.4)", transformOrigin: "50% 50%" }).
        fromTo(
          "[data-l-glow]",
          { scale: 1, opacity: 0.55 },
          { scale: 6, opacity: 0, duration: 0.75, ease: "power2.out", transformOrigin: "50% 50%" },
          "<0.1"
        ).
        fromTo("[data-l-ring]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, stagger: 0.1, ease: "power3.inOut" }, "-=0.5").
        from("[data-l-node]", { scale: 0, duration: 0.4, stagger: 0.05, ease: "back.out(2)", transformOrigin: "50% 50%" }, "-=0.5").
        fromTo("[data-l-link]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, stagger: 0.04, ease: "power2.out" }, "-=0.35").
        to("[data-l-dot]", { scale: 0, duration: 0.25, ease: "power2.out", transformOrigin: "50% 50%" }, "-=0.25").
        from("[data-l-ah] > span", { yPercent: 110, duration: 0.6, ease: "expo.out" }, "<").
        from("[data-l-char]", { yPercent: 110, duration: 0.6, stagger: 0.03, ease: "expo.out" }, "-=0.35").
        from("[data-l-sub]", { opacity: 0, y: 8, duration: 0.4, ease: "power2.out" }, "-=0.3").
        from("[data-l-progress]", { opacity: 0, duration: 0.3 }, "<");
        gsap.to("[data-l-orbit]", { rotation: 360, duration: 16, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
        if (quick) tl.timeScale(2.4);
      });
    }

    const safety = window.setTimeout(exit, quick ? 3000 : 5000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exit();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [quick, onReveal, onExited]);

  return (
    <div
      ref={rootRef}
      role="status"
      aria-label="Loading Ali Hassan's portfolio"
      className="fixed inset-0 z-[100] flex flex-col bg-pearl text-graphite">
      
      <div className="flex items-center justify-between px-5 pt-5 md:px-10 md:pt-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist">The Interactive Experience</span>
        <button
          type="button"
          onClick={() => exitRef.current()}
          className="group inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mist transition-colors duration-200 ease-out-expo hover:text-graphite">
          
          Skip intro
          <span aria-hidden="true" className="inline-block transition-transform duration-200 ease-out-expo group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <div className="relative aspect-square w-[min(58vmin,400px)]">
          <svg data-l-geo viewBox="0 0 400 400" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
            <g data-l-orbit>
              <ellipse
                data-l-ring
                cx="200"
                cy="200"
                rx="196"
                ry="64"
                transform="rotate(-24 200 200)"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="1"
                pathLength={1}
                strokeDasharray="1" />
              
            </g>
            {[150, 104, 62].map((r, i) =>
            <circle
              key={r}
              data-l-ring
              cx="200"
              cy="200"
              r={r}
              fill="none"
              stroke={i === 1 ? "#3730A3" : "#315EF7"}
              strokeOpacity={i === 0 ? 0.35 : 0.8}
              strokeWidth="1"
              pathLength={1}
              strokeDasharray="1" />

            )}
            {LINKS.map(([a, b]) =>
            <line
              key={`${a}-${b}`}
              data-l-link
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="#252632"
              strokeOpacity="0.14"
              strokeWidth="1"
              pathLength={1}
              strokeDasharray="1" />

            )}
            {NODES.map((n, i) =>
            <circle
              key={i}
              data-l-node
              cx={n.x}
              cy={n.y}
              r={i % 2 === 0 ? 7 : 5}
              fill={i === 1 ? "#8B5CF6" : "#FAF9F6"}
              stroke={i === 1 ? "none" : "#315EF7"}
              strokeWidth="1.5" />

            )}
            <circle data-l-glow cx="200" cy="200" r="6" fill="none" stroke="#315EF7" strokeWidth="1.5" />
            <circle data-l-dot cx="200" cy="200" r="6" fill="#315EF7" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span data-l-ah className="block overflow-hidden leading-none">
              <span className="block font-display text-[clamp(2.5rem,9vmin,4.5rem)] font-semibold tracking-[-0.04em] text-graphite">
                AH
              </span>
            </span>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-8 flex font-display text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-none tracking-[0.06em] text-graphite">
          
          {NAME.split("").map((ch, i) =>
          <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
              <span data-l-char className="inline-block">
                {ch === " " ? "\u00A0" : ch}
              </span>
            </span>
          )}
        </p>
        <p data-l-sub className="mt-4 font-mono text-[11px] uppercase tracking-[0.4em] text-cobalt">
          Full Stack Developer
        </p>
        <span className="sr-only">Ali Hassan — Full Stack Developer. Loading.</span>
      </div>

      <div data-l-progress className="px-5 pb-6 md:px-10 md:pb-8">
        <div className="flex items-end justify-between font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
          <span>Loading experience</span>
          <span>
            <span ref={countRef} className="text-graphite">
              000
            </span>
            <span aria-hidden="true"> / 100</span>
          </span>
        </div>
        <div className="mt-3 h-px w-full overflow-hidden bg-graphite/10">
          <span ref={barRef} className="block h-full w-full origin-left bg-cobalt" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </div>);

}