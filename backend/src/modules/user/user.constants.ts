export const USERS_ROUTES = {
  getAllUsers: "/",
  getUserById: "/:userId",
  createNewUser: "/create",
  updateUser: "/:id",
  deleteUser: "/:id",
} as const;

export const USERS_STATUS = {
  ACTIVE: 0,
  DELETE: 9,
} as const;

export const CHAR_LENGTH = {
  DEFAULT: 120,
} as const;

export const USER_ERROR_MESSAGE = {
  NOT_FOUND: "User not found",
  SERVER_ERROR: "Internl server error",
  CREATION_FAILED: "Could not create user",
} as const;

export const SALT_ROUNDS: number = 12;
