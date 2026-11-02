import { useRef, useState } from "react";
import BackButton from "../components/BackButton.jsx";
import FileIcon from "../components/work/FileIcon.jsx";
import Icon from "../components/Icon.jsx";
import Terminal from "../components/work/Terminal.jsx";
import catImg from "../assets/work/office-cat.webp";
import { folders, linksOf, work } from "../data/work.js";
import { playMeow } from "../utils/sounds.js";

const inFolder = (item, folder) => folder === "all" || item.folder === folder;
const count = (folder) => work.filter((w) => inFolder(w, folder)).length;

// the folders down the left side: everything, then each folder in data/work.js
const SIDEBAR = [
  { id: "all", label: "All files", icon: "star" },
  ...folders.map((f) => ({ ...f, icon: f.id === "automation" ? "gear" : "grid" })),
];

const matches = (item, query) => {
  const q = query.trim().toLowerCase();
  return !q || [item.name, item.org, ...item.roles].some((s) => s?.toLowerCase().includes(q));
};

// The page behind the laptop in the room: a little file explorer of my projects.
// Click a folder to see it on the right, double-click to open its site, or
// open the terminal and poke around. What is in it lives in data/work.js.
export default function Work() {
  const [folder, setFolder] = useState("all");
  const [query, setQuery] = useState("");
  const [view, setView] = useState("grid");
  const [selectedId, setSelectedId] = useState(work[0].id);
  const [terminal, setTerminal] = useState(false);
  const [catPurr, setCatPurr] = useState(0); // bumps on every pat, which restarts the wiggle
  const detailRef = useRef(null);
  const termButtonRef = useRef(null);

  const shown = work.filter((w) => inFolder(w, folder) && matches(w, query));
  const selected = work.find((w) => w.id === selectedId);
  const links = linksOf(selected);
  const openFolder = folders.find((f) => f.id === folder); // undefined while showing all files

  const select = (id) => {
    setSelectedId(id);
    // on phones the details sit under the files, so bring them into view
    requestAnimationFrame(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }));
  };

  const openTerminalItem = (id) => { setFolder("all"); setQuery(""); select(id); };
  const closeTerminal = () => { setTerminal(false); termButtonRef.current?.focus(); };

  const visit = (item) => {
    const url = linksOf(item)[0]?.href;
    if (url) window.open(url, "_blank", "noopener");
  };

  return (
    <main className="work">
      <header className="work__top">
        <BackButton className="work__back" />
        <div className="work__heading">
          <h1>My work</h1>
          <p>Things I’ve built, designed and broken on purpose. Click a folder to look inside.</p>
        </div>
      </header>

      <div className="explorer">
        <div className="explorer__titlebar">
          <span className="explorer__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="explorer__name">my-work.exe</span>
          <button
            type="button" ref={termButtonRef}
            className={`explorer__term-btn${terminal ? " is-on" : ""}`}
            aria-pressed={terminal} onClick={() => (terminal ? closeTerminal() : setTerminal(true))}
          >
            <Icon name="terminal" />
            <span>terminal</span>
          </button>
        </div>

        <div className="explorer__toolbar">
          <p className="explorer__path">
            <Icon name="home" />
            <button type="button" onClick={() => setFolder("all")}>my-work</button>
            {openFolder && <><span aria-hidden="true">/</span><span>{openFolder.id}</span></>}
          </p>
          <label className="explorer__search">
            <Icon name="search" />
            <span className="sr-only">Search my work</span>
            <input type="search" placeholder="search files…" value={query} onChange={(e) => setQuery(e.target.value)} />
          </label>
          <div className="explorer__views" role="group" aria-label="View">
            <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")} aria-label="Folders view"><Icon name="grid" /></button>
            <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")} aria-label="List view"><Icon name="list" /></button>
          </div>
        </div>

        <div className="explorer__body">
          <nav className="explorer__side" aria-label="Folders">
            <ul>
              {SIDEBAR.map((f) => (
                <li key={f.id}>
                  <button type="button" aria-current={folder === f.id} onClick={() => setFolder(f.id)}>
                    <Icon name={f.icon} />
                    <span>{f.label}</span>
                    <span className="explorer__count">{count(f.id)}</span>
                  </button>
                </li>
              ))}
            </ul>

            <button type="button" className="explorer__cat" onClick={() => { playMeow(); setCatPurr((n) => n + 1); }} aria-label="Pat the cat">
              <img key={catPurr} className={catPurr ? "is-patted" : ""} src={catImg} alt="" draggable="false" />
              <span>{catPurr ? `pats: ${catPurr}` : "the office cat"}</span>
            </button>
          </nav>

          <section className="explorer__files" aria-label="Files">
            <p className="explorer__files-head">
              <span>{openFolder?.label ?? "All files"}</span>
              <span>{shown.length} {shown.length === 1 ? "item" : "items"}</span>
            </p>

            {shown.length === 0 ? (
              <p className="explorer__empty">
                Nothing called “{query}” in here.{" "}
                <button type="button" onClick={() => setQuery("")}>Clear the search</button>
              </p>
            ) : (
              <ul className={`files files--${view}`}>
                {shown.map((item, i) => (
                  <li key={item.id} style={{ "--c": item.color, "--i": i }}>
                    <button
                      type="button" className="file" aria-pressed={item.id === selectedId}
                      onClick={() => select(item.id)} onDoubleClick={() => visit(item)}
                    >
                      <FileIcon item={item} />
                      <span className="file__name">{item.name}</span>
                      <span className="file__meta">{item.org ?? item.note ?? item.roles[0]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <aside className="explorer__detail" ref={detailRef} aria-live="polite" style={{ "--c": selected.color }}>
            <div className="detail" key={selected.id}>
              <div className={`detail__shot detail__shot--${selected.shape ?? "none"}`}>
                {selected.shot ? (
                  <img src={selected.shot} alt={selected.shape === "icon" ? `${selected.name} app icon` : `${selected.name} on a ${selected.shape === "tall" ? "phone" : "laptop"}`} draggable="false" />
                ) : (
                  <p className="detail__no-shot">
                    <FileIcon item={selected} />
                    <span>{selected.folder === "automation" ? "runs quietly in the background" : "screenshot coming soon"}</span>
                  </p>
                )}
              </div>

              <h2 className="detail__name">{selected.name}</h2>
              {selected.org && <p className="detail__org">for {selected.org}</p>}
              <ul className="detail__roles" aria-label="What I did">
                {selected.roles.map((role) => <li key={role}>{role}</li>)}
              </ul>
              <p className="detail__blurb">{selected.blurb}</p>

              <div className="detail__links">
                {links.map((link) => (
                  <a key={link.href} className="detail__link" href={link.href} target="_blank" rel="noreferrer">
                    <Icon name={link.icon} />
                    {link.label}
                  </a>
                ))}
                {links.length === 0 && <p className="detail__private">Internal tool, so there’s no public link.</p>}
              </div>
            </div>
          </aside>

          {terminal && <Terminal onClose={closeTerminal} onOpen={openTerminalItem} onFolder={setFolder} />}
        </div>

        <footer className="explorer__status">
          <span>{count("projects")} projects · {count("automation")} automations</span>
          <span>double-click a folder to open it</span>
        </footer>
      </div>
    </main>
  );
}
