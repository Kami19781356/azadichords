import { Pool } from "pg";

// Lazily created so the app (and static build) doesn't require
// DATABASE_URL to be set just to start up — only routes that actually
// touch the database need it.
let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error(
        "DATABASE_URL is not set. See docs/SALES_SETUP.md for the Postgres setup this feature needs.",
      );
    }
    pool = new Pool({ connectionString });
  }
  return pool;
}
