import {Request, Response} from 'express';
import * as roleService from '../services/roleService.js';

export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await roleService.getRoles();
    res.status(200).json(roles);
  } catch (error: unknown) {
    console.error('Error getting roles:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await roleService.getRoleById(id);
    res.status(200).json(role);
  } catch (error: unknown) {
    console.error('Error getting role by id:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const createRole = async (req: Request, res: Response) => {
  try {
    const role = await roleService.createRole(req.body);
    res.status(201).json(role);
  } catch (error: unknown) {
    console.error('Error creating role:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const updateRole = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await roleService.updateRole(id, req.body);
    res.status(200).json(role);
  } catch (error: unknown) {
    console.error('Error updating role:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const deleteRole = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const role = await roleService.deleteRole(id);
    res.status(200).json(role);
  } catch (error: unknown) {
    console.error('Error deleting role:', error);
    res.status(500).send('An unexpected error occurred');
  }
};
