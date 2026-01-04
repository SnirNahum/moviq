export const USERS_ROUTES = {
  getAllUsers: "/",
  getUserById: "/:userId",
  createNewUser: "/create",
  updateUser: "/update/:id",
  deleteUser: "/delete/:id",
} as const;

export const USERS_STATUS = {
  ACTIVE_USER_STATUS: 0,
  DELETE_USER_STATUS: 9,
} as const;
