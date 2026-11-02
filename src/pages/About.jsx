import { useState } from "react";
import BackButton from "../components/BackButton.jsx";
import CvPage from "../components/about/CvPage.jsx";
import WorkPage from "../components/about/WorkPage.jsx";
import roomImg from "../assets/inside/livingroom.webp";
import { greetings, now, photo, tags } from "../data/about.js";

const TABS = [
  { id: "work", label: "About my work" },
  { id: "cv", label: "My CV" },
];

// The page behind the photo in the room: a board with my picture on one side
// and a notebook on the other. The notebook has two tabs: a few paragraphs
// about my work, and my CV as paper pages (the button opens the real PDF).
// The room stays blurred in the background. The two notebook pages are in
// components/about/. The words live in data/about.js.
export default function About() {
  const [tab, setTab] = useState("work");
  const [pokes, setPokes] = useState(0); // which greeting the tag shows; also restarts the wiggle

  return (
    <main className="about">
      <div className="about__room" style={{ backgroundImage: `url(${roomImg})` }} aria-hidden="true" />

      <BackButton />

      <header className="about-sign">
        <h1>About me</h1>
      </header>

      <div className="about-board">
        <div className="about-board__surface">
          <section className="about-me" aria-label="Me">
            <p key={`hello-${pokes}`} className="about-me__hello" aria-live="polite">{greetings[pokes % greetings.length]}</p>
            <button type="button" className="about-me__frame" onClick={() => setPokes((n) => n + 1)} aria-label="Poke my photo">
              <img key={pokes} className={pokes ? "is-poked" : ""} src={photo.src} alt={photo.alt} draggable="false" />
            </button>
            <p className="about-me__now">{now}</p>
            <ul className="about-me__tags" aria-label="What I do">
              {tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </section>

          <section className="notebook" aria-label="Notebook">
            <div className="notebook__tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-controls="notebook-page"
                  aria-selected={tab === t.id} className="notebook__tab" onClick={() => setTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="notebook__paper" id="notebook-page" role="tabpanel" aria-labelledby={`tab-${tab}`}>
              <span className="notebook__clip" aria-hidden="true" />
              <div key={tab} className="notebook__page">
                {tab === "work" ? <WorkPage /> : <CvPage />}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
