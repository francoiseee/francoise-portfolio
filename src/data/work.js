import gastosaurusImg from "../assets/work/gastosaurus.webp";
import thesisImg from "../assets/work/thesis.webp";
import kidlitpopImg from "../assets/work/kidlitpop.webp";
import tarotailImg from "../assets/work/tarotail.webp";
import hauboutImg from "../assets/work/haubout.webp";
import wattsImg from "../assets/work/watts.webp";
import finsharcImg from "../assets/work/finsharc.webp";

// Everything in the "my work" explorer. This is the only file you need to edit
// to change what is in it.
//   id     = the file name shown under the folder (and what you type in the terminal)
//   folder = "projects" or "automation" (which tab it lives in on the left)
//   roles  = what I did on it
//   color  = the folder's colour
//   site / code / store = links (leave out the ones that don't exist)
//   shot   = the picture shown on the right
//            (wide = a laptop, tall = a phone, icon = an app icon)
export const folders = [
  { id: "projects",   label: "Projects" },
  { id: "automation", label: "Automation" },
];

// the links a project has, in the order they show up (the first one is "open it")
export const linksOf = (item) => [
  item.site && { href: item.site, label: "Visit site", icon: "out" },
  item.store && { href: item.store, label: "App Store", icon: "phone" },
  item.code && { href: item.code, label: "View code", icon: "code" },
].filter(Boolean);

export const work = [
  {
    id: "gastosaurus",
    name: "Gastosaurus",
    folder: "projects",
    roles: ["Full stack development"],
    blurb: "A budget tracker with a dinosaur friend: sort your expenses, save smarter, and get nudged before a bill is due.",
    color: "#a9dcc8",
    site: "https://gastosaurus-francoise.vercel.app/",
    code: "https://github.com/francoiseee/gastosaurus",
    shot: gastosaurusImg, shape: "wide",
  },
  {
    id: "coding-simulator",
    name: "Coding Simulator",
    note: "my thesis",
    folder: "projects",
    roles: ["Frontend", "UI", "Project manager"],
    blurb: "Our thesis project: a coding simulator with challenges and diagnostics. I led the team and built the interface.",
    color: "#a9d4ef",
    site: "https://coding-simulator-eight.vercel.app/",
    code: "https://github.com/francoiseee/Coding-Simulator",
    shot: thesisImg, shape: "wide",
  },
  {
    id: "kidlitpop",
    name: "KidLitPop",
    folder: "projects",
    roles: ["Frontend development"],
    blurb: "Helping great children’s books find the right readers.",
    color: "#cdb8e6",
    site: "https://kidlitpop.com/",
    code: "https://github.com/kidlitpop-rgb/kidlitpop-website",
    shot: kidlitpopImg, shape: "wide",
  },
  {
    id: "tarotail",
    name: "TarotTail",
    folder: "projects",
    roles: ["UI", "Frontend"],
    blurb: "A digital tarot journal that keeps every card exactly as it appeared.",
    color: "#e2b8d9",
    site: "https://tarotail.app/",
    code: "https://github.com/goingmeri/Tarotail",
    shot: tarotailImg, shape: "tall",
  },
  {
    id: "finsharc",
    name: "Finsharc",
    folder: "projects",
    roles: ["QA"],
    blurb: "A finance tracker on the App Store. I tested it and reported bugs before release.",
    color: "#9fc4e8",
    store: "https://apps.apple.com/ph/app/finsharc-finance-tracker/id6762380722",
    shot: finsharcImg, shape: "icon",
  },
  {
    id: "haubout",
    name: "HAUbout That Way",
    folder: "projects",
    roles: ["UI", "Frontend"],
    blurb: "A campus guide for Holy Angel University: find the quickest way to classrooms, offices and campus spots.",
    color: "#e8a0a8",
    code: "https://github.com/francoiseee/haubout_that_way",
    shot: hauboutImg, shape: "tall",
  },
  {
    id: "watts-energy",
    name: "WattsEnergy",
    folder: "projects",
    roles: ["UI", "Frontend"],
    blurb: "Upload your past energy use and get a forecast of what’s coming, so every watt counts.",
    color: "#f2d27a",
    code: "https://github.com/francoiseee/watts_energy",
    shot: wattsImg, shape: "tall",
  },
  {
    id: "central-tracker",
    name: "Central Tracker",
    folder: "automation",
    org: "Educolor",
    roles: ["Apps Script"],
    blurb: "An automated timesheet: team members clock in and out with one click, and hours are tracked automatically with an 8-hour limit. It also makes quick shift reports and sends Discord notifications so the CEO knows who has clocked in and out.",
    color: "#bde3d9",
  },
  {
    id: "weekly-drop",
    name: "Weekly Drop",
    folder: "automation",
    org: "Educolor",
    roles: ["Apps Script"],
    blurb: "An automation for the social media team that links a pre-designed template to a book database. Every week it swaps in new featured book covers, so a different set of books gets shown without redoing the design by hand.",
    color: "#fef0a8",
  },
];
