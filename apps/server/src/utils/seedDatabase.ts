import { mode, dataseeddev } from '../config/envvars.js'
import clearDatabase from './clearDatabase.js'
import runMigrations from './prismaMigrations.js'
import seedRoles from './seedRoles.js'
import seedUsers from './seedUsers.js'
import seedCategories from './seedCategories.js'
import seedProducts from './seedProducts.js'

async function seedDatabase() {
  try {
    if (dataseeddev) {
      await clearDatabase()
      console.log('Running migrations')
      await runMigrations()
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
  }
}

export default seedDatabase
