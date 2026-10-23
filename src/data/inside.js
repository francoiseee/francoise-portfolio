import windowImg from "../assets/inside/window.png";
import boardImg from "../assets/inside/board.png";
import photoImg from "../assets/inside/photo.png";
import booksImg from "../assets/inside/books.png";
import phoneImg from "../assets/inside/phone.png";
import laptopImg from "../assets/inside/laptop.png";
import bedImg from "../assets/inside/bed.png";

// Everything in the room is placed on the same canvas as livingroom.png (in pixels).
//   x, y = top-left corner of the picture      w, h = its size
//   tag  = the middle of the hover label, as a % of the picture
//          (50 / 0 = middle of the top edge, 50 / 100 = middle of the bottom edge)
//   to   = where a click goes (leave it out until that page exists)
//   wipe = true plays the pink circle transition (PageWipe) on the way there
// The pictures are cut from the big sheets by scripts/split-room-art.py.
export const CANVAS = { width: 3840, height: 2160 };

export const items = [
  { id: "exit",           label: "Exit",           alt: "Window with plants",  src: windowImg, x: 110,  y: 168,  w: 1382, h: 1314, tag: { x: 49, y: 1 },   to: "/house" },
  { id: "experience",     label: "Experience",     alt: "Notice board",        src: boardImg,  x: 1708, y: 174,  w: 1115, h: 916,  tag: { x: 49, y: 1 } },
  { id: "about",          label: "About Me",       alt: "Photo of me",         src: photoImg,  x: 3077, y: 387,  w: 682,  h: 746,  tag: { x: 47, y: 97 } },
  { id: "certifications", label: "Certifications", alt: "Stack of books",      src: booksImg,  x: 183,  y: 1558, w: 504,  h: 542,  tag: { x: 52, y: 84 }, to: "/certifications", wipe: true },
  { id: "contact",        label: "Contact Me",     alt: "Phone",               src: phoneImg,  x: 1002, y: 1729, w: 279,  h: 383,  tag: { x: 43, y: -13 } },
  { id: "work",           label: "My Work",        alt: "Laptop",              src: laptopImg, x: 1745, y: 1303, w: 710,  h: 631,  tag: { x: 51, y: 98 } },
  { id: "surprise",       label: "Surprise",       alt: "Cat bed",             src: bedImg,    x: 2789, y: 1522, w: 878,  h: 510,  tag: { x: 50, y: 1 } },
];
