import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT_EXPO } from "../../utils/motion";
import type { Skill } from "../../types/content";

interface SkillDetailProps {
  skill: Skill | null;
  categoryTitle: string | null;
}

export function SkillDetail({ skill, categoryTitle }: SkillDetailProps) {
  return (
    <div aria-live="polite" className="min-h-[180px]">
      <AnimatePresence mode="wait" initial={false}>
        {skill ?
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}>
          
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-royal">{categoryTitle}</p>
            <p className="mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-graphite">
              {skill.name}
            </p>
            <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-graphite/80">{skill.note}</p>
          </motion.div> :

        <motion.p
          key="prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
          className="max-w-xs text-[17px] leading-relaxed text-mist">
          
            Select any technology to read how I use it.
          </motion.p>
        }
      </AnimatePresence>
    </div>);

}