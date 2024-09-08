type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }
  
  export type ProductCardTypes = {
    product: Product;
    onDetailsClick: (product: Product) => void;
  }