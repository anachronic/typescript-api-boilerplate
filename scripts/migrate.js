const marv = require('marv/api/promise')
const driver = require('marv-pg-driver')
const { cleanEnv, str, num } = require('envalid')

const env = cleanEnv(process.env, {
  DATABASE_HOST: str(),
  DATABASE_PORT: num(),
  DATABASE_USER: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_NAME: str(),
})

const connection = {
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
}

async function migrate() {
  const migrations = await marv.scan('migrations')

  await marv.migrate(migrations, driver({ connection }))
}

migrate().catch(console.error)
