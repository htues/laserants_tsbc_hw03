import { Variant } from "@prisma/client";
import * as variantRepository from "../repositories/variantRepository";

type CreateUpdateVariant = Omit<Variant, "id">;

export const getVariants = async (): Promise<Variant[]> => {
  return variantRepository.getVariants();
};

export const getVariantById = async (id: number): Promise<Variant | null> => {
  return variantRepository.getVariantById(id);
};

export const createVariant = async (variant: CreateUpdateVariant): Promise<Variant> => {
  return variantRepository.createVariant(variant);
};

export const updateVariant = async (
  id: number,
  variant: CreateUpdateVariant,
): Promise<Variant | null> => {
  return variantRepository.updateVariant(id, variant);
};

export const deleteVariant = async (id: number): Promise<Variant | null> => {
  return variantRepository.deleteVariant(id);
};