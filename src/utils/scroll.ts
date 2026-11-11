import type Lenis from "lenis";
import { prefersReducedMotion } from "./motion";

let instance: Lenis | null = null;

const NAV_HEIGHT = 72;

export function registerLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis(): Lenis | null {
  return instance;
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.start();
    instance.scrollTo(el, { offset: -NAV_HEIGHT, duration: 1.4 });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
  if (window.history?.replaceState) window.history.replaceState(null, "", `#${id}`);
}