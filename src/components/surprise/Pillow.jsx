// One puffy pillow with a stitched edge and a printed fabric.
// Its colour and pattern come from data/surprise.js; ids keep each
// pillow's SVG pattern separate from the others on the page.
const SHAPE = "M14 10C40 2 80 2 106 10C117 26 117 54 106 70C80 78 40 78 14 70C3 54 3 26 14 10z";
const STITCH = "M21 16C43 9 77 9 99 16C107 30 107 50 99 64C77 71 43 71 21 64C13 50 13 30 21 16z";
const HEART = "M0 5C-6-3-13 2-9 8L0 16 9 8C13 2 6-3 0 5z";
const DAISY = "M0-7a3 3 0 0 1 0 6 3 3 0 0 1 0-6zM7 0a3 3 0 0 1-6 0 3 3 0 0 1 6 0zM0 7a3 3 0 0 1 0-6 3 3 0 0 1 0 6zM-7 0a3 3 0 0 1 6 0 3 3 0 0 1-6 0z";

// the printed bits, drawn in a slightly lighter or darker version of the fabric
function Print({ id, pattern }) {
  const ink = "rgba(255, 255, 255, 0.75)";
  switch (pattern) {
    case "dots":
      return (
        <pattern id={id} width="13" height="13" patternUnits="userSpaceOnUse">
          <circle cx="6.5" cy="6.5" r="2.4" fill={ink} />
        </pattern>
      );
    case "stripes":
      return (
        <pattern id={id} width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
          <rect width="5" height="12" fill={ink} />
        </pattern>
      );
    case "checks":
      return (
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill={ink} opacity="0.7" />
          <rect x="8" y="8" width="8" height="8" fill={ink} opacity="0.7" />
        </pattern>
      );
    case "stars":
      return (
        <pattern id={id} width="22" height="20" patternUnits="userSpaceOnUse">
          <path d="M8 3C8.6 6.4 9.6 7.4 13 8 9.6 8.6 8.6 9.6 8 13 7.4 9.6 6.4 8.6 3 8 6.4 7.4 7.4 6.4 8 3z" fill={ink} />
        </pattern>
      );
    default:
      return null;
  }
}

// prints that are placed by hand instead of tiled
function Motifs({ pattern }) {
  if (pattern === "hearts") {
    return <path d={HEART} transform="translate(60 34) scale(1.5)" fill="#fff6f8" stroke="#4a2a3a" strokeWidth="1.3" />;
  }
  if (pattern === "daisies") {
    return [[34, 30], [62, 48], [86, 28], [44, 56], [80, 56]].map(([x, y]) => (
      <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
        <path d={DAISY} fill="#fffaf2" />
        <circle r="2.4" fill="#f2b84b" />
      </g>
    ));
  }
  return null;
}

export default function Pillow({ id, color, pattern }) {
  const printId = `print-${id}`;
  const tiled = !["hearts", "daisies"].includes(pattern);

  return (
    <svg className="pillow__art" viewBox="0 0 120 80" aria-hidden="true">
      <defs>
        <Print id={printId} pattern={pattern} />
        <clipPath id={`clip-${id}`}><path d={SHAPE} /></clipPath>
      </defs>
      <path d={SHAPE} fill={color} />
      <g clipPath={`url(#clip-${id})`}>
        {tiled && <rect width="120" height="80" fill={`url(#${printId})`} />}
        <Motifs pattern={pattern} />
        {/* a soft shadow along the bottom, so it looks plump */}
        <path d="M0 58C30 70 90 70 120 58V80H0z" fill="rgba(74, 42, 58, 0.12)" />
      </g>
      <path d={STITCH} fill="none" stroke="rgba(74, 42, 58, 0.45)" strokeWidth="1.4" strokeDasharray="3 3" />
      <path d={SHAPE} fill="none" stroke="#4a2a3a" strokeWidth="2.6" strokeLinejoin="round" />
    </svg>
  );
}
