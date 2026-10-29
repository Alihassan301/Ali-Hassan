import React, { useCallback, useEffect, useState } from "react";
import { Loader } from "./components/Loader";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/hero/Hero";
import { PhotoStory } from "./components/photos/PhotoStory";
import { About } from "./components/About";
import { BrandModel } from "./components/brand/BrandModel";
import { Personality } from "./components/traits/Personality";
import { Skills } from "./components/skills/Skills";
import { Projects } from "./components/projects/Projects";
import { Journey } from "./components/Journey";
import { Contact } from "./components/contact/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { ScrollTrigger } from "./utils/gsap";
import { markIntroSeen, readIntroSeen } from "./utils/intro";
import { scrollToSection } from "./utils/scroll";

export function App() {
  const [quickIntro] = useState(() => readIntroSeen());
  const [loaderMounted, setLoaderMounted] = useState(true);
  const [ready, setReady] = useState(false);

  useSmoothScroll(ready);

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    if (!window.location.hash) window.scrollTo(0, 0);
    if (document.fonts) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
    if (!ready) return;
    markIntroSeen();
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      const hash = window.location.hash.replace("#", "");
      if (hash && document.getElementById(hash)) window.setTimeout(() => scrollToSection(hash), 400);
    });
    return () => cancelAnimationFrame(raf);
  }, [ready]);

  const handleReveal = useCallback(() => setReady(true), []);
  const handleExited = useCallback(() => {
    setReady(true);
    setLoaderMounted(false);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-pearl font-sans text-graphite" style={{ overflowX: "clip" }}>
      <a
        href="#main"
        className="sr-only z-[200] rounded-full bg-graphite px-5 py-3 text-sm text-pearl focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        
        Skip to content
      </a>
      {loaderMounted && <Loader quick={quickIntro} onReveal={handleReveal} onExited={handleExited} />}
      <Navigation visible={ready} />
      <main id="main">
        <Hero ready={ready} />
        <PhotoStory />
        <About />
        <BrandModel />
        <Personality />
        <Skills />
        <Projects />
        <Journey />
        <Contact />
      </main>
    </div>);

}