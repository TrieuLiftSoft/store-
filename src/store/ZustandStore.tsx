// itemStore.ts
import { create } from "zustand";
import { ICartItem, ICartStore } from "../model/InitStore";
import produce from "immer";

export const storeProduct: any = create<ICartStore>()((set) => ({
  cart: [],
  action: {
    deleteToCart: (productId) =>
      set((state) => ({
        cart: state.cart.filter(
          (item: ICartItem) =>
            item.product.id !== productId && item.quantity > 0,
        ),
      })),
    addToCart: (product, quantity) =>
      set(
        produce((state) => {
          const existingItem = state.cart.find(
            (item: ICartItem) => item.product.id === product.id,
          );
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            state.cart.push({ product, quantity });
          }
        }),
      ),
    getQuantity: (productId) => {
      const item: ICartItem = storeProduct
        .getState()
        .cart.find(
          (ICartItem: ICartItem) => ICartItem.product.id === productId,
        );
      return item ? item.quantity : 0;
    },
    getTotalQuantity: () =>
      storeProduct
        .getState()
        .cart.reduce(
          (total: number, item: ICartItem) => total + item.quantity,
          0,
        ),
    getTotalPrice: () =>
      storeProduct
        .getState()
        .cart.reduce(
          (total: number, item: ICartItem) =>
            total + item.quantity * item.product.price,
          0,
        ),
  },
}));

export const useInitActions = () => storeProduct((state: ICartStore) => state.action);
