import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { CHAR_LENGTH, USERS_STATUS } from "../../modules/user/user.constants";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: CHAR_LENGTH.DEFAULT }).notNull(),
  lastName: varchar("last_name", { length: CHAR_LENGTH.DEFAULT }).notNull(),
  username: varchar("username", { length: CHAR_LENGTH.DEFAULT })
    .notNull()
    .unique(),
  passwordHash: text("password_hash").notNull(),
  status: integer("status").notNull().default(USERS_STATUS.ACTIVE),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
