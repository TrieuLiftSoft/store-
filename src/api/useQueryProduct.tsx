import { useQuery, UseQueryResult } from "react-query";
import {
  CardAppProps,
  InitPagination,
  InitProducts,
} from "../model/InitProducts";
import {
  fetchEditProducts,
  fetchPaginationAPI,
  fetchProducts,
} from "./ProductApi";

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
  return useQuery({
    queryKey: ["paginationData", limit, skip],
    queryFn: () => fetchPaginationAPI(limit, skip),
  });
};

export const useQueryEdit = (
  id?: number,
): UseQueryResult<InitProducts, Error> => {
  return useQuery({
    enabled: id !== undefined,
    queryKey: ["editProduct", id],
    queryFn: () => fetchEditProducts(id),
  });
};
