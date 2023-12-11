import {
  deleteItemAPI,
  getItemAPI,
  getPaginationAPI,
  getProductsAPI,
} from "./ApiPage";
import { handleError } from "../helpers/HandleError";

export const fetchProducts = async () => {
  try {
    const response = await getProductsAPI();
    return response;
  } catch (error) {
    handleError(error);
  }
};
export const fetchPaginationAPI = async (limit: number, skip: any) => {
  try {
    const response = await getPaginationAPI(limit, skip);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const fetchDeleteProducts = async (itemId: number) => {
  try {
    const response = await deleteItemAPI(itemId);
    console.log("delete success");
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const fetchEditProducts = async (id?: number) => {
  try {
    if (id !== undefined) {
      const response = await getItemAPI(id);
      return response;
    }
  } catch (error) {
    handleError(error);
  }
};
