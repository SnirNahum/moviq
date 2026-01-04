import express from "express";
import { requestLogger } from "./middlewares/requestLogger";
import healthRouter from "./modules/health/health.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { baseUrl } from "./app.constants";
import { userRouter } from "./modules/user/user.routes";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.use(requestLogger);

  // app starter seeds
  // seedIndex();

  // app routes
  app.use(`${baseUrl}/auth`, authRouter);
  app.use(`${baseUrl}/users`, userRouter);

  app.use(healthRouter);

  return app;
}
