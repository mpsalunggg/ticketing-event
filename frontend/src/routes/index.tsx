import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/components/layout";
import SignInPage from "@/pages/auth/signin";
// import Protected from "@/routes/protected.route";
// import { HomeRoutes } from "@/routes/main";
import homeRoutes from "@/routes/main/home.routes";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
   //Public Route
   {
      path: "/",
      element: <AuthLayout />,
      children: [
         {
            path: "auth/signin",
            element: <SignInPage />,
         },
      ],
   },
   {
      path: "home",
      element: (
         // <Protected>
         <MainLayout />
         // </Protected>
      ),
      children: homeRoutes,
   },
]);

export default router;
