import { Container } from 'typescript-ioc'
import * as db from 'zapatos/db'
import { pool } from '../src/database'
import tough from 'tough-cookie'
import { Server } from 'http'
import axios from 'axios'
import axiosCookieJarSupport from 'axios-cookiejar-support'
import { app } from '../src/app'

axiosCookieJarSupport(axios)

let listener: Server | null = null

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

  listener = app.listen(4321)

  axios.defaults.baseURL = 'http://localhost:4321'
  axios.defaults.validateStatus = () => true
  axios.defaults.jar = new tough.CookieJar()
  axios.defaults.withCredentials = true
})

afterEach(async () => {
  const pool = Container.getValue('_pool')
  const txClient = Container.getValue('db')
  await db.sql`ROLLBACK`.run(txClient)
  delete txClient._zapatos
  txClient.release()
  Container.bindName('db').to(pool)

  if (listener) {
    listener.close()
    listener = null
  }
})
