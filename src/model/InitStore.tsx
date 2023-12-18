import { IProducts } from "./InitProducts";

export interface MyStore {
  isSuccess: boolean;
  setSuccessTrue: () => void;
  setSuccessFalse: () => void;
}
export interface ICartItem {
  product: IProducts;
  quantity: number;
}

export interface ICartStore {
  cart: Array<ICartItem>;
  action: {
    deleteToCart: (productId: number) => void;
    addToCart: (product: IProducts, quantity: number) => void;
    getQuantity: (productId: number) => number;
    getTotalQuantity: () => number;
    getTotalPrice: () => number;
  };
}
