import { create } from "zustand";

interface NotLoggedInModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  title: string;
  setTitle: (title: string) => void;
}
const useNotLoggedInModal = create<NotLoggedInModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  title: "",
  setTitle: (title: string) => set({ title }),
}));

export default useNotLoggedInModal;
