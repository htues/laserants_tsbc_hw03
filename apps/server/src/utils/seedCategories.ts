import prisma from '../api/prismaClient'

const categories = [
  { id: 1, name: 'Toys', description: 'Toys for kids', status: true },
  { id: 2, name: 'Clothes', description: 'clothes for all ages', status: true },
  {
    id: 3,
    name: 'Furniture',
    description: 'Furniture for homes and offices',
    status: true,
  },
  { id: 4, name: 'Food', description: 'Food items for all', status: true },
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
      await prisma.$executeRaw`ALTER SEQUENCE "User_id_seq" RESTART WITH 1`;
  } else {
    console.log(`Sequence "${sequenceName}" does not exist, skipping reset`);
  }
}

async function seedCategories() {
  try {
    await resetIdSequences()
    for (const cat of categories) {
      await prisma.category.upsert({
        where: { name: cat.name },
        update: {},
        create: cat,
      })
    }
    console.log('Categories seeded successfully')
  } catch (error: unknown) {
    console.error('Failed to seed categories', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default seedCategories
