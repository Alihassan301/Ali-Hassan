import type { Photo } from "../types/content";

export const photos: Photo[] = [
{
  id: "professional",
  index: "01",
  src: new URL("../components/photos/ali 5.png", import.meta.url).href,
  title: "The Professional",
  caption:
  "This picture represents my professional look and shows that I am responsible and reliable in my work.",
  connection: "OCEAN — Conscientiousness",
  alt: "Ali Hassan in a professional look",
  focus: "center 28%",
  layout: "portrait-left"
},
{
  id: "disciplined",
  index: "02",
  src: new URL("../components/photos/ali 1.png", import.meta.url).href,
  title: "The Disciplined Developer",
  caption:
  "This picture represents discipline, focus, and attention to detail while working.",
  connection: "OCEAN — Conscientiousness",
  alt: "Ali Hassan in a focused, disciplined look",
  focus: "center 30%",
  layout: "portrait-right"
},
{
  id: "creative",
  index: "03",
  src: new URL("../components/photos/ali 2.png", import.meta.url).href,
  title: "The Creative Thinker",
  caption:
  "This picture represents my creativity, curiosity, and interest in learning new technologies.",
  connection: "OCEAN — Openness to Experience",
  alt: "Ali Hassan in a creative, curious look",
  focus: "center 35%",
  layout: "portrait-left"
},
{
  id: "communicator",
  index: "04",
  src: new URL("../components/photos/ali 3.jpeg", import.meta.url).href,
  title: "The Communicator",
  caption:
  "This picture represents my communication skills, teamwork, and ability to share ideas with others.",
  connection: "OCEAN — Extraversion",
  alt: "Ali Hassan in a confident, communicative look",
  focus: "center 30%",
  layout: "square-left"
},
{
  id: "future",
  index: "05",
  src: new URL("../components/photos/ali 4.jpeg", import.meta.url).href,
  title: "The Future Full Stack Developer",
  caption:
  "This picture represents my passion for coding and my goal of becoming a skilled Full Stack Developer.",
  connection: "OCEAN — Emotional Stability",
  alt: "Ali Hassan as a future Full Stack Developer",
  focus: "center 25%",
  layout: "portrait-right"
}];