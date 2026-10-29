import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";
import { registerLenis } from "../utils/scroll";

/** Lenis smooth scrolling driven by the GSAP ticker so ScrollTrigger stays in sync. */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    registerLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      registerLenis(null);
    };
  }, [enabled]);
}