import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import Loading_Screen from "./Loading_Screen";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Loading_Screen />
  </StrictMode>,
);
