import { mode, dataseeddev, data_structure } from '../config/envvars.js'
import runMigrations from './runnerMigrations.js'
import seedRoles from './seedRoles.js'
import seedUsers from './seedUsers.js'
import seedCategories from './seedCategories.js'
import seedProducts from './seedProducts.js'
import { isTableExists, clearDatabase, dbDisconnect } from './dbUtils.js'

async function seedDatabase() {
  try {
    if (dataseeddev) {
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
        console.log('Tables do not exist, running migrations')
        await runMigrations()
      }

      if (data_structure === 'restart') {
        await clearDatabase()
      }
      console.log(`Seeding database in ${mode} mode`)

      await seedRoles()
      await seedUsers()
      await seedCategories()
      await seedProducts()
    } else {
      console.log('No seeding required')
    }
  } catch (error: unknown) {
    console.error('Error seeding database', error)
  } finally {
    await dbDisconnect()
  }
}

export default seedDatabase
