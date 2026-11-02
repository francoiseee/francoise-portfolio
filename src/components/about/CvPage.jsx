import { useState } from "react";
import { cv } from "../../data/about.js";

// The CV as two sheets of paper: one on top, the other peeking out behind it.
// Tap the sheet behind (or the page buttons) to bring it to the front.
export default function CvPage() {
  const [front, setFront] = useState(0);
  const back = (front + 1) % cv.pages.length;

  return (
    <>
      <h2 className="notebook__title">My CV</h2>
      <div className="cv">
        <button type="button" className="cv__sheet cv__sheet--back" onClick={() => setFront(back)} aria-label={`Show page ${back + 1}`}>
          <img src={cv.pages[back].src} alt="" draggable="false" />
        </button>
        <a key={front} className="cv__sheet cv__sheet--front" href={cv.pdf} target="_blank" rel="noreferrer">
          <img src={cv.pages[front].src} alt={cv.pages[front].alt} draggable="false" />
        </a>
      </div>
      <div className="cv__bar">
        <div className="cv__pages" role="group" aria-label="CV page">
          {cv.pages.map((page, i) => (
            <button key={page.src} type="button" aria-pressed={i === front} onClick={() => setFront(i)}>{i + 1}</button>
          ))}
        </div>
        <a className="cv__print" href={cv.pdf} target="_blank" rel="noreferrer">Print this page</a>
      </div>
    </>
  );
}
