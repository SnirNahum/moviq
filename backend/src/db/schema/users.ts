import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { permission } from "./userPermission";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("firstName", { length: 120 }).notNull(),
  lastName: varchar("lastName", { length: 120 }).notNull(),
  username: varchar("username", { length: 120 }).notNull().unique(),
  passwordHash: text("passwordHash").notNull(),
  permissionId: uuid("permissionId")
    .notNull()
    .references(() => permission.id),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});
