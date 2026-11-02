import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Radio from "./components/Radio.jsx";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import House from "./pages/House.jsx";
import Inside from "./pages/Inside.jsx";
import Certifications from "./pages/Certifications.jsx";
import Experience from "./pages/Experience.jsx";
import Work from "./pages/Work.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Surprise from "./pages/Surprise.jsx";
import { lofi } from "./utils/lofi.js";

const NO_RADIO = ["/", "/home"]; // the music player shows up once you reach the house

// The music player on every page from the house on. It opens on the house page and
// starts folded (just the record) everywhere else, so it never covers anything.
function MusicPlayer() {
  const { pathname } = useLocation();
  if (NO_RADIO.includes(pathname)) return null;
  return <Radio key={pathname} startOpen={pathname === "/house"} />;
}

export default function App() {
  // Browsers only allow sound after a click, so the music starts on the first one
  // (on the landing page that's the cat), softly, as the next page opens.
  useEffect(() => {
    window.addEventListener("pointerdown", lofi.autoStart, { once: true });
    return () => window.removeEventListener("pointerdown", lofi.autoStart);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/house" element={<House />} />
        <Route path="/inside" element={<Inside />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/work" element={<Work />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/surprise" element={<Surprise />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <MusicPlayer />
      {/* the same small credit sits in the corner of every page */}
      <p className="credit">Co-Authored-By: Claude</p>
    </BrowserRouter>
  );
}
