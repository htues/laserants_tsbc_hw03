import { prismaMock } from '../prismaClientMock'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  activateUser,
  updateUserStatus,
  deleteUser,
} from '../../../src/api/repositories/userRepository'
import { User, Role } from '@prisma/client'

describe('userRepository', () => {
  const mockUser: User = {
    id: 1,
    lastname: 'Doe',
    firstname: 'John',
    email: 'john.doe@example.com',
    password: 'mockPassword123!',
    status: false,
    roleId: 1,
  }
  const mockRole: Role = {
    id: 1,
    name: 'user',
    description: 'User role',
    status: true,
  }

  beforeEach(() => {
    prismaMock.user.findMany.mockReset()
    prismaMock.user.findUnique.mockReset()
    prismaMock.user.create.mockReset()
    prismaMock.user.update.mockReset()
    prismaMock.user.delete.mockReset()
    prismaMock.role.findUnique.mockReset()
  })

  it('should get all users', async () => {
    prismaMock.user.findMany.mockResolvedValue([mockUser])

    const users = await getUsers()
    expect(users).toEqual([mockUser])
    expect(prismaMock.user.findMany).toHaveBeenCalled()
  })

  it('should get a user by id', async () => {
    prismaMock.user.findUnique.mockResolvedValue(mockUser)

    const user = await getUserById(1)
    expect(user).toEqual(mockUser)
    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
      include: { role: true },
    })
  })

  it('should create a new user', async () => {
    prismaMock.role.findUnique.mockResolvedValue(mockRole)
    prismaMock.user.create.mockResolvedValue(mockUser)

    const newUser = {
      lastname: 'Doe',
      firstname: 'John',
      email: 'jane.doe@example.com',
      password: 'mockPassword123!',
      status: true,
      role: { connect: { id: 1 } },
    }
    const user = await createUser(newUser)
    expect(user).toEqual(mockUser)
    expect(prismaMock.role.findUnique).toHaveBeenCalledWith({
      where: { name: 'user' },
    })
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        ...newUser,
        status: false,
        role: { connect: { id: mockRole.id } },
      },
    })
  })

  it('should update a user', async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)

    const updatedUser = {
      lastname: 'Smith',
      firstname: 'Charles',
      email: 'john.smith@example.com',
      password: 'mockPassword1234!',
      status: false,
    }
    const user = await updateUser(1, updatedUser)
    expect(user).toEqual(mockUser)
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: updatedUser,
    })
  })

  it('should activate a user', async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)

    const user = await activateUser(1, true, 1)
    expect(user).toEqual(mockUser)
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: true, role: { connect: { id: 1 } } },
    })
  })

  it('should update user status', async () => {
    prismaMock.user.update.mockResolvedValue(mockUser)

    const user = await updateUserStatus(1, true)
    expect(user).toEqual(mockUser)
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { status: true },
    })
  })

  it('should delete a user', async () => {
    prismaMock.user.delete.mockResolvedValue(mockUser)

    const user = await deleteUser(1)
    expect(user).toEqual(mockUser)
    expect(prismaMock.user.delete).toHaveBeenCalledWith({ where: { id: 1 } })
  })
})
