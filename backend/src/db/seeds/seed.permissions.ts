import { db } from "../db.index.js";
import { permissions } from "../schema/userPermissions.schema.js";

export async function seedPermission() {
  try {
    console.log("🌱 Seeding permissions...");

    // await userPermissions();
    // await adminPermissions();

    console.log("🎉 Permissions seeding completed!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    throw error;
  }
}

async function adminPermissions() {
  const adminPermission = await db
    .insert(permissions)
    .values({
      name: "admin",
      permissionsLevel: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return adminPermission;
}

async function userPermissions() {
  const userPermission = await db
    .insert(permissions)
    .values({
      name: "user",
      permissionsLevel: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();
  return userPermission;
}
