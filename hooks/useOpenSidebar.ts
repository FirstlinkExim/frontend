import { create } from "zustand";

interface OpenSidebarStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useOpenSidebar = create<OpenSidebarStore>((set) => ({
  isOpen: true,
  onOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  onClose: () => set({ isOpen: false }),
}));

export default useOpenSidebar;
