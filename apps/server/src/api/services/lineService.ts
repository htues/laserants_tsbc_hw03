import { Line } from '@prisma/client'
import * as lineRepository from '../repositories/lineRepository'

type CreateUpdateLine = Omit<Line, 'id'>

export const getLines = async () => {
  return lineRepository.getLines()
}

export const getLineById = async (id: number) => {
    return lineRepository.getLineById(id)
    }

export const createLine = async (line: CreateUpdateLine) => {
    return lineRepository.createLine(line)
}

export const updateLine = async (id: number, line: CreateUpdateLine) => {
    return lineRepository.updateLine(id, line)
}

export const deleteLine = async (id: number) => {
    return lineRepository.deleteLine(id)
}
