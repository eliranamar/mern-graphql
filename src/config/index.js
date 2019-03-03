export const {
  PORT = 4001,
  NODE_ENV = 'development',
  SESSIONS_NAME = 'sid',
  SESSIONS_SECRET = 'ssh!secret!',
  SESSIONS_LIFETIME = 1000 * 60 * 120, // 2 hours
  REDIS_HOST = 'localhost',
  REDIS_PORT = 6379,
  REDIS_PASSWORD = 'redisSecret',
  DB_NAME,
  DB_USERNAME,
  DB_HOST,
  DB_PORT,
  DB_PASSWORD,
} = process.env