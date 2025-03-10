import { EventActivityValidationType } from "@/schemas/eventActivity";
import { useFrappeGetDocList } from "frappe-react-sdk";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useHome = () => {
   /*  -------------------------------- STATE --------------------------------- */

   /*  -------------------------------- HOOKS --------------------------------- */

   const { t } = useTranslation();
   const navigate = useNavigate();
   const { data } = useFrappeGetDocList<EventActivityValidationType>(
      "Event Activity",
      {
         fields: ["name", "title", "date", "venue", "price", "total_ticket"],
      },
   );

   /* --------------------------- HANDLER FUNCTIONS --------------------------- */

   /* ---------------------------------- RETURN ------------------------------- */

   return {
      t,
      dataEventActivity: data || [],
      navigate,
   };
};

export default useHome;
