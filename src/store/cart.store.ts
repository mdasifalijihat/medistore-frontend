import { create } from "zustand";
import { CartItem } from "@/shop";

interface CartState {
  items: CartItem[];
  totalCount: number;
  setCart: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  clearCart: () => void;
}

interface CartStore {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalCount: 0,

  setCart: (items) =>
    set({
      items,
      totalCount: items.reduce((sum, item) => sum + item.quantity, 0),
    }),

  addItem: (newItem) => {
    const existing = get().items.find(
      (i) => i.medicineId === newItem.medicineId,
    );

    let updatedItems;

    if (existing) {
      updatedItems = get().items.map((item) =>
        item.medicineId === newItem.medicineId
          ? { ...item, quantity: item.quantity + newItem.quantity }
          : item,
      );
    } else {
      updatedItems = [...get().items, newItem];
    }

    set({
      items: updatedItems,
      totalCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
    });
  },

  clearCart: () => set({ items: [], totalCount: 0 }),
}));
