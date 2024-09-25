import prisma from '../prismaClient.js';
import { Role } from '@prisma/client';

type CreateUpdateRole = Omit<Role, 'id'>;

export const getRoles = async (): Promise<Role[]> => {
  return prisma.role.findMany();
};

export const getRoleById = async (id: number): Promise<Role | null> => {
  return prisma.role.findUnique({
    where: {
      id,
    },
  });
}

export const createRole = async (role: CreateUpdateRole): Promise<Role> => {
  return prisma.role.create({
    data: role,
  });
}

export const updateRole = async (id: number, role: CreateUpdateRole): Promise<Role | null> => {
  return prisma.role.update({
    where: {
      id,
    },
    data: role,
  });
}

export const deleteRole = async (id: number): Promise<Role | null> => {
  return prisma.role.delete({
    where: {
      id,
    },
  });
}

