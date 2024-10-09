import { exec } from 'child_process'

function runMigrations(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(
      'npx prisma migrate deploy',
      (
        error: Error | null,
        stdout: string | Buffer,
        stderr: string | Buffer,
      ) => {
        if (error) {
          console.error(`Error running migrations: ${error.message}`)
          return reject(error)
        }
        if (stderr) {
          console.error(`Migration stderr: ${stderr.toString()}`)
          return reject(new Error(stderr.toString()))
        }
        console.log(`Migration stdout: ${stdout.toString()}`)
        resolve(stdout.toString())
      },
    )
  })
}

export default runMigrations
