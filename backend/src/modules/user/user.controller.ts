import { Request, Response } from "express";
import { logger } from "../../config/logger.config";
import { userService } from "./user.services";
import { CreateUserBody, UserBody } from "./user.types";
import serverError from "../errors/errors.handler";
import { prepareUserToBeUpdatedBody } from "./user.utils";
import { USERS_STATUS } from "./user.constants";

class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const allUsers = await userService.getAllUsers();
      res.status(200).json({ allUsers });
    } catch (error) {
      logger.error({ error }, "Error fetching all users");
      serverError(res, `Error fetching all users`, error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.userId;

    try {
      const user: UserBody | null = await userService.getUserById(userId);

      if (!user) {
        res.status(404).json({ message: `User with ID ${userId} not found` });
        return;
      }

      logger.info(`Fetched user with ID ${userId}: ${JSON.stringify(user)}`);
      res.status(200).json({ user });
    } catch (error) {
      logger.error({ error }, `Error fetching user with ID ${userId}`);
      serverError(res, `fetching all users`, error);
    }
  }
  async createNewUser(req: Request, res: Response): Promise<void> {
    try {
      const newUserBody: CreateUserBody = req.body;

      const createdUser: CreateUserBody = await userService.createNewUser(
        newUserBody
      );
      if (!createdUser || Object.keys(createdUser).length === 0) {
        res.status(404).json({ message: `Could not create user`, createdUser });
        return;
      }
      res.status(201).json({ createdUser });
    } catch (error) {
      logger.error({ error }, "Error creating user");
      serverError(res, "Could not create user", error);
    }
  }
  async updateUser(req: Request, res: Response): Promise<void> {
    const userId: string = req.params.id;
    const userToBeUpdatedBody: UserBody = req.body;

    try {
      const currentUserBody: UserBody | null = await userService.getUserById(
        userId
      );
      if (!currentUserBody) {
        res.status(404).json({ message: `User with ID ${userId} not found` });
        return;
      }
      const prepareUpdateUserBody: UserBody = prepareUserToBeUpdatedBody(
        currentUserBody,
        userToBeUpdatedBody
      );
      if (userId != prepareUpdateUserBody.id) {
        res
          .status(404)
          .json({ message: `User id not matched`, userToBeUpdatedBody });
      }
      const updatedUser: UserBody | null = await userService.updateUserById(
        prepareUpdateUserBody,
        userId
      );
      res.status(200).json({ updatedUser });
    } catch (error) {
      logger.error({ error }, "Error updating user");
      serverError(res, "Could not update user", error);
    }
  }
  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.id;
    try {
      const deletedUser: UserBody | null = await userService.getUserById(
        userId
      );
      if (!deletedUser) {
        res.status(404).json({ message: `User with ID ${userId} not found` });
        return;
      }
      await userService.deletedUserById(
        userId,
        USERS_STATUS.DELETE_USER_STATUS
      );
      res
        .status(200)
        .json({ message: `User deleted successfully with ID: ${userId}` });
    } catch (error) {
      logger.error({ error }, "Error fetching all users");
      serverError(res, `Could not delete user with ID: ${userId}`, error);
    }
  }
}
export const userController = new UserController();
