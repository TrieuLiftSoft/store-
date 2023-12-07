// itemStore.ts
import create from "zustand";

interface Item {
  id: number;
  name: string;
}

interface ItemStore {
  items: Item[];
  addItem: (item: Item) => void;
  getItemQuantity: (itemId: number) => number;
  getTotalQuantity: () => number;
}

const useItemStore: any = create<ItemStore>((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  getItemQuantity: (itemId) =>
    useItemStore
      .getState()
      .items.reduce(
        (sum: number, item: any) => (item.id === itemId ? sum + 1 : sum),
        0,
      ),
  getTotalQuantity: () => useItemStore.getState().items.length,
}));
console.log(useItemStore);

export default useItemStore;
