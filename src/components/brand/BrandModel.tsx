import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import { gsap } from "../../utils/gsap";
import { EASE_OUT_EXPO, prefersReducedMotion } from "../../utils/motion";
import { SectionHeader } from "../SectionHeader";
import { Accent } from "../Accent";
import { BrandGlyph } from "./BrandGlyph";
import { oceanDimensions } from "../../data/brand";

// Each row enters differently: from the left, from below, through a wipe, from the right, from above.
const ENTRANCES: gsap.TweenVars[] = [
{ x: -80, opacity: 0 },
{ y: 60, opacity: 0 },
{ clipPath: "inset(0% 100% 0% 0%)" },
{ x: 80, opacity: 0 },
{ y: -60, opacity: 0 }];


export function BrandModel() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? active;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        setActive(0);
        setHovered(null);
      }
    });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-ocean-row]").forEach((row, i) => {
        gsap.from(row, {
          ...ENTRANCES[i % ENTRANCES.length],
          duration: 1,
          ease: "expo.out",
          scrollTrigger: { trigger: row, start: "top 90%", once: true }
        });
      });
      gsap.from("[data-ocean-glyph]", {
        scale: 0.92,
        opacity: 0,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-ocean-glyph]", start: "top 85%", once: true }
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="ocean" ref={sectionRef} aria-labelledby="ocean-title" className="relative w-full bg-lavender py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          id="ocean-title"
          label="03 / OCEAN Model"
          title={
          <>
              The Five <Accent>Dimensions</Accent> of How I Work.
            </>
          } />
        

        <div className="mt-14 grid gap-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div data-ocean-glyph className="mx-auto max-w-[420px] lg:sticky lg:top-28 lg:mx-0 lg:max-w-none">
              <BrandGlyph activeIndex={shown} letter={oceanDimensions[shown].letter} word={oceanDimensions[shown].word} />
            </div>
          </div>

          <ul className="lg:col-span-7" onMouseLeave={() => setHovered(null)}>
            {oceanDimensions.map((item, i) => {
              const isActive = active === i;
              return (
                <li key={item.id} data-ocean-row className="border-t border-graphite/15 last:border-b">
                  <button
                    type="button"
                    id={`ocean-btn-${item.id}`}
                    aria-expanded={isActive}
                    aria-controls={`ocean-panel-${item.id}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setHovered(i)}
                    onFocus={() => setActive(i)}
                    className={`group flex w-full items-center gap-5 px-4 py-5 text-left transition-colors duration-300 ease-out-expo md:gap-8 md:px-6 md:py-7 ${
                    isActive ? "bg-pearl" : "hover:bg-pearl/60"}`
                    }>
                    
                    <span
                      className={`w-[1.1ch] font-display text-[clamp(3rem,7vw,6rem)] font-semibold leading-none tracking-[-0.04em] transition-colors duration-300 ease-out-expo ${
                      isActive ? "text-cobalt" : "text-graphite/25 group-hover:text-iris"}`
                      }>
                      
                      {item.letter}
                    </span>
                    <span className="flex-1 font-display text-[clamp(1.5rem,2.6vw,2.4rem)] font-medium tracking-[-0.02em] text-graphite">
                      {item.word}
                    </span>
                    <PlusIcon
                      aria-hidden="true"
                      className={`h-6 w-6 shrink-0 transition-transform duration-300 ease-out-expo ${
                      isActive ? "rotate-45 text-cobalt" : "text-graphite/50 group-hover:rotate-90"}`
                      } />
                    
                  </button>
                  <AnimatePresence initial={false}>
                    {isActive &&
                    <motion.div
                      id={`ocean-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`ocean-btn-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      className="overflow-hidden bg-pearl">
                      
                        <p className="max-w-xl px-4 pb-8 text-[17px] leading-relaxed text-graphite/85 md:pl-[calc(1.5rem+1.1ch*4+2rem)] md:pr-6 md:text-lg">
                          {item.text}
                        </p>
                      </motion.div>
                    }
                  </AnimatePresence>
                </li>);

            })}
          </ul>
        </div>
      </div>
    </section>);

}