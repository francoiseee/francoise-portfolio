// The CSS variables that put something in the yard from its `wide` / `tall` spot
// (see data/house.js and styles/house.css). Shared by <Prop> and <HouseLabel>.
export const placement = (wide, tall) => ({
  "--x-wide": wide.x, "--dy-wide": wide.dy, "--w-wide": wide.w,
  "--x-tall": tall.x, "--dy-tall": tall.dy, "--w-tall": tall.w,
  "--bleed-wide": wide.bleed ?? 0, "--bleed-tall": tall.bleed ?? 0,
});
