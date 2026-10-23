import sparkles from "../../assets/inside/certification/sparkles.png";
import sticker from "../../assets/inside/certification/sticker.png";

// The cute transition out of the room: a pink circle grows from the thing you
// clicked, a sticker spins out of it and sparkles fly away. When the circle has
// covered the screen it calls onDone, and the next page (which starts out the
// same pink) takes over.
// `origin` is where the click was, in pixels from the top-left of the window.
export default function PageWipe({ origin, onDone }) {
  return (
    <div
      className="wipe"
      style={{ "--x": `${origin.x}px`, "--y": `${origin.y}px` }}
      onAnimationEnd={(e) => e.target === e.currentTarget && onDone()}
      aria-hidden="true"
    >
      <img className="wipe__sparkles wipe__sparkles--a" src={sparkles} alt="" draggable="false" />
      <img className="wipe__sparkles wipe__sparkles--b" src={sparkles} alt="" draggable="false" />
      <img className="wipe__sparkles wipe__sparkles--c" src={sparkles} alt="" draggable="false" />
      <img className="wipe__sticker" src={sticker} alt="" draggable="false" />
    </div>
  );
}
