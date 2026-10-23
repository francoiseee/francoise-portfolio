import { useState } from "react";
import { useNavigate } from "react-router-dom";
import KibbleDrain from "../components/kibble/KibbleDrain.jsx";
import { pileStore } from "../components/kibble/pileStore.js";
import PageWipe from "../components/inside/PageWipe.jsx";
import RoomItem from "../components/inside/RoomItem.jsx";
import roomImg from "../assets/inside/livingroom.png";
import { items } from "../data/inside.js";
import { prefersReducedMotion } from "../utils/motion.js";

// The page behind the front door: a cozy room. Point at anything in it and a
// label pops up; the kibble from the house page drains away to reveal it.
export default function Inside() {
  const navigate = useNavigate();
  const [draining, setDraining] = useState(() => Boolean(pileStore.current));
  const [wipe, setWipe] = useState(null); // { to, x, y } while a transition is playing

  // A click goes straight to the item's page, or plays the circle wipe from the item first.
  const open = (item, event) => {
    if (!item.to || wipe) return;
    if (!item.wipe || prefersReducedMotion()) return navigate(item.to);
    const box = event.currentTarget.getBoundingClientRect();
    setWipe({ to: item.to, x: box.left + box.width / 2, y: box.top + box.height / 2 });
  };

  return (
    <main className="page inside">
      <h1 className="sr-only">Inside the house</h1>

      <div className="room">
        <img src={roomImg} alt="" draggable="false" className="room__bg" />
        {items.map((item) => (
          <RoomItem key={item.id} item={item} onOpen={(event) => open(item, event)} />
        ))}
      </div>

      {draining && <KibbleDrain onDone={() => setDraining(false)} />}
      {wipe && <PageWipe origin={wipe} onDone={() => navigate(wipe.to)} />}
    </main>
  );
}
