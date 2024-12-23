import { startBackend } from './besetup.js'

startBackend()
  .then(() => {
    console.log('Backend started')
  })
  .catch((err: unknown) => {
    console.error('Failed to start backend', err)
    process.exit(1)
  })
