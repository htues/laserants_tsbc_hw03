import {Request, Response} from 'express';
import * as variantService from '../services/variantService';

export const getVariants = async (req: Request, res: Response) => {
  try {
    const variants = await variantService.getVariants();
    res.status(200).json(variants);
  } catch (error: unknown) {
    console.error('Error getting variants:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const getVariantById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const variant = await variantService.getVariantById(id);
    res.status(200).json(variant);
  } catch (error: unknown) {
    console.error('Error getting variant by id:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const createVariant = async (req: Request, res: Response) => {
  try {
    const variant = await variantService.createVariant(req.body);
    res.status(201).json(variant);
  } catch (error: unknown) {
    console.error('Error creating variant:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const updateVariant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const variant = await variantService.updateVariant(id, req.body);
    res.status(200).json(variant);
  } catch (error: unknown) {
    console.error('Error updating variant:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const deleteVariant = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const variant = await variantService.deleteVariant(id);
    res.status(200).json(variant);
  } catch (error: unknown) {
    console.error('Error deleting variant:', error);
    res.status(500).send('An unexpected error occurred');
  }
};