import '../../config/loadEnv.js'
import seedDatabase from '../seedDatabase.js'

async function seedSetup() {
  try {
    console.log('Seeding database')
    await seedDatabase()
    console.log('Database seeded successfully')
  } catch (error: unknown) {
    console.error('Error seeding database', error)
    process.exit(1)
  }
  process.exit(0)
}

seedSetup()
