import { useEffect, useRef, useState } from "react";
import { folders, linksOf, work } from "../../data/work.js";
import { playMeow } from "../../utils/sounds.js";
import Icon from "../Icon.jsx";

const PROMPT = "guest@francoise:~/my-work$";

const intro = [
  { kind: "out", text: "welcome to ~/my-work (=^･ω･^=)" },
  { kind: "out", text: "type help to see what I understand." },
];

const help = [
  "ls [projects|automation]   list the files",
  "open <name>                show a project",
  "visit <name>               open its site in a new tab",
  "cd <folder>                switch folders (cd .. goes back)",
  "whoami                     who made all this",
  "meow                       you'll see",
  "clear                      wipe the screen",
  "exit                       close the terminal",
];

// "gasto", "Gastosaurus" and "gastosaurus" all find the same thing
const find = (name) => {
  const q = name.toLowerCase().replace(/\s+/g, "-");
  return work.find((w) => w.id === q) ?? work.find((w) => w.id.startsWith(q) || w.name.toLowerCase().startsWith(name.toLowerCase()));
};

const listing = (folder) =>
  work.filter((w) => !folder || w.folder === folder).map((w) => (w.folder === "automation" ? `${w.id}.gs` : `${w.id}/`));

// A tiny pretend shell that drives the explorer behind it.
// onOpen(id) selects a file, onFolder(id) switches the folder on the left.
export default function Terminal({ onClose, onOpen, onFolder }) {
  const [lines, setLines] = useState(intro);
  const [input, setInput] = useState("");
  const history = useRef([]);
  const back = useRef(0); // how far up the history the arrow keys have gone
  const inputRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);
  useEffect(() => { screenRef.current.scrollTop = screenRef.current.scrollHeight; }, [lines]);

  const run = (raw) => {
    const [cmd = "", ...rest] = raw.trim().split(/\s+/);
    const arg = rest.join(" ");
    const out = (...text) => text.map((t) => ({ kind: "out", text: t }));
    const err = (text) => [{ kind: "err", text }];
    const item = arg && find(arg);

    switch (cmd.toLowerCase()) {
      case "": return [];
      case "help": return out(...help);
      case "ls": {
        if (arg && !folders.some((f) => f.id === arg)) return err(`ls: no folder called "${arg}"`);
        return out(...listing(arg));
      }
      case "cd": {
        if (!arg || arg === ".." || arg === "~") { onFolder("all"); return out("back in ~/my-work"); }
        const folder = folders.find((f) => f.id === arg.replace(/\/$/, ""));
        if (!folder) return err(`cd: no folder called "${arg}"`);
        onFolder(folder.id);
        return out(`now in ~/my-work/${folder.id}`);
      }
      case "open":
      case "cat": {
        if (!arg) return err("open what? try: open gastosaurus");
        if (!item) return err(`can't find "${arg}". try ls`);
        onOpen(item.id);
        return out(`${item.name} — ${item.roles.join(", ")}`, item.blurb);
      }
      case "visit": {
        if (!item) return err(arg ? `can't find "${arg}". try ls` : "visit what? try: visit kidlitpop");
        const url = linksOf(item)[0]?.href;
        if (!url) return err(`${item.name} is an internal tool, so there's nothing public to visit.`);
        window.open(url, "_blank", "noopener");
        return out(`opening ${url} ...`);
      }
      case "whoami": return out("francoise. I build websites, apps, and the little scripts in between.");
      case "meow": playMeow(); return out("  /\\_/\\ ", " ( o.o )  meow!", "  > ^ <");
      case "sudo": return err("nice try. the cat is the only admin here.");
      case "clear": setLines([]); return null;
      case "exit": onClose(); return null;
      default: return err(`command not found: ${cmd}. type help`);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (input.trim()) history.current.push(input);
    back.current = 0;
    const result = run(input);
    if (result) setLines((l) => [...l, { kind: "cmd", text: input }, ...result]);
    setInput("");
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") return onClose();
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const h = history.current;
    back.current = Math.max(0, Math.min(h.length, back.current + (event.key === "ArrowUp" ? 1 : -1)));
    setInput(back.current ? h[h.length - back.current] : "");
  };

  return (
    <section className="term" aria-label="Terminal" onClick={() => inputRef.current?.focus()}>
      <header className="term__bar">
        <span>tiny-terminal</span>
        <button type="button" className="term__close" onClick={onClose} aria-label="Close the terminal">
          <Icon name="close" />
        </button>
      </header>
      <div className="term__screen" ref={screenRef} aria-live="polite">
        {lines.map((line, i) => (
          <p key={i} className={`term__line term__line--${line.kind}`}>
            {line.kind === "cmd" && <span className="term__prompt">{PROMPT} </span>}
            {line.text}
          </p>
        ))}
        <form className="term__input" onSubmit={submit}>
          <label htmlFor="term-input" className="term__prompt">{PROMPT}</label>
          <input
            id="term-input" ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={onKeyDown}
            autoComplete="off" autoCapitalize="off" spellCheck="false"
          />
        </form>
      </div>
    </section>
  );
}
