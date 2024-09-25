import { Role } from '@prisma/client'
import * as roleRepository from '../repositories/roleRepository.js';

type CreateUpdateRole = Omit<Role, 'id'>;

export const getRoles = async () => {
    return roleRepository.getRoles();
}

export const getRoleById = async (id: number) => {
    return roleRepository.getRoleById(id);
}

export const createRole = async (role: CreateUpdateRole) => {
    return roleRepository.createRole(role);
}

export const updateRole = async (id: number, role: CreateUpdateRole) => {
    return roleRepository.updateRole(id, role);
}

export const deleteRole = async (id: number) => {
    return roleRepository.deleteRole(id);
}
