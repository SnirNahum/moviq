import { db } from "../../db/db.index";
import { users } from "../../db/schema/index.schema";
import { UserEntity, User, UserId } from "./user.types";
import { USERS_STATUS } from "./user.constants";
import { and, eq } from "drizzle-orm";
import { normalizeUserBody } from "./user.utils";

class UserService {
  async getUsers(): Promise<User[]> {
    return await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        username: users.username,
      })
      .from(users)
      .where(eq(users.status, USERS_STATUS.ACTIVE));
  }

  async getUserById(userId: string): Promise<User> {
    const [user] = await db
      .select({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        username: users.username,
      })
      .from(users)
      .where(and(eq(users.id, userId), eq(users.status, USERS_STATUS.ACTIVE)));

    return user;
  }
  async createNewUser(newUser: UserEntity): Promise<UserId> {
    const normalizedBody: UserEntity = normalizeUserBody(newUser);

    const [createdUser] = await db
      .insert(users)
      .values(normalizedBody)
      .returning({ id: users.id });
    return createdUser;
  }

  async updateUserById(
    userId: string,
    updateUserBody: UserEntity
  ): Promise<UserId> {
    const normalizedBody: UserEntity = normalizeUserBody(updateUserBody);
    const [updatedUser] = await db
      .update(users)
      .set(normalizedBody)
      .where(eq(users.id, userId))
      .returning({ id: users.id });

    return updatedUser;
  }
  async deleteUserById(userId: string): Promise<UserId[]> {
    return await db
      .update(users)
      .set({ status: USERS_STATUS.DELETE })
      .where(eq(users.id, userId))
      .returning({ id: users.id });
  }
}
export const userService = new UserService();
