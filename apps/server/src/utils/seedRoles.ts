import prisma from '../api/prismaClient.js'

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

async function sequenceExists(sequenceName: string): Promise<boolean> {
  const result = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT EXISTS (
      SELECT FROM information_schema.sequences 
      WHERE sequence_schema = 'public' 
      AND sequence_name = ${sequenceName}
    );
  `;
  return result[0].exists;
}

async function resetIdSequences() {
  const sequenceName = 'Role_id_seq';
  const exists = await sequenceExists(sequenceName);
  if (exists) {
    await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`;
  } else {
    console.log(`Sequence "${sequenceName}" does not exist, skipping reset`);
  }
}

async function seedRoles() {
  try {
    await resetIdSequences()
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
