import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { SectionHeader } from "../SectionHeader";
import { RevealText } from "../RevealText";
import { Accent } from "../Accent";
import { PrecisionVisual } from "./PrecisionVisual";
import { ExplorationVisual } from "./ExplorationVisual";
import { ConnectionVisual } from "./ConnectionVisual";
import { traits } from "../../data/brand";
import type { TraitVisualKind } from "../../types/content";

const VISUALS: Record<TraitVisualKind, {el: React.ReactNode;bg: string;}> = {
  precision: { el: <PrecisionVisual />, bg: "bg-ice" },
  exploration: { el: <ExplorationVisual />, bg: "bg-lavender" },
  connection: { el: <ConnectionVisual />, bg: "bg-ivory" }
};

export function Personality() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-trait-text]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-trait-fade]"), {
          y: 24,
          opacity: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true }
        });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="personality" ref={sectionRef} aria-labelledby="personality-title" className="relative w-full bg-pearl py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeader
            id="personality-title"
            label="04 / Personality"
            className="lg:col-span-8"
            title={
            <>
                How I <Accent>Think.</Accent> How I Work.
              </>
            } />
          
          <p className="max-w-sm self-end text-[15px] leading-relaxed text-mist lg:col-span-3 lg:col-start-10">
            Three selected traits from the OCEAN model, used to describe how I work — not results of a personality
            assessment.
          </p>
        </div>

        <ol className="mt-16 flex flex-col gap-20 md:mt-24 md:gap-32">
          {traits.map((trait, i) => {
            const visual = VISUALS[trait.visual];
            const flip = i % 2 === 1;
            return (
              <li key={trait.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
                <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
                  <div className={`mx-auto aspect-square w-full max-w-[480px] p-6 md:p-10 ${visual.bg}`}>{visual.el}</div>
                </div>
                <div data-trait-text className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}>
                  <p data-trait-fade className="font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
                    Trait 0{i + 1} — {trait.name}
                  </p>
                  <RevealText
                    as="h3"
                    className="mt-4 font-display text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[1.0] tracking-[-0.045em] text-graphite">
                    
                    {trait.keyword}
                  </RevealText>
                  <p data-trait-fade className="mt-6 max-w-lg text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-graphite/80">
                    {trait.text}
                  </p>
                </div>
              </li>);

          })}
        </ol>
      </div>
    </section>);

}