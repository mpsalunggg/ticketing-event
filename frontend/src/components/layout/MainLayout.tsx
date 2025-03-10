import React from "react";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { Outlet } from "react-router-dom";
import { useModalStore } from "@/stores";
import { Modal } from "@/components/common/modal";

const MainLayout: React.FC = () => {
   const { status } = useModalStore();

   return (
      <div className="h-screen">
         <Navbar />
         <div className="py-[70px] lg:px-[100px] px-4 bg-primary-foreground">
            <div className="mt-4 w-full relative">
               <div className="w-full mt-18">
                  <Outlet />
               </div>
            </div>
         </div>
         <Footer />
         {status && <Modal />}
      </div>
   );
};

export default MainLayout;
