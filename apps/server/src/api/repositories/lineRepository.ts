import prisma from '../prismaClient'
import { Line } from '@prisma/client'

type CreateUpdateLine = Omit<Line, 'id'>

export const getLines = async (): Promise<Line[]> => {
  return prisma.line.findMany()
}

export const getLineById = async (id: number): Promise<Line | null> => {
  return prisma.line.findUnique({
    where: {
      id,
    },
  })
}

export const createLine = async (line: CreateUpdateLine): Promise<Line> => {
  return prisma.line.create({
    data: line,
  })
}

export const updateLine = async (
  id: number,
  line: CreateUpdateLine,
): Promise<Line | null> => {
  return prisma.line.update({
    where: {
      id,
    },
    data: line,
  })
}

export const deleteLine = async (id: number): Promise<Line | null> => {
  return prisma.line.delete({
    where: {
      id,
    },
  })
}
