import { pgTable, uuid, varchar, timestamp, bigint } from "drizzle-orm/pg-core";

export const permission = pgTable("permission", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  permissionLevel: bigint("permissionLevel", { mode: "number" })
    .notNull()
    .unique(),
  createdAt: timestamp("createdAt", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" }).notNull().defaultNow(),
});
