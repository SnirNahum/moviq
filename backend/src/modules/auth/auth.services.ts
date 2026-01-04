import { dbConfig } from "../../config/env.config";

class AuthService {
  async login () {
    //    const allUsers = await dbConfig
    //   .select({
    //     id: users.id,
    //     email: users.email,
    //     username: users.username,
    //     createdAt: users.createdAt,
    //   })
    //   .from(users);

    // return allUsers;
  
  }
}

export const authService = new AuthService();
