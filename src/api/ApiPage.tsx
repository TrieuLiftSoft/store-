import {
  ICardAppProps,
  IProductsItemOption,
  IProducts,
} from "../model/InitProducts";
import apiClient from "./ApiClient";

export const getProductsAPI = (): Promise<ICardAppProps> => {
  return apiClient.get("/products");
};
export const createProductAPI = (
  data: IProductsItemOption,
): Promise<ICardAppProps> => {
  return apiClient.post("/products/add", data);
};

export const getItemAPI = (itemID: number): Promise<IProducts> => {
  return apiClient.get(`/products/${itemID}`);
};

export const editProductAPI = (
  itemID: number,
  data: IProductsItemOption,
): Promise<IProducts> => {
  return apiClient.put(`/posts/${itemID}`, data);
};

export const getPaginationAPI = (limit: number, skip: number) => {
  return apiClient.get(
    `/products?limit=${limit}&skip=${skip}&select=title,price,description,discountPercentage,rating,stock,brand,category,thumbnail,images`,
  );
};

export const deleteItemAPI = (itemID: number) => {
  return apiClient.delete(`/products/${itemID}`);
};
