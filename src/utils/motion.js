// true when the visitor has asked their device for less animation
export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
