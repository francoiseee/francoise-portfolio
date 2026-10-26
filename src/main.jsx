import React from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/gaegu/latin-700.css";
import "@fontsource/source-code-pro/latin-400.css";
import "@fontsource/nunito/latin-400.css";
import "@fontsource/nunito/latin-400-italic.css";
import "@fontsource/nunito/latin-700.css";
import "@fontsource/nunito/latin-800.css";
import "./styles/global.css";
import "./styles/animations.css";
import "./styles/kibble.css";
import "./styles/sky.css";
import "./styles/home.css";
import "./styles/house.css";
import "./styles/inside.css";
import "./styles/wipe.css";
import "./styles/certifications.css";
import "./styles/experience.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
