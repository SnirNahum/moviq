import {
  text,
  uuid,
  pgTable,
  date,
  varchar,
  numeric,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
  id: uuid("id").defaultRandom().primaryKey(),
  url: text("url").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  genres: text("genres").array().notNull(),
  runtime: integer("runtime").notNull(),
  releaseDate: date("release_date").notNull(),
  rating: numeric("rating", { precision: 3, scale: 1 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),
  network: varchar("network", { length: 100 }).notNull(),
  officialSite: text("official_site"),
  image: text("image"),
  imdbLink: text("imdb_link"),
  createdAt: timestamp("created_at", { mode: "date" }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).notNull().defaultNow(),
});
