import prisma from '../api/prismaClient.js'

async function clearDatabase() {
  try {
    console.log('Clearing database...')
    await prisma.$executeRaw`TRUNCATE "Role" CASCADE`
    await prisma.$executeRaw`TRUNCATE "User" CASCADE`
    console.log('Database cleared successfully')
  } catch (error: unknown) {
    console.error('Failed to clear database', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default clearDatabase
