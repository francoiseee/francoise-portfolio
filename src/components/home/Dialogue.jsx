import { useEffect, useRef, useState } from "react";
import HomeCat from "./HomeCat.jsx";
import SpeechBubble from "./SpeechBubble.jsx";
import { useTypewriter } from "../../hooks/useTypewriter.js";
import { playMeow } from "../../utils/sounds.js";

// The cat talks one line at a time, with a meow at the start of each line.
// Click anywhere (or press Space / Enter): the first click finishes the typing,
// the next one moves to the following line.
//   active    -> false holds everything back (e.g. while the page is still loading in)
//   onFinish  -> called when the visitor clicks past the last line
export default function Dialogue({ lines, active = true, onFinish }) {
  const [index, setIndex] = useState(0);
  const { typed, rest, done, skip } = useTypewriter(lines[index], { enabled: active });
  const isLast = index === lines.length - 1;

  useEffect(() => {
    if (active) playMeow();
  }, [index, active]);

  function next() {
    if (!active) return;
    if (!done) return skip();
    if (!isLast) return setIndex(index + 1);
    onFinish?.();
  }

  // The key listener is added once and always calls the latest `next`, instead
  // of being re-added on every typed letter.
  const nextRef = useRef(next);
  nextRef.current = next;

  useEffect(() => {
    function onKey(e) {
      if (e.key !== " " && e.key !== "Enter") return;
      e.preventDefault();
      if (!e.repeat) nextRef.current(); // holding the key must not race through every line
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // No hint on the last line until there is somewhere to go next
  const canContinue = !isLast || Boolean(onFinish);

  return (
    <div className="dialogue" onClick={next}>
      <HomeCat talking={active && !done} />
      <SpeechBubble typed={typed} rest={rest} typing={active && !done} showHint={done && canContinue} />
    </div>
  );
}
