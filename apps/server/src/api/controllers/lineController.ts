import {Request, Response} from 'express';
import * as lineService from '../services/lineService';

export const getLines = async (req: Request, res: Response) => {
  try {
    const lines = await lineService.getLines();
    res.status(200).json(lines);
  } catch (error: unknown) {
    console.error('Error getting lines:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const getLineById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const line = await lineService.getLineById(id);
    res.status(200).json(line);
  } catch (error: unknown) {
    console.error('Error getting line by id:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const createLine = async (req: Request, res: Response) => {
  try {
    const line = await lineService.createLine(req.body);
    res.status(201).json(line);
  } catch (error: unknown) {
    console.error('Error creating line:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const updateLine = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const line = await lineService.updateLine(id, req.body);
    res.status(200).json(line);
  } catch (error: unknown) {
    console.error('Error updating line:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const deleteLine = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const line = await lineService.deleteLine(id);
    res.status(200).json(line);
  } catch (error: unknown) {
    console.error('Error deleting line:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

