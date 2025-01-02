import { prismaMock } from '../prismaClientMock';
import { getRoles, getRoleById, createRole, updateRole, deleteRole } from '../../../src/api/repositories/roleRepository';
import { Role } from '@prisma/client';

describe('roleRepository', () => {
  const mockRole: Role = { id: 1, name: 'Admin', description: 'Admin role', status: true };

  it('should get all roles', async () => {
    (prismaMock.role.findMany as jest.Mock).mockResolvedValue([mockRole]);

    const roles = await getRoles();
    expect(roles).toEqual([mockRole]);
    expect(prismaMock.role.findMany).toHaveBeenCalled();
  });

  it('should get a role by id', async () => {
    (prismaMock.role.findUnique as jest.Mock).mockResolvedValue(mockRole);

    const role = await getRoleById(1);
    expect(role).toEqual(mockRole);
    expect(prismaMock.role.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('should create a new role', async () => {
    const newRole = { name: 'User', description: 'User role', status: true };
    (prismaMock.role.create as jest.Mock).mockResolvedValue({ id: 2, ...newRole });

    const role = await createRole(newRole);
    expect(role).toEqual({ id: 2, ...newRole });
    expect(prismaMock.role.create).toHaveBeenCalledWith({ data: newRole });
  });

  it('should update a role', async () => {
    const updatedRole = { name: 'Super Admin', description: 'Super Admin role', status: true };
    (prismaMock.role.update as jest.Mock).mockResolvedValue({ id: 1, ...updatedRole });

    const role = await updateRole(1, updatedRole);
    expect(role).toEqual({ id: 1, ...updatedRole });
    expect(prismaMock.role.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updatedRole });
  });

  it('should delete a role', async () => {
    (prismaMock.role.delete as jest.Mock).mockResolvedValue(mockRole);

    const role = await deleteRole(1);
    expect(role).toEqual(mockRole);
    expect(prismaMock.role.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });
});