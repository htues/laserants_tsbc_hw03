import {Request, Response} from 'express';
import * as categoryService from '../services/categoryService';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    res.status(200).json(categories);
  } catch (error: unknown) {
    console.error('Error getting categories:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const category = await categoryService.getCategoryById(id);
    res.status(200).json(category);
  } catch (error: unknown) {
    console.error('Error getting category by id:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  } catch (error: unknown) {
    console.error('Error creating category:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const category = await categoryService.updateCategory(id, req.body);
    res.status(200).json(category);
  } catch (error: unknown) {
    console.error('Error updating category:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const category = await categoryService.deleteCategory(id);
    res.status(200).json(category);
  } catch (error: unknown) {
    console.error('Error deleting category:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

