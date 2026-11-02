import { useMediaQuery } from "../../hooks/useMediaQuery.js";

// The contact page's background: one hand-placed scene, not a repeating tile.
// A paper plane has looped across the wall leaving a dotted trail, a couple of
// soft blobs sit in the corners, and a few hearts and sparkles are dotted about,
// each one placed (and sized) on its own. The phone covers the middle, so
// everything keeps to the edges. Drawn on a 1600 x 1000 canvas that is cropped,
// never stretched, to fit the window. On tall screens (phones) it is pinned to the
// left edge instead of the middle, so the loop and the blobs stay in view.
const heart = "M0 6C-9-6-18 3-12 10L0 21 12 10C18 3 9-6 0 6z";
const sparkle = "M0-14C2-4 4-2 14 0 4 2 2 4 0 14-2 4-4 2-14 0-4-2-2-4 0-14z";

export default function Backdrop() {
  const tall = useMediaQuery("(max-aspect-ratio: 3 / 4)");
  return (
    <svg className="contact__backdrop" viewBox="0 0 1600 1000" preserveAspectRatio={tall ? "xMinYMid slice" : "xMidYMid slice"} aria-hidden="true">
      {/* soft blobs */}
      <path fill="#f9d6e5" d="M1240-60c150-20 330 40 380 170s-20 260-160 290-250-40-320-130-60-310 100-330z" />
      <path fill="#ece0f5" d="M-80 700c90-80 260-90 330 0s60 230-40 300-280 60-330-30-50-200 40-270z" />
      <path fill="#fbeec8" d="M150 120c40-30 110-20 130 25s-10 95-60 100-100-20-105-60 5-45 35-65z" />

      {/* the paper plane's dotted trail, with one loop-the-loop on the way */}
      <path
        fill="none" stroke="#e8a5bf" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="0.5 16"
        d="M60 930C220 860 300 760 330 640s-60-190-130-120 20 170 150 150 210-160 230-330"
      />
      <path
        fill="none" stroke="#e8a5bf" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="0.5 16"
        d="M1080 860c120-40 250-20 330-110"
      />
      <g transform="translate(1440 735) rotate(-38)" fill="#fffaf6" stroke="#c98aa4" strokeWidth="3" strokeLinejoin="round">
        <path d="M-40 0L40-22 0 28z" />
        <path d="M40-22L-8 8 0 28" fill="#f6cbdb" />
      </g>

      {/* hearts and sparkles, each placed by hand */}
      <g fill="#f3bcd2">
        <path d={heart} transform="translate(1180 140) rotate(-14) scale(1.6)" />
        <path d={heart} transform="translate(470 860) rotate(12) scale(1.1)" />
        <path d={heart} transform="translate(1520 470) rotate(8) scale(.8)" />
      </g>
      <g fill="#f5c9a8">
        <path d={sparkle} transform="translate(1360 320) scale(1.3)" />
        <path d={sparkle} transform="translate(90 420) scale(.8)" />
        <path d={sparkle} transform="translate(1110 940) scale(.9)" />
      </g>
      <path d={sparkle} fill="#cbb6e6" transform="translate(540 120) scale(.7) rotate(20)" />

      {/* a few loose dots */}
      <g fill="#ecb6cb">
        <circle cx="1270" cy="560" r="5" />
        <circle cx="1300" cy="590" r="3" />
        <circle cx="390" cy="280" r="4" />
        <circle cx="240" cy="950" r="3.5" />
        <circle cx="1560" cy="880" r="4" />
      </g>
    </svg>
  );
}
