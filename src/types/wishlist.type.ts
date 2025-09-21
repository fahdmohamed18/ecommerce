import { Product } from './product.type';

export interface WishListResponse {
  status: string;
  count: number;
  data: Product[];
}

export interface WishListActionResponse {
  status: string;
  message: string;
  data?: Product;
}

