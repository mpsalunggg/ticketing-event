import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FrappeProvider } from "frappe-react-sdk";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <FrappeProvider
         // url=""
         // tokenParams={{
         //      useToken: true,
         //      token: () => "my_token",
         //      type: "Bearer",
         // }}
         socketPort={import.meta.env.VITE_SOCKET_PORT}
         siteName={import.meta.env.VITE_SITE_NAME}
      >
         <App />
      </FrappeProvider>
   </StrictMode>,
);
