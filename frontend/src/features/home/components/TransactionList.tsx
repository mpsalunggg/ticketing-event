import { Modal } from "@/components/common/modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/stores";
import { Printer } from "lucide-react";
import { Fragment } from "react";

const TransactionList = () => {
   const { data: dataTransaction } = useModalStore();

   return (
      <Fragment>
         <Modal
            title="Tiketku"
            contentClass="lg:min-w-[700px] max-w-[700px] max-h-[90%] flex flex-col"
         >
            <div className="flex-1 overflow-y-auto mb-4">
               {dataTransaction?.length > 0 ? (
                  dataTransaction.map((item: Record<string, any>) => (
                     <div
                        key={item.name}
                        className="border p-4 rounded-lg shadow-sm flex flex-col gap-1 mb-3"
                     >
                        <div className="flex items-center justify-between">
                           <p className="text-sm text-gray-500">
                              ID Ticket: {item.name}
                           </p>
                           <div className="flex items-center gap-1">
                              {item.status === "Paid" && (
                                 <Badge
                                    className="px-2 py-[6px] rounded-md text-white cursor-pointer hover:bg-gray-600"
                                    onClick={() =>
                                       window.open(
                                          `/api/method/frappe.utils.print_format.download_pdf?doctype=Event%20Transaction&name=${item.name}&format=Invoice%20Transaction%20Event&no_letterhead=1&letterhead=No%20Letterhead&settings=%7B%7D&_lang=en`,
                                          "_blank",
                                       )
                                    }
                                 >
                                    <Printer className="h-full text-[20px]" />
                                 </Badge>
                              )}
                              <Badge
                                 className={`px-2 py-1 rounded-md text-white ${
                                    item.status === "Booked"
                                       ? "bg-yellow-500"
                                       : item.status === "Paid"
                                         ? "bg-green-500"
                                         : "bg-red-500"
                                 }`}
                              >
                                 <span>{item.status}</span>
                              </Badge>
                           </div>
                        </div>
                        <p className="text-lg font-semibold">{item.event}</p>
                        <p className="text-sm">Jumlah Tiket: {item.quantity}</p>
                        <p className="text-sm">
                           Total: Rp {item.amount.toLocaleString()}
                        </p>
                        {item.status === "Booked" && (
                           <div className="space-x-1">
                              <Button className="cursor-pointer" size="sm">
                                 Pay Now
                              </Button>
                              <Button
                                 variant="destructive"
                                 className="cursor-pointer"
                                 size="sm"
                              >
                                 Cancelled
                              </Button>
                           </div>
                        )}
                     </div>
                  ))
               ) : (
                  <p className="text-center text-gray-500">
                     Tidak ada transaksi
                  </p>
               )}
            </div>
         </Modal>
      </Fragment>
   );
};

export default TransactionList;
