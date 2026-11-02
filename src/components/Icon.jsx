// The little line icons used across the site, all drawn on the same 24px grid
// with the same stroke so they look like one set. Brand marks are filled shapes.
const strokes = {
  arrow:    "M5 12h13M13 6.5l5.5 5.5-5.5 5.5",
  back:     "M19 12H6M11 6.5 5.5 12l5.5 5.5",
  check:    "M5 12.5l4.5 4.5L19 7.5",
  close:    "M6.5 6.5l11 11M17.5 6.5l-11 11",
  code:     "M9 8l-4 4 4 4M15 8l4 4-4 4",
  copy:     "M9 9h10.5v11H9zM15 9V4.5H4.5V15H9",
  gear:     "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 3.5v2.5M12 18v2.5M3.5 12H6M18 12h2.5M6 6l1.8 1.8M16.2 16.2 18 18M6 18l1.8-1.8M16.2 7.8 18 6",
  globe:    "M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM3.5 12h17M12 3.5c2.4 2.3 3.5 5.2 3.5 8.5s-1.1 6.2-3.5 8.5c-2.4-2.3-3.5-5.2-3.5-8.5s1.1-6.2 3.5-8.5z",
  grid:     "M4.5 4.5h6v6h-6zM13.5 4.5h6v6h-6zM4.5 13.5h6v6h-6zM13.5 13.5h6v6h-6z",
  heart:    "M12 19.5s-7.5-4.6-7.5-9.7A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 2.2c0 5.1-7.5 9.7-7.5 9.7z",
  home:     "M4.5 11 12 4.5l7.5 6.5M6.5 9.5V19h11V9.5",
  list:     "M8.5 6h11M8.5 12h11M8.5 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01",
  mail:     "M3.5 6.5h17v11h-17zM3.5 7l8.5 6.5L20.5 7",
  note:     "M5 4.5h10l4 4V19.5H5zM15 4.5v4h4M8.5 12h7M8.5 15.5h5",
  minus:    "M6 12h12",
  out:      "M14 5h5v5M19 5l-8 8M17 14v4.5H5.5V7H10",
  pause:    "M9 6v12M15 6v12",
  phone:    "M8 3.5h8v17H8zM11 17.5h2",
  play:     "M8 5.5v13l10.5-6.5z",
  search:   "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5 20 20",
  star:     "M12 4.5l2.2 4.6 5 .6-3.7 3.4 1 5-4.5-2.5-4.5 2.5 1-5-3.7-3.4 5-.6z",
  terminal: "M4 5.5h16v13H4zM7.5 9.5l3 2.5-3 2.5M12.5 15h4",
  volume:   "M4.5 9.5h3.5l4.5-4v13l-4.5-4H4.5zM16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11",
};

const fills = {
  github: "M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.65-.2.65-.46v-1.7c-2.65.58-3.2-1.12-3.2-1.12-.43-1.1-1.06-1.4-1.06-1.4-.87-.59.06-.58.06-.58.96.07 1.46.98 1.46.98.85 1.46 2.23 1.04 2.78.8.08-.62.33-1.04.6-1.28-2.1-.24-4.33-1.06-4.33-4.7 0-1.04.37-1.89.98-2.55-.1-.24-.43-1.21.09-2.52 0 0 .8-.26 2.62.97a9 9 0 0 1 4.77 0c1.82-1.23 2.62-.97 2.62-.97.52 1.31.19 2.28.1 2.52.6.66.97 1.51.97 2.55 0 3.65-2.23 4.45-4.35 4.69.34.3.65.88.65 1.78v2.63c0 .26.17.57.66.47A9.5 9.5 0 0 0 12 2.5z",
  linkedin: "M5 3.5h14A1.5 1.5 0 0 1 20.5 5v14a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19V5A1.5 1.5 0 0 1 5 3.5zm2.2 6.6V17h2.3v-6.9zm1.15-3.5a1.3 1.3 0 1 0 0 2.6 1.3 1.3 0 0 0 0-2.6zM11 10.1V17h2.3v-3.6c0-1 .2-1.9 1.4-1.9s1.2 1.1 1.2 2V17h2.3v-4c0-2-.45-3.5-2.8-3.5-1.1 0-1.9.6-2.2 1.2v-.6z",
};

export default function Icon({ name, className = "icon", style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" aria-hidden="true">
      {fills[name] ? (
        <path d={fills[name]} fill="currentColor" fillRule="evenodd" />
      ) : (
        <path d={strokes[name]} fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}
