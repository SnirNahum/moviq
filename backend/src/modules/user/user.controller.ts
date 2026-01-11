import { Request, Response } from "express";
import { logger } from "../../config/logger.config";
import { userService } from "./user.services";
import { UserEntity, User, UserId } from "./user.types";
import serverError from "../errors/errors.handler";

class UserController {
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const usersList = await userService.getUsers();
      res.status(200).json({ users: usersList });
    } catch (err) {
      logger.error({ err }, "Error fetching all users");
      serverError(res, `Error fetching all users`, err);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.userId;

    try {
      const user: User = await userService.getUserById(userId);
      if (!user) {
        logger.info(`User with ID ${userId} not found`);
        res.status(404).json({ message: `User with ID ${userId} not found` });
        return;
      }
      logger.info(`Fetched user with ID ${userId}`);
      res.status(200).json({ user: user });
    } catch (err) {
      logger.error({ err }, `Error fetching user with ID ${userId}`);
      serverError(res, `Error fetching user with ID ${userId}`, err);
    }
  }
  async createNewUser(req: Request, res: Response): Promise<void> {
    try {
      const newUserBody: UserEntity = req.body;
      const createdUser: UserId = await userService.createNewUser(
        newUserBody
      );
      logger.info(`User created successfully with ID: ${createdUser.id}`);
      res.status(201).json({ createdUser });
    } catch (err: any) {
      if (err.cause) {
        logger.info(`Could not create user`, err);
        res.status(400).json({ message: `Could not create user`, err });
        return;
      }
      logger.error({ err }, "Could not create user");
      serverError(res, "Could not create user", err);
    }
  }
  async updateUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    const updateUserBody: UserEntity = req.body;
    try {      
      const updatedUser: UserId = await userService.updateUserById(
        userId,
        updateUserBody
      );

      if (!updatedUser) {
        logger.info(`User with ID ${userId} not found`);
        res.status(404).json({ message: `User with ID ${userId} not found` });
        return;
      }
      logger.info(`User with ID ${userId} updated successfully`);
      res.status(200).json({ updatedUser });
    } catch (err: any) {
      if (err.cause) {
        logger.info(`Could not update user`, err);
        res
          .status(400)
          .json({ message: `Could not update user with ID: ${userId}` });
        return;
      }
      logger.error(`Could not update user`, err);
      serverError(res, `Error updating user with ID ${userId}`, err);
    }
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    try {
      const deletedUser: UserId[] = await userService.deleteUserById(userId);
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
      serverError(res, `Could not delete user with ID: ${userId}`, err);
    }
  }
}
export const userController = new UserController();
