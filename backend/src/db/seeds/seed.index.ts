import { seedPermission } from "./seed.permissions";
import { seedUsers } from "./seed.user";

export async function seedIndex() {
  console.log("🌱 Starting Seeding...");

  // await seedPermission();
  // await seedUsers();

  console.log(" Seed ended...🌱");
}
