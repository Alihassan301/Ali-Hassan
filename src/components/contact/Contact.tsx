import React, { useLayoutEffect, useRef } from "react";
import { ArrowUpIcon, ArrowUpRightIcon } from "lucide-react";
import { gsap } from "../../utils/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { scrollToSection } from "../../utils/scroll";
import { SectionHeader } from "../SectionHeader";
import { Accent } from "../Accent";
import { ClosingComposition } from "./ClosingComposition";
import { socialLinks } from "../../data/social";

const HOVER_FILL: Record<string, string> = {
  github: "bg-lavender",
  linkedin: "bg-ice"
};

const NAME = ["ALI", "HASSAN"];

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-contact-fade]", {
        y: 24,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: { trigger: "[data-contact-links]", start: "top 88%", once: true }
      });
      gsap.
      timeline({ scrollTrigger: { trigger: "[data-signature]", start: "top 85%", once: true }, defaults: { ease: "expo.out" } }).
      from("[data-sig-char]", { yPercent: 110, duration: 1, stagger: 0.04 }).
      from("[data-sig-sub]", { yPercent: 110, duration: 0.7 }, 0.35).
      from("[data-sig-quote]", { y: 16, opacity: 0, duration: 0.8 }, 0.5);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} aria-labelledby="contact-title" className="relative w-full bg-pearl pt-24 md:pt-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <SectionHeader
              id="contact-title"
              label="08 / Connect"
              title={
              <>
                  Have an Idea? <Accent>Let's Build It.</Accent>
                </>
              } />
            
            <p className="mt-8 max-w-lg text-[clamp(1.1rem,1.5vw,1.35rem)] leading-relaxed text-graphite/80">
              Interested in building something meaningful? Let's connect and explore what we can create.
            </p>
          </div>

          <ul data-contact-links className="self-end border-t border-graphite/15 lg:col-span-5">
            {socialLinks.map((link) =>
            <li key={link.id} data-contact-fade className="border-b border-graphite/15">
                <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-5 overflow-hidden px-2 py-6 md:px-4 md:py-8">
                
                  <span
                  aria-hidden="true"
                  className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300 ease-out-expo group-hover:scale-y-100 group-focus-visible:scale-y-100 ${
                  HOVER_FILL[link.id] ?? "bg-lavender"}`
                  } />
                
                  <span className="relative w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-mist">{link.label}</span>
                  <span className="relative min-w-0 flex-1 truncate font-display text-[clamp(1.25rem,2.4vw,2rem)] font-medium tracking-[-0.02em] text-graphite">
                    {link.handle}
                  </span>
                  <ArrowUpRightIcon className="relative h-6 w-6 shrink-0 text-graphite transition-transform duration-200 ease-out-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cobalt" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="mt-24 md:mt-36">
          <ClosingComposition />
        </div>

        <div data-signature className="mt-12 flex flex-col items-center text-center md:mt-16">
          <p
            aria-label="Ali Hassan"
            className="font-display text-[clamp(3.5rem,13vw,12rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-graphite">
            
            {NAME.map((word, wi) =>
            <span key={word} aria-hidden="true" className={`inline-block whitespace-nowrap ${wi === 0 ? "mr-[0.2em]" : ""}`}>
                {word.split("").map((ch, i) =>
              <span key={i} className="inline-block overflow-hidden pb-[0.04em] align-bottom">
                    <span data-sig-char className="inline-block">
                      {ch}
                    </span>
                  </span>
              )}
              </span>
            )}
          </p>
          <p className="mt-5 overflow-hidden font-mono text-[11px] uppercase tracking-[0.4em] text-cobalt md:text-xs">
            <span data-sig-sub className="inline-block">
              Full Stack Developer
            </span>
          </p>
          <p data-sig-quote className="mt-6 font-serif text-[clamp(1.25rem,2.2vw,1.9rem)] italic text-graphite/80">
            “Building useful things, one idea at a time.”
          </p>
        </div>
      </div>

      <footer className="mx-auto mt-24 flex max-w-[1600px] flex-col gap-4 border-t border-graphite/10 px-5 py-8 md:mt-32 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mist">© 2026 Ali Hassan</p>
        <p className="font-serif text-lg italic text-graphite/70">Beyond the Code. Into the Experience.</p>
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="group inline-flex min-h-[44px] items-center gap-2 self-start font-mono text-[11px] uppercase tracking-[0.18em] text-graphite md:self-auto">
          
          Back to top
          <ArrowUpIcon className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:-translate-y-1" />
        </a>
      </footer>
    </section>);

}