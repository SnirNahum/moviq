import { UserBody } from "./user.types";

export function prepareUserToBeUpdatedBody(
  currentUserBody: UserBody,
  userToBeUpdatedBody: UserBody
): UserBody {
  return {
    id: userToBeUpdatedBody.id,
    firstName: userToBeUpdatedBody.firstName || currentUserBody.firstName,
    lastName: userToBeUpdatedBody.lastName || currentUserBody.lastName,
    username: userToBeUpdatedBody.username || currentUserBody.username,
    passwordHash: currentUserBody.passwordHash,
    status: userToBeUpdatedBody.status,
    createdAt: currentUserBody.createdAt,
    updatedAt: new Date(),
  };
}


