import { ThemeProvider } from "@/components/provider";
import router from "@/routes";
import { FrappeProvider } from "frappe-react-sdk";
import { RouterProvider } from "react-router-dom";

function App() {
   return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
         <FrappeProvider
            // url="http://192.168.0.177:8000"
            // tokenParams={{
            //    useToken: true,
            //    token: () => "OAuthBearerToken",
            //    type: "Bearer",
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
