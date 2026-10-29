import React, { ElementType, ReactNode, useLayoutEffect, useRef } from "react";
import { gsap, SplitText } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";

type RevealMode = "lines" | "words";

interface RevealTextProps {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  mode?: RevealMode;
  delay?: number;
  stagger?: number;
  duration?: number;
  start?: string;
  id?: string;
}

/** Masked line-by-line or word-by-word reveal, triggered once on scroll. Text stays readable if JS fails. */
export function RevealText({
  as = "h2",
  children,
  className = "",
  mode = "lines",
  delay = 0,
  stagger,
  duration = 1.05,
  start = "top 85%",
  id
}: RevealTextProps) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let split: SplitText | null = null;
    let cancelled = false;
    const ctx = gsap.context(() => {});
    const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();

    fontsReady.then(() => {
      if (cancelled) return;
      ctx.add(() => {
        split = SplitText.create(el, {
          type: mode === "words" ? "lines,words" : "lines",
          mask: mode === "words" ? "words" : "lines",
          autoSplit: true,
          onSplit(self) {
            const targets = mode === "words" ? self.words : self.lines;
            return gsap.from(targets, {
              yPercent: 115,
              duration,
              delay,
              ease: "expo.out",
              stagger: stagger ?? (mode === "words" ? 0.045 : 0.12),
              scrollTrigger: { trigger: el, start, once: true }
            });
          }
        });
      });
    });

    return () => {
      cancelled = true;
      split?.revert();
      ctx.revert();
    };
  }, [mode, delay, stagger, duration, start]);

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>);

}