// Hands the finished pile from the landing page to the next page, so the
// kibble that covered the screen can be drained away seamlessly.
export const pileStore = {
  current: null, // { canvas, width, height, margin } or null
  set(pile) { this.current = pile; },
  clear() { this.current = null; },
};
