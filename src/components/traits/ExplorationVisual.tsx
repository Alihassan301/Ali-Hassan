import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";

function polygon(sides: number, r: number, rotation = -Math.PI / 2): string {
  return Array.from({ length: sides }).
  map((_, i) => {
    const a = rotation + i / sides * Math.PI * 2;
    return `${(160 + Math.cos(a) * r).toFixed(1)},${(160 + Math.sin(a) * r).toFixed(1)}`;
  }).
  join(" ");
}

const SHAPES = [
{ sides: 3, r: 128, color: "#8B5CF6", spin: "animate-spin-slow" },
{ sides: 4, r: 92, color: "#315EF7", spin: "animate-spin-slower" },
{ sides: 6, r: 58, color: "#3730A3", spin: "animate-spin-slowest" }];


/** Nested polygons that keep evolving — each one turning at its own pace. */
export function ExplorationVisual() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.
      timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "center 45%", scrub: 0.6 } }).
      from("[data-poly]", { scale: 0.3, rotation: -120, opacity: 0, transformOrigin: "50% 50%", stagger: 0.15, ease: "power2.out" }).
      from("[data-orbit]", { opacity: 0, ease: "none" }, 0.3);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      {SHAPES.map((s) =>
      <g key={s.sides} data-poly>
          <g className={s.spin}>
            <polygon points={polygon(s.sides, s.r)} fill="none" stroke={s.color} strokeWidth="1.4" />
          </g>
        </g>
      )}
      <g data-orbit>
        <g className="animate-spin-slower" style={{ transformOrigin: "160px 160px", transformBox: "view-box" }}>
          <circle cx="160" cy="18" r="6" fill="#8B5CF6" />
        </g>
      </g>
      <circle cx="160" cy="160" r="5" fill="#252632" />
    </svg>);

}