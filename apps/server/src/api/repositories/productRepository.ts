import prisma from '../prismaClient.js';
import { Product } from '@prisma/client';

type CreateUpdateProduct = Omit<Product, 'id'>;

export const getProducts = async (categoryId?: number): Promise<Product[]> => {
  const query: any = {
    include: {
      category: true,
    },
  };

  if (categoryId !== undefined && categoryId !== null && categoryId > 0) {
    query.where = {
      categoryId: categoryId,
    };
  }

  return prisma.product.findMany(query);
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
