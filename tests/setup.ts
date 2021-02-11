import "../src/startup";
import { Container } from "typescript-ioc";
import * as db from "zapatos/db";

async function rollbackTx() {
  const pool = Container.getValue("pool");
  const txClient = Container.getValue("db");

  await db.sql`ROLLBACK`.run(txClient);

  delete txClient._zapatos;
  txClient.release();

  Container.bindName("db").to(pool);
}

const reporter = {
  specDone: async (result: any) => {
    if (result.status === "failed") {
      await rollbackTx();
    }
  },
};

(jasmine as any).getEnv().addReporter(reporter);

beforeAll(() => {
  const pool = Container.getValue("db");
  Container.bindName("pool").to(pool);
});

afterAll(() => {
  const pool = Container.getValue("pool");
  pool.end();
});

beforeEach(async () => {
  const pool = Container.getValue("pool");
  if (Object.prototype.hasOwnProperty.call(pool, "_zapatos")) {
    return;
  }

  const client = await pool.connect();

  Container.bindName("db").to(client);

  client._zapatos = {
    isolationLevel: db.IsolationLevel.ReadCommitted,
    txnId: 0,
  };

  await db.sql`START TRANSACTION ISOLATION LEVEL ${db.raw(
    db.IsolationLevel.ReadCommitted
  )}`.run(client);
});

afterEach(async () => {
  await rollbackTx();
});
