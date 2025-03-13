// src/stores/useModalStore.ts
// import { create } from "zustand";

// type ModalStatus = "success" | "warning" | "error" | null;

// interface ModalStore {
//    isOpen: boolean;
//    modalType: string | null;
//    status: ModalStatus;
//    title: string;
//    data: any;
//    message: string;
//    openModal: (
//       type: string,
//       status?: ModalStatus,
//       title?: string,
//       message?: string,
//    ) => void;
//    closeModal: () => void;
// }

// export const useModalStore = create<ModalStore>((set) => ({
//    isOpen: false,
//    modalType: null,
//    status: null,
//    title: "",
//    message: "",
//    data: null,
//    openModal: ({
//       type,
//       status = null,
//       title = "",
//       message = "",
//       data = null,
//    }) =>
//       set({
//          isOpen: true,
//          modalType: type,
//          status,
//          title,
//          message,
//          data,
//       }),
//    closeModal: () =>
//       set({
//          isOpen: false,
//          modalType: null,
//          status: null,
//          title: "",
//          message: "",
//          data: null,
//       }),
// }));

import { create } from "zustand";

type ModalStatus = "success" | "warning" | "error" | null;

interface ModalStore {
   isOpen: boolean;
   modalType: string | null;
   status: ModalStatus;
   title: string;
   data: any;
   message: string;
   openModal: (params: {
      type: string;
      status?: ModalStatus;
      title?: string;
      message?: string;
      data?: any;
   }) => void;
   closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
   isOpen: false,
   modalType: null,
   status: null,
   title: "",
   message: "",
   data: null,
   openModal: ({
      type,
      status = null,
      title = "",
      message = "",
      data = null,
   }) =>
      set({
         isOpen: true,
         modalType: type,
         status,
         title,
         message,
         data,
      }),
   closeModal: () =>
      set({
         isOpen: false,
         modalType: null,
         status: null,
         title: "",
         message: "",
         data: null,
      }),
}));
