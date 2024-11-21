import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

//using an absolute path
//dotenv.config({ path: path.resolve('/app/.env') })

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.resolve(__dirname, '../../../../.env')
console.log(`Resolved .env path: ${envPath}`)
const result = dotenv.config({ path: envPath })

if (result.error) {
  console.error('Error loading .env file:', result.error)
} else {
  console.log('.env file loaded successfully')

  console.log('Environment variables:')
  console.log(`POSTGRES_USER: ${process.env.POSTGRES_USER}`)
  console.log(`POSTGRES_PASSWORD: ${process.env.POSTGRES_PASSWORD}`)
  console.log(`POSTGRES_DB: ${process.env.POSTGRES_DB}`)
  console.log(`POSTGRES_HOST: ${process.env.POSTGRES_HOST}`)
  console.log(`POSTGRES_PORT: ${process.env.POSTGRES_PORT}`)
  console.log(`DATALAYER_NAME: ${process.env.DATALAYER_NAME}`)
  console.log(`DATABASE_URL: ${process.env.DATABASE_URL}`)
}
