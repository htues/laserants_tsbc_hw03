import prisma from '../api/prismaClient.js'
import { whitelist_frontend, mode } from './envvars.js'

const dbConnection = async () => {
  try {
    await prisma.$connect()
    console.log(`Database connected in ${mode} mode`)
  } catch (error) {
    console.log('dbConnection method error: ' + (error as Error).message)
    process.exit(1)
  }
}

const setCorsEnviro = {
  origin: (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void,
  ) => {
    console.log(`CORS requested from origin: ${origin}`)
    if (whitelist_frontend.indexOf(origin || '') !== -1 || !origin) {
      console.log(`CORS requested from origin: ${origin} granted`)
      callback(null, true)
    } else {
      callback(new Error(`CORS requested from origin: ${origin} denied`), false)
    }
  },
  //credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Credentials',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Authorization',
  ],
}

export { dbConnection, setCorsEnviro }
