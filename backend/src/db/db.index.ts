import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import pkg from "pg";
import * as schema from "./schema/index.schema.js";

const { Pool } = pkg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

export async function dbPingOnStartup() {
  try {
    await db.execute(sql`SELECT 1`);
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Database ping failed:", error);
    throw error;
  }
}
