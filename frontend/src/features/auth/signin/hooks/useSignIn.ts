import { TInitialState } from "@/features/auth/signin/schema";
import { AuthValidationSchema, AuthValidationType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFrappeAuth } from "frappe-react-sdk";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useSignIn = () => {
   /*  -------------------------------- STATE --------------------------------- */

   const [initialForm, setInitialForm] = useState<TInitialState>({
      signIn: {
         email: "",
         password: "",
      },
   });

   /*  -------------------------------- HOOKS --------------------------------- */

   const { t } = useTranslation();
   const navigate = useNavigate();
   const { login } = useFrappeAuth();

   const form = useForm<AuthValidationType>({
      resolver: zodResolver(AuthValidationSchema),
      defaultValues: initialForm.signIn,
      mode: "onSubmit",
   });

   /* --------------------------- HANDLER FUNCTIONS --------------------------- */

   const handleSubmit = async (data: AuthValidationType) => {
      try {
         await login({ username: data.email, password: data.password });
         navigate("/home");
      } catch (error) {
         console.error("Login gagal:", error);
      }
   };

   /* ---------------------------------- RETURN ------------------------------- */

   return {
      t,
      form,
      handleSubmit,
   };
};

export default useSignIn;
