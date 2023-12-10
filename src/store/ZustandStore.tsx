// itemStore.ts
import { create } from "zustand";

interface Item {
  id: number;
  name: string;
}

interface ItemStore {
  items: Item[];
  addItem: (name: string) => void;
}

const useItemStore: any = create<ItemStore>((set) => ({
  items: [],

  addItem: (name) => {
    const id = Date.now();
    const newItem: Item = { id, name };
    set((state) => ({ items: [...state.items, newItem] }));
  },
}));

export default useItemStore;
