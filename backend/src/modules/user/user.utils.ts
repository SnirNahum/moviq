import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./user.constants";
import { User } from "./user.types";

export function prepareUserToBeUpdatedBody(
  currentUserBody: any,
  userToBeUpdatedBody: any
) {
  return {
    id: userToBeUpdatedBody.id,
    firstName: userToBeUpdatedBody.firstName || currentUserBody.firstName,
    lastName: userToBeUpdatedBody.lastName || currentUserBody.lastName,
    username: userToBeUpdatedBody.username || currentUserBody.username,
  };
}

export function normalizeUpdateUserBody(user: User): User {
  return {
    ...user,
    firstName: user.firstName?.trim(),
    lastName: user.lastName?.trim(),
    username: user.username?.trim().toLowerCase(),
  };
}

export async function passwordHashGenerator(plainPassword: string) {
  return await bcrypt.hash(plainPassword, SALT_ROUNDS);
}
