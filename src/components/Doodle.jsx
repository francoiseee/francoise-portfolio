import { CANVAS } from "../data/doodles.js";

// Turns a placement (design px) into CSS percentages for one layout.
const toPercent = ({ x, y, w }, { width, height }) => ({
  x: `${(x / width) * 100}%`,
  y: `${(y / height) * 100}%`,
  w: `${(w / width) * 100}%`,
});

// One decoration that shakes forever. It hands BOTH placements to CSS as
// variables; global.css picks the wide or tall set depending on the screen.
// The outer span places it; the inner img shakes, so the two transforms
// never fight each other.
export default function Doodle({ src, wide, tall, shake, delay, speed }) {
  const w = toPercent(wide, CANVAS.wide);
  const t = tall && toPercent(tall, CANVAS.tall);

  const placement = {
    "--wide-x": w.x, "--wide-y": w.y, "--wide-w": w.w,
    ...(t && { "--tall-x": t.x, "--tall-y": t.y, "--tall-w": t.w }),
  };

  return (
    <span className={`doodle ${tall ? "" : "doodle--wide-only"}`} style={placement} aria-hidden="true">
      <img
        src={src}
        alt=""
        draggable="false"
        className={`shake-${shake}`}
        style={{ animationDelay: `${delay}s`, animationDuration: `${speed}s` }}
      />
    </span>
  );
}
