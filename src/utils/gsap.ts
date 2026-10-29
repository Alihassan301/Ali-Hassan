import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

let refreshTimer: ReturnType<typeof setTimeout> | null = null;

/** Debounced ScrollTrigger refresh — safe to call whenever media finishes loading. */
export function scheduleRefresh(delay = 200) {
  if (refreshTimer) clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
    refreshTimer = null;
  }, delay);
}

export { gsap, ScrollTrigger, SplitText };