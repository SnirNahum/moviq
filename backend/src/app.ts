import express from "express";
import { requestLogger } from "./middlewares/requestLogger";
import { globalErrorHandler } from "./core/error-handler";
import { registerSwagger } from "./core/swagger";
import healthRouter from "./modules/health/health.routes";
import catalogRouter from "./modules/catalog/catalog.routes";

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use(requestLogger);
  app.use("/catalog", catalogRouter);
  app.use(healthRouter);
  app.use(globalErrorHandler);

  registerSwagger(app);

  return app;
}
