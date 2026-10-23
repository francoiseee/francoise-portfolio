import { CANVAS } from "../../data/inside.js";

const pct = (n, total) => `${(n / total) * 100}%`;

// One thing in the room. Hover (or focus) it and it gets a shadow and a label.
// Its place comes from data/inside.js, converted to % so the room scales with the window.
export default function RoomItem({ item, onOpen }) {
  const { label, alt, src, x, y, w, h, tag } = item;

  return (
    <button
      type="button"
      className="room-item"
      onClick={onOpen}
      style={{
        left: pct(x, CANVAS.width), top: pct(y, CANVAS.height),
        width: pct(w, CANVAS.width), height: pct(h, CANVAS.height),
        "--tag-x": `${tag.x}%`, "--tag-y": `${tag.y}%`,
      }}
    >
      <img src={src} alt={alt} draggable="false" />
      <span className="room-item__label" aria-hidden="true">{label}</span>
    </button>
  );
}
