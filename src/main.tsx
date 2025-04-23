import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Contact from "./Contact.tsx";
import Hello from "./Hello.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Hello />
    <Contact />
  </StrictMode>
);
