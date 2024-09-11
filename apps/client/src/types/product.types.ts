import { Category } from './category.types';

export type Product = {
    id: number;
    name: string | null;
    description: string | null;
    price: number;
    status: boolean;
    imageUrl: string;
    categoryId: number;
    category?: Category;
  }
  
  export type ProductCardTypes = {
    product: Product;
    onDetailsClick: (product: Product) => void;
  }

  export type ProductResponse = {
    httpStatusCode: number;
    product?: Product;
    products?: Product[];
  }

  export type ProductState = {
    products: Product[];
    product: Product | null;
    loading: boolean;
    status: 'idle' | 'loading' | 'fulfilled' | 'rejected';
    error: string | null;
    searchQuery: string;
  }

  export type ApiError = {
    response: {
      data: {
        message: string;
      };
    };
  }