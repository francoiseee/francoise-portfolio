// A small arrow icon for the buttons. `dir` is "left" or "right".
export default function Arrow({ dir = "right" }) {
  return (
    <svg className="pill__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={dir === "left" ? "M19 12H5M11 5l-7 7 7 7" : "M5 12h14M13 5l7 7-7 7"}
        fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  );
}
