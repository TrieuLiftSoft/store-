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
export interface InitCreateProducts {
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
  limit: number;
  products: InitProducts[];
  skip: number;
  total: number;
}
export interface CardAppProps {
  data: dataProducts[];
}
