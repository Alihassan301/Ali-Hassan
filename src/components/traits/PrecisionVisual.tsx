import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";

const SIZE = 44;
const GAP = 12;
const N = 4;
const OFFSET = (320 - (N * SIZE + (N - 1) * GAP)) / 2;
const HIGHLIGHT = new Set([5, 10]);

/** Scattered squares settle into a precisely aligned grid as you scroll. */
export function PrecisionVisual() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 85%", end: "center 45%", scrub: 0.6 } });
      gsap.utils.toArray<SVGRectElement>("[data-cell]").forEach((cell, i) => {
        tl.from(
          cell,
          {
            x: Math.sin(i * 12.9898) * 70,
            y: Math.cos(i * 78.233) * 70,
            rotation: Math.sin(i * 3.1) * 60,
            opacity: 0.15,
            transformOrigin: "50% 50%",
            ease: "power2.out",
            duration: 1
          },
          0
        );
      });
      tl.fromTo("[data-frame]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.6 }, 0.4);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 320 320" className="h-full w-full" aria-hidden="true">
      <rect
        data-frame
        x={OFFSET - 18}
        y={OFFSET - 18}
        width={N * SIZE + (N - 1) * GAP + 36}
        height={N * SIZE + (N - 1) * GAP + 36}
        fill="none"
        stroke="#315EF7"
        strokeWidth="1"
        pathLength={1}
        strokeDasharray="1" />
      
      {Array.from({ length: N * N }).map((_, i) => {
        const r = Math.floor(i / N);
        const c = i % N;
        const hl = HIGHLIGHT.has(i);
        return (
          <rect
            key={i}
            data-cell
            x={OFFSET + c * (SIZE + GAP)}
            y={OFFSET + r * (SIZE + GAP)}
            width={SIZE}
            height={SIZE}
            fill={hl ? "#315EF7" : "none"}
            stroke={hl ? "none" : "#252632"}
            strokeOpacity="0.35"
            strokeWidth="1.2" />);


      })}
    </svg>);

}