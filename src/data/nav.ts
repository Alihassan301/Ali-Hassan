import type { NavItem } from "../types/content";

export const navItems: NavItem[] = [
{ id: "home", label: "Home" },
{ id: "about", label: "About" },
{ id: "brand", label: "Personal Brand" },
{ id: "skills", label: "Skills" },
{ id: "projects", label: "Projects" },
{ id: "contact", label: "Contact" }];


/** Maps every page section to the nav item it belongs under. */
export const sectionToNav: Record<string, string> = {
  home: "home",
  identity: "about",
  about: "about",
  brand: "brand",
  personality: "brand",
  skills: "skills",
  projects: "projects",
  journey: "projects",
  contact: "contact"
};