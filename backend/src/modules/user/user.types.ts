export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface UserEntity extends User {
  passwordHash: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export type UserId = Pick<User, "id">;

export interface GetAllUsersResponse {
  allUsers: User[];
}
