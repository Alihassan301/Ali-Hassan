import type { Photo } from "../types/content";

export const photos: Photo[] = [
{
  id: "professional",
  index: "01",
  src: new URL("../components/photos/ali 5.png", import.meta.url).href,
  title: "The Professional",
  caption:
  "This look represents professionalism, reliability, and a responsible approach to my work. It reflects the image I want to communicate as a Software Engineering student and Full Stack Developer.",
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
  "This look represents discipline, organization, and attention to detail. It reflects my commitment to approaching development tasks carefully and completing work responsibly.",
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
  "This look represents creativity, curiosity, and a willingness to learn. It reflects my interest in exploring new technologies and finding better ways to develop digital solutions.",
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
  "This look represents confidence, communication, and collaboration. It reflects the importance I place on sharing ideas clearly, exchanging feedback, and working effectively with others.",
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
  "This look represents my growing identity as a Full Stack Developer who combines technical thinking with creative problem-solving. It reflects my direction toward building useful, responsive, and reliable web applications.",
  connection: "OCEAN — Emotional Stability",
  alt: "Ali Hassan as a future Full Stack Developer",
  focus: "center 25%",
  layout: "portrait-right"
}];