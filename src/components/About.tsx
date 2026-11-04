import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../utils/gsap";
import { prefersReducedMotion } from "../utils/motion";
import { SectionHeader } from "./SectionHeader";
import { Accent } from "./Accent";

const ENTER_FROM = [
{ x: 140, y: -40, rotate: -30 },
{ x: -90, y: 120, rotate: 25 },
{ x: 60, y: 140, rotate: 0 },
{ x: 180, y: 30, rotate: 40 },
{ x: -120, y: -40, rotate: 0 }];


export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-about-body]", {
        y: 28,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-about-body]", start: "top 88%", once: true }
      });
      gsap.utils.toArray<HTMLElement>("[data-about-shape]").forEach((shape, i) => {
        gsap.from(shape, {
          ...ENTER_FROM[i % ENTER_FROM.length],
          opacity: 0,
          duration: 1.3,
          delay: i * 0.08,
          ease: "expo.out",
          scrollTrigger: { trigger: "[data-about-composition]", start: "top 80%", once: true }
        });
      });
      gsap.to("[data-about-drift]", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.from("[data-about-fact]", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-about-facts]", start: "top 90%", once: true }
      });
      const counter = { v: 0 };
      if (countRef.current) countRef.current.textContent = "0+";
      gsap.to(counter, {
        v: 1,
        duration: 1.4,
        ease: "power2.out",
        scrollTrigger: { trigger: "[data-about-facts]", start: "top 90%", once: true },
        onUpdate: () => {
          if (countRef.current) countRef.current.textContent = `${Math.round(counter.v)}+`;
        }
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} aria-labelledby="about-title" className="relative w-full overflow-hidden bg-pearl py-24 md:py-40">
      <div className="mx-auto grid max-w-[1600px] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionHeader
            id="about-title"
            label="02 / About"
            title={
            <>
                More Than <Accent>Lines</Accent> of Code.
              </>
            } />
          
          <p data-about-body className="mt-10 max-w-2xl text-[clamp(1.15rem,1.6vw,1.45rem)] leading-[1.6] text-graphite/85">
            I'm Ali Hassan, a Software Engineering student and Full Stack Developer who enjoys transforming ideas into practical,
            user-friendly digital experiences. I work across frontend and backend technologies to build responsive interfaces,
            APIs, and web applications, with a focus on usability, maintainability, and performance.
          </p>

          <dl data-about-facts className="mt-14 grid max-w-2xl grid-cols-1 gap-8 border-t border-graphite/10 pt-8 sm:grid-cols-3">
            <div data-about-fact>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Experience</dt>
              <dd className="mt-2 font-display text-5xl font-semibold tracking-[-0.03em] text-cobalt">
                <span ref={countRef}>1+</span>
                <span className="ml-2 align-middle font-sans text-base font-medium tracking-normal text-graphite">year</span>
              </dd>
            </div>
            <div data-about-fact>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Discipline</dt>
              <dd className="mt-3 text-lg font-medium leading-snug">Software Engineering student</dd>
            </div>
            <div data-about-fact>
              <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">Focus</dt>
              <dd className="mt-3 text-lg font-medium leading-snug">Usability, maintainability, performance</dd>
            </div>
          </dl>
        </div>

        <div data-about-composition aria-hidden="true" className="relative h-[380px] sm:h-[460px] lg:col-span-5 lg:h-auto lg:min-h-[560px]">
          <div data-about-drift className="absolute right-0 top-[8%] h-[76%] w-[72%] bg-ice" />
          <div data-about-shape className="absolute left-[4%] top-[4%] w-[48%]">
            <div className="aspect-square rounded-full border-[1.5px] border-cobalt" />
          </div>
          <div data-about-shape className="absolute bottom-[12%] right-[10%] w-[30%]">
            <div className="aspect-square rotate-12 bg-iris" />
          </div>
          <div data-about-shape className="absolute left-[36%] top-[34%] w-[24%]">
            <div className="relative aspect-square rounded-full border border-graphite/10 bg-pearl">
              <span className="absolute left-[22%] top-[18%] h-[22%] w-[22%] rounded-full bg-white" />
            </div>
          </div>
          <div data-about-shape className="absolute left-0 top-[64%] w-[86%]">
            <div className="h-[2px] -rotate-[16deg] bg-royal" />
          </div>
          <div data-about-shape className="absolute bottom-0 left-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">Fig. 02 — Frontend ⟷ Backend</p>
          </div>
        </div>
      </div>
    </section>);

}