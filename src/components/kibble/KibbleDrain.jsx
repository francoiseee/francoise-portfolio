import { useLayoutEffect, useRef } from "react";
import { pileStore } from "./pileStore.js";

// Picks up the pile the landing page left behind (still covering the screen)
// and lets it drop away downward, like the floor falling out. Then calls onDone.
export default function KibbleDrain({ onDone }) {
  const layer = useRef();

  useLayoutEffect(() => {
    const pile = pileStore.current;
    const same = pile && pile.width === window.innerWidth && pile.height === window.innerHeight;
    if (!same) {
      pileStore.clear();
      onDone();
      return;
    }

    layer.current.appendChild(pile.canvas); // same pixels, no visible change
    const drop = pile.height + pile.margin;
    const animation = pile.canvas.animate(
      [{ transform: "translateY(0)" }, { transform: `translateY(${drop}px)` }],
      { duration: 1300, delay: 200, easing: "cubic-bezier(0.55, 0.05, 0.85, 0.55)", fill: "both" }
    );
    animation.onfinish = () => {
      pileStore.clear();
      onDone();
    };
    return () => {
      animation.cancel();
      pile.canvas.remove();
    };
  }, []);

  return <div ref={layer} className="kibble-layer" aria-hidden="true" />;
}
