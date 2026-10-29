import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BrandGlyphProps {
  activeIndex: number;
  letter: string;
  word: string;
}

interface Pose {
  ring: {x: number;y: number;scale: number;};
  square: {x: number;y: number;rotate: number;scale: number;};
  dot: {x: number;y: number;scale: number;};
  bar: {x: number;y: number;rotate: number;scaleX: number;};
}

// A focal target → two parts joining → a stacked structure → a forward vector.
const POSES: Pose[] = [
{
  ring: { x: 0, y: 0, scale: 1.25 },
  square: { x: 0, y: 0, rotate: 45, scale: 0.55 },
  dot: { x: 0, y: 0, scale: 1 },
  bar: { x: 0, y: 150, rotate: 0, scaleX: 0.4 }
},
{
  ring: { x: -58, y: 0, scale: 0.9 },
  square: { x: 58, y: 0, rotate: 0, scale: 0.9 },
  dot: { x: 0, y: 0, scale: 0.8 },
  bar: { x: 0, y: 112, rotate: 0, scaleX: 1 }
},
{
  ring: { x: 0, y: -100, scale: 0.55 },
  square: { x: 0, y: 12, rotate: 0, scale: 1.3 },
  dot: { x: 0, y: 12, scale: 1 },
  bar: { x: 0, y: 112, rotate: 0, scaleX: 0.9 }
},
{
  ring: { x: -112, y: 64, scale: 0.45 },
  square: { x: 18, y: -8, rotate: 45, scale: 0.5 },
  dot: { x: 122, y: -72, scale: 1.25 },
  bar: { x: 0, y: 0, rotate: -30, scaleX: 1.1 }
}];


export function BrandGlyph({ activeIndex, letter, word }: BrandGlyphProps) {
  const reduced = useReducedMotion();
  const pose = POSES[activeIndex] ?? POSES[0];
  const transition = reduced ? { duration: 0 } : { type: "spring" as const, stiffness: 140, damping: 18, mass: 0.8 };

  return (
    <figure className="relative">
      <div className="relative aspect-square w-full bg-pearl">
        <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
          <g opacity="0.5">
            <line x1="200" y1="20" x2="200" y2="380" stroke="#252632" strokeOpacity="0.08" />
            <line x1="20" y1="200" x2="380" y2="200" stroke="#252632" strokeOpacity="0.08" />
          </g>
          <g transform="translate(200 200)">
            <motion.g animate={{ x: pose.bar.x, y: pose.bar.y, rotate: pose.bar.rotate, scaleX: pose.bar.scaleX }} transition={transition}>
              <rect x="-120" y="-1.5" width="240" height="3" fill="#252632" />
            </motion.g>
            <motion.g animate={{ x: pose.ring.x, y: pose.ring.y, scale: pose.ring.scale }} transition={transition}>
              <circle cx="0" cy="0" r="90" fill="none" stroke="#315EF7" strokeWidth="2" />
            </motion.g>
            <motion.g
              animate={{ x: pose.square.x, y: pose.square.y, rotate: pose.square.rotate, scale: pose.square.scale }}
              transition={transition}>
              
              <rect x="-50" y="-50" width="100" height="100" fill="#8B5CF6" />
            </motion.g>
            <motion.g animate={{ x: pose.dot.x, y: pose.dot.y, scale: pose.dot.scale }} transition={transition}>
              <circle cx="0" cy="0" r="16" fill="#3730A3" />
            </motion.g>
          </g>
        </svg>
      </div>
      <figcaption className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-mist">
        <span>Fig. 03 — Brand model</span>
        <span className="text-royal">
          {letter} · {word}
        </span>
      </figcaption>
    </figure>);

}