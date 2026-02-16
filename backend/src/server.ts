import dotenv from "dotenv";
dotenv.config();
import { createApp } from "./app.js";
import { dbConfig } from "./config/env.config.js";
import { logger } from "./config/logger.config.js";
import { runMigrationsIfNeeded } from "./db/migrate.js";
import { setupSwagger } from "./docs/swagger";
import { seedShows } from "./scripts/seedShows/seed-shows.js";

const app = createApp();

async function start() {
  await runMigrationsIfNeeded();
  // await connectMongoDB();
  await seedShows();

  app.listen(dbConfig.port, () => {
    logger.info(`API listening on http://localhost:${dbConfig.port}`);
  });
}
setupSwagger(app);

start().catch((err) => {
  logger.error({ err }, "Failed to start server");
  process.exit(1);
});
