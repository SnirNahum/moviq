import { Router } from "express";
import { sql } from "drizzle-orm";
import { db } from "../../db/db.index";
import { baseUrl } from "../../app.constants";
import { logger } from "../../config/logger.config";

const healthRouter = Router();

healthRouter.get(`${baseUrl}/health`, (_req, res) => {
  res.status(200).json({ status: "ok" });
});

healthRouter.get(`${baseUrl}/health/db`, async (_req, res) => {
  try {
    await db.execute(sql`SELECT 1`);
    res.status(200).json({ status: "ok", database: "connected" });
    logger.info("Database connection successful.");
  } catch (error) {
    res.status(503).json({
      status: "error",
      database: "disconnected",
      message: "Database connection failed",
    });
  }
});

export default healthRouter;
