import { useState } from "react";
import Icon from "../Icon.jsx";
import ScreenHead from "./ScreenHead.jsx";
import { me } from "../../data/contact.js";

const EMAIL_OK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  { id: "name",  label: "Your name",  props: { type: "text",  placeholder: "what should I call you?", autoComplete: "name" } },
  { id: "email", label: "Your email", props: { type: "email", placeholder: "so I can write back",     autoComplete: "email" } },
  { id: "note",  label: "Your note",  props: { rows: 5,       placeholder: "tell me anything" } },
];

// what's wrong with the form, if anything, as { field: message }
const check = ({ name, email, note }) => ({
  ...(!name.trim() && { name: "What should I call you?" }),
  ...(!EMAIL_OK.test(email.trim()) && { email: "That email doesn’t look quite right." }),
  ...(!note.trim() && { note: "Write me a little something first." }),
});

// A little form for writing me a note. There is no server, so sending opens the
// visitor's mail app with the note already written, then shows the "sent" screen.
export default function NoteScreen({ onBack, onSent }) {
  const [form, setForm] = useState({ name: "", email: "", note: "" });
  const [errors, setErrors] = useState({});

  const update = (id) => (e) => {
    setForm((f) => ({ ...f, [id]: e.target.value }));
    setErrors((er) => ({ ...er, [id]: undefined }));
  };

  const send = (event) => {
    event.preventDefault();
    const found = check(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    const subject = `Hi from ${form.name.trim()}`;
    const body = `${form.note.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`;
    window.location.href = `mailto:${me.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    onSent();
  };

  return (
    <form className="ph-note" onSubmit={send} noValidate>
      <ScreenHead title="Write me a note" onBack={onBack} />
      {FIELDS.map(({ id, label, props }) => {
        const Input = props.rows ? "textarea" : "input";
        return (
          <label key={id} className={`field${errors[id] ? " has-error" : ""}`}>
            <span>{label}</span>
            <Input {...props} value={form[id]} onChange={update(id)} />
            {errors[id] && <em role="alert">{errors[id]}</em>}
          </label>
        );
      })}
      <button type="submit" className="ph-note__send">
        Send my note <Icon name="arrow" />
      </button>
      <p className="ph-note__hint">This opens your mail app with the note ready to go.</p>
    </form>
  );
}
