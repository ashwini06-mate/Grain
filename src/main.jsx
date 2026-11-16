import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { StoreProvider } from "./context/StoreContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <StoreProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </MotionConfig>
  </StrictMode>,
);
