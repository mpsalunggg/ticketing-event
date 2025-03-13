import { create } from "zustand";

interface sidebarStore {
   isOpen: boolean;
   openSidebar: () => void;
   closeSidebar: () => void;
   title: string;
   setTitle: (title: string) => void;
}

export const useSidebarStore = create<sidebarStore>((set) => ({
   isOpen: true,
   openSidebar: () => set({ isOpen: true }),
   closeSidebar: () => set({ isOpen: false }),
   title: "Home",
   setTitle: (title) => set({ title }),
}));
