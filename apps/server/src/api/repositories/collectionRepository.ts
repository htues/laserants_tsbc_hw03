import prisma from '../prismaClient'
import { Collection } from '@prisma/client'

type CreateUpdateCollection = Omit<Collection, 'id'>;

export const getCollections = async (): Promise<Collection[]> => {
  return prisma.collection.findMany({
    include: {
      variant: true,
    },
  });
}

export const getCollectionById = async (id: number): Promise<Collection | null> => {
  return prisma.collection.findUnique({
    where: {
      id,
    },
    include: {
      variant: true,
    },
  });
}

export const createCollection = async (collection: CreateUpdateCollection): Promise<Collection> => {
  return prisma.collection.create({
    data: collection,
  });
}

export const updateCollection = async (
  id: number,
  collection: CreateUpdateCollection,
): Promise<Collection | null> => {
  return prisma.collection.update({
    where: {
      id,
    },
    data: collection,
  });
}

export const deleteCollection = async (id: number): Promise<Collection | null> => {
  return prisma.collection.delete({
    where: {
      id,
    },
  });
}