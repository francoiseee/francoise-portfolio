import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dialogue from "../components/home/Dialogue.jsx";
import Sky from "../components/home/Sky.jsx";
import KibbleDrain from "../components/kibble/KibbleDrain.jsx";
import { pileStore } from "../components/kibble/pileStore.js";
import { dialogue } from "../data/dialogue.js";

const LEAVE_MS = 500; // matches the fade-out in home.css

// The page the landing cat leads to: the cat introduces Francoise's world,
// then the screen fades out and the house comes into view.
export default function Home() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  // Coming from the landing page, the kibble is still covering the screen:
  // let it drop away to reveal this page. (No pile saved = opened directly.)
  const [draining, setDraining] = useState(() => Boolean(pileStore.current));

  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => navigate("/house"), LEAVE_MS);
    return () => clearTimeout(timer);
  }, [leaving, navigate]);

  return (
    <main className="page">
      <div className={`home ${leaving ? "is-leaving" : ""}`}>
        <Sky />
        {/* The cat waits to speak until the kibble has cleared */}
        <Dialogue lines={dialogue} active={!draining && !leaving} onFinish={() => setLeaving(true)} />
      </div>
      {draining && <KibbleDrain onDone={() => setDraining(false)} />}
    </main>
  );
}
