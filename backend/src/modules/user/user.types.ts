export interface UserBody {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  passwordHash?: string;
  status?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateUserBody {
  firstName: string;
  lastName: string;
  username: string;
  passwordHash: string;
}

export interface GetAllUsersResponse {
  allUsers: UserBody[];
}
