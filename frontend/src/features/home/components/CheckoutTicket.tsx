import { Modal } from "@/components/common/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useHome } from "@/features/home/hooks";
import { Map } from "lucide-react";
import { Fragment, useState } from "react";

interface CheckoutTicketProps {
   price: number;
   title: string;
   image: string;
   venue: string;
   totalTicket: number;
}

const CheckoutTicket: React.FC<CheckoutTicketProps> = (props) => {
   const { handleBooked } = useHome();

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
            contentClass="lg:min-w-[700px] max-w-[700px] max-h-[90%] flex flex-col"
            childClass="max-h-[90%] overflow-y-auto mr-4"
         >
            <div className="flex-1 overflow-y-auto">
               <div className="flex flex-col gap-y-3">
                  <div className="flex gap-4 lg:flex-row flex-col">
                     <img
                        src={props.image}
                        alt=""
                        className="w-[200px] rounded-lg mb-4"
                     />
                     <div className="flex flex-col gap-3 w-full">
                        <p className="font-semibold text-sm flex gap-2 items-center">
                           <Map /> {props.venue}
                        </p>
                        <p className="font-semibold">
                           {`Rp. ${props.price.toLocaleString("id-ID", { minimumFractionDigits: 2 })}`}{" "}
                           / Ticket
                        </p>
                        <Input
                           type="number"
                           value={quantity}
                           onChange={(e) =>
                              handleQuantityChange(e.target.value)
                           }
                           className="w-20"
                           min={1}
                        />
                        <p className="text-md font-semibold">
                           Total:{" "}
                           {`Rp. ${getTotalPrice().toLocaleString("id-ID", { minimumFractionDigits: 2 })}`}
                        </p>
                        <Button
                           className="bg-blue-500 hover:bg-blue-600 w-full text-white"
                           onClick={() => handleBooked(props.title, quantity)}
                        >
                           Booked Ticket
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
         </Modal>
      </Fragment>
   );
};

export default CheckoutTicket;
