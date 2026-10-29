import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";

const CENTER = { x: 160, y: 160 };
const NODES = Array.from({ length: 6 }).map((_, i) => {
  const a = -Math.PI / 2 + i / 6 * Math.PI * 2;
  return { x: 160 + Math.cos(a) * 112, y: 160 + Math.sin(a) * 112 };
});

/** Separate nodes travel together and link into one balanced network. */
export function ConnectionVisual() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "center 45%", scrub: 0.6 } });
      gsap.utils.toArray<SVGGElement>("[data-node]").forEach((node, i) => {
        const a = i * 1.7;
        tl.from(node, { x: Math.cos(a) * 90, y: Math.sin(a) * 90, opacity: 0.2, ease: "power2.out", duration: 0.6 }, 0);
      });
      tl.fromTo("[data-link]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.4, stagger: 0.03 }, 0.45);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      {NODES.map((n, i) => {
        const next = NODES[(i + 1) % NODES.length];
        return (
          <g key={i}>
            <line data-link x1={CENTER.x} y1={CENTER.y} x2={n.x} y2={n.y} stroke="#315EF7" strokeOpacity="0.5" pathLength={1} strokeDasharray="1" />
            <line data-link x1={n.x} y1={n.y} x2={next.x} y2={next.y} stroke="#252632" strokeOpacity="0.2" pathLength={1} strokeDasharray="1" />
          </g>);

      })}
      {NODES.map((n, i) =>
      <g key={i} data-node>
          <circle cx={n.x} cy={n.y} r={i % 2 === 0 ? 12 : 9} fill={i % 3 === 0 ? "#8B5CF6" : "#FAF9F6"} stroke="#315EF7" strokeWidth="1.4" />
        </g>
      )}
      <circle cx={CENTER.x} cy={CENTER.y} r="18" fill="#315EF7" />
    </svg>);

}