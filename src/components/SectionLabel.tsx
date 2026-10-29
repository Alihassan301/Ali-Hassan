import React, { ReactNode, useLayoutEffect, useRef } from "react";
import { gsap } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className = "" }: SectionLabelProps) {
  const ref = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 90%", once: true } });
      tl.from("[data-label-line]", { scaleX: 0, transformOrigin: "left center", duration: 0.7, ease: "expo.out" }).from(
        "[data-label-text]",
        { yPercent: 110, duration: 0.7, ease: "expo.out" },
        0.1
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <p
      ref={ref}
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-mist ${className}`}>
      
      <span data-label-line aria-hidden="true" className="h-px w-10 shrink-0 bg-cobalt" />
      <span className="overflow-hidden">
        <span data-label-text className="inline-block">
          {children}
        </span>
      </span>
    </p>);

}