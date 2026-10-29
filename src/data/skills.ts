import type { SkillCategory } from "../types/content";

export const skillCategories: SkillCategory[] = [
{
  id: "frontend",
  title: "Frontend",
  skills: [
  { name: "HTML", note: "Semantic, accessible markup — the foundation of every interface I build." },
  { name: "CSS", note: "Layout, responsive styling, and motion for the web." },
  { name: "Sass", note: "Structured, reusable stylesheets using variables, nesting, and mixins." },
  { name: "Tailwind CSS", note: "Utility-first styling for fast, consistent interface work." },
  { name: "Bootstrap", note: "A responsive grid and component framework for quick, reliable layouts." },
  { name: "JavaScript", note: "The core language behind interactive behavior in the browser." },
  { name: "TypeScript", note: "Typed JavaScript that keeps larger codebases safer and easier to maintain." },
  { name: "React.js", note: "A component-based library I use to build interactive, state-driven interfaces." },
  { name: "Next.js", note: "A React framework for routing, rendering strategies, and production builds." },
  { name: "Redux Toolkit", note: "Predictable, centralized state management for React applications." },
  { name: "jQuery and plugins", note: "DOM scripting and plugin-based enhancements for existing interfaces." }]

},
{
  id: "backend",
  title: "Backend",
  skills: [
  { name: "Python", note: "A clear, versatile language I use for backend logic and APIs." },
  { name: "FastAPI", note: "A modern Python framework for building fast, well-documented APIs." },
  { name: "Node.js", note: "JavaScript on the server for APIs and tooling." },
  { name: "REST API development", note: "Designing resource-based endpoints that frontends can rely on." },
  { name: "API integration", note: "Connecting applications to external services and data sources." },
  { name: "JWT authentication", note: "Token-based authentication for securing API access." },
  { name: "Social login integration", note: "Letting users sign in with existing accounts from third-party providers." }]

},
{
  id: "databases",
  title: "Databases",
  skills: [
  { name: "PostgreSQL", note: "A robust relational database I pair with FastAPI backends." },
  { name: "MySQL", note: "A widely used relational database for structured application data." }]

},
{
  id: "practices",
  title: "Development Practices",
  skills: [
  { name: "Responsive UI development", note: "Interfaces that adapt cleanly from phones to large screens." },
  { name: "Component architecture", note: "Breaking interfaces into reusable, maintainable building blocks." },
  { name: "Unit testing", note: "Verifying individual pieces of code behave as expected." },
  { name: "Git", note: "Version control for tracking changes and working safely." },
  { name: "GitHub", note: "Hosting code, reviewing changes, and collaborating on repositories." },
  { name: "Scrum", note: "Working in iterative sprints with clear goals and regular feedback." },
  { name: "CI/CD fundamentals", note: "Automating checks and releases so changes ship reliably." },
  { name: "Deployment", note: "Publishing applications so people can actually use them." },
  { name: "Maintenance", note: "Keeping shipped applications healthy, updated, and dependable." }]

}];