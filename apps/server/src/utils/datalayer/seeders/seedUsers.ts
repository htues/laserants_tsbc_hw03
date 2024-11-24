import prisma from '../api/prismaClient.js'
import { isTableExists, resetIdSequences } from './dbUtils.js'

const users = [
  {
    lastname: 'Doe',
    firstname: 'John',
    email: 'jdoe@astros.com',
    password: 'password',
    roleId: 1,
    status: true,
  },
  {
    lastname: 'Doe',
    firstname: 'Jane',
    email: 'jane@astros.com',
    password: 'password',
    roleId: 2,
    status: true,
  },
  {
    lastname: 'Doe',
    firstname: 'Jack',
    email: 'jack@astros.com',
    password: 'password',
    roleId: 3,
    status: true,
  },
]

async function seedUsers() {
  try {
    const isTablePresent = await isTableExists('Role')
    if (!isTablePresent) {
      console.log('Table "Role" does not exist, skipping seeding')
      return
    }
    await resetIdSequences('User_id_seq')
    for (const user of users) {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          lastname: user.lastname,
          firstname: user.firstname,
          email: user.email,
          password: user.password,
          roleId: user.roleId,
          status: user.status,
          carts: { create: [] },
          orders: { create: [] },
        } as any,
      })
    }
    console.log('Users seeded successfully')
  } catch (error: unknown) {
    console.error('Failed to seed users', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default seedUsers
