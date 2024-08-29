import { StartBackend } from './besetup'

StartBackend()
  .then(() => {
    console.log('Backend started')
  })
  .catch((err: unknown) => {
    console.error('Failed to start backend', err)
    process.exit(1)
  })
