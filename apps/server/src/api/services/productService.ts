import { Product } from "@prisma/client";
import * as productRepository from "../repositories/productRepository";

type CreateUpdateProduct = Omit<Product, "id">;

export const getProducts = async (catId: number) => {
  return productRepository.getProducts(catId);
};

export const getProductById = async (id: number) => {
  return productRepository.getProductById(id);
};

export const createProduct = async (product: CreateUpdateProduct) => {
  return productRepository.createProduct(product);
};

export const updateProduct = async (id: number, product: CreateUpdateProduct) => {
  return productRepository.updateProduct(id, product);
};

export const deleteProduct = async (id: number) => {
  return productRepository.deleteProduct(id);
};