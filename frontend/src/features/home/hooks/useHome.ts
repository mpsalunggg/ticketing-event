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
   const { data } = useFrappeGetDocList<EventActivityValidationType>(
      "Event Activity",
      {
         fields: ["name", "title", "date", "venue", "price", "total_ticket", "poster"],
      },
   );

   /* --------------------------- HANDLER FUNCTIONS --------------------------- */

   // const createTransaction = async (event: string, quantity: number) => {
   //    try {
   //       const response = await fetch(
   //          "/api/method/ticketing_event.api.transaction.create_transaction",
   //          {
   //             method: "POST",
   //             headers: {
   //                "Content-Type": "application/json",
   //                // Authorization: "token f8db4dd77cc2b9f:8d93705426b16c0"
   //             },
   //             body: JSON.stringify({
   //                event,
   //                quantity,
   //             }),
   //          },
   //       );

   //       const result = await response.json();
   //       if (!response.ok) {
   //          throw new Error(result.message || "Failed to create transaction");
   //       }

   //       console.log("Transaction Created:", result);
   //       // return result;
   //    } catch (error) {
   //       console.error("Error creating transaction:", error);
   //    }
   // };

   const createTransaction = useFrappePostCall<any>(
      "ticketing_event.api.transaction.create_transaction",
   );

   const { call } = useFrappePostCall(
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
