// A project is a folder with its screenshot peeking out; an automation
// script is a sheet of paper. Colours come from data/work.js (--c).
// The folder's front flap swings open on hover (see work.css).
export default function FileIcon({ item }) {
  if (item.folder === "automation") {
    return (
      <svg className="file-icon file-icon--script" viewBox="0 0 80 96" aria-hidden="true">
        <path className="file-icon__sheet" d="M10 6h42l18 18v62a4 4 0 0 1-4 4H10a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4z" />
        <path className="file-icon__fold" d="M52 6v14a4 4 0 0 0 4 4h14" />
        <path className="file-icon__lines" d="M17 40h30M17 50h40M17 60h22M17 70h34" />
        <text className="file-icon__ext" x="52" y="83" textAnchor="middle">.gs</text>
      </svg>
    );
  }

  const clip = `peek-${item.id}`;
  return (
    <svg className="file-icon file-icon--folder" viewBox="0 0 100 82" aria-hidden="true">
      <defs>
        <clipPath id={clip}><rect x="17" y="14" width="66" height="44" rx="2" /></clipPath>
      </defs>
      <path className="file-icon__back" d="M6 14a6 6 0 0 1 6-6h22l7 7h47a6 6 0 0 1 6 6v49a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" />
      <g className="file-icon__paper">
        <rect x="17" y="14" width="66" height="44" rx="2" fill="#fffdf8" />
        {item.shot && (
          <image href={item.shot} x="17" y="10" width="66" height="52" preserveAspectRatio="xMidYMin slice" clipPath={`url(#${clip})`} />
        )}
        <rect x="17" y="14" width="66" height="44" rx="2" fill="none" />
      </g>
      <path className="file-icon__front" d="M4 32a6 6 0 0 1 6-6h80a6 6 0 0 1 6 6v38a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" />
      <path className="file-icon__shine" d="M12 34h18" />
    </svg>
  );
}
