import type { NavItem } from "../types/content";

export const navItems: NavItem[] = [
{ id: "home", label: "Home" },
{ id: "about", label: "About" },
// { id: "ocean", label: "OCEAN Model" },
{ id: "skills", label: "Skills" },
// { id: "projects", label: "Projects" },
{ id: "contact", label: "Contact" }];


/** Maps every page section to the nav item it belongs under. */
export const sectionToNav: Record<string, string> = {
  home: "home",
  about: "about",
  identity: "ocean",
  ocean: "ocean",
  personality: "ocean",
  skills: "skills",
  // projects: "projects",
  journey: "skills",
  contact: "contact"
};