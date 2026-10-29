import { RefObject, useLayoutEffect } from "react";
import { gsap } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";
import type { ProjectVariant } from "../types/content";

interface RevealTiming {
  bg: gsap.TweenVars;
  title: number;
  stagger: number;
  preview: number;
}

// Shared choreography, individually timed per project.
const TIMING: Record<ProjectVariant, RevealTiming> = {
  presence: { bg: { scaleX: 0, transformOrigin: "right center" }, title: 1.0, stagger: 0.1, preview: 0.7 },
  karigar: { bg: { scaleY: 0, transformOrigin: "center bottom" }, title: 1.15, stagger: 0.14, preview: 0.78 },
  test: { bg: { opacity: 0, scale: 0.85 }, title: 0.9, stagger: 0.08, preview: 0.65 },
  zakat: { bg: { scaleX: 0, transformOrigin: "left center" }, title: 1.05, stagger: 0.12, preview: 0.8 },
  cooking: { bg: { yPercent: 30, opacity: 0 }, title: 1.2, stagger: 0.16, preview: 0.6 }
};

export function useProjectReveal(ref: RefObject<HTMLElement>, variant: ProjectVariant) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const t = TIMING[variant];
    const has = (s: string) => el.querySelector(s) !== null;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top 75%", once: true }, defaults: { ease: "expo.out" } });
      if (has("[data-p-bg]")) tl.from("[data-p-bg]", { ...t.bg, duration: 1.1, ease: "expo.inOut" }, 0);
      tl.from("[data-p-index]", { yPercent: 110, duration: 0.6 }, 0.15).from(
        "[data-p-title]",
        { yPercent: 110, duration: t.title, stagger: t.stagger },
        0.2
      );
      if (has("[data-p-tech]")) tl.from("[data-p-tech]", { y: 14, opacity: 0, duration: 0.5, stagger: 0.06 }, 0.55);
      if (has("[data-p-desc]")) tl.from("[data-p-desc]", { y: 18, opacity: 0, duration: 0.8 }, 0.6);
      tl.from("[data-p-link]", { y: 14, opacity: 0, duration: 0.6 }, 0.75);

      gsap.fromTo(
        "[data-p-preview]",
        { scale: t.preview, opacity: 0.6 },
        { scale: 1, opacity: 1, ease: "none", scrollTrigger: { trigger: "[data-p-preview]", start: "top 95%", end: "top 35%", scrub: 0.6 } }
      );
    }, el);
    return () => ctx.revert();
  }, [ref, variant]);
}