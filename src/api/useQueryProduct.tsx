import { useQuery, UseQueryResult } from "react-query";
import { getPaginationAPI, getProductsAPI } from "./ApiPage";
import { handleError } from "../helpers/HandleError";
import { CardAppProps, InitPagination } from "../model/InitProducts";

const fetchProducts = async () => {
  try {
    const response = await getProductsAPI();
    return response;
  } catch (error) {
    handleError(error);
  }
};
export const useQueryProducts = () => {
  return useQuery({
    queryKey: ["ProductsAll"],
    queryFn: fetchProducts,
  }) as UseQueryResult<CardAppProps, Error>;
};

const fetchPaginationAPI = async (limit: number, skip: any) => {
  try {
    const response = await getPaginationAPI(limit, skip);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const useQueryPagination = (
  limit: number,
  skip: number,
): UseQueryResult<InitPagination, Error> => {
  return useQuery(["PaginationData", limit, skip], () =>
    fetchPaginationAPI(limit, skip),
  );
};
