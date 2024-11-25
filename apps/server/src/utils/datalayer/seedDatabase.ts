import { mode, dataseeddev, data_structure } from '../../config/envvars.js'
import runMigrations from './runnerMigrations.js'
import seedRoles from './seeders/seedRoles.js'
import seedUsers from './seeders/seedUsers.js'
import seedCategories from './seeders/seedCategories.js'
import seedProducts from './seeders/seedProducts.js'
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
      return
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
