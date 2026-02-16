export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface UserDBRow extends User {
  password: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDbValues = User & {
  password: string;
};

export type UserId = Pick<User, "id">;

export interface AllUsers {
  users: User[];
}
