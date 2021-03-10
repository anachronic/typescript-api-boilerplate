import pg from 'pg'
import { settings } from './conf/settings'

export const pool = new pg.Pool({
  host: settings.DATABASE_HOST,
  port: settings.DATABASE_PORT,
  user: settings.DATABASE_USER,
  password: settings.DATABASE_PASSWORD,
  database: settings.DATABASE_NAME,
})
pool.on('error', console.error)
