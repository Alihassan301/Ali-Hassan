import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { SectionHeader } from "../SectionHeader";
import { Accent } from "../Accent";
import { SkillItem } from "./SkillItem";
import { SkillDetail } from "./SkillDetail";
import { skillCategories } from "../../data/skills";
import type { Skill } from "../../types/content";

interface Selection {
  skill: Skill;
  categoryId: string;
  categoryTitle: string;
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selection, setSelection] = useState<Selection | null>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-skill-block]").forEach((block) => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: block, start: "top 85%", once: true }, defaults: { ease: "expo.out" } });
        tl.from(block.querySelector("[data-skill-rule]"), { scaleX: 0, transformOrigin: "left center", duration: 0.9 }).
        from(block.querySelectorAll("[data-skill-head]"), { yPercent: 110, duration: 0.6, stagger: 0.05 }, 0.05).
        from(block.querySelectorAll("li"), { y: 18, opacity: 0, duration: 0.6, stagger: 0.025 }, 0.15);
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} aria-labelledby="skills-title" className="relative w-full bg-ice py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHeader
          id="skills-title"
          label="05 / Toolkit"
          title={
          <>
              The Tools <Accent>Behind</Accent> the Ideas.
            </>
          } />
        

        <div className="mt-16 grid gap-12 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28 border-l border-graphite/15 pl-8">
              <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">Selected technology</p>
              <SkillDetail skill={selection?.skill ?? null} categoryTitle={selection?.categoryTitle ?? null} />
            </div>
          </aside>

          <div className="flex flex-col gap-14 lg:col-span-8">
            {skillCategories.map((cat, ci) =>
            <div key={cat.id} data-skill-block>
                <div className="flex items-baseline justify-between gap-4 pb-4">
                  <h3 className="overflow-hidden font-display text-[clamp(1.5rem,2.4vw,2.25rem)] font-semibold tracking-[-0.02em]">
                    <span data-skill-head className="inline-block">
                      {cat.title}
                    </span>
                  </h3>
                  <span className="overflow-hidden font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
                    <span data-skill-head className="inline-block">
                      {String.fromCharCode(65 + ci)} / {String(cat.skills.length).padStart(2, "0")}
                    </span>
                  </span>
                </div>
                <div data-skill-rule className="h-px w-full bg-graphite/20" />
                <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-4">
                  {cat.skills.map((skill) =>
                <li key={skill.name}>
                      <SkillItem
                    skill={skill}
                    category={cat.id}
                    selected={selection?.skill.name === skill.name}
                    onSelect={() =>
                    setSelection((prev) =>
                    prev?.skill.name === skill.name ? null : { skill, categoryId: cat.id, categoryTitle: cat.title }
                    )
                    } />
                  
                    </li>
                )}
                </ul>
                {selection?.categoryId === cat.id &&
              <div className="mt-6 bg-pearl p-5 lg:hidden">
                    <SkillDetail skill={selection.skill} categoryTitle={selection.categoryTitle} />
                  </div>
              }
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}