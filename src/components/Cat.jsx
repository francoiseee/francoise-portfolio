import { useEffect, useRef, useState } from "react";
import Burst from "./Burst.jsx";
import catIdle from "../assets/landing/cat.png";
import catYawn from "../assets/landing/cat-yawn.png";

const YAWN_MS = 1400;

// The clickable cat. Idle: bobs + wiggles on hover.
// Click: swaps to the yawning cat, hops, and throws confetti.
export default function Cat({ onClick }) {
  const [yawning, setYawning] = useState(false);
  const [clicks, setClicks] = useState(0); // changes the key -> replays animations
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  function handleClick() {
    setYawning(true);
    setClicks((n) => n + 1);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setYawning(false), YAWN_MS);
    onClick?.();
  }

  return (
    <button type="button" className="cat" onClick={handleClick} aria-label="Click the cat to get started">
      <span key={clicks} className={`cat__body ${yawning ? "is-yawning" : ""}`}>
        {/* Both images stay mounted so the swap never flickers */}
        <img src={catIdle} alt="" draggable="false" className="cat__img cat__img--idle" />
        <img src={catYawn} alt="" draggable="false" className="cat__img cat__img--yawn" />
      </span>
      {clicks > 0 && <Burst key={clicks} />}
    </button>
  );
}
