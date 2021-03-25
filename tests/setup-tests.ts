import { Container } from 'typescript-ioc'
import * as db from 'zapatos/db'
import { pool } from '../src/database'

beforeAll(() => {
  Container.bindName('_pool').to(pool)
})

afterAll(async () => {
  const pool = Container.getValue('_pool')
  await pool.end()

  // prevent
  await new Promise((resolve) => setTimeout(resolve, 500))
})

beforeEach(async () => {
  const pool = Container.getValue('_pool')
  if (Object.prototype.hasOwnProperty.call(pool, '_zapatos')) {
    return
  }

  const client = await pool.connect()

  Container.bindName('db').to(client)

  client._zapatos = {
    isolationLevel: db.IsolationLevel.RepeatableRead,
    txnId: 0,
  }

  await db.sql`START TRANSACTION ISOLATION LEVEL ${db.raw(db.IsolationLevel.RepeatableRead)}`.run(
    client
  )
})

afterEach(async () => {
  const pool = Container.getValue('_pool')
  const txClient = Container.getValue('db')
  await db.sql`ROLLBACK`.run(txClient)
  delete txClient._zapatos
  txClient.release()
  Container.bindName('db').to(pool)
})
