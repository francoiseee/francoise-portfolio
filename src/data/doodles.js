// Every doodle has two placements (centers, in design pixels):
//   wide: for landscape screens, on a 2000 x 1130 canvas
//   tall: for phones / portrait,  on a 1000 x 2000 canvas
//         (use `tall: null` to hide a doodle on phones)
// <Doodle> converts them to % so the layout scales with the window.
// `shake` is "spin" (wobbles) or "none" (stays still), see styles/animations.css,
// `delay` / `speed` (seconds) keep the spinning doodles from moving in sync.

import baguettePink from "../assets/landing/baguette-pink.png";
import baguetteYellow from "../assets/landing/baguette-yellow.png";
import baguetteBlue from "../assets/landing/baguette-blue.png";
import paperPlane from "../assets/landing/paper-plane.png";
import swirlTopLeft from "../assets/landing/swirl-top-left.png";
import swirlTopRight from "../assets/landing/swirl-top-right.png";
import swirlBottomLeft from "../assets/landing/swirl-bottom-left.png";
import swirlBottomRight from "../assets/landing/swirl-bottom-right.png";

export const CANVAS = {
  wide: { width: 2000, height: 1130 },
  tall: { width: 1000, height: 2000 },
};

export const doodles = [
  // swirls — little wobbly spins
  { id: "swirl-tl", src: swirlTopLeft,     wide: { x: 361,  y: 239,  w: 168 }, tall: { x: 130, y: 130,  w: 190 }, shake: "spin",  delay: 0,   speed: 2.4 },
  { id: "swirl-tr", src: swirlTopRight,    wide: { x: 1726, y: 279,  w: 156 }, tall: { x: 870, y: 130,  w: 170 }, shake: "spin",  delay: 0.6, speed: 2.8 },
  { id: "swirl-bl", src: swirlBottomLeft,  wide: { x: 160,  y: 1032, w: 138 }, tall: { x: 130, y: 1870, w: 160 }, shake: "spin",  delay: 1.1, speed: 2.6 },
  { id: "swirl-br", src: swirlBottomRight, wide: { x: 1818, y: 1035, w: 128 }, tall: { x: 870, y: 1870, w: 150 }, shake: "spin",  delay: 0.3, speed: 3.0 },

  // baguettes — still
  { id: "bag-pink",   src: baguettePink,   wide: { x: 214, y: 498, w: 148 }, tall: null, shake: "none", delay: 0,   speed: 0.9 },
  { id: "bag-yellow", src: baguetteYellow, wide: { x: 165, y: 603, w: 175 }, tall: null, shake: "none", delay: 0.3, speed: 1.1 },
  { id: "bag-blue",   src: baguetteBlue,   wide: { x: 205, y: 725, w: 152 }, tall: null, shake: "none", delay: 0.6, speed: 1.0 },

  // paper plane — still
  { id: "plane", src: paperPlane, wide: { x: 1788, y: 680, w: 215 }, tall: null, shake: "none", delay: 0, speed: 3.2 },
];
