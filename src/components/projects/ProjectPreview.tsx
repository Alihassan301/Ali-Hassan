import React, { ReactNode } from "react";
import type { Project, ProjectVariant } from "../../types/content";

interface ProjectPreviewProps {
  project: Project;
  aspectClass?: string;
  artClassName?: string;
  imageFit?: "cover" | "contain";
  children?: ReactNode;
}

const PREVIEW_IMAGES: Record<string, string> = {
  "dojo-presence": new URL("../photos/attendance.png", import.meta.url).href,
  "dojo-karigar": new URL("../photos/karigar 1.png", import.meta.url).href,
  "dojo-test": new URL("../photos/exam 1.png", import.meta.url).href,
  "zakat-fitr": new URL("../photos/zukar 1.png", import.meta.url).href,
  "desi-cooking": new URL("../photos/cooking.png", import.meta.url).href
};

const ART: Record<ProjectVariant, {bg: string;ink: string;shapes: ReactNode;}> = {
  presence: {
    bg: "bg-ice",
    ink: "text-cobalt/20",
    shapes:
    <>
        <span className="absolute right-[10%] top-[16%] aspect-square w-[22%] rounded-full border-2 border-cobalt" />
        <span className="absolute bottom-[18%] right-[30%] h-[3px] w-[30%] bg-cobalt" />
      </>

  },
  karigar: {
    bg: "bg-lavender",
    ink: "text-iris/25",
    shapes:
    <>
        <span className="absolute right-[12%] top-[20%] aspect-square w-[18%] rotate-12 bg-iris" />
        <span className="absolute bottom-[22%] right-[8%] aspect-square w-[10%] rounded-full border-2 border-royal" />
      </>

  },
  test: {
    bg: "bg-ivory",
    ink: "text-graphite/10",
    shapes:
    <svg viewBox="0 0 100 100" className="absolute right-[10%] top-[14%] w-[26%]" aria-hidden="true">
        <polygon points="50,6 94,90 6,90" fill="none" stroke="#315EF7" strokeWidth="1.5" />
        <circle cx="50" cy="62" r="10" fill="#8B5CF6" />
      </svg>

  },
  zakat: {
    bg: "bg-pearl",
    ink: "text-royal/15",
    shapes:
    <svg viewBox="0 0 100 100" className="absolute right-[8%] top-[12%] w-[30%]" aria-hidden="true">
        <circle cx="50" cy="50" r="42" fill="none" stroke="#3730A3" strokeWidth="1.5" />
        <path d="M50 8 A42 42 0 0 1 92 50" fill="none" stroke="#315EF7" strokeWidth="4" />
        <circle cx="50" cy="50" r="6" fill="#8B5CF6" />
      </svg>

  },
  cooking: {
    bg: "bg-lavender",
    ink: "text-royal/15",
    shapes:
    <>
        <span className="absolute right-[18%] top-[18%] aspect-square w-[14%] rounded-full bg-iris" />
        <span className="absolute right-[8%] top-[34%] aspect-square w-[9%] rounded-full border-2 border-cobalt" />
        <span className="absolute bottom-[20%] right-[12%] h-[3px] w-[24%] bg-royal" />
      </>

  }
};

/**
 * Browser-framed preview. Uses the project's local screenshot when available.
 */
export function ProjectPreview({
  project,
  aspectClass = "aspect-[16/10]",
  artClassName = "",
  imageFit = "cover",
  children
}: ProjectPreviewProps) {
  const art = ART[project.variant];
  const imageSrc = project.image ?? PREVIEW_IMAGES[project.id];
  const imageFitClass = imageFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className="relative overflow-hidden rounded-[10px] border border-graphite/10 bg-pearl">
      <div className="flex h-9 items-center gap-3 border-b border-graphite/10 bg-pearl px-4">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-graphite/15" />
          <span className="h-2 w-2 rounded-full bg-graphite/15" />
          <span className="h-2 w-2 rounded-full bg-graphite/15" />
        </span>
        <span className="truncate font-mono text-[10px] tracking-[0.06em] text-mist">{project.domain}</span>
      </div>
      <div className={`relative overflow-hidden ${aspectClass}`}>
        {imageSrc ?
        <img
          src={imageSrc}
          alt={`${project.title} interface preview`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 h-full w-full ${imageFitClass} transition-transform duration-300 ease-out-expo ${artClassName}`} /> :


        <div
          role="img"
          aria-label={`Preview unavailable for ${project.title} — screenshot not supplied`}
          className={`absolute inset-0 transition-transform duration-300 ease-out-expo ${art.bg} ${artClassName}`}>
          
            <span
            aria-hidden="true"
            className={`absolute -bottom-[0.18em] left-[4%] select-none font-display text-[clamp(5rem,16vw,15rem)] font-semibold leading-none tracking-[-0.06em] ${art.ink}`}>
            
              {project.initials}
            </span>
            {art.shapes}
          </div>
        }
        {children}
      </div>
    </div>);

}