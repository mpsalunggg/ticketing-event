import { Card } from "@/components/ui/card";
import CheckoutTicket from "@/features/home/components/CheckoutTicket";
import { useHome } from "@/features/home/hooks";
import { useModalStore } from "@/stores";
import moment from "moment";

const HomeView = () => {
   const { dataEventActivity } = useHome();
   const { openModal, modalType, data } = useModalStore();

   return (
      <div className="flex flex-col gap-y-6">
         <div className="grid grid-cols-4 gap-6">
            {dataEventActivity.map((item, i) => (
               <>
                  <Card
                     key={i}
                     className="p-3 shadow-sm"
                     onClick={() =>
                        openModal({
                           type: "co",
                           data: {
                              price: item.price,
                              title: item.title,
                              image: "https://upload.wikimedia.org/wikipedia/id/thumb/2/2e/Music_of_the_Spheres_World_Tour_Poster.jpeg/440px-Music_of_the_Spheres_World_Tour_Poster.jpeg",
                              venue: item.venue,
                              total_ticket: item.total_ticket,
                           },
                        })
                     }
                  >
                     <div>
                        <img
                           src="https://upload.wikimedia.org/wikipedia/id/thumb/2/2e/Music_of_the_Spheres_World_Tour_Poster.jpeg/440px-Music_of_the_Spheres_World_Tour_Poster.jpeg"
                           alt=""
                           className="border rounded-md w-full h-[230px]"
                        />
                     </div>
                     <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                           <p className="font-semibold text-lg">
                              {moment(item.date)
                                 .locale("id")
                                 .format("D MMMM II YYYY")}
                           </p>
                        </div>
                        <p className="text-sm font-semibold">{item.title}</p>
                     </div>
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
