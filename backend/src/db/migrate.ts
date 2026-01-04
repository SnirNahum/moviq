import path from "node:path";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "./db.index.js";
import { logger } from "../config/logger.config.js";

/**
 * Auto-run migrations in development before the server starts.
 * - Dev: runs migrations (idempotent)
 * - Prod: does nothing
 */
export async function runMigrationsIfNeeded(): Promise<void> {
  // Resolve migrations folder robustly (works on Windows/Mac/Linux)
  const __dirname = path.dirname(__filename);

  const migrationsFolder = path.resolve(__dirname, "migrations");

  logger.info({ migrationsFolder }, "Running migrations (dev)");

  await migrate(db, { migrationsFolder });

  logger.info("Migrations are up to date");
}
