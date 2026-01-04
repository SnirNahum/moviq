import { Router } from "express";
import { USERS_ROUTES } from "./user.constants";
import { userController } from "./user.controller";

export const userRouter = Router();

userRouter.get(USERS_ROUTES.getAllUsers, userController.getAllUsers);
userRouter.get(USERS_ROUTES.getUserById, userController.getUserById);
userRouter.post(USERS_ROUTES.createNewUser, userController.createNewUser);
userRouter.put(USERS_ROUTES.updateUser, userController.updateUser);
userRouter.delete(USERS_ROUTES.deleteUser, userController.deleteUser);
