import { MainLayout } from "@/components/layout";
import DetailView from "@/features/home/views/DetailView";
import TestView from "@/features/home/views/TestView";
import HomePage from "@/pages/home";

const homeRoutes = [
   {
      path: "",
      element: (
         <MainLayout>
            <HomePage />
         </MainLayout>
      ),
   },
   {
      path: "detail",
      element: (
         <MainLayout>
            <DetailView />
         </MainLayout>
      ),
   },
   {
      path: "test/detail",
      element: <TestView />,
   },
];

export default homeRoutes;
