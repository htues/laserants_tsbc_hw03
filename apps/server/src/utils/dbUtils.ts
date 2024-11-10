import prisma from '../api/prismaClient.js'

export async function clearDatabase() {
  try {
    console.log('Clearing database...')
    await prisma.$executeRawUnsafe(`TRUNCATE "Role" CASCADE`)
    await prisma.$executeRawUnsafe(`TRUNCATE "User" CASCADE`)
    console.log('Database cleared successfully')
  } catch (error: unknown) {
    console.error('Failed to clear database', error)
  } finally {
    await prisma.$disconnect()
  }
}

export async function isTableExists(tableName: string): Promise<boolean> {
  const result = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT EXISTS (
      SELECT FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name = ${tableName}
    );
  `
  return result[0].exists
}

export async function sequenceExists(sequenceName: string): Promise<boolean> {
  const result = await prisma.$queryRaw<{ exists: boolean }[]>`
    SELECT EXISTS (
      SELECT FROM information_schema.sequences 
      WHERE sequence_schema = 'public' 
      AND sequence_name = ${sequenceName}
    );
  `
  return result[0].exists
}

export async function resetIdSequences(sequenceName: string) {
  const exists = await sequenceExists(sequenceName)
  if (exists) {
    await prisma.$executeRawUnsafe(
      `ALTER SEQUENCE "${sequenceName}" RESTART WITH 1`,
    )
  } else {
    console.log(`Sequence "${sequenceName}" does not exist, skipping reset`)
  }
}

export async function dbDisconnect() {
  await prisma.$disconnect()
}
