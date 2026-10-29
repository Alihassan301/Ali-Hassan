import type { Project } from "../types/content";

export const projects: Project[] = [
{
  id: "dojo-presence",
  index: "01",
  title: "Dojo Presence",
  titleParts: ["Dojo", "Presence"],
  description: "An attendance management system built with React, TypeScript, FastAPI, and PostgreSQL.",
  label: "Attendance management",
  tech: ["React", "TypeScript", "FastAPI", "PostgreSQL"],
  url: "https://dojo-presence.netlify.app/",
  domain: "dojo-presence.netlify.app",
  initials: "DP",
  image: new URL("../components/photos/attendance.png", import.meta.url).href,
  variant: "presence"
},
{
  id: "dojo-karigar",
  index: "02",
  title: "Dojo Karigar",
  titleParts: ["Dojo", "Karigar"],
  description: "A service marketplace application built with React, FastAPI, and PostgreSQL.",
  label: "Service marketplace",
  tech: ["React", "FastAPI", "PostgreSQL"],
  url: "https://dojo-karigar.netlify.app/",
  domain: "dojo-karigar.netlify.app",
  initials: "DK",
  image: new URL("../components/photos/karigar 1.png", import.meta.url).href,
  variant: "karigar"
},
{
  id: "dojo-test",
  index: "03",
  title: "Dojo Test",
  titleParts: ["Dojo", "Test"],
  description: null,
  label: null,
  tech: [],
  url: "http://dojotest.netlify.app/",
  domain: "dojotest.netlify.app",
  initials: "DT",
  image: new URL("../components/photos/exam 1.png", import.meta.url).href,
  variant: "test"
},
{
  id: "zakat-fitr",
  index: "04",
  title: "Zakat & Fitr Calculator",
  titleParts: ["Zakat & Fitr", "Calculator"],
  description: null,
  label: null,
  tech: [],
  url: "https://zakat-fitr.netlify.app/",
  domain: "zakat-fitr.netlify.app",
  initials: "Z&F",
  image: new URL("../components/photos/zukar 1.png", import.meta.url).href,
  variant: "zakat"
},
{
  id: "desi-cooking",
  index: "05",
  title: "Desi Cooking",
  titleParts: ["Desi", "Cooking"],
  description: null,
  label: null,
  tech: [],
  url: "https://dev-desi-cooking.netlify.app/",
  domain: "dev-desi-cooking.netlify.app",
  initials: "DC",
  image: new URL("../components/photos/cooking.png", import.meta.url).href,
  variant: "cooking"
}];