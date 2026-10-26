import meowSrc from "../assets/homepage/cat-meow.mp3";

const MEOW_VOLUME = 0.45; // 0 = silent, 1 = full volume

const meow = new Audio(meowSrc);
meow.preload = "auto";
meow.volume = MEOW_VOLUME;

// Restarts from the beginning, so quick clicks never stack up or cut off.
// Browsers block sound until the visitor has clicked somewhere, so a
// refused play() is simply ignored.
export function playMeow() {
  meow.currentTime = 0;
  meow.play().catch(() => {});
}
