// The sky is drawn in "sky units": 1 unit = 1% of the scene width.
// x counts from the center of the screen (negative = left), y from the top.
// The same sky is used on every screen, so it only has to be tuned here.

// The sun: one soft yellow disc with glows around it. It is drawn once.
export const sun = [
  { x: 0.7,   y: 6.3,  r: 11,  core: 40, color: "#eee08a" },
  { x: -12.4, y: 3.4,  r: 4.5, color: "rgba(236, 221, 124, 0.6)" },
  { x: -10.6, y: 11.3, r: 4.2, color: "rgba(236, 221, 124, 0.6)" },
  { x: 12.9,  y: 7.5,  r: 4.2, color: "rgba(236, 221, 124, 0.55)" },
  { x: 8.5,   y: 14.7, r: 4.5, color: "rgba(236, 221, 124, 0.55)" },
  { x: 13.2,  y: 0.8,  r: 3.5, color: "rgba(236, 221, 124, 0.45)" },
  { x: 6.6,   y: 2.2,  r: 4,   color: "rgba(255, 255, 255, 0.8)" },
];

// The rest of the sky is one 100-unit-wide strip that repeats sideways,
// so wide screens get more sky. Soft round patches of color, painted in this
// order (first = on top). `r` is the radius, `core` (%) keeps the middle solid.
export const patches = [
  // white fog where the sky meets the paper
  { x: -37.5, y: 31.3, r: 11, color: "rgba(255, 255, 255, 0.9)" },
  { x: -9.3,  y: 32.5, r: 12, color: "rgba(255, 255, 255, 0.85)" },
  { x: 20,    y: 32,   r: 11, color: "rgba(255, 255, 255, 0.7)" },
  { x: 45,    y: 32,   r: 11, color: "rgba(255, 255, 255, 0.7)" },

  // blue clouds
  { x: -46.2, y: 3.1,  r: 20, color: "#b2c1f2" },
  { x: -34.4, y: 20.7, r: 14, color: "#c0cdf5" },
  { x: -20.6, y: 20.7, r: 13, color: "#c6d2f6" },
  { x: 28.2,  y: 20.7, r: 13, color: "#c4d1f6" },
  { x: 31.4,  y: 1.9,  r: 11, color: "#bccaf5" },

  // light blue clouds
  { x: -48.1, y: 15.6, r: 12, color: "#c3e6f6" },
  { x: -23.7, y: 7.5,  r: 9,  color: "#cdeaf7" },
  { x: 18.8,  y: 24.4, r: 13, color: "#bbe2f5" },
  { x: 41.4,  y: 6.9,  r: 12, color: "#c4e6f6" },
  { x: -6.2,  y: 25,   r: 12, color: "#cfe9f7" },
  { x: 13.8,  y: 15.6, r: 10, color: "#c9e8f6" },
];

// The color underneath the patches (top -> bottom).
export const wash = ["#cddcf8", "#dbebf9"];

// The drawn clouds. Every cloud has two placements (center point and width):
//   wide: landscape screens
//   tall: phones / portrait, where the screen is only ~60 units wide
// `delay` / `speed` (seconds) keep the clouds from drifting in sync.
export const clouds = [
  { id: "left",   wide: { x: -31.6, y: 8.3,  w: 22.2 }, tall: { x: -15, y: 9,  w: 22.2 }, delay: 0,   speed: 7 },
  { id: "right",  wide: { x: 28.5,  y: 8.3,  w: 26.7 }, tall: { x: 16,  y: 9,  w: 26.7 }, delay: 1.5, speed: 9 },
  { id: "center", wide: { x: -1.2,  y: 21.5, w: 26 },   tall: { x: 0,   y: 24, w: 26 },   delay: 0.7, speed: 8 },
];
