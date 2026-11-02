import { intro } from "../../data/about.js";

// The "About my work" page of the notebook: a few paragraphs, my stack and a signature.
export default function WorkPage() {
  return (
    <>
      <h2 className="notebook__title">{intro.title}</h2>
      {intro.paragraphs.map((p) => <p key={p} className="notebook__text">{p}</p>)}
      <p className="notebook__label">Things I build with</p>
      <ul className="notebook__stack">
        {intro.stack.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <p className="notebook__signature">— {intro.signature}</p>
    </>
  );
}
