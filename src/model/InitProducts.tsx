export interface IProducts {
  brand?: string;
  category?: string;
  description?: string;
  discountPercentage?: number;
  id: number;
  images: string[];
  price: number;
  rating?: number;
  stock?: number;
  thumbnail?: string;
  title?: string;
}
export interface IProductsItemOption {
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
export interface IDataProducts {
  limit?: number;
  products?: IProducts[];
  skip?: number;
  total?: number;
}
export interface ICardAppProps {
  products: IProducts[];
  data: IDataProducts[];
}

export interface IPagination {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
}
