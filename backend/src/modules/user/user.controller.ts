import { Request, Response } from "express";
import { logger } from "../../config/logger.config";
import { userService } from "./user.services";
import handleServerError from "../errors/errors.handler";
import { USER_ERROR_MESSAGE } from "./user.constants";
import { User, UserId } from "./user.types";

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: User[] = await userService.getUsers();
      res.status(200).json({ users });
    } catch (err: any) {
      handleServerError(
        res,
        err?.message ?? USER_ERROR_MESSAGE.SERVER_ERROR,
        err,
      );
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId as string;

    try {
      const user: User = await userService.getUserById(userId);

      res.status(200).json(user);
    } catch (err: any) {
      handleServerError(
        res,
        err?.message ?? USER_ERROR_MESSAGE.SERVER_ERROR,
        err,
      );
    }
  }

  async createNewUser(req: Request, res: Response): Promise<void> {
    try {
      const user: UserId = await userService.createNewUser(req.body);
      logger.info({ message: `User created successfully` });
      res.status(200).json({ user });
    } catch (err: any) {
      handleServerError(
        res,
        err?.message ?? USER_ERROR_MESSAGE.SERVER_ERROR,
        err,
      );
    }
  }
  async updateUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id as string;

    const updateBody = req.body;

    if (!updateBody) {
      res.status(400).json({ message: "Invalid request body" });
      return;
    }
    
    const updated = await userService.updateUserById(userId, updateBody);
    if (!updated) {
      res.status(404).json({ message: `User with ID ${userId} not found` });
      return;
    }

    res.status(200).json({ updatedUser: updated });
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id as string;
    try {
      const deletedUser = await userService.deleteUserById(userId);
      if (!deletedUser) {
        logger.info(`User with ID ${userId} not found`);
        res.status(404).json({ message: `User with ID ${userId} not found` });
        return;
      }
      logger.info(`User with ID ${userId} deleted successfully`);
      res.sendStatus(204);
      return;
    } catch (err) {
      logger.error({ err }, `Error updating user with ID: ${userId}`);
      handleServerError(res, `Could not delete user with ID: ${userId}`, err);
    }
  }
}
export const userController = new UserController();
