import {
  CardAppProps,
  InitCreateProducts,
  InitProducts,
} from "../model/InitProducts";
import apiClient from "./ApiClient";

export const productAllAPI = (): Promise<CardAppProps> => {
  return apiClient.get("/products");
};
export const createProductAPI = (
  data: InitCreateProducts,
): Promise<CardAppProps> => {
  return apiClient.post("/products/add", data);
};

export const getProductItemIdAPI = (itemID: number): Promise<InitProducts> => {
  return apiClient.get(`/products/${itemID}`);
};

export const editProductAPI = (
  itemID: number,
  data: InitCreateProducts,
): Promise<InitProducts> => {
  return apiClient.put(`/products/${itemID}`, data);
};
