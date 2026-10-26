import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../components/certifications/Arrow.jsx";
import Board from "../components/experience/Board.jsx";
import Draggable from "../components/experience/Draggable.jsx";
import Note from "../components/experience/Note.jsx";
import { certificate, decor, notes, polaroid, quote } from "../data/experience.js";

// Where a fixed thing sits on the page (its numbers are in data/experience.js).
const place = ({ x, y, w, tilt = 0 }) => ({ left: `${x}%`, top: `${y}%`, "--w": `${w}cqw`, "--tilt": `${tilt}deg` });

// The page behind the notice board in the room: a cork board of sticky notes.
// Drag the notes around; tap one to open it and read what was done there.
// The pictures, the quote and the stickers stay put. What is on the page lives in data/experience.js.
export default function Experience() {
  const navigate = useNavigate();
  const [openId, setOpenId] = useState(null); // one note is open at a time
  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  const boardRef = useRef(null); // the notes can only be dragged within the cork

  // Whatever was picked up last goes on top. The layers already in use are below 100.
  const topLayer = useRef(100);
  const raise = () => ++topLayer.current;

  return (
    <main className="experience">
      <button type="button" className="pill exp-exit" onClick={() => navigate("/inside")}>
        <Arrow dir="left" />
        <span>Back<span className="pill__extra"> to my room</span></span>
      </button>

      <div className="exp-stage">
        <header className="exp-sign">
          <h1>Experience cork board</h1>
          <p>Move the notes around. Tap one to read the full details.</p>
        </header>

        <Board ref={boardRef} />

        {decor.map((item) => (
          <img key={item.id} className="pinned" src={item.src} alt="" draggable="false" style={place(item)} />
        ))}

        <div className="pinned" style={place(polaroid)}>
          <figure className="polaroid taped">
            <img src={polaroid.src} alt={polaroid.alt} draggable="false" />
            <figcaption>{polaroid.caption}</figcaption>
          </figure>
        </div>

        <div className="pinned" style={place(quote)}>
          <blockquote className="quote taped">
            <p className="quote__eyebrow">{quote.eyebrow}</p>
            <p className="quote__text">{quote.text}</p>
          </blockquote>
        </div>

        <div className="pinned" style={place(certificate)}>
          <div className="certificate">
            <img className="certificate__img" src={certificate.src} alt={certificate.alt} draggable="false" />
            <img className="certificate__clip" src={certificate.clip} alt="" draggable="false" />
          </div>
        </div>

        {notes.map((note, i) => (
          <Draggable key={note.id} {...note} index={i} open={openId === note.id} within={boardRef} raise={raise} onTap={() => toggle(note.id)}>
            <Note note={note} open={openId === note.id} onToggle={() => toggle(note.id)} />
          </Draggable>
        ))}
      </div>
    </main>
  );
}
