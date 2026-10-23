import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/Home.jsx";
import House from "./pages/House.jsx";
import Inside from "./pages/Inside.jsx";
import Certifications from "./pages/Certifications.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/house" element={<House />} />
        <Route path="/inside" element={<Inside />} />
        <Route path="/certifications" element={<Certifications />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
