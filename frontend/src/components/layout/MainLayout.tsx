import React, { ReactNode } from "react";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { useModalStore } from "@/stores";
import { Modal } from "@/components/common/modal";
import { Toaster } from "../ui/sonner";

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
   const { status } = useModalStore();

   return (
      <div className="flex flex-col min-h-screen relative">
         <Navbar />
         <div className="py-[70px] lg:px-[100px] px-4 bg-primary-foreground">
            <div className="mt-4 w-full relative">
               <div className="w-full mt-18">{children}</div>
            </div>
         </div>
         <Footer />
         <Toaster position="bottom-right" expand={true} />
         {status && <Modal />}
      </div>
   );
};

export default MainLayout;
