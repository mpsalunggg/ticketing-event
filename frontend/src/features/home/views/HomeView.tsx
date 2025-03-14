import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import CheckoutTicket from "@/features/home/components/CheckoutTicket";
import { useHome } from "@/features/home/hooks";
import { useModalStore } from "@/stores";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useFrappeAuth } from "frappe-react-sdk";

const HomeView = () => {
   const { dataEventActivity, navigate } = useHome();
   const { openModal, modalType, data } = useModalStore();
   return (
      <div className="flex flex-col gap-y-6">
         <div className="grid grid-cols-4 gap-6">
            <Link to={"/home/test"}>test</Link>
            <button onClick={() => navigate("/home/test")}>testt</button>
            {dataEventActivity.map((item, i) => (
               <>
                  <Card key={i} className="p-3 shadow-sm">
                     <div className="relative">
                        <img
                           src={item.poster}
                           alt=""
                           className="border rounded-md w-full"
                        />
                        <div className="absolute top-2 right-2">
                           {!item.total_ticket && (
                              <Badge variant="destructive">Sold Out</Badge>
                           )}
                        </div>
                     </div>
                     <div className="flex flex-col gap-1">
                        <p className="text-xl font-semibold">{item.title}</p>
                        <p>Rp. {item.price}</p>
                     </div>
                     <Button
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
               </>
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

         {/* <Card className="p-0">
            <div className="flex flex-col gap-y-6 py-6 px-8">
               <div>
                  <DataTable
                     columns={ColumnsHome}
                     data={dataEventActivity}
                     isToolbar={false}
                  />
               </div>
            </div>
         </Card> */}
      </div>
   );
};

export default HomeView;
