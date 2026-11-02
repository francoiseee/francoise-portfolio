// Everything on the surprise page (the cat bed in the room). This is the only
// file you need to edit to change the notes or the pillows.

// Each pillow hides one note. A round uses one per pillow, picked at random,
// so fluffing the pillows again brings up notes you haven't seen yet.
//   text = the note     from = the little sign-off under it
// (Straight apostrophes on purpose: the handwriting font spaces out curly ones.)
export const notes = [
  { text: "You don't have to finish everything today. Close one tab, drink some water, then pick the next small thing.", from: "advice from the cat" },
  { text: "The bug you're stuck on has an answer. You just haven't met it yet.", from: "from one debugger to another" },
  { text: "Rest is part of the work, not a prize for finishing it.", from: "nap approved" },
  { text: "Somebody is really glad you exist, and they probably don't say it enough.", from: "consider this the reminder" },
  { text: "Your first version is allowed to be messy. That's what version two is for.", from: "ship it, then polish it" },
  { text: "You've made it through every hard day so far. That's a pretty good record.", from: "100% and counting" },
  { text: "Small progress still counts. Slow is still moving.", from: "one paw at a time" },
  { text: "Asking for help is a skill, not a weakness. Even cats meow when they need something.", from: "meow responsibly" },
  { text: "Be as patient with yourself as you are with a page that's still loading.", from: "hang in there" },
  { text: "You're allowed to outgrow old habits, old places and old versions of yourself.", from: "changelog: you" },
  { text: "Your timeline is the only one you're on. Nobody else is running your race.", from: "eyes on your own lane" },
  { text: "Today doesn't have to be perfect to be a good day.", from: "snack break recommended" },
];

// The six pillows in the bed. x / y = where the middle of the pillow sits,
// as a % of the bed; w = its width as a % of the bed; tilt in degrees.
// Later pillows sit in front of earlier ones.
//   pattern = "hearts" | "dots" | "stripes" | "stars" | "daisies" | "checks"
export const pillows = [
  { id: "rose",   color: "#f2a7bd", pattern: "hearts",  x: 22, y: 62, w: 30, tilt: -10 },
  { id: "butter", color: "#f6d77e", pattern: "dots",    x: 44, y: 52, w: 28, tilt: 4 },
  { id: "sky",    color: "#a9d4ef", pattern: "checks",  x: 68, y: 54, w: 28, tilt: 8 },
  { id: "mint",   color: "#a8dcc4", pattern: "stripes", x: 36, y: 74, w: 30, tilt: 3 },
  { id: "lilac",  color: "#cdb8e6", pattern: "stars",   x: 60, y: 76, w: 29, tilt: -5 },
  { id: "peach",  color: "#f6bf9c", pattern: "daisies", x: 82, y: 70, w: 26, tilt: 14 },
];

export const hint = {
  title: "Pick a pillow",
  text: "Each one is hiding a little note for you.",
};

// shown under the last note once all six have been found
export const allFound = "That's all six! Come back whenever you need another one.";
