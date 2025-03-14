import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHome } from "@/features/home/hooks";
import { Fragment, useState } from "react";

interface CheckoutTicketProps {
   price: number;
   title: string;
   image: string;
   venue: string;
   totalTicket: number;
}

const CheckoutTicket: React.FC<CheckoutTicketProps> = (props) => {
   const { createTransaction } = useHome();

   const [quantity, setQuantity] = useState(1);

   const handleQuantityChange = (value: string) => {
      const newQuantity = Math.max(
         1,
         Math.min(parseInt(value) || 1, props.totalTicket),
      );
      setQuantity(newQuantity);
   };

   const getTotalPrice = () => {
      return props.price * quantity;
   };

   return (
      <Fragment>
         <Modal
            title={props.title}
            contentClass="min-w-[500px] max-w-[500px] max-h-[90%] flex flex-col"
            childClass="max-h-[90%] overflow-y-auto mr-4"
         >
            <div className="flex-1 overflow-y-auto py-3">
               <div className="flex flex-col gap-y-3">
                  <div className="p-1 flex flex-col gap-y-4">
                     <img
                        src={props.image}
                        alt=""
                        className="w-[200px] h-[200px] m-auto"
                     />
                     <div className="flex flex-col gap-y-1">
                        <p className="font-semibold text-sm">{props.venue}</p>
                        <p className="font-semibold">
                           Price :{" "}
                           {`IDR ${props.price.toLocaleString("id-ID", { minimumFractionDigits: 2 })}`}
                        </p>
                     </div>
                     <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        className="w-20"
                        min={1}
                     />
                     <p className="text-xl font-semibold">
                        Total:{" "}
                        {`IDR ${getTotalPrice().toLocaleString("id-ID", { minimumFractionDigits: 2 })}`}
                     </p>
                  </div>

                  <div className="mt-2 flex flex-col gap-y-3">
                     <Button
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={() => createTransaction(props.title, quantity)}
                     >
                        Booked Ticket
                     </Button>
                  </div>
               </div>
            </div>
         </Modal>
      </Fragment>
   );
};

export default CheckoutTicket;
