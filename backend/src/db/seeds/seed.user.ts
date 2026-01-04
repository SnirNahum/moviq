import { db } from "../db.index.js";
import { users } from "../schema/users.schema.js";

export async function seedUsers() {
  try {
    console.log("🌱 Seeding users...");

    // await insertAdminUser();
    await insertregularUser();

    console.log("🎉 Users seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

// async function insertAdminUser(): Promise<void> {
//   await db
//     .insert(users)
//     .values({
//       firstName: "admin",
//       lastName: "admin",
//       username: "admin@gmail.com",
//       passwordHash: "admin123",
//       permissionsId: "09f16a90-6953-43f4-9e2a-05248f1edde3",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     })
//     .returning();
// }

async function insertregularUser() {
  await db.insert(users)
    .values({
      firstName: "regular",
      lastName: "user",
      username: "regular@gmail.com",
      passwordHash: "regular123",
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
    
}
