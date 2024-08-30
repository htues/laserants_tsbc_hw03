import { Collection } from "@prisma/client";
import * as collectionRepository from "../repositories/collectionRepository";

type CreateUpdateCollection = Omit<Collection, "id">;

export const getCollections = async (): Promise<Collection[]> => {
  return collectionRepository.getCollections();
};

export const getCollectionById = async (id: number): Promise<Collection | null> => {
  return collectionRepository.getCollectionById(id);
};

export const createCollection = async (collection: CreateUpdateCollection): Promise<Collection> => {
  return collectionRepository.createCollection(collection);
};

export const updateCollection = async (
  id: number,
  collection: CreateUpdateCollection,
): Promise<Collection | null> => {
  return collectionRepository.updateCollection(id, collection);
};

export const deleteCollection = async (id: number): Promise<Collection | null> => {
  return collectionRepository.deleteCollection(id);
};