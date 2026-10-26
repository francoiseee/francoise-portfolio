import heartImg from "../assets/experience/heart.png";
import starImg from "../assets/experience/star.png";
import clipImg from "../assets/experience/clip.png";
import teamImg from "../assets/experience/team.jpg";
import certificateImg from "../assets/experience/kadakareer.jpg";

// Everything on the experience cork board. This is the only file you need to edit
// to change what is on it.
//
// Where things start (they can be dragged around afterwards):
//   x, y  = top-left corner, as a % of the page
//   w     = width, in cqw (1cqw = 1% of the page's width)
//   tilt  = how many degrees it is turned
//
// Notes: `achievements` and `skills` show up when a note is opened ("Peek inside").
// The pictures, the quote and the stickers stay where they are put.

export const notes = [
  {
    id: "tutorials-dojo",
    period: "May 2026 – Present",
    title: "QA Tester / App Developer & UI/UX Designer",
    org: "Tutorials Dojo (Part-time Intern)",
    color: "#fef0a8",
    x: 16.35, y: 26.8, w: 14.35, tilt: -2,
    achievements: ["Tested mobile apps and reported 15+ bugs before their Google Play releases.", "Designed and developed TarotTail from concept to App Store launch."],
    skills: ["QA testing", "App development", "UI/UX design"],
  },
  {
    id: "educolor",
    period: "May 2026 – Present",
    title: "Systems & Web Developer",
    org: "Educolor (Part-time Intern)",
    color: "#bde3d9",
    x: 36.5, y: 28.5, w: 14.4, tilt: 1.5,
    achievements: ["Automated admin workflows, saving an estimated 6–8 hours each week.", "Built tracking systems and maintained the organization’s website."],
    skills: ["Automation", "Web development", "Databases"],
  },
  {
    id: "kadakareer",
    period: "January 2026 – July 2026",
    title: "Junior MS – Communication",
    org: "KadaKareer",
    color: "#f6b6b6",
    x: 62.8, y: 31.9, w: 14.1, tilt: -1,
    achievements: ["Managed email, community, and event communications.", "Supported community inquiries and onboarded new koaches."],
    skills: ["Communication", "Community", "Onboarding"],
  },
  {
    id: "talent-source",
    period: "July 2025 – September 2025",
    title: "Social Media Manager",
    org: "Talent Source",
    color: "#dccdea",
    x: 50.4, y: 50.5, w: 14.35, tilt: 2,
    achievements: ["Ran campaigns that grew engagement by roughly 25% in three months.", "Created 3–5 weekly posts and used analytics to improve reach."],
    skills: ["Social media", "Content strategy", "Analytics"],
  },
];

// The loose things pinned around the bottom of the board.
export const polaroid = {
  src: teamImg,
  alt: "The Tarotail core team around a restaurant table",
  caption: "tarotail core team!",
  x: 16.6, y: 75.2, w: 12.4, tilt: -12,
};

export const quote = {
  eyebrow: "Embrace the challenge ahead",
  text: "Bringing warmth and humanity to the digital world",
  x: 41, y: 78.5, w: 23.75, tilt: 0.6,
};

export const certificate = {
  src: certificateImg,
  clip: clipImg,
  alt: "KadaKareer certificate of completion",
  x: 70.45, y: 78.8, w: 14.7, tilt: 0,
};

// Stickers that just sit there (you can't drag these).
export const decor = [
  { id: "heart",  src: heartImg, x: 85,   y: 3.4,  w: 11,  tilt: 0 },
  { id: "star-1", src: starImg,  x: 31,   y: 24.1, w: 4.5, tilt: 15 },
  { id: "star-2", src: starImg,  x: 17.1, y: 60.8, w: 3.9, tilt: -8 },
  { id: "star-3", src: starImg,  x: 80.4, y: 70.1, w: 3.9, tilt: 12 },
];
