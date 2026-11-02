import { useNavigate } from "react-router-dom";
import Arrow from "./Arrow.jsx";

// The "Back to my room" button every page behind the room has.
// It sits in the top-left corner; pass `className` to place it differently.
// On small screens it shortens to "Back" (see .pill__extra in global.css).
export default function BackButton({ className = "back-button" }) {
  const navigate = useNavigate();
  return (
    <button type="button" className={`pill ${className}`} onClick={() => navigate("/inside")}>
      <Arrow dir="left" />
      <span>Back<span className="pill__extra"> to my room</span></span>
    </button>
  );
}
