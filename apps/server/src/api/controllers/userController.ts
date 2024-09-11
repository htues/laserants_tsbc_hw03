import {Request, Response} from 'express';
import * as userService from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error: unknown) {
    console.error('Error getting users:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);
    res.status(200).json(user);
  } catch (error: unknown) {
    console.error('Error getting user by id:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.updateUser(id, req.body);
    res.status(200).json(user);
  } catch (error: unknown) {
    console.error('Error updating user:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const activateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const status = req.body.status;
    const roleId = req.body.roleId;
    const user = await userService.activateUser(id, status, roleId);
    res.status(200).json(user);
  } catch (error: unknown) {
    console.error('Error activating user:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const status = req.body.status;
    const user = await userService.updateUserStatus(id, status);
    res.status(200).json(user);
  } catch (error: unknown) {
    console.error('Error updating user status:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    const user = await userService.deleteUser(id);
    res.status(200).json(user);
  } catch (error: unknown) {
    console.error('Error deleting user:', error);
    res.status(500).send('An unexpected error occurred');
  }
};