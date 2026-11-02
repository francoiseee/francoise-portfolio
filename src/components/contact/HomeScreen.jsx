import { useState } from "react";
import Icon from "../Icon.jsx";
import { me } from "../../data/contact.js";

// The phone's first screen: my picture, my name and three ways to reach me.
// Poke the picture and little hearts float up. `onGo(id)` opens another screen.
export default function HomeScreen({ onGo }) {
  const [hearts, setHearts] = useState([]);
  const [copied, setCopied] = useState(null); // "yes" | "no" | null

  const poke = () => {
    const id = Date.now();
    setHearts((h) => [...h, { id, x: Math.round(Math.random() * 40 - 20) }]);
    setTimeout(() => setHearts((h) => h.filter((heart) => heart.id !== id)), 1200);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(me.email);
      setCopied("yes");
    } catch {
      setCopied("no");
    }
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="ph-home">
      <button type="button" className="ph-home__avatar" onClick={poke} aria-label="Poke my picture">
        <img src={me.avatar} alt="" draggable="false" />
        <span className="ph-home__online" aria-hidden="true" />
        {hearts.map((heart) => (
          <Icon key={heart.id} name="heart" className="ph-home__heart" style={{ "--x": `${heart.x}px` }} />
        ))}
      </button>
      <h1 className="ph-home__name">hi, I'm {me.name}</h1>
      <p className="ph-home__tagline">{me.tagline}</p>

      <ul className="cards">
        <li>
          <button type="button" className="card" style={{ "--c": "#f8c6d6" }} onClick={() => onGo("note")}>
            <span className="card__icon"><Icon name="note" /></span>
            <span className="card__text"><b>Send me a note</b><small>a few words is plenty</small></span>
            <Icon name="arrow" className="card__arrow" />
          </button>
        </li>
        <li className="card-row">
          <a className="card" style={{ "--c": "#fbe3a0" }} href={`mailto:${me.email}`}>
            <span className="card__icon"><Icon name="mail" /></span>
            <span className="card__text"><b>Email me</b><small>{me.email}</small></span>
          </a>
          <button type="button" className={`card__copy${copied ? ` is-${copied}` : ""}`} onClick={copy} aria-label="Copy my email address">
            <Icon name={copied === "yes" ? "check" : "copy"} />
            <span className="card__copy-tip" role="status">{copied === "yes" ? "copied!" : copied === "no" ? "couldn’t copy" : ""}</span>
          </button>
        </li>
        <li>
          <button type="button" className="card" style={{ "--c": "#c9e6dc" }} onClick={() => onGo("online")}>
            <span className="card__icon"><Icon name="globe" /></span>
            <span className="card__text"><b>Find me online</b><small>LinkedIn &amp; GitHub</small></span>
            <Icon name="arrow" className="card__arrow" />
          </button>
        </li>
      </ul>

      <p className="ph-home__foot"><Icon name="heart" className="ph-home__foot-heart" /> thanks for dropping by</p>
    </div>
  );
}
