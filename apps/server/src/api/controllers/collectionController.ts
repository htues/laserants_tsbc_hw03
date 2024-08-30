import {Request, Response} from 'express';
import * as collectionService from '../services/collectionService';

export const getCollections = async (req: Request, res: Response) => {
  try {
    const collections = await collectionService.getCollections();
    res.status(200).json(collections);
  } catch (error: unknown) {
    console.error('Error getting collections:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const getCollectionById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const collection = await collectionService.getCollectionById(id);
    res.status(200).json(collection);
  } catch (error: unknown) {
    console.error('Error getting collection by id:', error);
    res.status(500).send('An unexpected error occurred');
  }
}; 

export const createCollection = async (req: Request, res: Response) => {
  try {
    const collection = await collectionService.createCollection(req.body);
    res.status(201).json(collection);
  } catch (error: unknown) {
    console.error('Error creating collection:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const updateCollection = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const collection = await collectionService.updateCollection(id, req.body);
    res.status(200).json(collection);
  } catch (error: unknown) {
    console.error('Error updating collection:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const deleteCollection = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const collection = await collectionService.deleteCollection(id);
    res.status(200).json(collection);
  } catch (error: unknown) {
    console.error('Error deleting collection:', error);
    res.status(500).send('An unexpected error occurred');
  }
};
