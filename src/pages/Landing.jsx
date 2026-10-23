import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cat from "../components/Cat.jsx";
import Doodle from "../components/Doodle.jsx";
import Title from "../components/Title.jsx";
import KibbleFill from "../components/kibble/KibbleFill.jsx";
import { doodles } from "../data/doodles.js";

const KIBBLE_DELAY_MS = 350; // let the cat start hopping before the kibble starts

// The landing screen. `.stage` keeps the design proportions, so every
// child can be positioned in % and scale with the window.
export default function Landing({ name = "Francoise" }) {
  const navigate = useNavigate();
  const [filling, setFilling] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  // Cat clicked: hop -> kibble piles up -> (KibbleFill calls onDone) -> next page
  function handleStart() {
    if (timer.current) return; // ignore extra clicks
    timer.current = setTimeout(() => setFilling(true), KIBBLE_DELAY_MS);
  }

  return (
    <main className="page">
      <div className="stage">
        {doodles.map((d) => (
          <Doodle key={d.id} {...d} />
        ))}

        <Cat onClick={handleStart} />
        <Title text={name} />
        <p className="hint">
          Click the cat to get started<span className="hint__bang"> !</span>
        </p>
      </div>

      {filling && <KibbleFill onDone={() => navigate("/home")} />}
    </main>
  );
}
