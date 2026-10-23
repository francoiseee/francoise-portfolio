import ClickHint from "./ClickHint.jsx";

// The speech bubble. The text still to come is printed invisibly after the
// typed part, so the words never jump to a new line while they are typing.
export default function SpeechBubble({ typed, rest, typing, showHint }) {
  return (
    <div className="bubble">
      <p className="bubble__text">
        <span className="sr-only">{typed + rest}</span>
        <span aria-hidden="true">
          {typed}
          {typing && <span className="bubble__caret" />}
          <span className="bubble__rest">{rest}</span>
        </span>
      </p>
      {showHint && <ClickHint />}
    </div>
  );
}
