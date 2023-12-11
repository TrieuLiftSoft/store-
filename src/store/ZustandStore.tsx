// itemStore.ts
import { create } from "zustand";
import { CartItem, CartStore } from "../model/InitStore";
import produce from "immer";

const useStoreProduct: any = create<CartStore>((set) => ({
  cart: [],
  deleteToCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter(
        (item: CartItem) => item.product.id !== productId && item.quantity > 0,
      ),
    })),
  addToCart: (product, quantity) =>
    set(
      produce((state) => {
        const existingItem = state.cart.find(
          (item: CartItem) => item.product.id === product.id,
        );
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          state.cart.push({ product, quantity });
        }
      }),
    ),
  getQuantity: (productId) => {
    const item: CartItem = useStoreProduct
      .getState()
      .cart.find((cartItem: CartItem) => cartItem.product.id === productId);
    return item ? item.quantity : 0;
  },
  getTotalQuantity: () =>
    useStoreProduct
      .getState()
      .cart.reduce((total: number, item: CartItem) => total + item.quantity, 0),
  getTotalPrice: () =>
    useStoreProduct
      .getState()
      .cart.reduce(
        (total: number, item: CartItem) =>
          total + item.quantity * item.product.price,
        0,
      ),
}));

export default useStoreProduct;
