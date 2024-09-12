import axios from 'axios'
import { BACKEND_URL } from '../components/utils/envvars'
import { Category } from '../types/category.types'
import { Product } from '../types/product.types'

const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})

export const productsOps = {
  async getCategories(): Promise<Category[]> {
    const response = await instance.get(`${BACKEND_URL}/categories/categories`);
    return response.data as Category[];
  },
  async getProducts(categoryId?: number): Promise<Product[]> {
    const url = categoryId !== undefined ? `${BACKEND_URL}/products/products/${categoryId}` : `${BACKEND_URL}/products/products`;
    const response = await instance.get(url);
    return response.data as Product[];
  }
};