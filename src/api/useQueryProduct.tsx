import { useQuery, UseQueryResult } from "react-query";
import { CardAppProps, InitPagination } from "../model/InitProducts";
import { fetchPaginationAPI, fetchProducts } from "./ProductApi";

export const useQueryProducts = () => {
  return useQuery({
    queryKey: ["productsAll"],
    queryFn: fetchProducts,
  }) as UseQueryResult<CardAppProps, Error>;
};

export const useQueryPagination = (
  limit: number,
  skip: number,
): UseQueryResult<InitPagination, Error> => {
  return useQuery(["paginationData", limit, skip], () =>
    fetchPaginationAPI(limit, skip),
  );
};
