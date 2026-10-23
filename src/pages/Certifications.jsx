import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Arrow from "../components/certifications/Arrow.jsx";
import CertificateSheet from "../components/certifications/CertificateSheet.jsx";
import CoverSheet from "../components/certifications/CoverSheet.jsx";
import MarkerFilter from "../components/certifications/MarkerFilter.jsx";
import { useMediaQuery } from "../hooks/useMediaQuery.js";
import { certificates, cover } from "../data/certifications.js";
import { prefersReducedMotion } from "../utils/motion.js";
import { playPageTurn } from "../utils/pageTurnSound.js";

// Phones and tablets held upright show one page at a time; everything else
// shows the open book (two pages).
const ONE_PAGE_QUERY = "(max-width: 700px), (orientation: portrait) and (max-width: 900px)";
const SWIPE_DISTANCE = 50; // px a finger must travel to turn the page
const TURN_MS = 1000;      // how long a turn takes: keep in sync with --turn-time in certifications.css

// The cover is page 1, then one page per certificate.
const totalPages = 1 + certificates.length;
const ACCENTS = ["rose", "teal"]; // certificate colours take turns

// The page behind the stack of books in the room: an open book. Turn the pages
// with the buttons, the arrow keys, or by swiping. Its words live in data/certifications.js.
export default function Certifications() {
  const navigate = useNavigate();
  const onePage = useMediaQuery(ONE_PAGE_QUERY);
  const [page, setPage] = useState(0);          // the page we are on (or the left page of the spread)
  const [turning, setTurning] = useState(null); // { way, to } while a page is mid-turn
  const swipeStart = useRef(null);

  // Which pages are on screen right now.
  const step = onePage ? 1 : 2;
  const firstShown = onePage ? page : page - (page % 2);
  const lastFirstShown = Math.floor((totalPages - 1) / step) * step;
  const progress = Math.min(firstShown + step, totalPages) / totalPages;

  const turn = useCallback((way) => {
    if (turning) return;
    const to = Math.min(Math.max(firstShown + way * step, 0), lastFirstShown);
    if (to === firstShown) return;
    if (prefersReducedMotion()) return setPage(to);
    playPageTurn();
    setTurning({ way, to });
  }, [turning, firstShown, step, lastFirstShown]);

  const finishTurn = useCallback(() => {
    setPage(turning.to);
    setTurning(null);
  }, [turning]);

  // Safety net: never leave the book stuck if the animation event is missed.
  useEffect(() => {
    if (!turning) return;
    const timer = setTimeout(finishTurn, TURN_MS + 400);
    return () => clearTimeout(timer);
  }, [turning, finishTurn]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") turn(1);
      if (e.key === "ArrowLeft") turn(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [turn]);

  const onTouchStart = (e) => { swipeStart.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (swipeStart.current === null) return;
    const dx = e.changedTouches[0].clientX - swipeStart.current;
    swipeStart.current = null;
    if (Math.abs(dx) > SWIPE_DISTANCE) turn(dx < 0 ? 1 : -1);
  };

  // What is lying flat, and what is on the page being turned (the "leaf").
  //  open book, going forward:  flat = [old left, new right]; the leaf's front is the old right page
  //                             and its back is the new left page.
  //  going back is the same turn played in reverse.
  //  one page at a time:        flat = the page underneath; the leaf is the page lifting off (or landing).
  const forward = turning?.way > 0;
  const from = firstShown;
  const to = turning?.to;
  let flat = Array.from({ length: step }, (_, i) => firstShown + i);
  let leaf = null;
  if (turning && onePage) {
    flat = [forward ? to : from];
    leaf = { front: forward ? from : to };
  } else if (turning) {
    flat = [forward ? from : to, (forward ? to : from) + 1];
    leaf = { front: (forward ? from : to) + 1, back: forward ? to : from };
  }

  const renderPage = (i) => {
    const side = i % 2 === 0 ? "left" : "right";
    if (i >= totalPages) return <section key={i} className={`sheet sheet--${side}`} aria-hidden="true" />;

    if (i === 0) {
      return (
        <section key={i} className={`sheet sheet--${side}`}>
          <CoverSheet cover={cover} number={i + 1} />
        </section>
      );
    }

    const accent = ACCENTS[(i - 1) % 2];
    return (
      <section key={i} className={`sheet sheet--${side}`} data-accent={accent}>
        <CertificateSheet
          certificate={certificates[i - 1]}
          label={`Certificate ${String(i).padStart(2, "0")}`}
          number={i + 1}
        />
      </section>
    );
  };

  return (
    <main className="certs">
      <MarkerFilter />
      {[1, 2, 3, 4].map((n) => <span key={n} className={`blob blob--${n}`} aria-hidden="true" />)}

      <header className="certs__bar">
        <button type="button" className="pill" onClick={() => navigate("/inside")}>
          <Arrow dir="left" />
          <span>Back<span className="pill__extra"> to my room</span></span>
        </button>
        <h1 className="certs__title">My certification book</h1>
      </header>

      <div className="certs__stage">
        <div
          className={`book ${onePage ? "book--single" : ""}`}
          role="region"
          aria-label="Certification book"
          aria-live="polite"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="book__cover" />
          <div className={`book__pages ${leaf && !forward ? "is-prev" : ""}`}>
            {flat.map(renderPage)}

            {leaf && (
              <>
                <span className="cast cast--left" />
                <span className="cast cast--right" />
                <div
                  className="leaf"
                  onAnimationEnd={(e) => e.target === e.currentTarget && finishTurn()}
                >
                  <div className="leaf__face leaf__face--front">{renderPage(leaf.front)}</div>
                  {leaf.back !== undefined && (
                    <div className="leaf__face leaf__face--back">{renderPage(leaf.back)}</div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <nav className="certs__nav" aria-label="Turn the page">
        <button type="button" className="pill" onClick={() => turn(-1)} disabled={firstShown === 0}>
          <Arrow dir="left" />
          <span>Previous</span>
        </button>

        <div className="progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
          <span className="progress__fill" style={{ "--progress": progress }} />
        </div>

        <button type="button" className="pill" onClick={() => turn(1)} disabled={firstShown === lastFirstShown}>
          <span>Next<span className="pill__extra"> page</span></span>
          <Arrow dir="right" />
        </button>
      </nav>
    </main>
  );
}
