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

   const createTransaction = async (event: string, quantity: number) => {
      try {
         const response = await fetch(
            "ticketing_event.api.transaction.create_transaction",
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  event,
                  quantity,
               }),
            },
         );

         const result = await response.json();
         if (!response.ok) {
            throw new Error(result.message || "Failed to create transaction");
         }

         console.log("Transaction Created:", result);
         return result;
      } catch (error) {
         console.error("Error creating transaction:", error);
      }
   };

   /* ---------------------------------- RETURN ------------------------------- */

   return {
      t,
      dataEventActivity: data || [],
      navigate,
      createTransaction,
   };
};

export default useHome;
