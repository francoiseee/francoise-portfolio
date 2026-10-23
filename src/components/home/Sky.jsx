import cloudImg from "../../assets/homepage/cloud.png";
import { clouds, patches, sun, wash } from "../../data/sky.js";

const TILE = 100; // the sky repeats every 100 units
const TILES = [-3, -2, -1, 0, 1, 2, 3]; // how many copies of the clouds sit side by side

// --sky-unit (set by the page) is how big one sky unit is on screen.
const unit = (n) => `calc(var(--sky-unit) * ${n})`;

const patch = ({ x, y, r, color, core = 0 }) =>
  `radial-gradient(circle ${unit(r)} at calc(50% + ${unit(x)}) ${unit(y)}, ${color} ${core}%, transparent 100%)`;

// A patch near the edge of the strip also gets a copy on the other side,
// so the repeating strips join up without a visible seam.
const wrapped = (list) =>
  list.flatMap((p) => {
    const copies = [p];
    if (p.x - p.r < -TILE / 2) copies.push({ ...p, x: p.x + TILE });
    if (p.x + p.r > TILE / 2) copies.push({ ...p, x: p.x - TILE });
    return copies;
  });

const sunBackground = sun.map(patch).join(", ");
const washBackground = [...wrapped(patches).map(patch), `linear-gradient(180deg, ${wash.join(", ")})`].join(", ");

// Every cloud, once per tile. Phones only show the middle tile (see sky.css).
const placedClouds = TILES.flatMap((tile) =>
  clouds.map((c) => ({
    key: `${c.id}${tile}`,
    extra: tile !== 0,
    wide: { ...c.wide, x: c.wide.x + tile * TILE },
    tall: c.tall,
    delay: c.delay + tile * 0.9, // keeps the copies from drifting in step
    speed: c.speed,
  }))
);

// Pastel sky + sun, the graph paper over it, and the clouds drifting on top.
export default function Sky() {
  return (
    <>
      <div className="sky" aria-hidden="true">
        <div className="sky__wash" style={{ backgroundImage: washBackground }} />
        <div className="sky__sun" style={{ backgroundImage: sunBackground }} />
      </div>
      <div className="paper" aria-hidden="true" />
      {placedClouds.map(({ key, extra, wide, tall, delay, speed }) => (
        <img
          key={key}
          src={cloudImg}
          alt=""
          draggable="false"
          className={`cloud ${extra ? "cloud--extra" : ""}`}
          style={{
            "--x-wide": wide.x, "--y-wide": wide.y, "--w-wide": wide.w,
            "--x-tall": tall.x, "--y-tall": tall.y, "--w-tall": tall.w,
            "--delay": `${delay}s`,
            "--speed": `${speed}s`,
          }}
        />
      ))}
    </>
  );
}
