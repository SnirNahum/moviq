import { drizzle } from "drizzle-orm/node-postgres";
import { logger } from "../config/logger.config.js";
import { users } from "../db/schema/users";

export async function dbPing(): Promise<void> {
  const db = drizzle(process.env.DATABASE_URL!);
  let usersTable: any = [];
  try {
    usersTable = await db.select().from(users);
    console.log("---------------- ", usersTable);
  } finally {
    logger.info("Database connection successful");
  }
}
