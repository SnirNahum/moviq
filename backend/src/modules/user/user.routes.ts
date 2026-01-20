import { Router } from "express";
import { USERS_ROUTES } from "./user.constants";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validation.middleware";
import { UserSchema } from "./user.validation";

export const userRouter = Router();

userRouter.get(USERS_ROUTES.getAllUsers, userController.getUsers);
userRouter.get(USERS_ROUTES.getUserById, userController.getUserById);
userRouter.post(USERS_ROUTES.createNewUser,validateRequest(UserSchema), userController.createNewUser);
userRouter.put(USERS_ROUTES.updateUser, userController.updateUser);
userRouter.delete(USERS_ROUTES.deleteUser, userController.deleteUser);
