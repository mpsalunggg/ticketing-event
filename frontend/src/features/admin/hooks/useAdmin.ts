import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useAdmin = () => {
   /*  -------------------------------- STATE --------------------------------- */

   // const [providers, setProviders] = useState<Provider[]>([]);

   /*  -------------------------------- HOOKS --------------------------------- */

   const { t } = useTranslation();
   const navigate = useNavigate();

   /* --------------------------- HANDLER FUNCTIONS --------------------------- */

   /* ----------------------------- DATA FETCHING ----------------------------- */

   /* ---------------------------------- RETURN ------------------------------- */

   return {
      t,

      navigate,
   };
};

export default useAdmin;
