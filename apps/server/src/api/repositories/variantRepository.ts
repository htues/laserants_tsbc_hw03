import prisma from "../prismaClient";
import { Variant } from "@prisma/client";

type CreateUpdateVariant = Omit<Variant, "id">;

export const getVariants = async (): Promise<Variant[]> => {
  return prisma.variant.findMany({
    include: {
        product: true,
    }
  });
};

export const getVariantById = async (id: number): Promise<Variant | null> => {
  return prisma.variant.findUnique({
    where: {
      id,
    },
    include: {
        product: true,
    }
  });
};

export const createVariant = async (variant: CreateUpdateVariant): Promise<Variant> => {
  return prisma.variant.create({
    data: variant,
  });
};

export const updateVariant = async (
  id: number,
  variant: CreateUpdateVariant,
): Promise<Variant | null> => {
  return prisma.variant.update({
    where: {
      id,
    },
    data: variant,
  });
};

export const deleteVariant = async (id: number): Promise<Variant | null> => {
  return prisma.variant.delete({
    where: {
      id,
    },
  });
};