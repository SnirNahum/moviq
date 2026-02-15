import dotenv from "dotenv";
dotenv.config();

import { MongoClient, Db } from "mongodb";
import { dbConfig } from "../../config/env.config";
import { DB } from "./mongodb.types";

const uri: string = dbConfig.mongo_db_url || "";
if (!uri) throw new Error("Missing env var: mongo_db_url");

let dbState: DB = {
  client: null,
  db: null,
};
export async function mongoDBConnect(): Promise<Db> {
  if (dbState.db) return dbState.db;

  dbState.client = new MongoClient(uri);
  await dbState.client.connect();

  dbState.db = dbState.client.db(dbConfig.mongo_db_name);
  
  console.log("✅ MongoDB connected to DB:", dbState.db.databaseName);

  return dbState.db;
}


