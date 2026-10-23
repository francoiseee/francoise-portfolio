import houseImg from "../assets/homepage/house.png";
import treeImg from "../assets/homepage/tree.png";
import ballImg from "../assets/homepage/ball.png";

// Where things sit in the yard. Every prop has two placements:
//   wide: landscape screens, where the props are spread out across the screen
//   tall: phones / portrait
// x  = distance from the center of the screen   (units, negative = left)
// dy = height above the ground line             (units, negative = below it)
// w  = width                                    (units)
// bleed (optional) = how far it may hang off the edge of the screen (units)
// One unit is 1% of the yard width (see house.css). The ground line is where
// the house stands; the cat starts at the bottom of the screen.
export const props = {
  house: { src: houseImg, alt: "",     wide: { x: 0,   dy: 0,   w: 76 }, tall: { x: 0,   dy: 0,   w: 88 } },
  tree:  { src: treeImg,  alt: "",     wide: { x: 63,  dy: -9,  w: 54 }, tall: { x: 34,  dy: -40, w: 60, bleed: 14 } },
  ball:  { src: ballImg,  alt: "Ball", wide: { x: -56, dy: -4,  w: 20 }, tall: { x: -30, dy: -26, w: 26 } },
};
