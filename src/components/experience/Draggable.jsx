import { useState } from "react";
import { useDrag } from "../../hooks/useDrag.js";

// Something you can pick up and move around inside `within` (a ref, the cork board).
// Picking it up brings it in front of everything else. Pressing it without moving it counts as a tap.
// `open` makes it bigger and straight (see .drag.is-open in experience.css); if that makes
// it poke out of the board, it slides back in once it has finished growing.
// `index` is its stacking order to begin with.
// `raise` hands out the next layer number, so whatever was grabbed last is on top.
export default function Draggable({ x, y, w, tilt = 0, index, open = false, within, raise, onTap, children }) {
  const [layer, setLayer] = useState(index + 2); // the fixed things on the page sit at layer 1
  const { ref, pos, dragging, fit, handlers } = useDrag({ x, y, within, onGrab: () => setLayer(raise()), onTap });

  const grown = (e) => open && e.target === e.currentTarget && e.propertyName === "width" && fit();

  return (
    <div
      ref={ref}
      className={`drag ${dragging ? "is-dragging" : ""} ${open ? "is-open" : ""}`}
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, zIndex: layer, "--w": `${w}cqw`, "--tilt": `${tilt}deg` }}
      onTransitionEnd={grown}
      {...handlers}
    >
      {children}
    </div>
  );
}
