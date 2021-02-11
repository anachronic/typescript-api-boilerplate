const marv = require('marv/api/promise')
const driver = require('marv-pg-driver')
const env = require('env-sanitize')

const connection = {
  host: env('DATABASE_HOST'),
  port: env('DATABASE_PORT', (p) => p.asInt()),
  user: env('DATABASE_USER'),
  password: env('DATABASE_PASSWORD'),
  database: env('DATABASE_NAME'),
}

async function migrate() {
  const migrations = await marv.scan('migrations')

  await marv.migrate(migrations, driver({ connection }))
}

migrate().catch(console.error)
