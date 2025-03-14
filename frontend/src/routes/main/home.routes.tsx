import DetailView from "@/features/home/views/DetailView";
import TestView from "@/features/home/views/TestView";
import HomePage from "@/pages/home";

const homeRoutes = [
   {
      path: "",
      element: <HomePage />,
   },
   {
      path: "detail",
      element: <DetailView />,
   },
   {
      path: "test/detail",
      element: <TestView />,
   },
];

export default homeRoutes;
