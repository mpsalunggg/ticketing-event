import Page404 from "@/pages/error/404";
import Page401 from "@/pages/error/401";

const errorRoutes = [
   {
      path: "*",
      element: <Page404 />,
   },
   {
      path: "unauthorized",
      element: <Page401 />,
   },
];

export default errorRoutes;
