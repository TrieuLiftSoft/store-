import { Pagination } from "@nextui-org/react";
export interface InitProducts {
  brand?: string;
  category?: string;
  description?: string;
  discountPercentage?: number;
  id?: number;
  images: string[];
  price?: number;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  title?: string;
}
export interface InitItemProducts {
  brand?: string;
  category?: string;
  description?: string;
  discountPercentage?: number;
  id?: number;
  price?: number;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  title?: string;
}
export interface dataProducts {
  limit?: number;
  products?: InitProducts[];
  skip?: number;
  total?: number;
}
export interface CardAppProps {
  products: InitProducts[];
  data: dataProducts[];
}

export interface InitProductsPagination {
  id: number;
  title: string;
  price: number;
}
export interface InitPagination {
  products: InitProductsPagination[];
  total: number;
  skip: number;
  limit: number;
}
