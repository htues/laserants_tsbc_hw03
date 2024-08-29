import dotenv from 'dotenv';

dotenv.config();

const port = parseInt(process.env.BACKEND_PORT ?? '8003');
if (isNaN(port)) {
  throw new Error('Invalid PORT enviroment variable, stopping the system');
}

const mode = process.env.EXEC_MODE;

const whitelist_frontend = (process.env.FRONTEND_ORIGINS ?? '').split(",");
const cors_secure = mode === 'production';
const cors_samesite = mode === 'production' ? 'none' : 'lax';

const dataseeddev = process.env.SEED_DEVELOPER;
const dataseedprod = process.env.SEED_PRODUCTION;

export {
    port,
    mode,
    whitelist_frontend,
    cors_secure,
    cors_samesite,
    dataseeddev,
    dataseedprod,
  };