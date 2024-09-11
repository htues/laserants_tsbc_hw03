import { User } from '@prisma/client'
import * as userRepository from '../repositories/userRepository'

type CreateUpdateUser = Omit<User, 'id'>

export const getUsers = async () => {
  return userRepository.getUsers()
}

export const getUserById = async (id: number) => {
  return userRepository.getUserById(id)
}

export const createUser = async (user: CreateUpdateUser) => {
  return userRepository.createUser(user)
}

export const updateUser = async (id: number, user: CreateUpdateUser) => {
  return userRepository.updateUser(id, user)
}

export const activateUser = async (id: number, status: boolean, roleId: number) => {
  return userRepository.activateUser(id, status, roleId)
}

export const updateUserStatus = async (id: number, status: boolean) => {
  return userRepository.updateUserStatus(id, status)
}

export const deleteUser = async (id: number) => {
  return userRepository.deleteUser(id)
}
