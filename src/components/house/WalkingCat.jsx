import { forwardRef } from "react";
import spriteImg from "../../assets/homepage/cat-sprite.png";

// The cat. It is one picture with three poses (standing + two walking steps);
// house.css and animations.css pick the pose. The game hook moves it around.
const WalkingCat = forwardRef(function WalkingCat(_, ref) {
  return (
    <div
      ref={ref}
      className="house-cat"
      role="img"
      aria-label="Francoise’s cat"
      style={{ backgroundImage: `url(${spriteImg})` }}
    />
  );
});

export default WalkingCat;
