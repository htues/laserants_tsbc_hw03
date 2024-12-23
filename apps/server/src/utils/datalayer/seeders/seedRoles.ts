import prisma from '../../../api/prismaClient.js'
import { isTableExists, resetIdSequences } from '../dbUtils.js'

const roles = [
  {
    name: 'ADMINISTRATOR',
    description: 'Admin users have full access to all resources',
    status: true,
  },
  {
    name: 'SUPERVISOR',
    description: 'supervisor users have access to most resources',
    status: true,
  },
  {
    name: 'USER',
    description: 'User users have limited access to resources',
    status: true,
  },
]

async function seedRoles() {
  try {
    const isTablePresent = await isTableExists('Role')
    if (!isTablePresent) {
      console.log('Table "Role" does not exist, skipping seeding')
      return
    }
    await resetIdSequences('Role_id_seq')
    for (const role of roles) {
      await prisma.role.upsert({
        where: { name: role.name },
        update: {},
        create: role,
      })
    }
    console.log('Roles seeded successfully')
  } catch (error: unknown) {
    console.error('Failed to seed roles', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default seedRoles
