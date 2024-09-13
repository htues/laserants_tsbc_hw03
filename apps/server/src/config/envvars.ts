import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../../../../.env') })
/*
this is because of the monorepo:
- to use one single env file I have to interpolate the
parameter connection string
- spinning up just the server the env vars are correctly interpolated
*/

const getEnvVar = (key: string, defaultValue: string = ''): string => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Gather environment variables
const POSTGRES_USER = getEnvVar('POSTGRES_USER');
const POSTGRES_PASSWORD = getEnvVar('POSTGRES_PASSWORD');
const POSTGRES_DB = getEnvVar('POSTGRES_DB');
const POSTGRES_HOST = getEnvVar('POSTGRES_HOST');
const POSTGRES_PORT = getEnvVar('POSTGRES_PORT');

// Manually construct the DATABASE_URL
const DATABASE_URL = `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}`;
process.env.DATABASE_URL = DATABASE_URL;

const port = parseInt(process.env.BACKEND_PORT ?? '8003')
if (isNaN(port)) {
  throw new Error('Invalid PORT enviroment variable, stopping the system')
}

const mode = process.env.EXEC_MODE

const whitelist_frontend = (process.env.FRONTEND_ORIGINS ?? '').split(',')
const cors_secure = mode === 'production'
const cors_samesite = mode === 'production' ? 'none' : 'lax'

const dataseeddev = process.env.SEED_DEVELOPMENT
const dataseedprod = process.env.SEED_PRODUCTION

export {
  port,
  mode,
  whitelist_frontend,
  cors_secure,
  cors_samesite,
  dataseeddev,
  dataseedprod,
}
