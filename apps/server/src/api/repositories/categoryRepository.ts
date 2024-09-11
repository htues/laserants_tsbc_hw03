import prisma from '../prismaClient'
import { Category } from '@prisma/client'

type CreateUpdateCategory = Omit<Category, 'id'>

export const getCategories = async (): Promise<Category[]> => {
  return prisma.category.findMany()
}

export const getCategoryById = async (id: number): Promise<Category | null> => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  })
}

export const createCategory = async (category: CreateUpdateCategory): Promise<Category> => {
  return prisma.category.create({
    data: category,
  })
}

export const updateCategory = async (
  id: number,
  category: CreateUpdateCategory,
): Promise<Category | null> => {
  return prisma.category.update({
    where: {
      id,
    },
    data: category,
  })
}

export const deleteCategory = async (id: number): Promise<Category | null> => {
  return prisma.category.delete({
    where: {
      id,
    },
  })
}
