import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { dbConnection, setCorsEnviro } from './config/setup'
import { port, mode } from './config/envvars'

import healthCheckRouter from './api/routes/hc'
import rolesRouter from './api/routes/roleRoutes'
import usersRouter from './api/routes/userRoutes'

import categoriesRouter from './api/routes/categoryRoutes'
import productsRouter from './api/routes/productRoutes'
import variantsRouter from './api/routes/variantRoutes'
import collectionsRouter from './api/routes/collectionRoutes'
import seedDatabase from './utils/seedDatabase'

const backend: express.Application = express()

const PORT = port || 5001

async function StartBackend() {
  try {
    await dbConnection()
    backend.use(cors(setCorsEnviro))
    backend.use(express.json())
    backend.use(express.urlencoded({ extended: true }))
    backend.use(cookieParser())

    // Method for request monitoring and logging
    backend.use((req: Request, res: Response, next: NextFunction) => {
      console.log(`Request received: [${req.method}] ${req.path}`)
      console.log(`Request headers: ${JSON.stringify(req.headers)}`)
      next()
    })

    await seedDatabase()

    backend.use('/health', healthCheckRouter)
    backend.use('/roles', rolesRouter)
    backend.use('/users', usersRouter)
    backend.use('/categories', categoriesRouter)
    backend.use('/products', productsRouter)
    backend.use('/variants', variantsRouter)
    backend.use('/collections', collectionsRouter)

    // Error handling middleware
    backend.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error('Unexpected error:', err.message)
        console.error('Stack trace:', err.stack)
        res.status(500).send('An unexpected error occurred')
      },
    )

    const server = backend.listen(PORT, () => {
      console.log(`Server running in ${mode} mode on port ${PORT}`)
    })
    return server
  } catch (error: unknown) {
    console.error('Failed to start backend', error)
    process.exit(1)
  }
}

process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  },
)

export { backend, StartBackend }
