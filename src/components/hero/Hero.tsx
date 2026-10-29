import React, { useLayoutEffect, useRef } from "react";
import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import { gsap, SplitText } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { scrollToSection } from "../../utils/scroll";
import { HeroScene } from "./HeroScene";

interface HeroProps {
  ready: boolean;
}

const TECH = ["React.js", "Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL"];
const NAME_WORDS = ["ALI", "HASSAN"];

export function Hero({ ready }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!ready || !section || prefersReducedMotion()) return;
    let split: SplitText | null = null;
    let cancelled = false;
    const ctx = gsap.context(() => undefined, section);

    const run = () => {
      if (cancelled) return;
      ctx.add(() => {
        split = SplitText.create("[data-hero-headline]", { type: "lines", mask: "lines" });
        const tl = gsap.timeline({
          defaults: { ease: "expo.out" },
          onComplete: () => {
            split?.revert();
            split = null;
          }
        });
        tl.from("[data-hero-scene]", { opacity: 0, scale: 1.04, duration: 1.4, ease: "power2.out" }).
        from("[data-hero-label] > span", { yPercent: 110, duration: 0.8 }, 0.15).
        from("[data-hero-char]", { yPercent: 110, duration: 1.1, stagger: 0.045 }, 0.2).
        from(split.lines, { yPercent: 110, duration: 1, stagger: 0.12 }, 0.5).
        from("[data-hero-support]", { y: 24, opacity: 0, duration: 0.9 }, 0.85).
        from("[data-hero-tech] li", { y: 12, opacity: 0, duration: 0.6, stagger: 0.05 }, 0.95).
        from("[data-hero-cta] > *", { y: 16, opacity: 0, duration: 0.7, stagger: 0.08 }, 1.05);

        gsap.to("[data-hero-name]", {
          yPercent: 28,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top top", end: "bottom top", scrub: true }
        });
      });
    };

    (document.fonts ? document.fonts.ready : Promise.resolve()).then(run);
    return () => {
      cancelled = true;
      split?.revert();
      ctx.revert();
    };
  }, [ready]);

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-name"
      className="relative min-h-[100svh] w-full overflow-hidden bg-pearl">
      
      <div data-hero-scene className="absolute inset-0">
        <HeroScene active={ready} />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1600px] flex-col px-5 pb-8 pt-28 md:px-10 md:pb-10 md:pt-32">
        <p data-hero-label className="overflow-hidden font-mono text-[10px] uppercase tracking-[0.24em] text-mist md:text-[11px]">
          <span className="inline-block">Independent Thinking · Connected Engineering</span>
        </p>

        <p
          data-hero-headline
          className="mt-6 max-w-[14ch] font-display text-[clamp(2.1rem,5vw,4.9rem)] font-medium leading-[1.04] tracking-[-0.03em] text-graphite md:mt-10">
          
          I Build Digital Experiences{" "}
          <span className="font-serif font-normal italic tracking-[-0.01em] text-cobalt">Beyond the Ordinary.</span>
        </p>

        <div className="mt-auto grid items-end gap-8 pt-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p data-hero-support className="max-w-md text-[17px] leading-relaxed text-graphite/80 md:text-lg">
              I'm a Software Engineering student and Full Stack Developer passionate about building modern web applications,
              responsive interfaces, and reliable digital solutions.
            </p>
            <ul
              data-hero-tech
              aria-label="Core technologies"
              className="mt-6 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.14em] text-royal">
              
              {TECH.map((t, i) =>
              <li key={t} className="flex items-center gap-3">
                  {t}
                  {i < TECH.length - 1 &&
                <span aria-hidden="true" className="text-mist">
                      ·
                    </span>
                }
                </li>
              )}
            </ul>
          </div>

          <div data-hero-cta className="flex flex-wrap gap-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("projects");
              }}
              className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-cobalt px-7 text-[15px] font-medium text-pearl">
              
              <span
                aria-hidden="true"
                className="absolute inset-0 origin-left scale-x-0 bg-royal transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
              
              <span className="relative whitespace-nowrap">Explore My Work</span>
              <ArrowDownIcon className="relative h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-y-0.5" />
            </a>
            <a
              href="#identity"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("identity");
              }}
              className="group inline-flex h-14 items-center gap-3 rounded-full border border-graphite/20 bg-pearl px-7 text-[15px] font-medium text-graphite transition-colors duration-300 ease-out-expo hover:border-graphite hover:bg-graphite hover:text-pearl">
              
              <span className="whitespace-nowrap">Discover My Story</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <h1
          id="hero-name"
          data-hero-name
          aria-label="Ali Hassan"
          className="mt-10 font-display text-[22vw] font-semibold leading-[0.9] tracking-[-0.045em] text-graphite md:mt-12 md:text-[13.2vw] 2xl:text-[14rem]">
          
          {NAME_WORDS.map((word, wi) =>
          <span
            key={word}
            aria-hidden="true"
            className={`block whitespace-nowrap md:inline-block ${wi === 0 ? "md:mr-[0.2em]" : ""}`}>
            
              {word.split("").map((ch, i) =>
            <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
                  <span data-hero-char className="inline-block">
                    <span className="inline-block transition-[transform,color] duration-200 ease-out-expo hover:-translate-y-[0.06em] hover:text-cobalt">
                      {ch}
                    </span>
                  </span>
                </span>
            )}
            </span>
          )}
        </h1>
      </div>
    </section>);

}