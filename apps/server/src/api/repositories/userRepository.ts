import prisma from '../prismaClient.js'
import { User } from '@prisma/client'

type CreateUpdateUser = Omit<User, 'id' | 'roleId'> & { role?: { connect: { id: number } } };

export const getUsers = async (): Promise<User[]> => {
  return prisma.user.findMany({
    include: {
      role: true,
    },
  })
}

export const getUserById = async (id: number): Promise<User | null> => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      role: true,
    },
  })
}

export const createUser = async (user: CreateUpdateUser): Promise<User> => {
    const defaultRole = await prisma.role.findUnique({ where: { name: 'user' } });
    if (!defaultRole) {
      throw new Error('Default role "user" not found');
    }
  
    return prisma.user.create({
      data: {
        ...user,
        status: false,
        role: { connect: { id: defaultRole.id } },
      },
    });
  };

export const updateUser = async (
  id: number,
  user: CreateUpdateUser,
): Promise<User | null> => {
  return prisma.user.update({
    where: {
      id,
    },
    data: user,
  })
}

export const activateUser = async (
    id: number,
    status: boolean,
    roleId: number,
  ): Promise<User | null> => {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        status,
        role: { connect: { id: roleId } },
      },
    });
  };

  export const updateUserStatus = async (
    id: number,
    status: boolean,
  ): Promise<User | null> => {
    return prisma.user.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  };  

export const deleteUser = async (id: number): Promise<User | null> => {
  return prisma.user.delete({
    where: {
      id,
    },
  })
}
