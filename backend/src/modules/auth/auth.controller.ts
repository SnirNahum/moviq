import { Request, Response } from "express";
import { logger } from "../../config/logger.config.js";
import { authService } from "./auth.services.js";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const users = await authService.login();

      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      logger.error({ error }, "Error fetching users");
      res.status(500).json({
        success: false,
        error: "Failed to fetch users",
      });
    }
  }
}

export const authController = new AuthController();
