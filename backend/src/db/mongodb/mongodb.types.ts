import { Db, MongoClient } from "mongodb";

export type DB = {
  client: MongoClient | null;
  db: Db | null;
};
