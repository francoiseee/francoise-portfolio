// A sticky note pinned to the board. Tap it (or press the button) to open it:
// it grows, straightens up and shows what was done there. Tap again to pin it back.
// Dragging and tapping are handled by <Draggable> around it; the button is the way in for keyboards.
export default function Note({ note, open, onToggle }) {
  return (
    <article className="note" style={{ "--paper": note.color }}>
      <span className="note__pin" aria-hidden="true" />
      <p className="note__period">{note.period}</p>
      <h2 className="note__role">{note.title}</h2>
      <p className="note__org">{note.org}</p>

      {open && (
        <div className="note__details">
          <ul className="note__achievements">
            {note.achievements.map((line) => <li key={line}>{line}</li>)}
          </ul>
          <ul className="note__skills" aria-label="Skills">
            {note.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </div>
      )}

      {/* a mouse or finger tap is caught by <Draggable>; detail is 0 only for Enter / Space */}
      <button type="button" className="note__peek" aria-expanded={open} onClick={(e) => e.detail === 0 && onToggle()}>
        {open ? "Pin it back" : "Peek inside"}
      </button>
    </article>
  );
}
