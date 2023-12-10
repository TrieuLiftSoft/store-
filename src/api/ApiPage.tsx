import {
  CardAppProps,
  InitItemProducts,
  InitProducts,
} from "../model/InitProducts";
import apiClient from "./ApiClient";

export const getProductsAPI = (): Promise<CardAppProps> => {
  return apiClient.get("/products");
};
export const createProductAPI = (
  data: InitItemProducts,
): Promise<CardAppProps> => {
  return apiClient.post("/products/add", data);
};

export const getItemAPI = (itemID: number): Promise<InitProducts> => {
  return apiClient.get(`/products/${itemID}`);
};

export const editProductAPI = (
  itemID: number,
  data: InitItemProducts,
): Promise<InitProducts> => {
  return apiClient.put(`/posts/${itemID}`, data);
};

export const getPaginationAPI = (limit: number, skip: number) => {
  return apiClient.get(
    `/products?limit=${limit}&skip=${skip}&select=title,price`,
  );
};

export const deleteItemAPI = (itemID: number) => {
  return apiClient.delete(`/products/${itemID}`);
};
