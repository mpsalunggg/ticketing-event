import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
   return (
      <div className="flex flex-col min-h-screen relative">
         <Navbar type="auth" />
         <div className="h-full bg-primary-foreground">
            <div className="py-[70px]">
               <Outlet />
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default AuthLayout;
