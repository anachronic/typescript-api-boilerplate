import pg from "pg";
import env from "env-sanitize";

export const pool = new pg.Pool({
  host: env("DATABASE_HOST"),
  port: env("DATABASE_PORT", (p) => p.asInt()),
  user: env("DATABASE_USER"),
  password: env("DATABASE_PASSWORD"),
  database: env("DATABASE_NAME"),
});
pool.on("error", console.error);
