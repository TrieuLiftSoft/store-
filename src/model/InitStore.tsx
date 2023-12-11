import { InitProducts } from "./InitProducts";

export interface MyStore {
  isSuccess: boolean;
  setSuccessTrue: () => void;
  setSuccessFalse: () => void;
}
export interface CartItem {
  product: InitProducts;
  quantity: number;
}

export interface CartStore {
  cart: Array<CartItem>;
  deleteToCart: (productId: number) => void;
  addToCart: (product: InitProducts, quantity: number) => void;
  getQuantity: (productId: number) => number;
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
}
