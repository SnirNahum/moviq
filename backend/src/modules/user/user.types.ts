import z from "zod";

export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface UserDBRow extends User {
  passwordHash: string;
  status: number;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateUserDbValues = User & {
  passwordHash: string; 
};

export type UserId = Pick<User, "id">;

export interface AllUsers {
  users: User[];
}
