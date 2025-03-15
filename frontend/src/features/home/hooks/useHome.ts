import { EventActivityValidationType } from "@/schemas/eventActivity";
import {
   useFrappeGetCall,
   useFrappeGetDocList,
   useFrappePostCall,
} from "frappe-react-sdk";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const useHome = () => {
   /*  -------------------------------- STATE --------------------------------- */

   /*  -------------------------------- HOOKS --------------------------------- */

   const { t } = useTranslation();
   const navigate = useNavigate();
   const { data, mutate } = useFrappeGetDocList<EventActivityValidationType>(
      "Event Activity",
      {
         fields: ["name", "title", "date", "venue", "price", "total_ticket", "poster"],
      },
   );

   /* --------------------------- HANDLER FUNCTIONS --------------------------- */

   const createTransaction = useFrappePostCall<any>(
      "ticketing_event.api.transaction.create_transaction",
   );

   const { call, isCompleted } = useFrappePostCall(
      "ticketing_event.api.transaction.create_transaction",
   );

   const handleBooked = async (event: string, quantity: number) => {
      await call({ event: event, quantity: quantity });
   };

   /* ---------------------------------- RETURN ------------------------------- */

   return {
      t,
      dataEventActivity: data || [],
      navigate,
      createTransaction,
      handleBooked,
   };
};

export default useHome;
