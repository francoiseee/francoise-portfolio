import { forwardRef } from "react";
import { placement } from "./placement.js";

// One picture in the yard, placed from its `wide` / `tall` spot (see data/house.js).
const Prop = forwardRef(function Prop({ src, alt, wide, tall, className = "" }, ref) {
  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      draggable="false"
      className={`prop ${className}`}
      style={placement(wide, tall)}
    />
  );
});

export default Prop;
