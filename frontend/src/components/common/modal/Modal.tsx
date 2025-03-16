import { ErrorIcon, SuccessIcon, WarningIcon } from "@/components/icon";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/stores";
import React from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
   title?: string | React.ReactNode;
   children?: React.ReactNode;
   footer?: React.ReactNode;
   contentClass?: string;
   childClass?: string;
   status?: "success" | "warning" | "error";
}

const STATUS_ICON = {
   success: <SuccessIcon />,
   warning: <WarningIcon />,
   error: <ErrorIcon />,
};

const                                                                                                                                                                                                                                                                                                                                                                                                                                           Modal: React.FC<ModalProps> = (props) => {
   const { isOpen, closeModal, status, title, message } = useModalStore();

   const displayStatus = props.status || status;
   const displayTitle = props.title || title;

   return (
      <div>
         <Dialog open={isOpen} onOpenChange={closeModal}>
            <DialogContent
               className={`sm:max-w-[425px] p-0 m-0 ${props.contentClass}`}
            >
               <DialogHeader className="rounded-t-lg pt-4">
                  {displayStatus && (
                     <div className="px-6 py-3">
                        {STATUS_ICON[displayStatus]}
                     </div>
                  )}
                  <DialogTitle className="px-6 lg:text-3xl text-xl">{displayTitle}</DialogTitle>
               </DialogHeader>

               <div className={`px-6 py-2 ${props.childClass}`}>
                  {props.children || message}
               </div>

               {props.footer ? (
                  <DialogFooter className="py-4 border-t-border border-[1px] rounded-b-lg">
                     <div className="px-6 w-full">{props.footer}</div>
                  </DialogFooter>
               ) : (
                  displayStatus && (
                     <DialogFooter className="pb-4 rounded-b-lg">
                        <div className="px-6 w-full flex justify-end">
                           <Button onClick={closeModal} variant="outline" className="w-full">
                              OK
                           </Button>
                        </div>
                     </DialogFooter>
                  )
               )}
            </DialogContent>
         </Dialog>
      </div>
   );
};

export default Modal;
