import meowSrc from "../assets/homepage/cat-meow.mp3";

const meow = new Audio(meowSrc);
meow.preload = "auto";

// Restarts from the beginning, so quick clicks never stack up or cut off.
// Browsers block sound until the visitor has clicked somewhere, so a
// refused play() is simply ignored.
export function playMeow() {
  meow.currentTime = 0;
  meow.play().catch(() => {});
}
