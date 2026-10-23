import { useEffect, useRef } from "react";
import { loadSprites } from "./sprites.js";
import { startFill } from "./fillEngine.js";
import { pileStore } from "./pileStore.js";

// Kibble rains down and piles up until the whole screen is covered,
// then calls onDone. (The pile is saved so the next page can drain it.)
export default function KibbleFill({ onDone }) {
  const pileRef = useRef();
  const fallRef = useRef();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDone();
      return;
    }
    let cancelled = false;
    let stop;
    loadSprites().then((sprites) => {
      if (cancelled) return;
      stop = startFill({
        pileCanvas: pileRef.current,
        fallCanvas: fallRef.current,
        sprites,
        onDone: (pile) => {
          pileStore.set(pile);
          onDone();
        },
      });
    }).catch((err) => {
      console.error(err);
      if (!cancelled) onDone(); // never get stuck on the landing page
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return (
    <div className="kibble-layer" aria-hidden="true">
      <canvas ref={pileRef} className="kibble-canvas" />
      <canvas ref={fallRef} className="kibble-canvas" />
    </div>
  );
}
