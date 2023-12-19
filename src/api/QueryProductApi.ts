import { useQuery, UseQueryResult } from "react-query";
import { ICardAppProps, IPagination, IProducts } from "../model/InitProducts";
import {
  fetchEditProducts,
  fetchPaginationAPI,
  fetchProducts,
} from "./ProductApi";

export const useQueryProducts = () => {
  return useQuery({
    queryKey: ["productsAll"],
    queryFn: fetchProducts,
    staleTime: 30000,
  }) as UseQueryResult<ICardAppProps, Error>;
};

export const useQueryPagination = (
  limit: number,
  skip: number,
): UseQueryResult<IPagination, Error> => {
  return useQuery({
    queryKey: ["paginationData", limit, skip],
    queryFn: () => fetchPaginationAPI(limit, skip),
    keepPreviousData: true,
  });
};

export const useQueryEdit = (id?: number): UseQueryResult<IProducts, Error> => {
  return useQuery({
    enabled: id !== undefined,
    queryKey: ["editProduct", id],
    queryFn: () => fetchEditProducts(id),
    staleTime: 30000,
  });
};
