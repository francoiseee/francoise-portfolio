import { me } from "../../data/contact.js";

// Shown after "Send my note": an envelope flies in, and the visitor is reminded
// to press send in their mail app (or to write to me directly if nothing opened).
export default function SentScreen({ onDone, onAnother }) {
  return (
    <div className="sent">
      <svg className="sent__envelope" viewBox="0 0 120 84" aria-hidden="true">
        <rect x="4" y="4" width="112" height="76" rx="8" fill="#fffaf6" />
        <path d="M6 10l54 40 54-40" fill="#fde3ec" />
        <path d="M60 36c-4-6-12-3-10 3 1.5 4 10 9 10 9s8.5-5 10-9c2-6-6-9-10-3z" fill="#e2668f" />
      </svg>
      <h2>Almost there!</h2>
      <p>Your mail app should have opened with your note inside. Hit send there and it’s on its way to me.</p>
      <p className="sent__small">Nothing opened? Write to <a href={`mailto:${me.email}`}>{me.email}</a></p>
      <div className="sent__actions">
        <button type="button" className="ph-note__send" onClick={onDone}>Back to start</button>
        <button type="button" className="sent__again" onClick={onAnother}>write another</button>
      </div>
    </div>
  );
}
