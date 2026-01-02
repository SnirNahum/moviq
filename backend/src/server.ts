import { createApp } from "./app.js";
import { dbConfig } from "./config/env.config.js";
import { logger } from "./config/logger.config.js";
import { dbPing } from "./db/db.index.js";
import { runMigrationsIfNeeded } from "./db/migrate.js";

const app = createApp();

async function start() {
  await dbPing();
  console.log("Database pinged successfully");
  await runMigrationsIfNeeded();

  app.listen(dbConfig.port, () => {
    logger.info(`API listening on http://localhost:${dbConfig.port}`);
  });
}

start().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
