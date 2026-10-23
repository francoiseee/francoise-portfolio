import { useEffect, useMemo, useState } from "react";

const TYPE_MS = 38; // time between letters
const PAUSE_MS = { ",": 140, ".": 220, "!": 220, "?": 220 }; // a little breath after punctuation

// Types `text` out one letter at a time.
//   typed / rest -> the part already shown and the part still to come
//   done         -> the whole line has been typed
//   skip()       -> show the whole line right away
// Pass `enabled: false` to hold the typing back until the page is ready.
export function useTypewriter(text, { enabled = true } = {}) {
  // Array.from splits by character, so an emoji is never cut in half
  const chars = useMemo(() => Array.from(text), [text]);

  // Remember which line the count belongs to, so a new line starts at 0
  const [progress, setProgress] = useState({ text, count: 0 });
  const count = progress.text === text ? progress.count : 0;
  const done = count >= chars.length;

  useEffect(() => {
    if (!enabled || done) return;
    const delay = PAUSE_MS[chars[count - 1]] ?? TYPE_MS;
    const timer = setTimeout(() => setProgress({ text, count: count + 1 }), delay);
    return () => clearTimeout(timer);
  }, [enabled, done, count, chars, text]);

  return {
    typed: chars.slice(0, count).join(""),
    rest: chars.slice(count).join(""),
    done,
    skip: () => setProgress({ text, count: chars.length }),
  };
}
