import { useEffect, useState } from "react";

/** Returns the id of the section currently occupying the reading area of the viewport. */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const elements = key.
    split("|").
    map((id) => document.getElementById(id)).
    filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = window.innerHeight * 0.6;
      let current = elements[0].id;
      let closestTop = -Infinity;

      elements.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top <= probe && top >= closestTop) {
          closestTop = top;
          current = el.id;
        }
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = elements[elements.length - 1].id;
      }

      setActive((prev) => prev === current ? prev : current);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : null;
    resizeObserver?.observe(document.documentElement);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      resizeObserver?.disconnect();
    };
  }, [key]);

  return active;
}
