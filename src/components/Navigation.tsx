import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRightIcon } from "lucide-react";
import { navItems, sectionToNav } from "../data/nav";
import { useActiveSection } from "../hooks/useActiveSection";
import { EASE_OUT_EXPO } from "../utils/motion";
import { getLenis, scrollToSection } from "../utils/scroll";

interface NavigationProps {
  visible: boolean;
}

const SECTION_IDS = Object.keys(sectionToNav);

export function Navigation({ visible }: NavigationProps) {
  const activeSection = useActiveSection(SECTION_IDS);
  const activeNav = sectionToNav[activeSection] ?? "home";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      getLenis()?.start();
    };
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    document.documentElement.style.overflow = "";
    scrollToSection(id);
  };

  return (
    <>
      <motion.header
        initial={{ y: "-100%" }}
        animate={{ y: visible ? "0%" : "-100%" }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO, delay: visible ? 0.6 : 0 }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ease-out-expo ${
        scrolled || open ? "border-graphite/10 bg-pearl/95" : "border-transparent bg-transparent"}`
        }>
        
        <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-[1600px] items-center justify-between px-5 md:px-10">
          <a href="#home" onClick={go("home")} className="group flex items-center gap-3" aria-label="Ali Hassan — back to top">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-graphite/20 font-display text-sm font-semibold tracking-tight transition-colors duration-300 ease-out-expo group-hover:border-cobalt group-hover:bg-cobalt group-hover:text-pearl">
              AH
            </span>
            <span className="hidden font-display text-[15px] font-medium tracking-tight sm:inline">Ali Hassan</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`group relative whitespace-nowrap py-2 text-[15px] font-medium transition-colors duration-200 ease-out-expo ${
                    isActive ? "text-graphite" : "text-graphite/60 hover:text-graphite"}`
                    }>
                    
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 bottom-0.5 h-px origin-left bg-cobalt transition-transform duration-300 ease-out-expo ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`
                      } />
                    
                  </a>
                </li>);

            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              onClick={go("contact")}
              className="group hidden h-10 items-center gap-2 rounded-full bg-graphite px-5 text-sm font-medium text-pearl transition-colors duration-300 ease-out-expo hover:bg-cobalt md:inline-flex">
              
              Let's talk
              <ArrowUpRightIcon className="h-4 w-4 transition-transform duration-200 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 items-center gap-3 rounded-full border border-graphite/15 px-4 font-mono text-[11px] uppercase tracking-[0.2em] lg:hidden">
              
              {open ? "Close" : "Menu"}
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-graphite transition-transform duration-200 ease-out-expo ${
                  open ? "translate-y-[5px] rotate-45" : ""}`
                  } />
                
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-graphite transition-transform duration-200 ease-out-expo ${
                  open ? "-translate-y-[4px] -rotate-45" : ""}`
                  } />
                
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open &&
        <motion.div
          id="mobile-menu"
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
          className="fixed inset-0 z-40 flex flex-col bg-pearl px-5 pb-10 pt-28 md:px-10 lg:hidden">
          
            <ul className="flex flex-col">
              {navItems.map((item, i) =>
            <motion.li
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO, delay: 0.08 + i * 0.04 }}
              className="border-b border-graphite/10">
              
                  <a
                href={`#${item.id}`}
                onClick={go(item.id)}
                aria-current={activeNav === item.id ? "true" : undefined}
                className="flex items-baseline justify-between py-4 font-display text-[clamp(2rem,9vw,3.25rem)] font-semibold tracking-[-0.03em]">
                
                    <span className={activeNav === item.id ? "text-cobalt" : "text-graphite"}>{item.label}</span>
                    <span className="font-mono text-[11px] font-normal tracking-[0.2em] text-mist">0{i + 1}</span>
                  </a>
                </motion.li>
            )}
            </ul>
            <p className="mt-auto font-mono text-[11px] uppercase tracking-[0.22em] text-mist">Ali Hassan — Full Stack Developer</p>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}