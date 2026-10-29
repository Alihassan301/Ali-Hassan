import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "../../utils/gsap";
import { PhotoFrame } from "./PhotoFrame";
import { PHOTO_LAYOUT, PHOTO_MOTION } from "./photoMotion";
import type { Photo } from "../../types/content";

interface PhotoSceneProps {
  photo: Photo;
  order: number;
}

export function PhotoScene({ photo, order }: PhotoSceneProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const motionCfg = PHOTO_MOTION[photo.layout];
  const layout = PHOTO_LAYOUT[photo.layout];
  const isBleed = photo.layout === "full-bleed";
  const [lead, ...rest] = photo.title.split(" ");

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const mm = gsap.matchMedia();

    mm.add(
      {
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)"
      },
      (context) => {
        const { desktop } = context.conditions as {desktop: boolean;mobile: boolean;};
        const frame = wrapper.querySelector<HTMLElement>("[data-photo-frame]");
        if (!frame) return;
        const q = gsap.utils.selector(wrapper);
        const img = q("[data-photo-img]");

        if (desktop) {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: wrapper, start: "top 70%", end: "bottom bottom", scrub: 0.8, invalidateOnRefresh: true }
          });
          tl.fromTo(
            frame,
            { ...motionCfg.from, opacity: 0.5 },
            { scale: 1, xPercent: 0, yPercent: 0, rotate: 0, borderRadius: motionCfg.toRadius, opacity: 1, ease: "none", duration: 1 },
            0
          );
          if (img.length) {
            tl.fromTo(img, { scale: motionCfg.img.scale, yPercent: motionCfg.img.yPercent }, { scale: 1.04, yPercent: 0, ease: "none", duration: 1 }, 0);
          }
          tl.fromTo(q("[data-photo-numeral]"), { yPercent: 40, opacity: 0 }, { yPercent: -20, opacity: 1, ease: "none", duration: 1 }, 0).
          fromTo(q("[data-photo-line]"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "none", duration: 0.5, stagger: 0.1 }, 0.25).
          from(q("[data-cap-index]"), { yPercent: 110, duration: 0.2, ease: "power2.out" }, motionCfg.captionAt).
          from(q("[data-cap-title]"), { yPercent: 110, duration: 0.3, ease: "power2.out" }, motionCfg.captionAt + 0.05).
          from(q("[data-cap-body]"), { y: 30, opacity: 0, duration: 0.3, ease: "power2.out" }, motionCfg.captionAt + 0.15).
          from(q("[data-cap-tag]"), { x: -20, opacity: 0, duration: 0.25, ease: "power2.out" }, motionCfg.captionAt + 0.25).
          to({}, { duration: 0.3 });
        } else {
          gsap.fromTo(
            frame,
            { scale: 0.55, opacity: 0.5, xPercent: motionCfg.mobileX, borderRadius: motionCfg.from.borderRadius },
            {
              scale: 1,
              opacity: 1,
              xPercent: 0,
              borderRadius: motionCfg.toRadius,
              ease: "none",
              scrollTrigger: { trigger: frame, start: "top 95%", end: "top 25%", scrub: 0.6 }
            }
          );
          if (img.length) {
            gsap.fromTo(img, { scale: 1.3 }, { scale: 1.04, ease: "none", scrollTrigger: { trigger: frame, start: "top 95%", end: "top 25%", scrub: 0.6 } });
          }
          gsap.
          timeline({ scrollTrigger: { trigger: q("[data-caption]")[0], start: "top 88%", once: true }, defaults: { ease: "expo.out" } }).
          from(q("[data-cap-index]"), { yPercent: 110, duration: 0.6 }).
          from(q("[data-cap-title]"), { yPercent: 110, duration: 0.8 }, 0.05).
          from(q("[data-cap-body]"), { y: 20, opacity: 0, duration: 0.7 }, 0.2).
          from(q("[data-cap-tag]"), { opacity: 0, duration: 0.5 }, 0.3);
        }
      }
    );

    return () => mm.revert();
  }, [motionCfg]);

  return (
    <article
      ref={wrapperRef}
      aria-labelledby={`photo-${photo.id}-title`}
      className={`relative ${isBleed ? "md:h-[260vh]" : "md:h-[230vh]"}`}>
      
      <div className="relative py-12 md:sticky md:top-0 md:flex md:h-screen md:items-center md:py-0">
        <svg
          aria-hidden="true"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 hidden h-full w-full md:block">
          
          {layout.lines.map((l, i) =>
          <line
            key={i}
            data-photo-line
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="#315EF7"
            strokeOpacity="0.45"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            strokeDasharray="1" />

          )}
        </svg>
        <span
          data-photo-numeral
          aria-hidden="true"
          className={`pointer-events-none absolute hidden select-none font-display text-[22vh] font-semibold leading-none tracking-[-0.05em] text-lavender md:block ${layout.numeral}`}>
          
          {photo.index}
        </span>

        <div className={`relative mx-auto w-full max-w-[1600px] px-5 md:px-10 ${layout.grid}`}>
          <div className={layout.frameWrap}>
            <div
              data-photo-frame
              className={`relative mx-auto overflow-hidden will-change-transform md:mx-0 ${layout.frameClass} ${
              photo.layout === "landscape-center" || isBleed ? "md:mx-auto" : ""}`
              }
              style={layout.frameStyle}>
              
              <PhotoFrame photo={photo} tone={order % 2 === 0 ? "lavender" : "ice"} />
            </div>
          </div>

          <div data-caption className={`relative mt-8 md:mt-0 ${layout.caption}`}>
            <p className="overflow-hidden font-mono text-[11px] uppercase tracking-[0.22em] text-mist">
              <span data-cap-index className="inline-block">
                Perspective {photo.index} / 05
              </span>
            </p>
            <h3
              id={`photo-${photo.id}-title`}
              className="mt-4 overflow-hidden pb-[0.08em] font-display text-[clamp(2rem,3.4vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-graphite">
              
              <span data-cap-title className="block">
                <span className="font-serif font-normal italic text-cobalt">{lead}</span> {rest.join(" ")}
              </span>
            </h3>
            <p data-cap-body className="mt-5 max-w-md text-[17px] leading-relaxed text-graphite/80">
              {photo.caption}
            </p>
            <p
              data-cap-tag
              className="mt-6 inline-flex items-center gap-3 border-t border-graphite/15 pt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-royal">
              
              <span aria-hidden="true" className="h-1.5 w-1.5 rotate-45 bg-iris" />
              Connection — {photo.connection.replace(/^(ABCD|OCEAN) — /, "$1 · ")}
            </p>
          </div>
        </div>
      </div>
    </article>);

}