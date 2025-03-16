import { EventActivityValidationType } from "@/schemas/eventActivity";
import { useModalStore } from "@/stores";
import {
   useFrappeAuth,
   useFrappeGetCall,
   useFrappeGetDocList,
   useFrappePostCall,
} from "frappe-react-sdk";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useHome = () => {
   /*  -------------------------------- STATE --------------------------------- */

   /*  -------------------------------- HOOKS --------------------------------- */

   const { t } = useTranslation();
   const navigate = useNavigate();
   const { closeModal } = useModalStore();
   const { currentUser } = useFrappeAuth();

   /* --------------------------- HANDLER FUNCTIONS --------------------------- */
   const { data: dataEventActivity, mutate: resetListEvent } =
      useFrappeGetDocList<EventActivityValidationType>("Event Activity", {
         fields: [
            "name",
            "title",
            "date",
            "venue",
            "price",
            "total_ticket",
            "poster",
         ],
      });

   const { data: dataTransaction, mutate: resetListTransaction } =
      useFrappeGetDocList<EventActivityValidationType>("Event Transaction", {
         fields: ["*"],
         filters: [["customer", "=", currentUser as string]],
         limit: 999999999,
         orderBy: {
            field: "creation",
            order: "desc",
         },
      });

   const { call: callCreateTransaction } = useFrappePostCall(
      "ticketing_event.api.transaction.create_transaction",
   );

   const { call: callUpdateStatusTransaction } = useFrappePostCall(
      "ticketing_event.api.transaction.update_transaction_status",
   );

   const handleBooked = async (event: string, quantity: number) => {
      try {
         const res = await callCreateTransaction({
            event: event,
            quantity: quantity,
         });
         toast.success("Booking berhasil, " + res.message.message);
         resetListEvent();
         resetListTransaction();
         closeModal();
      } catch (err: any) {
         toast.error(err.message);
      }
   };

   const handleUpdateStatus = async (
      transaction_id: string,
      status: string,
   ) => {
      try {
         const res = await callUpdateStatusTransaction({
            transaction_id,
            status,
         });

         toast.success(res.message.message);
         resetListEvent();
         resetListTransaction();
         closeModal();
      } catch (err: any) {
         toast.error(err.message);
      }
   };

   /* ---------------------------------- RETURN ------------------------------- */

   return {
      t,
      dataEventActivity,
      navigate,
      handleBooked,
      dataTransaction,
      handleUpdateStatus,
   };
};

export default useHome;
