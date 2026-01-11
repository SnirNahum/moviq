import { User, UserEntity } from "./user.types";

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

export function normalizeUserBody(body: UserEntity): UserEntity {
  return {
    ...body,
    firstName: body.firstName?.trim(),
    lastName: body.lastName?.trim(),
    username: body.username?.trim().toLowerCase(),
  };
}
