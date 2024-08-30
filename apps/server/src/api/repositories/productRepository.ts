import prisma from '../prismaClient';
import { Product } from '@prisma/client';

type CreateUpdateProduct = Omit<Product, 'id'>;

export const getProducts = async (): Promise<Product[]> => {
  return prisma.product.findMany({
    include: {
      category: true,
    },
  });
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
};

export const createProduct = async (
  product: CreateUpdateProduct,
): Promise<Product> => {
  return prisma.product.create({
    data: product,
  });
};

export const updateProduct = async (
  id: number,
  product: CreateUpdateProduct,
): Promise<Product | null> => {
  return prisma.product.update({
    where: {
      id,
    },
    data: product,
  });
};

export const deleteProduct = async (id: number): Promise<Product | null> => {
  return prisma.product.delete({
    where: {
      id,
    },
  });
};