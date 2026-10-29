import React, { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";
import { SectionHeader } from "./SectionHeader";
import { Accent } from "./Accent";
import { milestones } from "../data/journey";

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".journey-item").forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 62%",
          onEnter: () => item.classList.add("is-active"),
          onLeaveBack: () => item.classList.remove("is-active")
        });
        if (!reduced) {
          gsap.from(item.querySelectorAll("[data-journey-fade]"), {
            y: 26,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: item, start: "top 82%", once: true }
          });
        }
      });
      if (!reduced) {
        gsap.fromTo(
          "[data-journey-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: { trigger: "[data-journey-list]", start: "top 62%", end: "bottom 62%", scrub: 0.6 }
          }
        );
      }
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} aria-labelledby="journey-title" className="relative w-full bg-ivory py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          id="journey-title"
          label="07 / Growth"
          title={
          <>
              Always Learning. <Accent>Always</Accent> Building.
            </>
          } />
        

        <div data-journey-list className="relative mx-auto mt-16 max-w-5xl md:mt-24">
          <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-graphite/15 md:left-1/2 md:-translate-x-1/2">
            <div data-journey-progress className="h-full w-full origin-top bg-cobalt" />
          </div>

          <ol className="flex flex-col gap-16 md:gap-24">
            {milestones.map((m, i) => {
              const right = i % 2 === 1;
              return (
                <li key={m.id} className="journey-item relative grid pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                  <span
                    aria-hidden="true"
                    className="journey-dot absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-graphite/25 bg-ivory md:left-1/2 md:-translate-x-1/2" />
                  
                  <div className={right ? "md:col-start-2" : "md:pr-4 md:text-right"}>
                    <p data-journey-fade className="journey-phase font-mono text-[11px] uppercase tracking-[0.2em] text-mist transition-colors duration-300 ease-out-expo">
                      0{i + 1} — {m.phase}
                    </p>
                    <h3
                      data-journey-fade
                      className="mt-3 font-display text-[clamp(1.6rem,2.8vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-graphite">
                      
                      {m.title}
                    </h3>
                    <p data-journey-fade className={`mt-4 max-w-md text-[17px] leading-relaxed text-graphite/75 ${right ? "" : "md:ml-auto"}`}>
                      {m.text}
                    </p>
                  </div>
                </li>);

            })}
          </ol>
        </div>
      </div>
    </section>);

}