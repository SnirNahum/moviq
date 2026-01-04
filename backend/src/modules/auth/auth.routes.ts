import { Router } from "express";
import { authController } from "./auth.controller";
import { AUTH_ROUTES } from "./auth.constants";

export const authRouter = Router();

authRouter.get(AUTH_ROUTES.login, authController.login);