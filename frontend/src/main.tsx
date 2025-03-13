import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/assets/style/tailwind.css";
import App from "./App.tsx";
import "@/utils/i18n.ts";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <App />
   </StrictMode>,
);
