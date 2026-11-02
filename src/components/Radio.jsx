import { useState } from "react";
import Icon from "./Icon.jsx";
import { useLofi } from "../hooks/useLofi.js";
import { lofi } from "../utils/lofi.js";

// The one song in the playlist (the music itself is made in utils/lofi.js).
const PLAYLIST = [{ title: "Cozy room", by: "an original lofi loop", length: "∞" }];

// A little radio in the top-right corner: a spinning record, play/pause,
// a volume slider and the playlist. The − button folds it down to just the record.
// `startOpen`: open on arrival (the house page), or folded so it covers nothing.
export default function Radio({ startOpen = false }) {
  const { playing, volume } = useLofi();
  const [open, setOpen] = useState(startOpen);
  const track = PLAYLIST[0];

  if (!open) {
    return (
      <button type="button" className="radio radio--folded" onClick={() => setOpen(true)} aria-label="Open the music player">
        <span className={`radio__record${playing ? " is-spinning" : ""}`} aria-hidden="true" />
      </button>
    );
  }

  return (
    <section className="radio" aria-label="Music player">
      <header className="radio__top">
        <span className={`radio__record${playing ? " is-spinning" : ""}`} aria-hidden="true" />
        <div className="radio__now">
          <p className="radio__label">{playing ? "now playing" : "paused"}</p>
          <p className="radio__title">{track.title}</p>
          <p className="radio__by">{track.by}</p>
        </div>
        <button type="button" className="radio__fold" onClick={() => setOpen(false)} aria-label="Fold the music player away">
          <Icon name="minus" />
        </button>
      </header>

      <div className="radio__controls">
        <button type="button" className="radio__play" onClick={lofi.toggle} aria-label={playing ? "Pause the music" : "Play the music"}>
          <Icon name={playing ? "pause" : "play"} />
        </button>
        <label className="radio__volume">
          <Icon name="volume" />
          <span className="sr-only">Volume</span>
          <input
            type="range" min="0" max="1" step="0.01" value={volume}
            onChange={(e) => lofi.setVolume(Number(e.target.value))}
            style={{ "--fill": `${volume * 100}%` }}
          />
        </label>
      </div>

      <div className="radio__playlist">
        <p className="radio__label">playlist</p>
        <ol>
          {PLAYLIST.map((t) => (
            <li key={t.title} className="is-current">
              <span className={`radio__bars${playing ? " is-moving" : ""}`} aria-hidden="true"><i /><i /><i /></span>
              <span className="radio__track">{t.title}</span>
              <span className="radio__length">{t.length}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
