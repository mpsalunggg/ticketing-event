import { useAuth } from "@/components/provider";
import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type ProtectedRouteProps = PropsWithChildren;

export default function Protected({ children }: ProtectedRouteProps) {
   const user = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      if (user === null) {
         navigate("/unauthorized", { replace: true });
      }
   }, [navigate, user]);

   return children;
}
