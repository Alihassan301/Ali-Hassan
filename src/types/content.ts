export type PhotoLayout =
"portrait-left" |
"portrait-right" |
"landscape-center" |
"square-left" |
"full-bleed";

export interface Photo {
  id: string;
  index: string;
  src: string;
  title: string;
  caption: string;
  connection: string;
  alt: string;
  focus: string;
  layout: PhotoLayout;
}

export type ProjectVariant = "presence" | "karigar" | "test" | "zakat" | "cooking";

export interface Project {
  id: string;
  index: string;
  title: string;
  titleParts: [string, string];
  description: string | null;
  label: string | null;
  tech: string[];
  url: string;
  domain: string;
  initials: string;
  image?: string;
  variant: ProjectVariant;
}

export type SkillCategoryId = "frontend" | "backend" | "databases" | "practices";

export interface Skill {
  name: string;
  note: string;
}

export interface SkillCategory {
  id: SkillCategoryId;
  title: string;
  skills: Skill[];
}

export interface OceanDimension {
  id: string;
  letter: string;
  word: string;
  text: string;
}

export type TraitVisualKind = "precision" | "exploration" | "connection";

export interface Trait {
  id: string;
  name: string;
  keyword: string;
  text: string;
  visual: TraitVisualKind;
}

export interface Milestone {
  id: string;
  phase: string;
  title: string;
  text: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SocialLink {
  id: string;
  label: string;
  handle: string;
  url: string;
}