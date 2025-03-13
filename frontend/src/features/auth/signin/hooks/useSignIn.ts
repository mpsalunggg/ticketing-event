import { TInitialState } from "@/features/auth/signin/schema";
import { AuthValidationSchema, AuthValidationType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import {
   useFrappeAuth,
   useFrappeGetCall,
   useFrappeGetDoc,
} from "frappe-react-sdk";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Provider {
   name: string;
   provider_name: string;
   auth_url: string;
   icon: string;
}

interface SocialResponse {
   data: Provider[];
   error?: string;
}

const useSignIn = () => {
   /*  -------------------------------- STATE --------------------------------- */

   const [initialForm, setInitialForm] = useState<TInitialState>({
      signIn: {
         email: "",
         password: "",
      },
   });

   // const [providers, setProviders] = useState<Provider[]>([]);

   /*  -------------------------------- HOOKS --------------------------------- */

   const { t } = useTranslation();
   const navigate = useNavigate();
   const { login, currentUser } = useFrappeAuth();

   const form = useForm<AuthValidationType>({
      resolver: zodResolver(AuthValidationSchema),
      defaultValues: initialForm.signIn,
      mode: "onSubmit",
   });

   /* --------------------------- HANDLER FUNCTIONS --------------------------- */

   const handleSubmit = async (data: AuthValidationType) => {
      try {
         const res = await login({
            username: data.email,
            password: data.password,
         });

         if (res) {
            const dataRole = await refetchUserRole();

            const roleAdmin = dataRole.roles.some(
               (role: { role: string }) => role.role === "System Manager",
            );

            if (roleAdmin) {
               navigate(`/app/users`);
            } else {
               navigate("/home");
            }
         }
         // navigate("/home");
      } catch (error) {
         console.error("Login gagal:", error);
      }
   };

   // const fetchProviders = async () => {
   //    try {
   //       const res = await fetch(
   //          "/api/method/ticketing_event.api.login.get_social",
   //       );
   //       const data = await res.json();
   //       console.log("res", data.data);
   //       setProviders(data.data);
   //    } catch (err) {
   //       console.error(err);
   //    }
   // };

   const handleSSOLogin = async (provider: Provider) => {
      window.location.href = provider.auth_url;
   };

   /* ----------------------------- DATA FETCHING ----------------------------- */

   const { data: dataSSO } = useFrappeGetCall<SocialResponse>(
      "ticketing_event.api.login.get_social",
   );

   const { mutate: refetchUserRole } = useFrappeGetDoc(
      "User",
      currentUser!,
      [["enabled", "=", false]],
      {
         revalidateOnFocus: false,
         revalidateOnMount: false,
      },
   );

   /* ---------------------------------- RETURN ------------------------------- */

   return {
      t,
      form,
      handleSubmit,
      login,
      handleSSOLogin,
      navigate,
      dataSSO,
   };
};

export default useSignIn;
