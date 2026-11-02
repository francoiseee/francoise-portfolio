import meowSrc from "../assets/homepage/cat-meow.mp3";

// Every sound on the site. Browsers block sound until the visitor has clicked
// somewhere, so a sound that is refused is simply skipped.

const MEOW_VOLUME = 0.2;  // 0 = silent, 1 = full volume

const meow = new Audio(meowSrc);
meow.preload = "auto";
meow.volume = MEOW_VOLUME;

// The cat's meow. Restarts from the beginning, so quick clicks never stack up.
export function playMeow() {
  meow.currentTime = 0;
  meow.play().catch(() => {});
}

let audio; // made on the first page turn, then reused

// A soft paper "swoosh": a puff of air that swells while the page swings over
// and fades as it lands. Made on the fly, so there is no sound file to load.
// `seconds` is how long the turn takes, so the sound lines up with the animation.
// If the browser refuses to play audio, the page turns silently.
export function playPageTurn(seconds = 1) {
  try {
    audio ??= new AudioContext();
    if (audio.state === "suspended") audio.resume();

    const rate = audio.sampleRate;
    const length = Math.floor(rate * seconds);
    const buffer = audio.createBuffer(1, length, rate);
    const samples = buffer.getChannelData(0);
    // smoothed noise: the airy "whff" with the hiss taken out
    let smooth = 0;
    for (let i = 0; i < length; i++) {
      smooth += ((Math.random() * 2 - 1) - smooth) * 0.25;
      samples[i] = smooth;
    }

    const now = audio.currentTime;
    const source = audio.createBufferSource();
    source.buffer = buffer;

    // a gentle band of air that rises a little as the page speeds up, then settles
    const tone = audio.createBiquadFilter();
    tone.type = "bandpass";
    tone.Q.value = 0.7;
    tone.frequency.setValueAtTime(500, now);
    tone.frequency.exponentialRampToValueAtTime(1400, now + seconds * 0.45);
    tone.frequency.exponentialRampToValueAtTime(600, now + seconds);

    // swells in, peaks while the page is mid-air, fades out as it lands
    const volume = audio.createGain();
    volume.gain.setValueAtTime(0.0001, now);
    volume.gain.exponentialRampToValueAtTime(0.35, now + seconds * 0.45);
    volume.gain.exponentialRampToValueAtTime(0.0001, now + seconds * 0.95);

    source.connect(tone).connect(volume).connect(audio.destination);
    source.start(now);
  } catch {
    /* no sound, no problem */
  }
}
