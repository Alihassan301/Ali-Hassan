import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { useProjectReveal } from "../../hooks/useProjectReveal";
import { ProjectPreview } from "./ProjectPreview";
import type { Project } from "../../types/content";

interface ProjectFeatureProps {
  project: Project;
}

const EASE = "duration-300 ease-out-expo";
const GRID_BG =
"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath d='M24 0H0V24' fill='none' stroke='%23315EF7' stroke-opacity='0.35' stroke-width='1'/%3E%3C/svg%3E\")";

export function ProjectFeature({ project }: ProjectFeatureProps) {
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 20, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 150, damping: 20, mass: 0.4 });
  const { variant } = project;
  const [lead, accent] = project.titleParts;

  useProjectReveal(ref, variant);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (variant !== "karigar" || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 24);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 18);
  };
  const onPointerLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const index =
  <p className="overflow-hidden font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
      <span data-p-index className="inline-block">
        Project {project.index} / 05
      </span>
    </p>;


  const tech = project.tech.length ?
  <ul aria-label="Technologies" className="flex flex-wrap gap-2">
      {project.tech.map((t) =>
    <li key={t} data-p-tech className="border border-graphite/15 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-graphite/80">
          {t}
        </li>
    )}
    </ul> :

  <p data-p-tech className="font-mono text-[11px] uppercase tracking-[0.16em] text-mist">
      Live build · {project.domain}
    </p>;


  const desc = project.description ?
  <p data-p-desc className="max-w-md text-[17px] leading-relaxed text-graphite/80 md:text-lg">
      {project.description}
    </p> :
  null;

  const link =
  <a
    data-p-link
    href={project.url}
    target="_blank"
    rel="noopener noreferrer"
    className="group/link inline-flex min-h-[44px] items-center gap-4 self-start">
    
      <span className={`flex h-12 w-12 items-center justify-center rounded-full bg-cobalt text-pearl transition-[transform,background-color] ${EASE} group-hover/link:scale-110 group-hover/link:bg-royal`}>
        <ArrowUpRightIcon className={`h-5 w-5 transition-transform ${EASE} group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5`} />
      </span>
      <span className="relative text-[15px] font-medium text-graphite">
        Visit live demo
        <span aria-hidden="true" className={`absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-graphite transition-transform ${EASE} group-hover/link:origin-left group-hover/link:scale-x-100`} />
      </span>
      <span className="sr-only">for {project.title} (opens in a new tab)</span>
    </a>;


  const titleBase = "font-display font-semibold leading-[0.95] tracking-[-0.04em] text-graphite";
  const leadLine =
  <span className="block overflow-hidden pb-[0.06em]">
      <span data-p-title className="block">
        {lead}
      </span>
    </span>;

  const accentLine = (accentClass: string) =>
  <span className="block overflow-hidden pb-[0.1em]">
      <span data-p-title className={`block font-serif font-normal italic tracking-[-0.01em] transition-colors ${EASE} ${accentClass}`}>
        {accent}
      </span>
    </span>;


  // ——— Layouts ———
  if (variant === "presence") {
    return (
      <article ref={ref} aria-label={project.title} className="group relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="relative z-10 flex flex-col gap-6 lg:col-span-5">
          {index}
          <h3 className={`${titleBase} text-[clamp(3rem,7vw,6.5rem)]`}>
            {leadLine}
            {accentLine("text-graphite group-hover:text-cobalt")}
          </h3>
          {desc}
          {tech}
          {link}
        </div>
        <div className="relative lg:col-span-7">
          <div data-p-bg aria-hidden="true" className="absolute -right-5 -top-6 bottom-10 left-16 bg-ice md:-right-10" />
          <div data-p-preview className="relative">
            <ProjectPreview project={project} artClassName="group-hover:scale-[1.05]" imageFit="contain">
              <span
                aria-hidden="true"
                className={`animate-grid-pan pointer-events-none absolute inset-0 opacity-0 transition-opacity ${EASE} group-hover:opacity-100`}
                style={{ backgroundImage: GRID_BG }} />
              
            </ProjectPreview>
          </div>
        </div>
      </article>);

  }

  if (variant === "karigar") {
    return (
      <article
        ref={ref}
        aria-label={project.title}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="group relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
        
        <div className="relative lg:col-span-7">
          <p className="mb-4 overflow-hidden font-mono text-[11px] uppercase tracking-[0.2em] text-iris">
            <span className={`block translate-y-full transition-transform ${EASE} group-hover:translate-y-0 group-focus-within:translate-y-0`}>
              {project.label}
            </span>
          </p>
          <div data-p-preview className="relative">
            <motion.div style={{ x: sx, y: sy }} className="relative">
              <ProjectPreview project={project} artClassName="group-hover:scale-[1.03]" />
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -inset-3 h-[calc(100%+1.5rem)] w-[calc(100%+1.5rem)] overflow-visible">
                
                <rect
                  x="0"
                  y="0"
                  width="100"
                  height="100"
                  fill="none"
                  stroke="#8B5CF6"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray="1"
                  className={`[stroke-dashoffset:1] transition-[stroke-dashoffset] ${EASE} group-hover:[stroke-dashoffset:0]`} />
                
              </svg>
            </motion.div>
          </div>
        </div>
        <div className="relative flex flex-col gap-6 p-6 md:p-10 lg:col-span-5">
          <div data-p-bg aria-hidden="true" className="absolute inset-0 -z-0 bg-lavender" />
          <div className="relative flex flex-col gap-6">
            {index}
            <h3 className={`${titleBase} text-[clamp(3rem,6.5vw,6rem)]`}>
              {leadLine}
              {accentLine("text-iris")}
            </h3>
            {desc}
            {tech}
            {link}
          </div>
        </div>
      </article>);

  }

  if (variant === "test") {
    const labels = [`Project ${project.index}`, "Live build", project.domain];
    return (
      <article ref={ref} aria-label={project.title} className="group relative">
        <div
          data-p-bg
          aria-hidden="true"
          className="absolute -bottom-10 top-[30%] bg-ivory"
          style={{ left: "calc(50% - 50vw)", width: "100vw" }} />
        
        <div className="relative flex flex-col items-center text-center">
          <div className="relative">
            <svg
              aria-hidden="true"
              viewBox="0 0 200 200"
              className={`pointer-events-none absolute left-1/2 top-1/2 -z-0 w-[min(70vw,420px)] -translate-x-1/2 -translate-y-1/2 scale-90 opacity-0 transition-[opacity,transform] ${EASE} group-hover:scale-100 group-hover:opacity-100`}>
              
              {[90, 66, 42].map((s, i) =>
              <rect key={s} x={100 - s} y={100 - s} width={s * 2} height={s * 2} transform={`rotate(${i * 15} 100 100)`} fill="none" stroke="#315EF7" strokeOpacity={0.35 - i * 0.08} />
              )}
              <polygon points="100,30 160,140 40,140" fill="none" stroke="#8B5CF6" strokeOpacity="0.4" />
            </svg>
            <h3 className={`relative ${titleBase} flex flex-wrap items-baseline justify-center gap-x-[0.25em] text-[clamp(3.25rem,10vw,9rem)]`}>
              <span className="overflow-hidden pb-[0.06em]">
                <span data-p-title className="block">
                  {lead}
                </span>
              </span>
              <span className="overflow-hidden pb-[0.1em]">
                <span data-p-title className="block font-serif font-normal italic tracking-[-0.01em] text-cobalt">
                  {accent}
                </span>
              </span>
            </h3>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Project details">
            {labels.map((l, i) =>
            <li
              key={l}
              data-p-tech
              className={`font-mono text-[11px] uppercase tracking-[0.18em] text-mist transition-[color,transform] ${EASE} group-hover:-translate-y-0.5 group-hover:text-cobalt`}
              style={{ transitionDelay: `${i * 60}ms` }}>
              
                {l}
              </li>
            )}
          </ul>
          <div className="mt-8">{link}</div>
        </div>
        <div data-p-preview className="relative mt-12 lg:mx-[8%]">
          <div className={`transition-transform ${EASE} group-hover:-translate-y-2`}>
            <ProjectPreview project={project} aspectClass="aspect-[16/9]" />
          </div>
        </div>
      </article>);

  }

  if (variant === "zakat") {
    return (
      <article ref={ref} aria-label={project.title} className="group relative grid items-end gap-10 pb-8 lg:grid-cols-12 lg:gap-8">
        <div className="relative flex flex-col gap-6 lg:col-span-6">
          <div className="flex items-center gap-6">
            <span className="relative flex h-24 w-24 items-center justify-center">
              <svg aria-hidden="true" viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="47" fill="none" stroke="#252632" strokeOpacity="0.12" strokeWidth="1" />
                <circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="#3730A3"
                  strokeWidth="1.5"
                  pathLength={1}
                  strokeDasharray="1"
                  className={`[stroke-dashoffset:1] transition-[stroke-dashoffset] ${EASE} group-hover:[stroke-dashoffset:0]`} />
                
              </svg>
              <span className="font-display text-3xl font-semibold tracking-[-0.03em] text-royal">{project.index}</span>
            </span>
            {index}
          </div>
          <h3 className={`${titleBase} text-[clamp(2.75rem,6vw,5.75rem)]`}>
            {leadLine}
            {accentLine("text-royal")}
          </h3>
          {desc}
          {tech}
          {link}
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8">
          <div data-p-bg aria-hidden="true" className="absolute -left-6 -top-6 h-[60%] w-[60%] bg-ice" />
          <div data-p-preview className="relative">
            <div className={`transition-transform ${EASE} group-hover:scale-[1.03]`}>
              <ProjectPreview project={project} aspectClass="aspect-[4/3]" imageFit="contain" />
            </div>
          </div>
        </div>
        <span aria-hidden="true" className={`absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-royal transition-transform ${EASE} group-hover:scale-x-100`} />
      </article>);

  }

  // cooking
  return (
    <article ref={ref} aria-label={project.title} className="group relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
      <div className="relative z-10 flex flex-col gap-6 lg:col-span-5">
        {index}
        <h3 className={`${titleBase} text-[clamp(3rem,8vw,7.5rem)]`}>
          {leadLine}
          <span className="block overflow-hidden pb-[0.1em]">
            <span data-p-title className="block">
              <span className="relative block h-[1.05em] overflow-hidden">
                <span className={`flex flex-col transition-transform ${EASE} group-hover:-translate-y-1/2`}>
                  <span className="block h-[1.05em] font-serif font-normal italic tracking-[-0.01em] text-graphite">{accent}</span>
                  <span aria-hidden="true" className="block h-[1.05em] font-serif font-normal italic tracking-[-0.01em] text-iris">
                    {accent}
                  </span>
                </span>
              </span>
            </span>
          </span>
        </h3>
        {desc}
        {tech}
        {link}
      </div>
      <div className="relative lg:col-span-7">
        <div data-p-bg aria-hidden="true" className="absolute -right-5 -top-6 bottom-10 left-16 bg-lavender md:-right-10" />
        <div data-p-preview className="relative">
          <ProjectPreview
            project={project}
            imageFit="contain"
            artClassName="group-hover:scale-[1.06] group-hover:-translate-x-[2%]">
            
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-iris/20 transition-transform ${EASE} group-hover:translate-x-[300%]`} />
            
          </ProjectPreview>
        </div>
      </div>
    </article>);

}