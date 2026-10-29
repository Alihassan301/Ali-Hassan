import React from "react";
import type { Skill, SkillCategoryId } from "../../types/content";

interface SkillItemProps {
  skill: Skill;
  category: SkillCategoryId;
  selected: boolean;
  onSelect: () => void;
}

const DB_GRID =
"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M8 0H0V8' fill='none' stroke='%233730A3' stroke-opacity='0.25' stroke-width='1'/%3E%3C/svg%3E\")";

const EASE = "duration-300 ease-out-expo";

/** Each skill category answers hover/selection with its own accent language. */
export function SkillItem({ skill, category, selected, onSelect }: SkillItemProps) {
  const on = selected ? "!scale-100 !opacity-100 !translate-x-0" : "";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group relative isolate inline-flex whitespace-nowrap pb-2 text-left text-[clamp(1.15rem,1.9vw,1.75rem)] font-medium leading-tight tracking-[-0.01em] transition-colors ${EASE} ${
      selected ? "text-cobalt" : "text-graphite hover:text-graphite"}`
      }>
      
      {skill.name}

      {category === "frontend" &&
      <span
        aria-hidden="true"
        className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-cobalt transition-transform ${EASE} group-hover:scale-x-100 group-focus-visible:scale-x-100 ${on}`} />

      }

      {category === "backend" &&
      <span aria-hidden="true" className="absolute bottom-0 left-0 flex w-full items-center">
          <span className={`h-1.5 w-1.5 scale-0 rounded-full bg-iris transition-transform ${EASE} group-hover:scale-100 group-focus-visible:scale-100 ${on}`} />
          <span
          className={`mx-1 h-px flex-1 origin-left scale-x-0 bg-iris transition-transform delay-75 ${EASE} group-hover:scale-x-100 group-focus-visible:scale-x-100 ${on}`} />
        
          <span
          className={`h-1.5 w-1.5 scale-0 rounded-full bg-iris transition-transform delay-150 ${EASE} group-hover:scale-100 group-focus-visible:scale-100 ${on}`} />
        
        </span>
      }

      {category === "databases" &&
      <span
        aria-hidden="true"
        className={`absolute -inset-x-2 -bottom-0.5 -top-1 -z-10 opacity-0 transition-opacity ${EASE} group-hover:opacity-100 group-focus-visible:opacity-100 ${on}`}
        style={{ backgroundImage: DB_GRID }} />

      }

      {category === "practices" &&
      <span aria-hidden="true" className="absolute bottom-0 left-0 h-1.5 w-full overflow-hidden">
          <span
          className={`absolute inset-0 flex -translate-x-full items-center transition-transform ${EASE} group-hover:translate-x-0 group-focus-visible:translate-x-0 ${on}`}>
          
            <span className="h-px flex-1 bg-royal" />
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-royal" />
          </span>
        </span>
      }
    </button>);

}