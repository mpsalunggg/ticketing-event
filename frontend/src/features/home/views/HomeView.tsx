import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CheckoutTicket from "@/features/home/components/CheckoutTicket";
import { useHome } from "@/features/home/hooks";
import { useModalStore } from "@/stores";
import { Ticket } from "lucide-react";

const HomeView = () => {
   const { dataEventActivity } = useHome();
   const { openModal, modalType, data } = useModalStore();

   return (
      <div className="block space-y-4 px-4">
         <div className="w-full flex justify-end">
            <Button variant="default" className="cursor-pointer relative">
               <Ticket /> Tiketku
               <div className="absolute -top-1 -left-1 bg-blue-400 w-4 h-4 rounded-full">
                  <p className="text-white text-[10px]">2</p>
               </div>
            </Button>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dataEventActivity.map((item, i) => (
               <Card key={i} className="p-3 shadow-sm">
                  <div className="relative">
                     <img
                        src={item.poster}
                        alt=""
                        className="border rounded-md w-full"
                     />
                     <div className="absolute top-2 right-2">
                        {!item.total_ticket ? (
                           <Badge variant="destructive">Sold Out</Badge>
                        ) : (
                           <Badge variant="default" className="bg-green-400">
                              {item.total_ticket} Ticket
                           </Badge>
                        )}
                     </div>
                  </div>
                  <div className="flex flex-col gap-1">
                     <p className="text-xl font-semibold">{item.title}</p>
                     <p>Rp. {item.price}</p>
                  </div>
                  <Button
                     className="w-full mt-2"
                     disabled={!item.total_ticket}
                     onClick={() =>
                        openModal({
                           type: "co",
                           data: {
                              price: item.price,
                              title: item.title,
                              image: item.poster,
                              venue: item.venue,
                              total_ticket: item.total_ticket,
                           },
                        })
                     }
                  >
                     Buy Tickets
                  </Button>
               </Card>
            ))}
         </div>

         {modalType === "co" && (
            <CheckoutTicket
               price={data.price}
               title={data.title}
               image={data.image}
               venue={data.venue}
               totalTicket={data.total_ticket}
            />
         )}
      </div>
   );
};

export default HomeView;
