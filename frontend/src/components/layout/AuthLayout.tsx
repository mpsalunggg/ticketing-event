import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import { Fragment } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
   return (
      <Fragment>
         <Navbar type="auth" />
         <div className="h-full bg-primary-foreground">
            <div className="py-[70px]">
               <Outlet />
            </div>
         </div>
         <Footer />
      </Fragment>
   );
};

export default AuthLayout;
