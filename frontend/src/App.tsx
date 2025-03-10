import { ThemeProvider } from "@/components/provider";
import router from "@/routes";
import { FrappeProvider } from "frappe-react-sdk";
import { RouterProvider } from "react-router-dom";

function App() {
   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
            <RouterProvider router={router} />
         </FrappeProvider>
      </ThemeProvider>
   );
}

export default App;
