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
async function resetIdSequences() {
  await prisma.$executeRaw`ALTER SEQUENCE "Role_id_seq" RESTART WITH 1`
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
