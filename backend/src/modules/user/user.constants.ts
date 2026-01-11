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
