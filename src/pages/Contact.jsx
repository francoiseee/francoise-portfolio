import { useEffect, useRef, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import Icon from "../components/Icon.jsx";
import Backdrop from "../components/contact/Backdrop.jsx";
import HomeScreen from "../components/contact/HomeScreen.jsx";
import NoteScreen from "../components/contact/NoteScreen.jsx";
import OnlineScreen from "../components/contact/OnlineScreen.jsx";
import SentScreen from "../components/contact/SentScreen.jsx";
import { prefersReducedMotion } from "../utils/motion.js";

const TILT = 7; // how many degrees the phone leans toward the pointer, at most

const timeNow = () => new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "");

// The page behind the phone in the room: a little phone to get in touch through.
// This file is the phone itself; each of its screens is in components/contact/.
// The links and words live in data/contact.js.
export default function Contact() {
  const [screen, setScreen] = useState({ id: "home", way: 1 }); // way: 1 = going in, -1 = going back
  const [time, setTime] = useState(timeNow);
  const phoneRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(timeNow()), 15000);
    return () => clearInterval(timer);
  }, []);

  const go = (id) => setScreen({ id, way: id === "home" ? -1 : 1 });
  const home = () => go("home");

  // the phone leans a little toward the pointer, like it's being held
  const lean = (event) => {
    const phone = phoneRef.current;
    if (!phone || event.pointerType === "touch" || prefersReducedMotion()) return;
    const box = phone.getBoundingClientRect();
    const x = (event.clientX - (box.left + box.width / 2)) / window.innerWidth;
    const y = (event.clientY - (box.top + box.height / 2)) / window.innerHeight;
    phone.style.setProperty("--ry", `${(x * TILT * 2).toFixed(2)}deg`);
    phone.style.setProperty("--rx", `${(-y * TILT * 2).toFixed(2)}deg`);
  };

  return (
    <main className="contact" onPointerMove={lean}>
      <Backdrop />
      <BackButton />

      <div className="contact__stage">
        <p className="contact__say-hi" aria-hidden="true">
          say hi!
          <svg viewBox="0 0 90 60"><path d="M4 8c22-6 52 0 62 20 4 8 4 16 0 24M58 44l8 10 9-11" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </p>

        <div className="stamp" aria-hidden="true">
          <div className="stamp__inner">
            <Icon name="heart" className="stamp__heart" />
            <span>air mail</span>
          </div>
        </div>

        <div className="phone" ref={phoneRef}>
          <span className="phone__button phone__button--a" aria-hidden="true" />
          <span className="phone__button phone__button--b" aria-hidden="true" />
          <div className="phone__screen">
            <div className="phone__status" aria-hidden="true">
              <span>{time}</span>
              <span className="phone__notch" />
              <span className="phone__battery"><i /></span>
            </div>

            <div key={screen.id} className={`screen screen--${screen.way < 0 ? "back" : "in"}`}>
              {screen.id === "home" && <HomeScreen onGo={go} />}
              {screen.id === "note" && <NoteScreen onBack={home} onSent={() => go("sent")} />}
              {screen.id === "online" && <OnlineScreen onBack={home} />}
              {screen.id === "sent" && <SentScreen onDone={home} onAnother={() => go("note")} />}
            </div>

            <span className="phone__home-bar" aria-hidden="true" />
          </div>
        </div>
      </div>
    </main>
  );
}
