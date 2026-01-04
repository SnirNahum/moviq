import { eq } from "drizzle-orm";
import { db } from "../../db/db.index";
import { users } from "../../db/schema/index.schema";
import { CreateUserBody, GetAllUsersResponse, UserBody } from "./user.types";

class UserService {
  async getAllUsers(): Promise<GetAllUsersResponse | null> {
    try {
      const allUsers = await db
        .select({
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          username: users.username,
        })
        .from(users)
        .where(eq(users.status, 0));
      return { allUsers };
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw error;
    }
  }
  async getUserById(userId: string): Promise<UserBody | null> {
    try {
      const [user] = await db
        .select({
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          username: users.username,
          passwordHash: users.passwordHash,
          status: users.status,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        })
        .from(users)
        .where(eq(users.id, userId));

      return user;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  }
  async createNewUser(newUser: CreateUserBody): Promise<CreateUserBody> {
    try {
      const [createdUser] = await db
        .insert(users)
        .values({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          username: newUser.username,
          passwordHash: newUser.passwordHash,
        })
        .returning({
          id: users.id,
          firstName: users.firstName,
          lastName: users.lastName,
          username: users.username,
          passwordHash: users.passwordHash,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
        });
      return createdUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
  async updateUserById(
    userToBeUpdatedBody: UserBody,
    userId: string
  ): Promise<UserBody | null> {
    const [updatedUser] = await db
      .update(users)
      .set(userToBeUpdatedBody)
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        username: users.username,
        status: users.status,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    return updatedUser;
  }
  async deletedUserById(
    userId: string,
    status: number
  ): Promise<UserBody | null> {
    const [deletedUser] = await db
      .update(users)
      .set({ status })
      .where(eq(users.id, userId))
      .returning({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        username: users.username,
        status: users.status,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    return deletedUser;
  }
}
export const userService = new UserService();


