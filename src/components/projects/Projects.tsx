import React from "react";
import { SectionHeader } from "../SectionHeader";
import { Accent } from "../Accent";
import { ProjectFeature } from "./ProjectFeature";
import { projects } from "../../data/projects";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="relative w-full overflow-hidden bg-pearl py-24 md:py-40">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionHeader
            id="projects-title"
            label="06 / Selected Work"
            className="lg:col-span-9"
            title={
            <>
                Ideas Turned Into <Accent>Applications.</Accent>
              </>
            } />
          
          <p className="max-w-xs self-end font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-mist lg:col-span-3">
            Five live builds. Every link opens the real demo in a new tab.
          </p>
        </div>

        <div className="mt-20 flex flex-col gap-28 md:mt-28 md:gap-44">
          {projects.map((project) =>
          <ProjectFeature key={project.id} project={project} />
          )}
        </div>
      </div>
    </section>);

}