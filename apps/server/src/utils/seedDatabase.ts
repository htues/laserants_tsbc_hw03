import { mode, dataseeddev, data_structure } from '../config/envvars.js'
import runMigrations from './runnerMigrations.js'
import seedRoles from './datalayer/seeders/seedRoles.js'
import seedUsers from './datalayer/seeders/seedUsers.js'
import seedCategories from './datalayer/seeders/seedCategories.js'
import seedProducts from './datalayer/seeders/seedProducts.js'
import { isTableExists, clearDatabase, dbDisconnect } from './dbUtils.js'

async function seedDatabase() {
  try {
    const rolesTableExists = await isTableExists('Role')
    const userTableExists = await isTableExists('User')
    const categoryTableExists = await isTableExists('Category')
    const productTableExists = await isTableExists('Product')

    if (
      !rolesTableExists ||
      !userTableExists ||
      !categoryTableExists ||
      !productTableExists
    ) {
      console.log('Tables do not exist, you must to run migrations')
      if (mode !== 'production' && dataseeddev === 'true') {
        await runMigrations()
      } else {
        console.log('skipping migrations')
      }
    }

    if (data_structure === 'restart') {
      await clearDatabase()
    }
    console.log(`Seeding database in ${mode} mode`)

    await seedRoles()
    await seedUsers()
    await seedCategories()
    await seedProducts()
  } catch (error: unknown) {
    console.error('Error seeding database', error)
  } finally {
    await dbDisconnect()
  }
}

export default seedDatabase
