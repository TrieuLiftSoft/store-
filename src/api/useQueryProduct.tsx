import { useQuery, UseQueryResult } from "react-query";
import { editProductAPI, productAllAPI } from "./ApiPage";
import { handleError } from "../helpers/HandleError";
import { CardAppProps, InitProducts } from "../model/InitProducts";

const fetchProductsAll = async () => {
  try {
    const response = await productAllAPI();
    return response;
  } catch (error) {
    handleError(error);
  }
};
export const useProductsAllQuery = () => {
  return useQuery({
    queryKey: ["ProductsAll"],
    queryFn: fetchProductsAll,
  }) as UseQueryResult<CardAppProps, Error>;
};
