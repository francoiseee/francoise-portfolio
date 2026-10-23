import { useState } from "react";

// One certificate page: a number, a title, who gave it, a short note, a few
// skills, the picture and a link. With no picture yet (or one that fails to
// load) the frame shows a placeholder.
export default function CertificateSheet({ certificate, label, number }) {
  const { title, issuer, issued, note, skills, link, image } = certificate;
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <>
      <span className="sheet__tape" aria-hidden="true" />

      <header className="cert__head">
        <p className="cert__eyebrow">{label}</p>
        <h2 className="cert__title">{title}</h2>
        <svg className="cert__squiggle" viewBox="0 0 120 12" aria-hidden="true">
          <path d="M2 6Q9-1 16 6T30 6T44 6T58 6T72 6T86 6T100 6T114 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        <p className="cert__meta">{issued ? `${issuer} · Issued ${issued}` : issuer}</p>
        {note && <p className="cert__note">{note}</p>}
        {skills && (
          <ul className="cert__skills">
            {skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        )}
      </header>

      <div className="cert__frame">
        {image && !imageFailed ? (
          <img src={image} alt={`${title} certificate`} draggable="false" onError={() => setImageFailed(true)} />
        ) : (
          <div className="cert__placeholder">
            <svg className="cert__icon" viewBox="0 0 48 48" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="6" width="40" height="28" rx="3" />
                <path d="M11 14h22M11 20h16M11 26h10" />
                <circle cx="35" cy="29" r="5" />
                <path d="M32 33l-1 9 4-2.5 4 2.5-1-9" />
              </g>
            </svg>
            <p className="cert__placeholder-title">Your certificate goes here</p>
            <p className="cert__placeholder-hint">Add the certificate image when it's ready</p>
          </div>
        )}
      </div>

      {link && (
        <a className="cert__link" href={link.url} target="_blank" rel="noopener noreferrer">
          {link.label} ↗
        </a>
      )}

      <span className="sheet__number">{number}</span>
    </>
  );
}
