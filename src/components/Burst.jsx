const COLORS = ["var(--pink)", "var(--blue)", "var(--yellow)", "#a4d3ff"];
const PIECES = 10;

// Little confetti stars that fly out of the cat. Re-mounted (via `key`)
// on every click so the animation restarts.
export default function Burst() {
  return (
    <div className="burst" aria-hidden="true">
      {Array.from({ length: PIECES }, (_, i) => {
        const angle = (360 / PIECES) * i - 90;
        return (
          <span
            key={i}
            className="burst__star"
            style={{
              "--angle": `${angle}deg`,
              "--distance": `${70 + (i % 3) * 25}px`,
              color: COLORS[i % COLORS.length],
            }}
          >
            ✦
          </span>
        );
      })}
    </div>
  );
}
