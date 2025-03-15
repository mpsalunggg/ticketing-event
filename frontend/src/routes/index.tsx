import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, MainLayout } from "@/components/layout";
import SignInPage from "@/pages/auth/signin";
// import Protected from "@/routes/protected.route";
// import { HomeRoutes } from "@/routes/main";
import homeRoutes from "@/routes/main/home.routes";
import adminRoutes from "@/routes/main/admin.routes";

const router: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
   //Public Route
   {
      path: "/",
      element: <AuthLayout />,
      children: [
         {
            path: "login",
            element: <SignInPage />,
         },
      ],
   },
   // {
   //    path: "/",
   //    element: <AuthLayout />,
   //    children: [
   //       {
   //          path: "oauth-callback",
   //          element: <OAuthCallback />,
   //       },
   //    ],
   // },
   {
      path: "home",
      // element: (
      //    // <Protected>
      //    <MainLayout />
      //    // </Protected>
      // ),
      children: homeRoutes,
   },
   {
      path: "admin",
      // element: (
      //    // <Protected>
      //    <MainLayout />
      //    // </Protected>
      // ),
      children: adminRoutes,
   },
]);

export default router;
