// The site's background music: a small lofi loop played live with Web Audio,
// so there is no audio file to download and no licence to worry about.
//
// The song: four warm electric-piano chords (Fmaj7, Em7, Dm7, Cmaj7) at 72 bpm,
// a soft bassline, a lazy swung beat, a few twinkly notes on top, and vinyl
// crackle underneath, all through a low-pass filter for that muffled lofi feel.
//
// Other code only uses the little store at the bottom: start(), toggle(),
// setVolume() and useLofi() (in hooks/useLofi.js) to read the state.

const BPM = 72;
const STEP = 60 / BPM / 4;          // one 16th note, in seconds
const SWING = 0.18;                 // how late the off-beat 16ths land (share of a step)
const LOOKAHEAD = 0.15;             // schedule this far ahead, in seconds

const midi = (n) => 440 * 2 ** ((n - 69) / 12);

// one chord per bar: [bass note, ...chord notes] as MIDI numbers
const CHORDS = [
  [41, 53, 57, 60, 64, 67],   // Fmaj7 (add 9)
  [40, 52, 55, 59, 62, 66],   // Em7 (add 9)
  [38, 50, 53, 57, 60, 64],   // Dm7 (add 9)
  [36, 48, 52, 55, 59, 62],   // Cmaj7 (add 9)
];
const TWINKLES = [72, 74, 76, 79, 81, 84]; // C major pentatonic, up high

// the beat, as 16 steps per bar (x = hit)
const KICK  = "x.....x...x.....";
const SNARE = "....x.......x...";
const HAT   = "x.x.x.x.x.x.x.xx";

let ctx, master, tone, timer;
let step = 0;
let nextTime = 0;

function build() {
  ctx = new AudioContext();
  tone = ctx.createBiquadFilter();           // the muffled "lofi" filter on everything
  tone.type = "lowpass";
  tone.frequency.value = 3200;
  master = ctx.createGain();
  master.gain.value = 0;
  tone.connect(master).connect(ctx.destination);
  vinylCrackle();
}

// a soft electric piano note: a sine with a quieter octave on top, fading slowly
function keys(note, time, length, level) {
  const out = ctx.createGain();
  out.gain.setValueAtTime(0.0001, time);
  out.gain.exponentialRampToValueAtTime(level, time + 0.02);
  out.gain.exponentialRampToValueAtTime(level * 0.35, time + 0.6);
  out.gain.exponentialRampToValueAtTime(0.0001, time + length);
  out.connect(tone);
  for (const [mult, type, gain] of [[1, "sine", 1], [2, "triangle", 0.12]]) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.value = midi(note) * mult;
    osc.detune.value = Math.random() * 8 - 4; // a little out of tune, like an old tape
    g.gain.value = gain;
    osc.connect(g).connect(out);
    osc.start(time);
    osc.stop(time + length + 0.05);
  }
}

function bass(note, time, length) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = "sine";
  osc.frequency.value = midi(note);
  g.gain.setValueAtTime(0.0001, time);
  g.gain.exponentialRampToValueAtTime(0.32, time + 0.03);
  g.gain.exponentialRampToValueAtTime(0.0001, time + length);
  osc.connect(g).connect(tone);
  osc.start(time);
  osc.stop(time + length + 0.05);
}

function kick(time) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.frequency.setValueAtTime(110, time);
  osc.frequency.exponentialRampToValueAtTime(42, time + 0.14);
  g.gain.setValueAtTime(0.5, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);
  osc.connect(g).connect(tone);
  osc.start(time);
  osc.stop(time + 0.4);
}

let noiseBuffer;
function noise(time, length, filterType, freq, level) {
  noiseBuffer ??= (() => {
    const b = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  })();
  const src = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  const g = ctx.createGain();
  src.buffer = noiseBuffer;
  f.type = filterType;
  f.frequency.value = freq;
  g.gain.setValueAtTime(level, time);
  g.gain.exponentialRampToValueAtTime(0.0001, time + length);
  src.connect(f).connect(g).connect(tone);
  src.start(time, Math.random() * 0.5);
  src.stop(time + length + 0.02);
}

// a quiet, endless loop of hiss and the odd pop, like a record
function vinylCrackle() {
  const length = ctx.sampleRate * 4;
  const b = ctx.createBuffer(1, length, ctx.sampleRate);
  const d = b.getChannelData(0);
  for (let i = 0; i < length; i++) {
    d[i] = (Math.random() * 2 - 1) * 0.015 + (Math.random() < 0.0004 ? (Math.random() - 0.5) * 0.6 : 0);
  }
  const src = ctx.createBufferSource();
  const f = ctx.createBiquadFilter();
  src.buffer = b;
  src.loop = true;
  f.type = "bandpass";
  f.frequency.value = 2500;
  src.connect(f).connect(master);
  src.start();
}

// plays whatever falls on one 16th-note step
function play(s, time) {
  const bar = Math.floor(s / 16) % CHORDS.length;
  const inBar = s % 16;
  const [root, ...chord] = CHORDS[bar];
  const swung = inBar % 2 ? time + SWING * STEP : time;

  if (inBar === 0) {
    chord.forEach((n, i) => keys(n, time + i * 0.012, STEP * 15, 0.06)); // a gentle roll
    bass(root, time, STEP * 6);
  }
  if (inBar === 10) chord.slice(1, 4).forEach((n) => keys(n, swung, STEP * 5, 0.035));
  if (inBar === 8) bass(root + 7, time, STEP * 4);
  if (inBar % 2 === 0 && Math.random() < 0.12) {
    keys(TWINKLES[Math.floor(Math.random() * TWINKLES.length)], swung, STEP * 6, 0.03);
  }
  if (KICK[inBar] === "x") kick(time);
  if (SNARE[inBar] === "x") noise(time, 0.18, "bandpass", 1800, 0.12);
  if (HAT[inBar] === "x") noise(swung, 0.04, "highpass", 7000, inBar % 4 ? 0.025 : 0.04);
}

function schedule() {
  while (nextTime < ctx.currentTime + LOOKAHEAD) {
    play(step, nextTime);
    step++;
    nextTime += STEP;
  }
}

// ---------- the store the page and the widget use ----------

const SAVED = "lofi"; // remembers the volume and whether the visitor paused it
const saved = (() => {
  try { return JSON.parse(localStorage.getItem(SAVED)) ?? {}; } catch { return {}; }
})();

let state = { playing: false, volume: saved.volume ?? 0.4, pausedByVisitor: saved.paused ?? false };
const listeners = new Set();

function set(next) {
  state = { ...state, ...next };
  try { localStorage.setItem(SAVED, JSON.stringify({ volume: state.volume, paused: state.pausedByVisitor })); } catch { /* fine */ }
  listeners.forEach((fn) => fn());
}

// how loud the master is for a slider value: quiet even at the top, gentle steps at the bottom
const level = (v) => v * v * 0.9;

function fadeTo(value, seconds) {
  const now = ctx.currentTime;
  master.gain.cancelScheduledValues(now);
  master.gain.setValueAtTime(master.gain.value, now);
  master.gain.linearRampToValueAtTime(value, now + seconds);
}

export const lofi = {
  subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  get: () => state,

  // starts the music, fading in. Needs a click first (browsers block sound until then).
  play() {
    try {
      if (!ctx) build();
      ctx.resume();
      if (!timer) {
        nextTime = ctx.currentTime + 0.1;
        timer = setInterval(schedule, 25);
      }
      fadeTo(level(state.volume), 2.5);
      set({ playing: true, pausedByVisitor: false });
    } catch {
      /* no audio on this browser; the site works the same without it */
    }
  },

  pause() {
    if (!ctx || !state.playing) return;
    fadeTo(0, 0.6);
    setTimeout(() => {
      clearInterval(timer);
      timer = null;
      ctx.suspend();
    }, 650);
    set({ playing: false, pausedByVisitor: true });
  },

  toggle() { state.playing ? lofi.pause() : lofi.play(); },

  // the first click anywhere starts the music, unless the visitor paused it last time
  // (a click on the player itself is left to the player's own buttons)
  autoStart(event) {
    if (event?.target?.closest?.(".radio")) return;
    if (!state.playing && !state.pausedByVisitor) lofi.play();
  },

  setVolume(volume) {
    if (ctx && state.playing) fadeTo(level(volume), 0.15);
    set({ volume });
  },
};
