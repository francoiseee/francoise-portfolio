import photoImg from "../assets/aboutMe/francoise.webp";
import cvPage1 from "../assets/aboutMe/cv-page-1.webp";
import cvPage2 from "../assets/aboutMe/cv-page-2.webp";
import cvPdf from "../assets/aboutMe/Christine-Francoise-Gurango-CV.pdf";

// Everything on the About me page. This is the only file you need to edit
// to change the words or swap the CV.
//
// The CV pictures are the pages of the PDF, saved as images. If the CV changes,
// replace the PDF and both pictures in src/assets/aboutMe/.

export const photo = {
  src: photoImg,
  alt: "Francoise at a restaurant, chin resting on her hand",
};

// Tap the photo and the little tag above it says the next one of these.
export const greetings = [
  "hello, it's me!",
  "hi again :)",
  "still me!",
  "ok, you can stop poking",
  "fine, one more",
];

export const now = "Currently building apps at Tutorials Dojo and automations at Educolor.";

export const tags = ["Fullstack dev", "UI/UX design", "QA testing", "Automation"];

// The "About my work" page of the notebook. Each string is one paragraph.
export const intro = {
  title: "Nice to meet you.",
  paragraphs: [
    "I’m Francoise, a Computer Science student at Holy Angel University. I build across the whole stack, from the first Figma frame to the database underneath it.",
    "Most recently I designed and developed TarotTail and took it from wireframes all the way to a live App Store release. At Educolor I swap repetitive admin work for automated systems, which saves the team an estimated 6–8 hours a week, and I keep their website running. At Tutorials Dojo I test apps before they reach the Play Store, where I’ve reported 15+ bugs before users ever ran into them.",
    "The part I like most is where design and code meet: making something feel friendly, then making sure it actually holds up.",
  ],
  stack: ["React", "Expo", "Flutter", "Supabase", "Firebase", "PostgreSQL", "Apps Script", "Figma"],
  signature: "Francoise",
};

export const cv = {
  pages: [
    { src: cvPage1, alt: "Page 1 of my CV: education and work experience" },
    { src: cvPage2, alt: "Page 2 of my CV: leadership, skills and certifications" },
  ],
  pdf: cvPdf,
};
