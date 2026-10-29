import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";

const SCATTER = [
{ x: -60, y: -70, rotation: -40 },
{ x: 40, y: 80, rotation: 60 },
{ x: -30, y: -90, rotation: 0 },
{ x: 70, y: 60, rotation: -30 },
{ x: -50, y: 70, rotation: 45 }];


/** The floating forms from the hero finally settle into one balanced line. */
export function ClosingComposition() {
  const ref = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 92%", end: "center 55%", scrub: 0.7 } });
      gsap.utils.toArray<SVGGElement>("[data-close-shape]").forEach((s, i) => {
        tl.from(s, { ...SCATTER[i], opacity: 0.2, transformOrigin: "50% 50%", ease: "power2.out", duration: 1 }, 0);
      });
      tl.fromTo("[data-close-line]", { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.6 }, 0.5);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <svg ref={ref} viewBox="0 0 1000 160" className="h-auto w-full" aria-hidden="true">
      <line data-close-line x1="40" y1="80" x2="960" y2="80" stroke="#315EF7" strokeWidth="1" pathLength={1} strokeDasharray="1" />
      <g data-close-shape>
        <circle cx="100" cy="80" r="34" fill="#FAF9F6" stroke="#252632" strokeOpacity="0.15" />
      </g>
      <g data-close-shape>
        <rect x="272" y="52" width="56" height="56" transform="rotate(45 300 80)" fill="#8B5CF6" />
      </g>
      <g data-close-shape>
        <circle cx="500" cy="80" r="44" fill="none" stroke="#315EF7" strokeWidth="2" />
        <circle cx="500" cy="80" r="8" fill="#315EF7" />
      </g>
      <g data-close-shape>
        <polygon points="700,46 734,108 666,108" fill="none" stroke="#3730A3" strokeWidth="2" />
      </g>
      <g data-close-shape>
        <circle cx="900" cy="80" r="22" fill="#3730A3" />
      </g>
    </svg>);

}