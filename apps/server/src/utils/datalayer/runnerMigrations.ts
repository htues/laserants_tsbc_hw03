import { databaseUrl } from '../../config/envvars'
import { exec } from 'child_process'

function execCommand(command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(
      command,
      {
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
      },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing command: ${command}\n${stderr}`)
          return reject(error)
        }
        console.log(`Command executed successfully: ${command}\n${stdout}`)
        resolve()
      },
    )
  })
}

async function runMigrations(): Promise<void> {
  try {
    console.log('Running prisma migrate deploy...')
    await execCommand('npx prisma migrate deploy')

    console.log('Running prisma generate...')
    await execCommand('npx prisma generate')

    console.log('Migrations and generation completed successfully.')
  } catch (error) {
    console.error('Error running migrations and generation:', error)
    throw error
  }
}

export default runMigrations
