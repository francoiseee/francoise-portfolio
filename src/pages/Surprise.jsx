import { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Pillow from "../components/surprise/Pillow.jsx";
import bedImg from "../assets/inside/bed.webp";
import catImg from "../assets/landing/cat.webp";
import catYawnImg from "../assets/landing/cat-yawn.webp";
import ballImg from "../assets/homepage/ball.webp";
import { allFound, hint, notes, pillows } from "../data/surprise.js";
import { playMeow } from "../utils/sounds.js";

// a fresh, random handful of notes for one round
const deal = () => [...notes].sort(() => Math.random() - 0.5).slice(0, pillows.length);

// The page behind the cat bed in the room: the cat peeks out of its bed over
// six pillows. Each pillow hides a little note; find them all and the cat pops
// up to say bye. Pet it to hear a meow. "Fluff them again" deals new notes.
// The words live in data/surprise.js.
export default function Surprise() {
  const [round, setRound] = useState(deal);   // the notes hidden in this round's pillows
  const [found, setFound] = useState([]);     // pillow ids opened so far, in order
  const [current, setCurrent] = useState(null); // the note on show
  const [fluffing, setFluffing] = useState(null); // the pillow doing its squish
  const [petting, setPetting] = useState(false);
  const [ballBounces, setBallBounces] = useState(0);

  const done = found.length === pillows.length;
  const catUp = done || petting; // finding every note brings the cat up for good

  const open = (pillow, i) => {
    setFluffing(pillow.id);
    setCurrent(round[i]);
    if (!found.includes(pillow.id)) setFound([...found, pillow.id]);
  };

  const again = () => {
    setRound(deal());
    setFound([]);
    setCurrent(null);
  };

  const pet = () => {
    playMeow();
    setPetting(true);
    setTimeout(() => setPetting(false), 1200); // then back down to peeking
  };

  return (
    <main className="cozy">
      <BackButton />

      <header className="cozy__sign">
        <h1>The cozy corner</h1>
      </header>

      <ol className="cozy__paws" aria-label={`${found.length} of ${pillows.length} notes found`}>
        {pillows.map((p, i) => (
          <li key={p.id} className={i < found.length ? "is-found" : ""} aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M12 13c-3.5 0-6 2.6-6 5 0 1.6 1.3 2.5 3 2.5 1.2 0 2-.6 3-.6s1.8.6 3 .6c1.7 0 3-.9 3-2.5 0-2.4-2.5-5-6-5zM6 7.5a2 2.5 0 1 0 4 0 2 2.5 0 1 0-4 0M14 7.5a2 2.5 0 1 0 4 0 2 2.5 0 1 0-4 0M2.5 12a2 2.3 0 1 0 4 0 2 2.3 0 1 0-4 0M17.5 12a2 2.3 0 1 0 4 0 2 2.3 0 1 0-4 0" /></svg>
          </li>
        ))}
      </ol>

      <div className="cozy__room">
        <div className="cozy__hint">
          <h2>{hint.title}</h2>
          <p>{hint.text}</p>
        </div>

        <div className="cozy__note" aria-live="polite">
          {current ? (
            <figure key={current.text} className="note-slip">
              <blockquote>{current.text}</blockquote>
              <figcaption>— {current.from}</figcaption>
              {done && (
                <div className="note-slip__done">
                  <p>{allFound}</p>
                  <button type="button" onClick={again}>Fluff them again</button>
                </div>
              )}
            </figure>
          ) : (
            <p className="note-slip note-slip--empty">A kind note is hiding in one of these pillows…</p>
          )}
        </div>

        <div className="nest">
          <img className="nest__bed" src={bedImg} alt="" draggable="false" />
          <button type="button" className={`nest__cat${catUp ? " is-up" : ""}`} onClick={pet} aria-label="Pet the cat">
            <img src={petting ? catYawnImg : catImg} alt="" draggable="false" />
          </button>

          {pillows.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className={`pillow${found.includes(p.id) ? " is-found" : ""}${fluffing === p.id ? " is-fluffed" : ""}`}
              style={{ "--x": `${p.x}%`, "--y": `${p.y}%`, "--w": `${p.w}%`, "--tilt": `${p.tilt}deg` }}
              onClick={() => open(p, i)}
              onAnimationEnd={() => setFluffing(null)}
              aria-label={found.includes(p.id) ? `Pillow ${i + 1}, read again` : `Pillow ${i + 1}`}
            >
              <Pillow {...p} />
            </button>
          ))}
        </div>

        <button
          key={ballBounces}
          type="button"
          className={`cozy__ball${ballBounces ? " is-bouncing" : ""}`}
          onClick={() => setBallBounces((n) => n + 1)}
          aria-label="Bounce the ball"
        >
          <img src={ballImg} alt="" draggable="false" />
        </button>
      </div>
    </main>
  );
}
