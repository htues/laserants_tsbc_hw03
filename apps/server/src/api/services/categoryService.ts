import { Category } from '@prisma/client'
import * as categoryRepository from '../repositories/categoryRepository.js'

type CreateUpdateCategory = Omit<Category, 'id'>

export const getCategories = async () => {
  return categoryRepository.getCategories()
}

export const getCategoryById = async (id: number) => {
    return categoryRepository.getCategoryById(id)
    }

export const createCategory = async (line: CreateUpdateCategory) => {
    return categoryRepository.createCategory(line)
}

export const updateCategory = async (id: number, category: CreateUpdateCategory) => {
    return categoryRepository.updateCategory(id, category)
}

export const deleteCategory = async (id: number) => {
    return categoryRepository.deleteCategory(id)
}
