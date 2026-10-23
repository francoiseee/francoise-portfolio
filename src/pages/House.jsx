import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sky from "../components/home/Sky.jsx";
import HouseLabel from "../components/house/HouseLabel.jsx";
import Prop from "../components/house/Prop.jsx";
import WalkingCat from "../components/house/WalkingCat.jsx";
import KibbleFill from "../components/kibble/KibbleFill.jsx";
import bushesImg from "../assets/homepage/bushes.png";
import { props } from "../data/house.js";
import { useCatGame } from "../hooks/useCatGame.js";

const ENTER_DELAY_MS = 700; // lets the cat meow at the door before the kibble starts

// The cat has led you to the house. Drag the ball and the cat chases it;
// tap anywhere else and the cat walks toward the door. Once the cat reaches
// the door, kibble fills the screen and the next page takes over.
export default function House() {
  const navigate = useNavigate();
  const [filling, setFilling] = useState(false);

  const world = useRef();
  const yard = useRef();
  const house = useRef();
  const tree = useRef();
  const ball = useRef();
  const cat = useRef();

  useCatGame({ world, yard, house, tree, ball, cat, onArrive: () => setTimeout(() => setFilling(true), ENTER_DELAY_MS) });

  return (
    <main className="page">
      <div className="house">
        <div className="world" ref={world}>
          <Sky />

          <div className="yard" ref={yard}>
            <Prop ref={house} {...props.house} />
            <HouseLabel {...props.house}>Get to know me!</HouseLabel>
            <Prop ref={tree} {...props.tree} />
            <Prop ref={ball} className="ball" {...props.ball} />
            <WalkingCat ref={cat} />
          </div>

          {/* the foreground bushes: one bank on each side of the screen (the right one is mirrored) */}
          <img src={bushesImg} alt="" draggable="false" className="bushes bushes--left" />
          <img src={bushesImg} alt="" draggable="false" className="bushes bushes--right" />
        </div>
      </div>

      {filling && <KibbleFill onDone={() => navigate("/inside")} />}
    </main>
  );
}
