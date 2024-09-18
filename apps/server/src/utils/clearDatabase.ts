import prisma from '../api/prismaClient'

async function tableExists(tableName: string): Promise<boolean> {
  const result = await prisma.$queryRaw<{ exists: boolean }[]>`
        SELECT EXISTS (
            SELECT FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name = ${tableName}
        );
    `
  return result[0].exists
}

async function clearDatabase() {
  try {
    const roleTableExists = await tableExists('Role')
    const userTableExists = await tableExists('User')

    if (!roleTableExists && !userTableExists) {
      console.log(
        'Clear database was not executed because this is a fresh install of the DB',
      )
      return
    }

    if (!roleTableExists) {
      console.log('Table "Role" was not necessary to clear')
    }

    if (!userTableExists) {
      console.log('Table "User" was not necessary to clear')
    }

    if (roleTableExists && userTableExists) {
      await prisma.$executeRaw`TRUNCATE "Role" CASCADE`
      await prisma.$executeRaw`TRUNCATE "User" CASCADE`
      console.log('Database cleared successfully')
    }
  } catch (error: unknown) {
    console.error('Failed to clear database', error)
  } finally {
    await prisma.$disconnect()
  }
}

export default clearDatabase
