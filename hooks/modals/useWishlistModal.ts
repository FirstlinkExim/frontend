import { create } from "zustand";

interface WishlistModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useWishlistModal = create<WishlistModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useWishlistModal;
