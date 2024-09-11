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
  async getProducts(): Promise<Product[]> {
    const response = await instance.get(`${BACKEND_URL}/products/products`);
    return response.data as Product[];
  },
};