let audio;

// A soft paper "fffft": a short burst of noise that sweeps up in pitch.
// Made on the fly, so there is no sound file to load. If the browser
// refuses to play audio, the page turns silently.
export function playPageTurn() {
  try {
    audio ??= new AudioContext();
    if (audio.state === "suspended") audio.resume();

    const now = audio.currentTime;
    const length = Math.floor(audio.sampleRate * 0.5);
    const noise = audio.createBuffer(1, length, audio.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i = 0; i < length; i++) samples[i] = Math.random() * 2 - 1;

    const source = audio.createBufferSource();
    source.buffer = noise;

    const filter = audio.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.value = 0.8;
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(4000, now + 0.4);

    const volume = audio.createGain();
    volume.gain.setValueAtTime(0.0001, now);
    volume.gain.exponentialRampToValueAtTime(0.14, now + 0.12);
    volume.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);

    source.connect(filter).connect(volume).connect(audio.destination);
    source.start(now);
  } catch {
    /* no sound, no problem */
  }
}
