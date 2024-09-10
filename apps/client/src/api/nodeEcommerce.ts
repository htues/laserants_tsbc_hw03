import axios from 'axios'
import { BACKEND_URL } from '../components/utils/envvars'
import { CategoryResponse } from '../types/category.types'

const instance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
})

export const productsOps = {
  async getCategories(): Promise<CategoryResponse> {
    const response = await instance.get(`${BACKEND_URL}/categories/categories`);
    return response.data as CategoryResponse;
  },
  async getProducts() {
    const response = await instance.get(`${BACKEND_URL}/products/products`);
    return response.data;
  },
};