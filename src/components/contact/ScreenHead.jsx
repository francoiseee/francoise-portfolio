import Icon from "../Icon.jsx";

// The top of an inner phone screen: a round back button and the screen's title.
export default function ScreenHead({ title, onBack }) {
  return (
    <header className="screen__head">
      <button type="button" className="screen__back" onClick={onBack} aria-label="Back">
        <Icon name="back" />
      </button>
      <h2>{title}</h2>
    </header>
  );
}
