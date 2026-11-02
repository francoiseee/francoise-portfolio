import Icon from "../Icon.jsx";
import ScreenHead from "./ScreenHead.jsx";
import { socials } from "../../data/contact.js";

// My profiles, one card each. They open in a new tab.
export default function OnlineScreen({ onBack }) {
  return (
    <div className="online">
      <ScreenHead title="Find me online" onBack={onBack} />
      <ul className="cards">
        {socials.map((s) => (
          <li key={s.id}>
            <a className="card" style={{ "--c": s.color }} href={s.url} target="_blank" rel="noreferrer">
              <span className="card__icon"><Icon name={s.id} /></span>
              <span className="card__text"><b>{s.label}</b><small>{s.handle}</small></span>
              <Icon name="out" className="card__arrow" />
            </a>
          </li>
        ))}
      </ul>
      <p className="online__note">Let's be internet friends!</p>
    </div>
  );
}
